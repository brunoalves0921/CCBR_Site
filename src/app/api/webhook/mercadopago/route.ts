import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { prisma } from '@/lib/prisma';

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '' });

export async function POST(request: Request) {
    try {
        const url = new URL(request.url);
        const topic = url.searchParams.get('topic') || url.searchParams.get('type');
        const id = url.searchParams.get('data.id') || url.searchParams.get('id');

        if (topic !== 'payment' || !id) {
            return NextResponse.json({ status: 'ignorado' }, { status: 200 });
        }

        const payment = new Payment(client);
        const paymentData = await payment.get({ id: id as string });

        const pedidoId = paymentData.external_reference;
        const status = paymentData.status;

        if (!pedidoId) {
            return NextResponse.json({ error: 'Pedido não referenciado.' }, { status: 400 });
        }

        const pedido = await prisma.pedido.findUnique({
            where: { id: pedidoId },
            include: { itens: { include: { produto: true } } }
        });

        if (!pedido) {
            return NextResponse.json({ error: 'Pedido não encontrado.' }, { status: 404 });
        }

        // ==========================================
        // CENÁRIO A: COMPRA APROVADA
        // ==========================================
        if (status === 'approved' && pedido.status !== 'APROVADO') {
            await prisma.$transaction(async (tx) => {
                await tx.pedido.update({
                    where: { id: pedido.id },
                    data: {
                        status: 'APROVADO',
                        gatewayRef: id,
                        metodoPagto: paymentData.payment_method_id
                    }
                });

                const entregas = [];
                for (const item of pedido.itens) {
                    for (const comandoRaw of item.produto.comandos) {
                        // Substitui a tag {player} pelo nick real do jogador
                        const comandoFormatado = comandoRaw.replace(/{player}/g, pedido.playerNick);
                        
                        for (let i = 0; i < item.quantidade; i++) {
                            entregas.push({
                                pedidoId: pedido.id,
                                playerNick: pedido.playerNick,
                                servidor: item.produto.servidor,
                                comando: comandoFormatado
                            });
                        }
                    }
                }

                if (entregas.length > 0) {
                    await tx.filaEntrega.createMany({ data: entregas });
                }
            });
        } 
        // =========================================================
        // CENÁRIO B: REEMBOLSO / CHARGEBACK (PUNIÇÃO AUTOMÁTICA)
        // =========================================================
        else if ((status === 'refunded' || status === 'charged_back') && pedido.status !== 'REEMBOLSADO') {
            await prisma.$transaction(async (tx) => {
                // 1. Atualiza o status financeiro no site
                await tx.pedido.update({
                    where: { id: pedido.id },
                    data: { status: 'REEMBOLSADO' }
                });

                // 2. Aplica o Banimento em todos os servidores (GLOBAL)
                await tx.filaEntrega.create({
                    data: {
                        pedidoId: pedido.id,
                        playerNick: pedido.playerNick,
                        servidor: 'GLOBAL', 
                        comando: `ban ${pedido.playerNick} Chargeback ou Reembolso Ilegal (Pedido #${pedido.id})`,
                        status: 'AGUARDANDO'
                    }
                });
            });
            
            console.log(`[SEGURANÇA] Jogador ${pedido.playerNick} punido por chargeback/reembolso.`);
        } 
        // ==========================================
        // CENÁRIO C: CANCELAMENTO COMUM (S/ PUNIÇÃO)
        // ==========================================
        else if (status === 'cancelled' && pedido.status !== 'CANCELADO') {
            // Apenas cancela o pedido (ex: PIX expirou, boleto não pago)
            await prisma.pedido.update({
                where: { id: pedido.id },
                data: { status: 'CANCELADO' }
            });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Erro no webhook:', error);
        return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
    }
}
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
                    for (const comando of item.produto.comandos) {
                        for (let i = 0; i < item.quantidade; i++) {
                            entregas.push({
                                pedidoId: pedido.id,
                                playerNick: pedido.playerNick,
                                servidor: item.produto.servidor,
                                comando: comando
                            });
                        }
                    }
                }

                if (entregas.length > 0) {
                    await tx.filaEntrega.createMany({ data: entregas });
                }
            });
        } else if (status === 'cancelled' || status === 'refunded') {
            await prisma.pedido.update({
                where: { id: pedido.id },
                data: {
                    status: status === 'cancelled' ? 'CANCELADO' : 'REEMBOLSADO'
                }
            });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Erro no webhook:', error);
        return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
    }
}
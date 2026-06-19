import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

const token = (process.env.MERCADOPAGO_ACCESS_TOKEN || '').replace(/['"]/g, '').trim();
const client = new MercadoPagoConfig({ accessToken: token });

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const playerNick = cookieStore.get('ccbr_session')?.value;

        if (!playerNick) {
            return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
        }

        const { items } = await request.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Carrinho vazio.' }, { status: 400 });
        }

        const produtosIds = items.map((i: { id: string }) => i.id);
        const produtosDb = await prisma.produto.findMany({
            where: { id: { in: produtosIds }, ativo: true }
        });

        if (produtosDb.length === 0) {
            return NextResponse.json({ error: 'Produtos inválidos ou inativos.' }, { status: 400 });
        }

        let total = 0;
        const pedidoItemsData = [];
        const mpItems = [];

        for (const item of items) {
            const produto = produtosDb.find(p => p.id === item.id);
            if (produto) {
                const quantidade = item.quantidade || 1;

                // CÁLCULO COM DESCONTO AQUI
                const precoFinal = produto.desconto && produto.desconto > 0
                    ? produto.preco * (1 - produto.desconto / 100)
                    : produto.preco;

                const precoTotalItem = precoFinal * quantidade;
                total += precoTotalItem;

                pedidoItemsData.push({
                    produtoId: produto.id,
                    quantidade: quantidade,
                    precoUnit: precoFinal // Salva o valor com desconto no pedido
                });

                mpItems.push({
                    id: produto.id,
                    title: produto.desconto && produto.desconto > 0 ? `${produto.nome} (-${produto.desconto}%)` : produto.nome,
                    quantity: quantidade,
                    unit_price: parseFloat(precoFinal.toFixed(2)),
                    currency_id: 'BRL'
                });
            }
        }

        const pedido = await prisma.pedido.create({
            data: {
                playerNick,
                total,
                itens: {
                    create: pedidoItemsData
                }
            }
        });

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const isLocalhost = baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1');

        const siteUrl = isLocalhost
            ? 'https://site-teste-ccbr.com.br'
            : baseUrl.replace(/['"]/g, '').trim().replace(/\/$/, '');

        const preference = new Preference(client);
        const response = await preference.create({
            body: {
                items: mpItems,
                external_reference: pedido.id,
                back_urls: {
                    success: `${siteUrl}/loja/sucesso`,
                    failure: `${siteUrl}/loja/falha`,
                    pending: `${siteUrl}/loja/pendente`
                },
                auto_return: 'approved',
                notification_url: `${siteUrl}/api/webhook/mercadopago`
            }
        });

        return NextResponse.json({ init_point: response.init_point });
    } catch (error) {
        console.error('Erro no checkout:', error);
        return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
    }
}
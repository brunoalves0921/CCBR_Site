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

        if (!items || !Array.isArray(items) || items.length === 0) {
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
        const nomesProdutos = []; 

        for (const item of items) {
            const produto = produtosDb.find(p => p.id === item.id);
            
            if (produto) {
                const quantidade = item.quantidade || 1;

                const precoFinal = produto.desconto && produto.desconto > 0
                    ? produto.preco * (1 - produto.desconto / 100)
                    : produto.preco;

                const precoTotalItem = precoFinal * quantidade;
                total += precoTotalItem;

                pedidoItemsData.push({
                    produtoId: produto.id,
                    quantidade: quantidade,
                    precoUnit: precoFinal
                });

                const nomeComDesconto = produto.desconto && produto.desconto > 0 
                    ? `${produto.nome} (-${produto.desconto}%)` 
                    : produto.nome;
                
                nomesProdutos.push(`${quantidade}x ${nomeComDesconto}`);
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

        // Usando o bullet point (•) para separar os itens na mesma linha com clareza
        let tituloMP = nomesProdutos.join('  •  ');
        
        if (tituloMP.length > 250) {
            tituloMP = tituloMP.substring(0, 247) + '...';
        }

        const mpItemAggregated = {
            id: pedido.id,
            title: tituloMP,
            description: "Pedido na loja CCBR", 
            quantity: 1,
            unit_price: parseFloat(total.toFixed(2)),
            currency_id: 'BRL'
        };

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const isLocalhost = baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1');

        const siteUrl = isLocalhost
            ? 'https://site-teste-ccbr.com.br'
            : baseUrl.replace(/['"]/g, '').trim().replace(/\/$/, '');

        const preference = new Preference(client);
        const response = await preference.create({
            body: {
                items: [mpItemAggregated],
                external_reference: pedido.id,
                // Corrigido: Agora ele volta para a raiz da loja de forma segura
                back_urls: {
                    success: `${siteUrl}/loja?status=sucesso`,
                    failure: `${siteUrl}/loja?status=falha`,
                    pending: `${siteUrl}/loja?status=pendente`
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
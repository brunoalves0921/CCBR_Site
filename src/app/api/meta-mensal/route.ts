import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // 1. Busca o valor da meta definido pelo Admin no banco
        const configMeta = await prisma.configuracao.findUnique({
            where: { chave: 'META_MENSAL_VALOR' }
        });
        
        // Se o admin não configurou nenhuma meta ainda, define um padrão de R$ 500,00
        const valorMeta = configMeta ? parseFloat(configMeta.valor) : 500.00;

        // 2. Calcula o primeiro e o último milissegundo do mês atual
        const agora = new Date();
        const inicioDoMes = new Date(agora.getFullYear(), agora.getMonth(), 1);
        const fimDoMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 0, 23, 59, 59, 999);

        // 3. Soma o valor total de todos os pedidos APROVADOS dentro deste mês
        const faturamentoMes = await prisma.pedido.aggregate({
            _sum: {
                total: true // Certifique-off se o campo no seu banco chama 'total' ou 'valor'
            },
            where: {
                status: 'APROVADO',
                createdAt: {
                    gte: inicioDoMes,
                    lte: fimDoMes
                }
            }
        });

        const totalArrecadado = faturamentoMes._sum.total ? Number(faturamentoMes._sum.total) : 0;

        // 4. Calcula a porcentagem (limitando o máximo a 100% para não quebrar o layout se passar da meta)
        let percentual = valorMeta > 0 ? Math.round((totalArrecadado / valorMeta) * 100) : 0;
        const percentualLayout = Math.min(percentual, 100);

        return NextResponse.json({
            metaValor: valorMeta,
            totalArrecadado: totalArrecadado,
            percentualExato: percentual, // Pode passar de 100% (ex: 120% da meta batida!)
            percentualLayout: percentualLayout // Travado em 100 para as pecinhas da barra do layout
        }, { status: 200 });

    } catch (error) {
        console.error("Erro ao calcular meta mensal:", error);
        return NextResponse.json({ error: "Erro interno ao calcular meta." }, { status: 500 });
    }
    
}

export async function POST(request: Request) {
    try {
        const { valor } = await request.json();

        if (valor === undefined || isNaN(valor)) {
            return NextResponse.json({ error: 'Valor inválido' }, { status: 400 });
        }

        // Atualiza ou cria a configuração da meta
        const config = await prisma.configuracao.upsert({
            where: { chave: 'META_MENSAL_VALOR' },
            update: { valor: valor.toString() },
            create: { chave: 'META_MENSAL_VALOR', valor: valor.toString() }
        });

        return NextResponse.json({ success: true, config }, { status: 200 });
    } catch (error) {
        console.error("Erro ao atualizar meta mensal:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}
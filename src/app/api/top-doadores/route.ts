import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Agrupa os pedidos aprovados pelo nick do jogador e soma o total gasto
        const topDoadores = await prisma.pedido.groupBy({
            by: ['playerNick'],
            where: {
                status: 'APROVADO',
            },
            _sum: {
                total: true,
            },
            orderBy: {
                _sum: {
                    total: 'desc',
                },
            },
            take: 5, // Limita aos Top 5 doadores
        });

        // Formata os dados para o padrão que o Frontend da Loja está esperando: { nick, total }
        const formatado = topDoadores.map(doador => ({
            nick: doador.playerNick,
            total: doador._sum.total || 0,
        }));

        return NextResponse.json(formatado);

    } catch (error) {
        console.error("[API] Erro ao buscar top doadores:", error);
        return NextResponse.json(
            { error: "Erro interno ao buscar o ranking." }, 
            { status: 500 }
        );
    }
}
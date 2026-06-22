import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const regras = await prisma.regra.findMany({
            orderBy: { ordem: 'asc' },
        });
        return NextResponse.json(regras);
    } catch (error) {
        console.error("[API] Erro ao buscar regras:", error);
        return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { titulo, descricao, categoria, ordem, nivelPunicao } = body;

        if (!titulo || !descricao) {
            return NextResponse.json({ error: "Título e descrição são obrigatórios." }, { status: 400 });
        }

        const novaRegra = await prisma.regra.create({
            data: {
                titulo,
                descricao,
                categoria: categoria || 'Gerais',
                nivelPunicao: nivelPunicao || 'Advertência', // Salvando o nível de punição
                ordem: Number(ordem) || 0,
            }
        });

        return NextResponse.json(novaRegra, { status: 201 });
    } catch (error) {
        console.error("[API] Erro ao criar regra:", error);
        return NextResponse.json({ error: "Erro ao criar regra" }, { status: 500 });
    }
}
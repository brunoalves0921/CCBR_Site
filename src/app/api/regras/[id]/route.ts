import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETAR REGRA
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        // Agora nós aguardamos os parâmetros carregarem!
        const { id } = await params;

        await prisma.regra.delete({
            where: { id }
        });

        return NextResponse.json({ message: "Regra deletada com sucesso" }, { status: 200 });
    } catch (error) {
        console.error("[API] Erro ao deletar regra:", error);
        return NextResponse.json({ error: "Erro ao deletar regra" }, { status: 500 });
    }
}

// EDITAR/ATUALIZAR REGRA
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        // Agora nós aguardamos os parâmetros carregarem!
        const { id } = await params;
        
        const body = await request.json();
        const { titulo, descricao, categoria, ordem, nivelPunicao } = body;

        if (!titulo || !descricao) {
            return NextResponse.json({ error: "Título e descrição são obrigatórios." }, { status: 400 });
        }

        const regraAtualizada = await prisma.regra.update({
            where: { id },
            data: {
                titulo,
                descricao,
                categoria,
                nivelPunicao,
                ordem: Number(ordem),
            }
        });

        return NextResponse.json(regraAtualizada, { status: 200 });
    } catch (error) {
        console.error("[API] Erro ao atualizar regra:", error);
        return NextResponse.json({ error: "Erro ao atualizar regra" }, { status: 500 });
    }
}
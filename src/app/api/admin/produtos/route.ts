import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nome, descricao, preco, categoria, servidor, comandos, imagem } = body;

        const produto = await prisma.produto.create({
            data: {
                nome,
                descricao,
                preco: parseFloat(preco),
                categoria,
                servidor,
                comandos: comandos.split(',').map((c: string) => c.trim()),
                imagem: imagem || null,
                ativo: true
            }
        });

        return NextResponse.json(produto, { status: 201 });
    } catch (error) {
        console.error('Erro no cadastro:', error);
        return NextResponse.json({ error: 'Erro ao criar produto no banco de dados.' }, { status: 500 });
    }
}
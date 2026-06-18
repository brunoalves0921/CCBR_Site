import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

async function autenticarAdmin() {
    const cookieStore = await cookies();
    const playerNick = cookieStore.get('ccbr_session')?.value;

    if (!playerNick) return false;

    const usuario = await prisma.user.findUnique({
        where: { username: playerNick }
    });

    return usuario && (usuario.role === 'ADMIN' || usuario.role === 'STAFF');
}

export async function GET() {
    try {
        const noticias = await prisma.noticia.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(noticias);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar notícias.' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        if (!await autenticarAdmin()) {
            return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 });
        }

        const body = await request.json();
        const { titulo, resumo, conteudo, imagem, tag } = body;

        const noticia = await prisma.noticia.create({
            data: { titulo, resumo, conteudo, imagem: imagem || null, tag }
        });

        return NextResponse.json(noticia, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar notícia.' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        if (!await autenticarAdmin()) {
            return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 });
        }

        const body = await request.json();
        const { id, titulo, resumo, conteudo, imagem, tag } = body;

        if (!id) return NextResponse.json({ error: 'ID não fornecido.' }, { status: 400 });

        const noticia = await prisma.noticia.update({
            where: { id },
            data: { titulo, resumo, conteudo, imagem: imagem || null, tag }
        });

        return NextResponse.json(noticia);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao atualizar notícia.' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        if (!await autenticarAdmin()) {
            return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID não fornecido.' }, { status: 400 });

        await prisma.noticia.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao deletar notícia.' }, { status: 500 });
    }
}
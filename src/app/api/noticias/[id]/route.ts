import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: any) {
    try {
        // Resolve os parâmetros para suportar diferentes versões do Next.js
        const resolvedParams = await Promise.resolve(context.params);
        const id = resolvedParams.id;

        const noticia = await prisma.noticia.findUnique({
            where: { id }
        });

        if (!noticia) {
            return NextResponse.json({ error: 'Notícia não encontrada.' }, { status: 404 });
        }

        return NextResponse.json(noticia);
    } catch (error) {
        return NextResponse.json({ error: 'Erro interno ao buscar a notícia.' }, { status: 500 });
    }
}
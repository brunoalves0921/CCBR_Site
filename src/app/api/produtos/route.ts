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
        const produtos = await prisma.produto.findMany({
            orderBy: [
                { ordem: 'asc' }, // <-- NOVA ORDENAÇÃO
                { createdAt: 'desc' }
            ]
        });
        return NextResponse.json(produtos);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar produtos.' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        if (!await autenticarAdmin()) return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 });
        const body = await request.json();
        const { nome, descricao, preco, desconto, categoria, servidor, comandos, imagem } = body;
        
        // Coloca o novo produto no final da fila (contando quantos já existem)
        const total = await prisma.produto.count();
        
        const produto = await prisma.produto.create({
            data: {
                nome, descricao, preco: parseFloat(preco), desconto: parseInt(desconto) || 0,
                categoria, servidor, comandos: Array.isArray(comandos) ? comandos : comandos.split(',').map((c: string) => c.trim()),
                imagem: imagem || null, ativo: true, ordem: total
            }
        });
        return NextResponse.json(produto, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar produto.' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        if (!await autenticarAdmin()) return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 });
        const body = await request.json();
        const { id, nome, descricao, preco, desconto, categoria, servidor, comandos, imagem, ativo } = body;
        if (!id) return NextResponse.json({ error: 'ID não fornecido.' }, { status: 400 });
        const produto = await prisma.produto.update({
            where: { id: id },
            data: {
                nome, descricao, preco: parseFloat(preco), desconto: parseInt(desconto) || 0,
                categoria, servidor, comandos: typeof comandos === 'string' ? comandos.split(',').map((c: string) => c.trim()) : comandos,
                imagem: imagem || null, ativo: Boolean(ativo)
            }
        });
        return NextResponse.json(produto);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao atualizar produto.' }, { status: 500 });
    }
}

// === NOVO MÉTODO PARA SALVAR A REORDENAÇÃO ===
export async function PATCH(request: Request) {
    try {
        if (!await autenticarAdmin()) return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 });
        
        const body = await request.json();
        const { itensReordenados } = body;

        if (!Array.isArray(itensReordenados)) {
            return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
        }

        // Executa todas as atualizações de ordem simultaneamente
        await prisma.$transaction(
            itensReordenados.map((item: { id: string; ordem: number }) =>
                prisma.produto.update({
                    where: { id: item.id },
                    data: { ordem: item.ordem }
                })
            )
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao reordenar produtos.' }, { status: 500 });
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

        await prisma.produto.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        if (error.code === 'P2003' || (error.message && error.message.includes('Foreign key constraint'))) {
            return NextResponse.json({ 
                error: 'Este produto já foi vendido e não pode ser deletado. Edite-o e desmarque "Produto ativo".' 
            }, { status: 400 });
        }
        return NextResponse.json({ error: 'Erro ao deletar produto.' }, { status: 500 });
    }
}
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

type Noticia = {
    id: string;
    titulo: string;
    resumo: string;
    conteudo: string;
    imagem: string | null;
    tag: string;
    createdAt: string;
};

export default function NoticiaPage() {
    const params = useParams();
    const router = useRouter();
    const [noticia, setNoticia] = useState<Noticia | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!params?.id) return;
        
        fetch(`/api/noticias/${params.id}`)
            .then(res => {
                if (!res.ok) throw new Error('Not found');
                return res.json();
            })
            .then(data => {
                setNoticia(data);
                setIsLoading(false);
            })
            .catch(() => {
                router.push('/');
            });
    }, [params, router]);

    const formatarData = (isoString: string) => {
        const data = new Date(isoString);
        return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
            .replace(/ de /g, ' ')
            .replace('.', '')
            .toUpperCase();
    };

    if (isLoading) {
        return (
            <main className="min-h-screen pt-32 pb-24 bg-background flex justify-center items-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </main>
        );
    }

    if (!noticia) return null;

    return (
        <main className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

            <article className="max-w-4xl mx-auto px-6 relative z-10">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-bold uppercase tracking-widest text-xs mb-10 transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/10">
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Voltar para o Início
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-primary/10 text-primary border border-primary/20 font-label-caps font-bold px-4 py-1.5 text-xs uppercase tracking-widest rounded-full">
                            {noticia.tag}
                        </span>
                        <span className="text-gray-500 font-label-caps text-xs font-bold tracking-[0.15em]">
                            PUBLICADO EM {formatarData(noticia.createdAt)}
                        </span>
                    </div>
                    <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-white font-black uppercase tracking-tighter leading-tight mb-6">
                        {noticia.titulo}
                    </h1>
                    <p className="text-xl text-gray-400 font-medium leading-relaxed">
                        {noticia.resumo}
                    </p>
                </header>

                {noticia.imagem && (
                    <div className="w-full aspect-video rounded-[2rem] overflow-hidden relative mb-12 shadow-2xl border border-white/10 bg-surface-container-low">
                        <img src={noticia.imagem} alt={noticia.titulo} className="w-full h-full object-cover" />
                    </div>
                )}

                <div className="text-gray-300 text-lg leading-relaxed space-y-6">
                    <p className="whitespace-pre-wrap">{noticia.conteudo}</p>
                </div>
            </article>
        </main>
    );
}
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

export default function AdminNoticias() {
    const router = useRouter();
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [isLoadingNoticias, setIsLoadingNoticias] = useState(true);
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        titulo: '',
        resumo: '',
        conteudo: '',
        imagem: '',
        tag: 'Atualização'
    });

    const carregarNoticias = async () => {
        try {
            const res = await fetch('/api/noticias');
            if (res.ok) {
                const data = await res.json();
                setNoticias(data);
            }
        } catch (error) {
            console.error('Erro ao buscar notícias:', error);
        } finally {
            setIsLoadingNoticias(false);
        }
    };

    useEffect(() => {
        carregarNoticias();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoadingForm(true);

        const url = '/api/noticias';
        const method = editingId ? 'PUT' : 'POST';
        const body = editingId ? { id: editingId, ...formData } : formData;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                alert(editingId ? 'Notícia atualizada com sucesso!' : 'Notícia publicada com sucesso!');
                limparFormulario();
                carregarNoticias();
                router.refresh();
            } else {
                const data = await res.json();
                alert(data.error || 'Erro ao processar requisição.');
            }
        } catch (error) {
            alert('Erro de conexão com o servidor.');
        } finally {
            setIsLoadingForm(false);
        }
    };

    const handleEditClick = (noticia: Noticia) => {
        setEditingId(noticia.id);
        setFormData({
            titulo: noticia.titulo,
            resumo: noticia.resumo,
            conteudo: noticia.conteudo,
            imagem: noticia.imagem || '',
            tag: noticia.tag
        });
    };

    const handleDeleteClick = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir esta notícia permanentemente?')) return;

        try {
            const res = await fetch(`/api/noticias?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                alert('Notícia removida com sucesso!');
                carregarNoticias();
            } else {
                alert('Erro ao deletar notícia.');
            }
        } catch (error) {
            alert('Erro de conexão ao deletar.');
        }
    };

    const limparFormulario = () => {
        setEditingId(null);
        setFormData({ titulo: '', resumo: '', conteudo: '', imagem: '', tag: 'Atualização' });
    };

    return (
        <main className="min-h-screen bg-black pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                <div className="lg:col-span-5 bg-surface-container-high border border-outline-variant rounded-2xl p-6 h-fit">
                    <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                        <h1 className="text-xl font-black text-white uppercase tracking-wider">
                            {editingId ? 'Editar Notícia' : 'Nova Notícia'}
                        </h1>
                        {editingId && (
                            <button onClick={limparFormulario} className="text-xs font-bold text-red-400 hover:underline">
                                Cancelar
                            </button>
                        )}
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-1">Título</label>
                            <input required type="text" value={formData.titulo} onChange={e => setFormData({...formData, titulo: e.target.value})} className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-primary transition-colors" placeholder="Ex: Nova Temporada Começou" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-1">Resumo (Para a Timeline)</label>
                            <textarea required value={formData.resumo} onChange={e => setFormData({...formData, resumo: e.target.value})} className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-primary transition-colors h-20 resize-none" placeholder="Texto curto para a lista lateral..." />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-1">Conteúdo Completo</label>
                            <textarea required value={formData.conteudo} onChange={e => setFormData({...formData, conteudo: e.target.value})} className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-primary transition-colors h-32 resize-none" placeholder="Matéria completa..." />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1">Tag/Categoria</label>
                                <select value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-primary transition-colors">
                                    <option value="Atualização">Atualização</option>
                                    <option value="Evento">Evento</option>
                                    <option value="Aviso">Aviso</option>
                                    <option value="Comunidade">Comunidade</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1">URL da Imagem</label>
                                <input type="url" value={formData.imagem} onChange={e => setFormData({...formData, imagem: e.target.value})} className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-primary transition-colors" placeholder="https://..." />
                            </div>
                        </div>

                        <button type="submit" disabled={isLoadingForm} className="w-full bg-primary text-black font-black py-3 rounded-xl mt-4 hover:bg-white transition-colors disabled:opacity-50 text-sm uppercase tracking-wider">
                            {isLoadingForm ? 'Processando...' : editingId ? 'Atualizar Notícia' : 'Publicar Notícia'}
                        </button>
                    </form>
                </div>

                <div className="lg:col-span-7 bg-surface-container-high border border-outline-variant rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                        <h2 className="text-xl font-black text-white uppercase tracking-wider">Notícias Publicadas</h2>
                        <Link href="/" className="text-xs font-bold text-primary hover:underline">Ver Site ↗</Link>
                    </div>

                    {isLoadingNoticias ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        </div>
                    ) : noticias.length === 0 ? (
                        <p className="text-gray-500 text-center py-10 text-sm">Nenhuma notícia publicada ainda.</p>
                    ) : (
                        <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2">
                            {noticias.map(n => (
                                <div key={n.id} className="flex justify-between items-center bg-black/40 border border-white/5 p-4 rounded-xl hover:border-white/10 transition-colors">
                                    <div className="flex-1 pr-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-primary/10 text-primary border border-primary/20">{n.tag}</span>
                                            <h3 className="font-bold text-white text-sm truncate">{n.titulo}</h3>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1 truncate">{new Date(n.createdAt).toLocaleDateString('pt-BR')} • {n.resumo}</p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button onClick={() => handleEditClick(n)} className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-primary hover:bg-white/10 transition-colors" title="Editar">
                                            <span className="material-symbols-outlined text-sm">edit</span>
                                        </button>
                                        <button onClick={() => handleDeleteClick(n.id)} className="p-2 rounded-lg bg-red-500/5 text-red-400 hover:text-white hover:bg-red-500 transition-colors" title="Excluir">
                                            <span className="material-symbols-outlined text-sm">delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}
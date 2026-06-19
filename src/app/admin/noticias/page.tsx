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

    // Estados para os Filtros
    const [busca, setBusca] = useState('');
    const [filtroTag, setFiltroTag] = useState('TODAS');
    const [tagsDisponiveis, setTagsDisponiveis] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        titulo: '',
        resumo: '',
        conteudo: '',
        imagem: '',
        tag: 'ATUALIZAÇÃO'
    });

    const carregarNoticias = async () => {
        try {
            const res = await fetch('/api/noticias');
            if (res.ok) {
                const data = await res.json();
                setNoticias(data);
                
                // Extrair tags únicas para o filtro
                if (Array.isArray(data)) {
                    const tags = Array.from(new Set(data.map((n: Noticia) => n.tag.toUpperCase()))) as string[];
                    setTagsDisponiveis(tags);
                }
            } else if (res.status === 403 || res.status === 401) {
                alert('Acesso negado. Redirecionando...');
                router.push('/');
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
        // PROTEÇÃO CONTRA CLONAGEM: Verifica explicitamente se é diferente de nulo
        const method = editingId !== null ? 'PUT' : 'POST';
        const body = editingId !== null ? { id: editingId, ...formData } : formData;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                alert(editingId !== null ? 'Notícia atualizada com sucesso!' : 'Notícia publicada com sucesso!');
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

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteClick = async (id: string) => {
        // PROTEÇÃO CONTRA DELEÇÃO FANTASMA
        if (id === '') {
            alert('⚠️ Esta notícia está com o ID corrompido (vazio) no banco de dados.\nPor favor, apague-a manualmente usando o Prisma Studio.');
            return;
        }

        if (!confirm('Tem certeza que deseja excluir permanentemente esta notícia?')) return;

        try {
            const res = await fetch(`/api/noticias?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                alert('Notícia removida com sucesso!');
                carregarNoticias();
                router.refresh();
            } else {
                const data = await res.json();
                alert(data.error || 'Erro ao deletar notícia.');
            }
        } catch (error) {
            alert('Erro de conexão ao deletar.');
        }
    };

    const limparFormulario = () => {
        setEditingId(null);
        setFormData({
            titulo: '',
            resumo: '',
            conteudo: '',
            imagem: '',
            tag: 'ATUALIZAÇÃO'
        });
    };

    const formatarData = (isoString: string) => {
        if (!isoString) return '';
        const data = new Date(isoString);
        return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
            .replace(/ de /g, ' ')
            .replace('.', '')
            .toUpperCase();
    };

    // Aplicação dos Filtros
    const noticiasFiltradas = noticias.filter(n => {
        const matchesBusca = n.titulo.toLowerCase().includes(busca.toLowerCase()) || 
                             n.resumo.toLowerCase().includes(busca.toLowerCase());
        const matchesTag = filtroTag === 'TODAS' || n.tag.toUpperCase() === filtroTag;
        return matchesBusca && matchesTag;
    });

    return (
        <main className="min-h-screen bg-background pt-32 pb-20 px-6 relative overflow-hidden">
            {/* Brilho decorativo no fundo */}
            <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                
                {/* Header da Página */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-white/10 pb-6">
                    <div>
                        <span className="text-primary font-bold text-[11px] tracking-widest uppercase mb-2 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">settings</span>
                            Painel de Controle
                        </span>
                        <h1 className="text-white font-black text-4xl uppercase tracking-tight">
                            Gerenciar <span className="text-primary">Notícias</span>
                        </h1>
                    </div>
                    <Link href="/" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2.5 rounded-xl font-bold uppercase text-xs tracking-widest transition-all">
                        Ver Mural no Site <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    
                    {/* COLUNA ESQUERDA: Formulário de Publicação/Edição */}
                    <div className="lg:col-span-5 h-fit">
                        <div className={`bg-[#121316] border rounded-[2rem] p-6 md:p-8 relative overflow-hidden shadow-2xl transition-all duration-500 ${editingId !== null ? 'border-primary/50 shadow-[0_0_30px_rgba(140,218,112,0.1)]' : 'border-white/5'}`}>
                            
                            {/* Brilho interno do card */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] pointer-events-none"></div>

                            <div className="flex justify-between items-center mb-6 relative z-10">
                                <h2 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-2">
                                    {editingId !== null ? (
                                        <><span className="material-symbols-outlined text-primary">edit_document</span> Editando Matéria</>
                                    ) : (
                                        <><span className="material-symbols-outlined text-primary">post_add</span> Nova Publicação</>
                                    )}
                                </h2>
                                {editingId !== null && (
                                    <button type="button" onClick={limparFormulario} className="text-xs font-bold text-red-400 bg-red-400/10 px-3 py-1.5 rounded-lg hover:bg-red-400/20 transition-all uppercase tracking-widest">
                                        Cancelar
                                    </button>
                                )}
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                                <div>
                                    <label className="block text-[11px] font-bold tracking-widest text-gray-400 mb-1.5 uppercase">Título da Matéria</label>
                                    <input 
                                        required 
                                        type="text" 
                                        value={formData.titulo}
                                        onChange={e => setFormData({...formData, titulo: e.target.value})}
                                        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-bold"
                                        placeholder="Ex: Nova Temporada Começou!"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[11px] font-bold tracking-widest text-gray-400 mb-1.5 uppercase">Tag / Categoria</label>
                                        <input 
                                            required 
                                            type="text" 
                                            list="tags-list"
                                            value={formData.tag}
                                            onChange={e => setFormData({...formData, tag: e.target.value.toUpperCase()})}
                                            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all uppercase"
                                            placeholder="Ex: ATUALIZAÇÃO"
                                        />
                                        <datalist id="tags-list">
                                            <option value="ATUALIZAÇÃO" />
                                            <option value="COMUNICADO" />
                                            <option value="EVENTO" />
                                            <option value="MANUTENÇÃO" />
                                        </datalist>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold tracking-widest text-gray-400 mb-1.5 uppercase">URL da Imagem (Capa)</label>
                                        <input 
                                            type="url" 
                                            value={formData.imagem}
                                            onChange={e => setFormData({...formData, imagem: e.target.value})}
                                            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold tracking-widest text-gray-400 mb-1.5 uppercase">Resumo Curto (Aparece na lateral)</label>
                                    <textarea 
                                        required
                                        maxLength={150}
                                        value={formData.resumo}
                                        onChange={e => setFormData({...formData, resumo: e.target.value})}
                                        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all h-20 resize-none"
                                        placeholder="Breve descrição para atrair a atenção do leitor..."
                                    />
                                    <p className="text-right text-[10px] text-gray-500 mt-1">{formData.resumo.length}/150</p>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold tracking-widest text-gray-400 mb-1.5 uppercase">Conteúdo Completo da Matéria</label>
                                    <textarea 
                                        required
                                        value={formData.conteudo}
                                        onChange={e => setFormData({...formData, conteudo: e.target.value})}
                                        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-gray-300 outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all h-40 resize-none"
                                        placeholder="Escreva a notícia completa aqui..."
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isLoadingForm}
                                    className="w-full bg-primary text-[#0A1A08] font-black py-4 rounded-xl mt-2 hover:bg-white hover:shadow-[0_0_20px_rgba(140,218,112,0.4)] transition-all disabled:opacity-50 disabled:hover:shadow-none text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                                >
                                    {isLoadingForm ? (
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    ) : editingId !== null ? (
                                        <><span className="material-symbols-outlined">save</span> Atualizar Publicação</>
                                    ) : (
                                        <><span className="material-symbols-outlined">send</span> Publicar Notícia</>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* COLUNA DIREITA: Lista de Notícias e Filtros */}
                    <div className="lg:col-span-7 flex flex-col h-full">
                        
                        {/* Barra de Filtros */}
                        <div className="bg-surface-container-low border border-white/5 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-3 shadow-lg">
                            <div className="relative flex-grow">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">search</span>
                                <input 
                                    type="text" 
                                    placeholder="Buscar por título ou resumo..."
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                    className="w-full bg-black/40 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-primary outline-none transition-all"
                                />
                            </div>
                            
                            <div className="flex gap-3 sm:w-auto w-full">
                                <select 
                                    value={filtroTag}
                                    onChange={(e) => setFiltroTag(e.target.value)}
                                    className="bg-black/40 border border-white/5 rounded-xl px-3 py-2.5 text-sm text-gray-300 focus:border-primary outline-none transition-all flex-1 sm:w-48 appearance-none cursor-pointer uppercase"
                                >
                                    <option value="TODAS">Todas as Tags</option>
                                    {tagsDisponiveis.map(tag => (
                                        <option key={tag} value={tag}>{tag}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Tabela/Lista de Notícias */}
                        <div className="bg-surface-container-low border border-white/5 rounded-[2rem] p-2 sm:p-6 flex-grow flex flex-col">
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 px-4 sm:px-0">
                                Arquivo de Publicações ({noticiasFiltradas.length})
                            </h2>

                            {isLoadingNoticias ? (
                                <div className="flex justify-center items-center flex-grow py-20">
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-[0_0_15px_rgba(140,218,112,0.5)]" />
                                </div>
                            ) : noticiasFiltradas.length === 0 ? (
                                <div className="flex flex-col justify-center items-center flex-grow py-20 text-center">
                                    <span className="material-symbols-outlined text-6xl text-white/10 mb-4">search_off</span>
                                    <p className="text-gray-400 text-sm font-medium">Nenhuma publicação encontrada com os filtros atuais.</p>
                                    {(busca !== '' || filtroTag !== 'TODAS') && (
                                        <button 
                                            onClick={() => { setBusca(''); setFiltroTag('TODAS'); }}
                                            className="mt-4 text-xs font-bold text-primary uppercase tracking-widest hover:underline"
                                        >
                                            Limpar Filtros
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-3 overflow-y-auto max-h-[700px] pr-2 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                    {noticiasFiltradas.map(n => (
                                        <div key={n.id || Math.random().toString()} className={`group flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-2xl transition-all duration-300 border ${n.id === '' ? 'bg-red-500/5 border-red-500/20' : 'bg-[#121316] border-white/5 hover:border-white/10 hover:bg-[#1a1b1f]'}`}>
                                            
                                            <div className="flex items-start gap-4 mb-4 sm:mb-0 w-full sm:w-[75%]">
                                                {/* Mini Thumbnail */}
                                                <div className="w-16 h-12 rounded-lg bg-surface-container-high border border-white/5 shrink-0 flex items-center justify-center overflow-hidden">
                                                    {n.imagem ? (
                                                        <img src={n.imagem} alt="Thumb" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="material-symbols-outlined text-white/20 text-xl">image</span>
                                                    )}
                                                </div>
                                                
                                                <div className="flex flex-col flex-grow min-w-0">
                                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                        <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
                                                            {formatarData(n.createdAt)}
                                                        </span>
                                                        <span className="text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
                                                            {n.tag}
                                                        </span>
                                                        {n.id === '' && (
                                                            <span className="text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest bg-red-500 text-white animate-pulse">
                                                                ID CORROMPIDO
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="font-bold text-white text-base leading-tight truncate w-full">{n.titulo}</h3>
                                                    <p className="text-gray-500 text-xs mt-1 line-clamp-1 break-all w-full">{n.resumo}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:justify-start pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5 shrink-0">
                                                <button 
                                                    onClick={() => handleEditClick(n)}
                                                    className="flex-1 sm:flex-none p-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all flex justify-center items-center"
                                                    title="Editar Matéria"
                                                >
                                                    <span className="material-symbols-outlined text-sm">edit</span>
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteClick(n.id)}
                                                    className="flex-1 sm:flex-none p-2.5 rounded-xl bg-red-500/5 border border-red-500/10 text-red-400 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all flex justify-center items-center"
                                                    title="Excluir Permanentemente"
                                                >
                                                    <span className="material-symbols-outlined text-sm">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
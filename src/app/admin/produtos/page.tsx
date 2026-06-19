'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Produto = {
    id: string;
    nome: string;
    descricao: string | null;
    preco: number;
    desconto: number;
    categoria: string;
    servidor: string;
    comandos: string[];
    imagem: string | null;
    ativo: boolean;
    ordem: number; // NOVO CAMPO
};

export default function AdminProdutos() {
    const router = useRouter();
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [isLoadingProdutos, setIsLoadingProdutos] = useState(true);
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [busca, setBusca] = useState('');
    const [filtroServidor, setFiltroServidor] = useState('TODOS');
    const [filtroCategoria, setFiltroCategoria] = useState('TODOS');

    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        desconto: 0,
        categoria: 'VIP',
        servidor: 'SURVIVAL',
        comandos: '',
        imagem: '',
        ativo: true
    });

    const carregarProdutos = async () => {
        try {
            const res = await fetch('/api/produtos');
            if (res.ok) {
                const data = await res.json();
                // Garante que exista ordem visual mesmo em produtos antigos
                const dataComOrdem = data.map((p: any, index: number) => ({
                    ...p,
                    ordem: p.ordem ?? index
                }));
                setProdutos(dataComOrdem);
            } else if (res.status === 403 || res.status === 401) {
                alert('Acesso negado. Redirecionando...');
                router.push('/');
            }
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        } finally {
            setIsLoadingProdutos(false);
        }
    };

    useEffect(() => {
        carregarProdutos();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoadingForm(true);

        const url = '/api/produtos';
        const method = editingId !== null ? 'PUT' : 'POST';
        const body = editingId !== null ? { id: editingId, ...formData } : formData;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                alert(editingId !== null ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!');
                limparFormulario();
                carregarProdutos();
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

    const handleEditClick = (produto: Produto) => {
        setEditingId(produto.id);
        setFormData({
            nome: produto.nome,
            descricao: produto.descricao || '',
            preco: produto.preco.toString(),
            desconto: produto.desconto || 0,
            categoria: produto.categoria,
            servidor: produto.servidor,
            comandos: Array.isArray(produto.comandos) ? produto.comandos.join(', ') : '',
            imagem: produto.imagem || '',
            ativo: Boolean(produto.ativo)
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteClick = async (id: string) => {
        if (id === '') {
            alert('⚠️ Este produto está com o ID vazio no banco de dados. Apague-o pelo Prisma Studio.');
            return;
        }
        if (!confirm('Tem certeza que deseja excluir permanentemente este produto?')) return;

        try {
            const res = await fetch(`/api/produtos?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                carregarProdutos();
                router.refresh();
            } else {
                const data = await res.json();
                alert(data.error || 'Erro ao deletar produto.');
            }
        } catch (error) {
            alert('Erro de conexão ao deletar.');
        }
    };

    const limparFormulario = () => {
        setEditingId(null);
        setFormData({
            nome: '', descricao: '', preco: '', desconto: 0,
            categoria: 'VIP', servidor: 'SURVIVAL', comandos: '', imagem: '', ativo: true
        });
    };

    const produtosFiltrados = produtos.filter(p => {
        const matchesBusca = p.nome.toLowerCase().includes(busca.toLowerCase()) || 
                             (p.descricao?.toLowerCase().includes(busca.toLowerCase()));
        const matchesServidor = filtroServidor === 'TODOS' || p.servidor === filtroServidor;
        const matchesCategoria = filtroCategoria === 'TODOS' || p.categoria === filtroCategoria;
        
        return matchesBusca && matchesServidor && matchesCategoria;
    });

    // ==========================================
    // LÓGICA DE REORDENAÇÃO ARRASTAR E SOLTAR
    // ==========================================
    const moverProduto = async (index: number, direcao: 'up' | 'down') => {
        if (direcao === 'up' && index === 0) return;
        if (direcao === 'down' && index === produtosFiltrados.length - 1) return;

        // Copia a lista filtrada
        const novosProdutos = [...produtosFiltrados];
        const targetIndex = direcao === 'up' ? index - 1 : index + 1;

        // Troca visualmente
        const temp = novosProdutos[index];
        novosProdutos[index] = novosProdutos[targetIndex];
        novosProdutos[targetIndex] = temp;

        // Recalcula a ordem
        const itensParaAtualizar = novosProdutos.map((p, i) => ({
            id: p.id,
            ordem: i
        }));

        // Atualiza a UI imediatamente para não ter delay
        const produtosAtualizados = produtos.map(p => {
            const updated = itensParaAtualizar.find(u => u.id === p.id);
            return updated ? { ...p, ordem: updated.ordem } : p;
        }).sort((a, b) => (a.ordem || 0) - (b.ordem || 0));

        setProdutos(produtosAtualizados);

        // Salva silenciosamente no banco
        try {
            await fetch('/api/produtos', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itensReordenados: itensParaAtualizar })
            });
        } catch (error) {
            console.error("Erro ao reordenar:", error);
        }
    };

    return (
        <main className="min-h-screen bg-background pt-32 pb-20 px-6 relative overflow-hidden">
            <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-white/10 pb-6">
                    <div>
                        <span className="text-primary font-bold text-[11px] tracking-widest uppercase mb-2 flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">settings</span>
                            Painel de Controle
                        </span>
                        <h1 className="text-white font-black text-4xl uppercase tracking-tight">
                            Gerenciar <span className="text-primary">Produtos</span>
                        </h1>
                    </div>
                    <Link href="/loja" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2.5 rounded-xl font-bold uppercase text-xs tracking-widest transition-all">
                        Ir para a Loja <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    
                    <div className="lg:col-span-5 h-fit">
                        <div className={`bg-[#121316] border rounded-[2rem] p-6 md:p-8 relative overflow-hidden shadow-2xl transition-all duration-500 ${editingId !== null ? 'border-primary/50 shadow-[0_0_30px_rgba(140,218,112,0.1)]' : 'border-white/5'}`}>
                            
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] pointer-events-none"></div>

                            <div className="flex justify-between items-center mb-6 relative z-10">
                                <h2 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-2">
                                    {editingId !== null ? (
                                        <><span className="material-symbols-outlined text-primary">edit_square</span> Editando</>
                                    ) : (
                                        <><span className="material-symbols-outlined text-primary">add_box</span> Novo Pacote</>
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
                                    <label className="block text-[11px] font-bold tracking-widest text-gray-400 mb-1.5 uppercase">Nome do Pacote</label>
                                    <input required type="text" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" placeholder="Ex: VIP Campeão" />
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold tracking-widest text-gray-400 mb-1.5 uppercase">Benefícios (Separe por vírgula)</label>
                                    <textarea value={formData.descricao} onChange={e => setFormData({...formData, descricao: e.target.value})} className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all h-24 resize-none" placeholder="Voar no lobby, Kit Semanal, Tag Exclusiva..." />
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[11px] font-bold tracking-widest text-gray-400 mb-1.5 uppercase">Preço Inicial (R$)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">R$</span>
                                            <input required type="number" step="0.01" min="0" value={formData.preco} onChange={e => setFormData({...formData, preco: e.target.value})} className="w-full rounded-xl border border-white/10 bg-black/40 pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" placeholder="0.00" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold tracking-widest text-primary mb-1.5 uppercase">Desconto (%)</label>
                                        <div className="relative">
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary font-bold text-sm">%</span>
                                            <input type="number" min="0" max="100" value={formData.desconto} onChange={e => setFormData({...formData, desconto: parseInt(e.target.value) || 0})} className="w-full rounded-xl border border-primary/30 bg-primary/5 pl-4 pr-10 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" placeholder="0" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-5">
                                    <div>
                                        <label className="block text-[11px] font-bold tracking-widest text-gray-400 mb-1.5 uppercase">URL da Imagem</label>
                                        <input type="url" value={formData.imagem} onChange={e => setFormData({...formData, imagem: e.target.value})} className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all" placeholder="https://..." />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[11px] font-bold tracking-widest text-gray-400 mb-1.5 uppercase">Categoria</label>
                                        <select value={formData.categoria} onChange={e => setFormData({...formData, categoria: e.target.value})} className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all appearance-none">
                                            <option value="VIP">VIP</option>
                                            <option value="CASH">CASH</option>
                                            <option value="KEYS">KEYS</option>
                                            <option value="UNBAN">UNBAN</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold tracking-widest text-gray-400 mb-1.5 uppercase">Servidor</label>
                                        <select value={formData.servidor} onChange={e => setFormData({...formData, servidor: e.target.value})} className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all appearance-none">
                                            <option value="SURVIVAL">SURVIVAL</option>
                                            <option value="SKYBLOCK">SKYBLOCK</option>
                                            <option value="GLOBAL">GLOBAL</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold tracking-widest text-gray-400 mb-1.5 uppercase flex items-center justify-between">
                                        Comandos in-game
                                        <span className="text-gray-600 lowercase text-[9px]">(Use {`{player}`} para o nick)</span>
                                    </label>
                                    <input required type="text" value={formData.comandos} onChange={e => setFormData({...formData, comandos: e.target.value})} className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-primary font-mono outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600" placeholder="lp user {player} parent add vip, give {player} diamond 1" />
                                </div>

                                <div className="flex items-center gap-3 pt-3 pb-2 border-t border-white/5">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={formData.ativo} onChange={e => setFormData({...formData, ativo: e.target.checked})} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 peer-checked:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                    <span className="text-xs font-bold text-white uppercase tracking-widest select-none cursor-pointer" onClick={() => setFormData({...formData, ativo: !formData.ativo})}>
                                        Produto visível na loja
                                    </span>
                                </div>

                                <button type="submit" disabled={isLoadingForm} className="w-full bg-primary text-[#0A1A08] font-black py-4 rounded-xl mt-2 hover:bg-white hover:shadow-[0_0_20px_rgba(140,218,112,0.4)] transition-all disabled:opacity-50 disabled:hover:shadow-none text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                                    {isLoadingForm ? (
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    ) : editingId !== null ? (
                                        <><span className="material-symbols-outlined">save</span> Atualizar Produto</>
                                    ) : (
                                        <><span className="material-symbols-outlined">add_circle</span> Criar Produto</>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-7 flex flex-col h-full">
                        <div className="bg-surface-container-low border border-white/5 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-3 shadow-lg">
                            <div className="relative flex-grow">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">search</span>
                                <input 
                                    type="text" 
                                    placeholder="Buscar por nome ou descrição..."
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                    className="w-full bg-black/40 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-primary outline-none transition-all"
                                />
                            </div>
                            
                            <div className="flex gap-3 sm:w-auto w-full">
                                <select value={filtroServidor} onChange={(e) => setFiltroServidor(e.target.value)} className="bg-black/40 border border-white/5 rounded-xl px-3 py-2.5 text-sm text-gray-300 focus:border-primary outline-none transition-all flex-1 sm:w-36 appearance-none cursor-pointer">
                                    <option value="TODOS">Todos Servidores</option>
                                    <option value="SURVIVAL">Survival</option>
                                    <option value="SKYBLOCK">Skyblock</option>
                                    <option value="GLOBAL">Global</option>
                                </select>

                                <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} className="bg-black/40 border border-white/5 rounded-xl px-3 py-2.5 text-sm text-gray-300 focus:border-primary outline-none transition-all flex-1 sm:w-36 appearance-none cursor-pointer">
                                    <option value="TODOS">Todas Categorias</option>
                                    <option value="VIP">VIP</option>
                                    <option value="CASH">CASH</option>
                                    <option value="KEYS">KEYS</option>
                                    <option value="UNBAN">UNBAN</option>
                                </select>
                            </div>
                        </div>

                        <div className="bg-surface-container-low border border-white/5 rounded-[2rem] p-2 sm:p-6 flex-grow flex flex-col">
                            <div className="flex justify-between items-center mb-4 px-4 sm:px-0">
                                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                                    Inventário ({produtosFiltrados.length})
                                </h2>
                                {busca === '' && (
                                    <span className="text-[10px] text-gray-500 font-medium hidden sm:block">Use as setas para mudar a ordem na loja</span>
                                )}
                            </div>

                            {isLoadingProdutos ? (
                                <div className="flex justify-center items-center flex-grow py-20">
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-[0_0_15px_rgba(140,218,112,0.5)]" />
                                </div>
                            ) : produtosFiltrados.length === 0 ? (
                                <div className="flex flex-col justify-center items-center flex-grow py-20 text-center">
                                    <span className="material-symbols-outlined text-6xl text-white/10 mb-4">search_off</span>
                                    <p className="text-gray-400 text-sm font-medium">Nenhum produto encontrado com os filtros atuais.</p>
                                    {(busca !== '' || filtroServidor !== 'TODOS' || filtroCategoria !== 'TODOS') && (
                                        <button onClick={() => { setBusca(''); setFiltroServidor('TODOS'); setFiltroCategoria('TODOS'); }} className="mt-4 text-xs font-bold text-primary uppercase tracking-widest hover:underline">
                                            Limpar Filtros
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                    {produtosFiltrados.map((p, index) => (
                                        <div key={p.id || Math.random().toString()} className={`group flex flex-col sm:flex-row p-4 rounded-2xl transition-all duration-300 border ${p.id === '' ? 'bg-red-500/5 border-red-500/20' : 'bg-[#121316] border-white/5 hover:border-white/10 hover:bg-[#1a1b1f]'}`}>
                                            
                                            {/* CONTROLE DE ORDEM (SETAS) */}
                                            <div className="flex sm:flex-col gap-2 sm:gap-1 items-center justify-center sm:pr-4 sm:border-r border-white/5 sm:mr-4 mb-4 sm:mb-0 shrink-0">
                                                <button 
                                                    onClick={() => moverProduto(index, 'up')}
                                                    disabled={index === 0 || busca !== ''} 
                                                    className="w-10 h-8 sm:w-8 sm:h-6 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 transition-all"
                                                    title={busca !== '' ? "Limpe a busca para reordenar" : "Mover para Cima"}
                                                >
                                                    <span className="material-symbols-outlined text-2xl sm:text-xl leading-none">arrow_drop_up</span>
                                                </button>
                                                <button 
                                                    onClick={() => moverProduto(index, 'down')}
                                                    disabled={index === produtosFiltrados.length - 1 || busca !== ''}
                                                    className="w-10 h-8 sm:w-8 sm:h-6 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white disabled:opacity-20 transition-all"
                                                    title={busca !== '' ? "Limpe a busca para reordenar" : "Mover para Baixo"}
                                                >
                                                    <span className="material-symbols-outlined text-2xl sm:text-xl leading-none">arrow_drop_down</span>
                                                </button>
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-4">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-surface-container-high border border-white/5 shrink-0 flex items-center justify-center overflow-hidden">
                                                        {p.imagem ? (
                                                            <img src={p.imagem} alt="Thumb" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span className="material-symbols-outlined text-white/20 text-2xl">deployed_code</span>
                                                        )}
                                                    </div>
                                                    
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                            <h3 className="font-bold text-white text-base leading-none">{p.nome}</h3>
                                                            <span className={`text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest ${p.ativo ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'}`}>
                                                                {p.ativo ? 'Visível' : 'Oculto'}
                                                            </span>
                                                            {p.desconto > 0 && (
                                                                <span className="text-[9px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest bg-primary text-[#0A1A08]">
                                                                    -{p.desconto}% OFF
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mt-1.5 flex-wrap">
                                                            <span className="bg-white/5 px-2 py-0.5 rounded text-gray-300">{p.servidor}</span>
                                                            <span className="bg-white/5 px-2 py-0.5 rounded text-gray-300">{p.categoria}</span>
                                                            {p.desconto > 0 ? (
                                                                <div className="flex items-center gap-1.5">
                                                                    <span className="line-through opacity-50">R$ {p.preco.toFixed(2).replace('.', ',')}</span>
                                                                    <span className="text-white font-bold tracking-wide">R$ {(p.preco * (1 - p.desconto / 100)).toFixed(2).replace('.', ',')}</span>
                                                                </div>
                                                            ) : (
                                                                <span className="text-white font-bold tracking-wide">R$ {p.preco.toFixed(2).replace('.', ',')}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:justify-start pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5 shrink-0">
                                                    <button onClick={() => handleEditClick(p)} className="flex-1 sm:flex-none p-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all flex justify-center items-center" title="Editar">
                                                        <span className="material-symbols-outlined text-sm">edit</span>
                                                    </button>
                                                    <button onClick={() => handleDeleteClick(p.id)} className="flex-1 sm:flex-none p-2.5 rounded-xl bg-red-500/5 border border-red-500/10 text-red-400 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all flex justify-center items-center" title="Excluir Permanentemente">
                                                        <span className="material-symbols-outlined text-sm">delete</span>
                                                    </button>
                                                </div>
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
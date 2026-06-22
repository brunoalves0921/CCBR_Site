'use client';

import { useState, useEffect } from 'react';

type Regra = {
    id: string;
    titulo: string;
    descricao: string;
    categoria: string;
    nivelPunicao: string;
    ordem: number;
};

const CATEGORIAS_PRE_DEFINIDAS = [
    'Gerais', 'Chat e Comunicação', 'Hacks e Cheats', 
    'Construções e Terrenos', 'Economia e Mercado', 'Contas e Segurança'
];

const NIVEIS_PUNICAO = ['Advertência', 'Suspensão', 'Permanente'];

export default function AdminRegras() {
    const [regras, setRegras] = useState<Regra[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Estados do Formulário
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState(CATEGORIAS_PRE_DEFINIDAS[0]);
    const [nivelPunicao, setNivelPunicao] = useState(NIVEIS_PUNICAO[0]);
    const [ordem, setOrdem] = useState(1);

    // Estados dos Filtros
    const [busca, setBusca] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('Todas');
    const [filtroPunicao, setFiltroPunicao] = useState('Todos');

    const fetchRegras = () => {
        setIsLoading(true);
        fetch('/api/regras')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setRegras(data);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    };

    useEffect(() => { fetchRegras(); }, []);

    const resetForm = () => {
        setEditingId(null);
        setTitulo('');
        setDescricao('');
        setCategoria(CATEGORIAS_PRE_DEFINIDAS[0]);
        setNivelPunicao(NIVEIS_PUNICAO[0]);
        setOrdem(prev => prev + 1);
    };

    const handleEditClick = (regra: Regra) => {
        setEditingId(regra.id);
        setTitulo(regra.titulo);
        setDescricao(regra.descricao);
        setCategoria(regra.categoria);
        setNivelPunicao(regra.nivelPunicao);
        setOrdem(regra.ordem);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const url = editingId ? `/api/regras/${editingId}` : '/api/regras';
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ titulo, descricao, categoria, ordem, nivelPunicao })
            });

            if (res.ok) {
                alert(editingId ? 'Regra atualizada com sucesso!' : 'Regra criada com sucesso!');
                resetForm();
                fetchRegras();
            } else {
                alert('Erro ao salvar regra.');
            }
        } catch (error) {
            alert('Erro de conexão.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Tem certeza que deseja apagar esta regra?')) return;
        try {
            const res = await fetch(`/api/regras/${id}`, { method: 'DELETE' });
            if (res.ok) {
                if (editingId === id) resetForm();
                fetchRegras();
            } else alert('Erro ao deletar regra.');
        } catch (error) { alert('Erro de conexão.'); }
    };

    const getColorClass = (nivel: string) => {
        if (nivel === 'Permanente') return 'text-red-500 bg-red-500/10 border-red-500/20';
        if (nivel === 'Suspensão') return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    };

    // LÓGICA DOS FILTROS
    const regrasFiltradas = regras.filter(regra => {
        const matchesBusca = regra.titulo.toLowerCase().includes(busca.toLowerCase()) || regra.descricao.toLowerCase().includes(busca.toLowerCase());
        const matchesCategoria = filtroCategoria === 'Todas' || regra.categoria === filtroCategoria;
        const matchesPunicao = filtroPunicao === 'Todos' || regra.nivelPunicao === filtroPunicao;
        return matchesBusca && matchesCategoria && matchesPunicao;
    });

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <header className="mb-10">
                <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Gerenciar Regras</h1>
                <p className="text-gray-400">Adicione, edite ou remova as regras que aparecem no site público.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* FORMULÁRIO */}
                <div className="lg:col-span-5">
                    <div className={`bg-[#121316] border p-6 rounded-2xl sticky top-8 transition-colors ${editingId ? 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'border-white/10'}`}>
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className={`material-symbols-outlined ${editingId ? 'text-blue-400' : 'text-primary'}`}>
                                {editingId ? 'edit_note' : 'add_circle'}
                            </span> 
                            {editingId ? 'Editar Regra' : 'Nova Regra'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Título da Regra</label>
                                <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" required />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Categoria</label>
                                    <div className="relative">
                                        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none appearance-none" required>
                                            {CATEGORIAS_PRE_DEFINIDAS.map(cat => <option key={cat} value={cat} className="bg-[#121316]">{cat}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ordem</label>
                                    <input type="number" value={ordem} onChange={(e) => setOrdem(Number(e.target.value))} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none" min="1" required />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nível de Punição</label>
                                <div className="relative">
                                    <select value={nivelPunicao} onChange={(e) => setNivelPunicao(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none appearance-none" required>
                                        {NIVEIS_PUNICAO.map(nivel => <option key={nivel} value={nivel} className="bg-[#121316]">{nivel}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Descrição Completa</label>
                                <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none resize-none" required></textarea>
                            </div>

                            <div className="flex gap-3 pt-2">
                                {editingId && (
                                    <button type="button" onClick={resetForm} className="w-1/3 py-4 bg-white/5 text-white font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 transition-colors text-xs">
                                        Cancelar
                                    </button>
                                )}
                                <button type="submit" disabled={isSubmitting} className={`flex-1 py-4 font-black uppercase tracking-widest rounded-xl transition-colors disabled:opacity-50 text-xs ${editingId ? 'bg-blue-500 text-white hover:bg-blue-400' : 'bg-primary text-[#0A1A08] hover:bg-white'}`}>
                                    {isSubmitting ? 'Salvando...' : (editingId ? 'Salvar Alterações' : 'Cadastrar Regra')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* LISTAGEM COM FILTROS */}
                <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-gray-400">list_alt</span> Regras ({regrasFiltradas.length})
                        </h2>
                    </div>

                    {/* BARRA DE FERRAMENTAS (FILTROS) */}
                    <div className="bg-[#121316] border border-white/10 p-4 rounded-xl flex flex-col md:flex-row gap-3">
                        <div className="flex-1">
                            <input 
                                type="text" 
                                placeholder="Buscar por título ou descrição..." 
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                className="w-full bg-black/50 border border-white/5 rounded-lg px-3 py-2.5 text-sm text-white focus:border-primary outline-none"
                            />
                        </div>
                        <div className="w-full md:w-40">
                            <select 
                                value={filtroCategoria} 
                                onChange={(e) => setFiltroCategoria(e.target.value)} 
                                className="w-full bg-black/50 border border-white/5 rounded-lg px-3 py-2.5 text-sm text-gray-300 outline-none appearance-none"
                            >
                                <option value="Todas" className="bg-[#121316]">Todas as Categorias</option>
                                {CATEGORIAS_PRE_DEFINIDAS.map(cat => <option key={cat} value={cat} className="bg-[#121316]">{cat}</option>)}
                            </select>
                        </div>
                        <div className="w-full md:w-36">
                            <select 
                                value={filtroPunicao} 
                                onChange={(e) => setFiltroPunicao(e.target.value)} 
                                className="w-full bg-black/50 border border-white/5 rounded-lg px-3 py-2.5 text-sm text-gray-300 outline-none appearance-none"
                            >
                                <option value="Todos" className="bg-[#121316]">Todas Punições</option>
                                {NIVEIS_PUNICAO.map(pun => <option key={pun} value={pun} className="bg-[#121316]">{pun}</option>)}
                            </select>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-10 text-gray-500">Carregando...</div>
                    ) : regrasFiltradas.length === 0 ? (
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
                            <p className="text-gray-400">Nenhuma regra encontrada com esses filtros.</p>
                            <button onClick={() => {setBusca(''); setFiltroCategoria('Todas'); setFiltroPunicao('Todos');}} className="mt-3 text-primary text-sm font-bold">Limpar Filtros</button>
                        </div>
                    ) : (
                        regrasFiltradas.map((regra) => (
                            <div key={regra.id} className={`bg-white/[0.02] border rounded-2xl p-5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center transition-colors ${editingId === regra.id ? 'border-blue-500/50 bg-blue-500/5' : 'border-white/10 hover:border-white/20'}`}>
                                <div>
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <span className="px-2 py-0.5 bg-white/10 text-gray-300 rounded text-[10px] font-bold uppercase tracking-wider">#{regra.ordem} {regra.categoria}</span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getColorClass(regra.nivelPunicao)}`}>
                                            {regra.nivelPunicao}
                                        </span>
                                    </div>
                                    <h3 className="text-white font-bold text-lg">{regra.titulo}</h3>
                                    <p className="text-gray-400 text-sm line-clamp-2 mt-1">{regra.descricao}</p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button onClick={() => handleEditClick(regra)} className="p-3 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-xl transition-colors border border-blue-500/20 hover:border-blue-500" title="Editar Regra">
                                        <span className="material-symbols-outlined text-lg block">edit</span>
                                    </button>
                                    <button onClick={() => handleDelete(regra.id)} className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-colors border border-red-500/20 hover:border-red-500" title="Deletar Regra">
                                        <span className="material-symbols-outlined text-lg block">delete</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
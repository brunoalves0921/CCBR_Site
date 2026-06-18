'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Produto = {
    id: string;
    nome: string;
    descricao: string | null;
    preco: number;
    categoria: string;
    servidor: string;
    comandos: string[];
    imagem: string | null;
    ativo: boolean;
};

export default function AdminProdutos() {
    const router = useRouter();
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [isLoadingProdutos, setIsLoadingProdutos] = useState(true);
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        categoria: 'VIP',
        servidor: 'SURVIVAL',
        comandos: '',
        imagem: '',
        ativo: true
    });

    const carregarProdutos = async () => {
        try {
            const res = await fetch('/api/admin/produtos');
            if (res.ok) {
                const data = await res.json();
                setProdutos(data);
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

        const url = '/api/admin/produtos';
        const method = editingId ? 'PUT' : 'POST';
        const body = editingId ? { id: editingId, ...formData } : formData;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                alert(editingId ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!');
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
            categoria: produto.categoria,
            servidor: produto.servidor,
            comandos: produto.comandos.join(', '),
            imagem: produto.imagem || '',
            ativo: produto.ativo
        });
    };

    const handleDeleteClick = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir permanentemente este produto?')) return;

        try {
            const res = await fetch(`/api/admin/produtos?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                alert('Produto removido com sucesso!');
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
            nome: '',
            descricao: '',
            preco: '',
            categoria: 'VIP',
            servidor: 'SURVIVAL',
            comandos: '',
            imagem: '',
            ativo: true
        });
    };

    return (
        <main className="min-h-screen bg-black pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Formulário de Cadastro/Edição */}
                <div className="lg:col-span-5 bg-surface-container-high border border-outline-variant rounded-2xl p-6 h-fit">
                    <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                        <h1 className="text-xl font-black text-white uppercase tracking-wider">
                            {editingId ? 'Editar Produto' : 'Novo Produto'}
                        </h1>
                        {editingId && (
                            <button onClick={limparFormulario} className="text-xs font-bold text-red-400 hover:underline">
                                Cancelar
                            </button>
                        )}
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-1">Nome do Pacote</label>
                            <input 
                                required 
                                type="text" 
                                value={formData.nome}
                                onChange={e => setFormData({...formData, nome: e.target.value})}
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-primary transition-colors"
                                placeholder="Ex: VIP Campeão"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-1">Descrição (Separe benefícios por vírgula)</label>
                            <textarea 
                                value={formData.descricao}
                                onChange={e => setFormData({...formData, descricao: e.target.value})}
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-primary transition-colors h-24 resize-none"
                                placeholder="Benefício 1, Benefício 2, Benefício 3..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1">Preço (R$)</label>
                                <input 
                                    required 
                                    type="number" 
                                    step="0.01"
                                    min="0"
                                    value={formData.preco}
                                    onChange={e => setFormData({...formData, preco: e.target.value})}
                                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-primary transition-colors"
                                    placeholder="15.00"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1">URL da Imagem</label>
                                <input 
                                    type="url" 
                                    value={formData.imagem}
                                    onChange={e => setFormData({...formData, imagem: e.target.value})}
                                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-primary transition-colors"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1">Categoria</label>
                                <select 
                                    value={formData.categoria}
                                    onChange={e => setFormData({...formData, categoria: e.target.value})}
                                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-primary transition-colors"
                                >
                                    <option value="VIP">VIP</option>
                                    <option value="CASH">CASH</option>
                                    <option value="KEYS">KEYS</option>
                                    <option value="UNBAN">UNBAN</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-300 mb-1">Servidor</label>
                                <select 
                                    value={formData.servidor}
                                    onChange={e => setFormData({...formData, servidor: e.target.value})}
                                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-white outline-none focus:border-primary transition-colors"
                                >
                                    <option value="SURVIVAL">SURVIVAL</option>
                                    <option value="SKYBLOCK">SKYBLOCK</option>
                                    <option value="GLOBAL">GLOBAL</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-1">Comandos de Entrega (Vírgula separa comandos)</label>
                            <input 
                                required 
                                type="text" 
                                value={formData.comandos}
                                onChange={e => setFormData({...formData, comandos: e.target.value})}
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-xs text-white font-mono outline-none focus:border-primary transition-colors"
                                placeholder="lp user {player} parent add vip"
                            />
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                            <input 
                                type="checkbox" 
                                id="ativo"
                                checked={formData.ativo}
                                onChange={e => setFormData({...formData, ativo: e.target.checked})}
                                className="rounded bg-black/30 border-white/10 text-primary focus:ring-0"
                            />
                            <label htmlFor="ativo" className="text-xs font-semibold text-gray-300 select-none cursor-pointer">Produto ativo e visível na loja</label>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoadingForm}
                            className="w-full bg-primary text-black font-black py-3 rounded-xl mt-4 hover:bg-white transition-colors disabled:opacity-50 text-sm uppercase tracking-wider"
                        >
                            {isLoadingForm ? 'Processando...' : editingId ? 'Atualizar Produto' : 'Salvar Produto'}
                        </button>
                    </form>
                </div>

                {/* Lista de Produtos Cadastrados */}
                <div className="lg:col-span-7 bg-surface-container-high border border-outline-variant rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                        <h2 className="text-xl font-black text-white uppercase tracking-wider">Produtos Existentes</h2>
                        <Link href="/loja" className="text-xs font-bold text-primary hover:underline">Ver Loja ↗</Link>
                    </div>

                    {isLoadingProdutos ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        </div>
                    ) : produtos.length === 0 ? (
                        <p className="text-gray-500 text-center py-10 text-sm">Nenhum produto cadastrado no banco.</p>
                    ) : (
                        <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2">
                            {produtos.map(p => (
                                <div key={p.id} className="flex justify-between items-center bg-black/40 border border-white/5 p-4 rounded-xl hover:border-white/10 transition-colors">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-white text-sm">{p.nome}</h3>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${p.ativo ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                                {p.ativo ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-0.5">{p.categoria} • {p.servidor} • R$ {p.preco.toFixed(2).replace('.', ',')}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => handleEditClick(p)}
                                            className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-primary hover:bg-white/10 transition-colors"
                                            title="Editar"
                                        >
                                            <span className="material-symbols-outlined text-sm">edit</span>
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteClick(p.id)}
                                            className="p-2 rounded-lg bg-red-500/5 text-red-400 hover:text-white hover:bg-red-500 transition-colors"
                                            title="Excluir"
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
        </main>
    );
}
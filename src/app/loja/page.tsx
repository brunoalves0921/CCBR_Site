'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Produto = {
    id: string;
    nome: string;
    descricao: string | null;
    preco: number;
    categoria: string;
    servidor: string;
    imagem: string | null;
    ativo: boolean; 
};

export default function Loja() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [servidores, setServidores] = useState<string[]>(['SURVIVAL']);
    const [servidorAtivo, setServidorAtivo] = useState<string>('SURVIVAL');
    const [categoriaAtiva, setCategoriaAtiva] = useState<string>('TODOS');
    const [isLoading, setIsLoading] = useState(true);
    const [isCheckoutLoading, setIsCheckoutLoading] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/produtos')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const produtosAtivos = data.filter((p: Produto) => p.ativo === true);
                    setProdutos(produtosAtivos);
                    
                    const listaServidores = Array.from(new Set(produtosAtivos.map((p: Produto) => p.servidor.toUpperCase()))) as string[];
                    if (!listaServidores.includes('SURVIVAL')) {
                        listaServidores.unshift('SURVIVAL');
                    }
                    setServidores(listaServidores);
                } else {
                    setProdutos([]);
                }
                
                setIsLoading(false);
            })
            .catch(() => {
                setProdutos([]);
                setIsLoading(false);
            });
    }, []);

    const handleComprar = async (produtoId: string) => {
        setIsCheckoutLoading(produtoId);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: [{ id: produtoId, grandfather: 1 }] })
            });

            const data = await res.json();

            if (res.ok && data.init_point) {
                window.open(data.init_point, '_blank');
                setIsCheckoutLoading(null);
            } else if (res.status === 401) {
                router.push('/login');
            } else {
                alert(data.error || 'Erro ao processar a compra.');
                setIsCheckoutLoading(null);
            }
        } catch (error) {
            alert('Erro de conexão com o servidor.');
            setIsCheckoutLoading(null);
        }
    };

    const produtosFiltrados = produtos.filter(p => {
        const matchesServidor = p.servidor.toUpperCase() === servidorAtivo.toUpperCase();
        const matchesCategoria = categoriaAtiva === 'TODOS' || p.categoria.toUpperCase() === categoriaAtiva.toUpperCase();
        return matchesServidor && matchesCategoria;
    });

    const renderSkeleton = () => (
        <div className="bg-surface-container-low/50 rounded-[2rem] border border-white/5 p-6 h-[420px] animate-pulse flex flex-col">
            <div className="w-full h-40 bg-white/5 rounded-xl mb-6"></div>
            <div className="h-4 w-1/3 bg-white/5 rounded mb-4"></div>
            <div className="h-8 w-3/4 bg-white/5 rounded mb-6"></div>
            <div className="space-y-3 flex-grow">
                <div className="h-3 w-full bg-white/5 rounded"></div>
                <div className="h-3 w-5/6 bg-white/5 rounded"></div>
                <div className="h-3 w-4/6 bg-white/5 rounded"></div>
            </div>
            <div className="h-12 w-full bg-white/5 rounded-xl mt-auto"></div>
        </div>
    );

    const renderProdutoCard = (produto: Produto) => {
        const beneficios = produto.descricao ? produto.descricao.split(',').map(b => b.trim()) : ['Ativação automática na hora'];

        return (
            <div key={produto.id} className="group relative bg-surface-container-low rounded-[2rem] border border-white/5 flex flex-col hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_20px_40px_rgba(140,218,112,0.15)] transition-all duration-500 overflow-hidden h-full">
                
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="p-1 flex flex-col h-full">
                    <div className="bg-black/40 rounded-[1.8rem] p-6 flex flex-col h-full relative z-10">
                        
                        <div className="w-full h-40 mb-6 rounded-xl overflow-hidden relative bg-surface-container-high border border-white/5 flex items-center justify-center shrink-0">
                            {produto.imagem ? (
                                <img src={produto.imagem} alt={produto.nome} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            ) : (
                                <span className="material-symbols-outlined text-6xl text-white/10 group-hover:scale-110 transition-transform duration-700">deployed_code</span>
                            )}
                            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full animate-pulse ${produto.categoria === 'VIP' ? 'bg-[#ffdb3c]' : 'bg-primary'}`}></span>
                                <span className="text-[10px] font-black text-white tracking-widest uppercase">{produto.categoria}</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="font-display-lg text-2xl md:text-3xl text-white font-black mb-2 leading-tight">
                                {produto.nome}
                            </h2>
                            <div className="flex items-baseline gap-1">
                                <span className="text-sm text-primary font-bold">R$</span>
                                <span className="text-3xl text-primary font-black tracking-tighter">
                                    {produto.preco.toFixed(2).replace('.', ',')}
                                </span>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8 flex-grow">
                            {beneficios.map((ben, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm font-medium">
                                    <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_circle</span>
                                    <span className="leading-relaxed">{ben}</span>
                                </li>
                            ))}
                        </ul>

                        <button 
                            onClick={() => handleComprar(produto.id)}
                            disabled={isCheckoutLoading === produto.id}
                            className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest hover:bg-primary hover:text-black hover:border-primary transition-all text-sm mt-auto disabled:opacity-50 flex justify-center items-center h-[52px] group/btn overflow-hidden relative shrink-0"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {isCheckoutLoading === produto.id ? (
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-lg">shopping_cart_checkout</span>
                                        Comprar Pacote
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <main className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

            <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
                
                {/* Header atualizado: Texto na Esquerda, Card na Direita */}
                <header className="mb-12 flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-10 border-b border-white/10 pb-12">
                    <div className="max-w-2xl text-center lg:text-left flex flex-col justify-center">
                        <h1 className="font-display-lg text-5xl md:text-7xl text-white font-black mb-6 tracking-tighter uppercase leading-none">
                            Adquira <span className="text-primary">Cash</span>
                        </h1>
                        <p className="text-gray-400 font-body-lg text-lg leading-relaxed max-w-2xl">
                            Apoie o servidor e receba benefícios exclusivos. Utilize o Cash diretamente no jogo através do comando <strong className="text-white bg-white/10 px-2 py-0.5 rounded-md">/loja</strong> para adquirir Ranks VIP, Chaves e Itens Especiais.
                        </p>
                    </div>
                    
<div className="w-full lg:w-[380px] bg-surface-container-low p-6 rounded-[1.75rem] border border-primary/20 relative overflow-hidden shrink-0 text-left">
    
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(140,218,112,0.06),transparent_55%)] pointer-events-none"></div>

    <div className="relative z-10">
        <h3 className="font-headline-md text-xl font-black uppercase tracking-tight text-white mb-3">
            Meta Mensal
        </h3>

        <p className="font-body-md text-gray-400 text-sm leading-relaxed mb-5">
            Sua contribuição ajuda a manter nossos servidores online, garantindo estabilidade, desempenho e uma melhor experiência para toda a comunidade.
        </p>

        <div className="flex items-baseline justify-between mb-3">
            <span className="text-4xl font-black text-white leading-none">
                35%
            </span>

            <span className="text-xs uppercase tracking-[0.2em] text-primary font-bold">
                Em andamento
            </span>
        </div>

        <div className="flex gap-1.5 h-3">
            {Array.from({ length: 20 }).map((_, i) => (
                <div
                    key={i}
                    className={`
                        flex-1 transition-all duration-300
                        ${i === 0 ? "rounded-l-full" : ""}
                        ${i === 19 ? "rounded-r-full" : ""}
                        ${
                            i < 7
                                ? "bg-primary shadow-[0_0_8px_rgba(140,218,112,0.25)]"
                                : "bg-white/[0.06]"
                        }
                    `}
                />
            ))}
        </div>
    </div>
</div>
                </header>

                <div className="flex flex-wrap gap-3 mb-10 border-b border-white/5 pb-6">
                    {servidores.map((srv) => (
                        <button
                            key={srv}
                            onClick={() => setServidorAtivo(srv)}
                            className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all flex items-center gap-2 ${servidorAtivo === srv ? 'bg-primary text-black shadow-[0_0_20px_rgba(140,218,112,0.3)] scale-105' : 'bg-surface-container-low border border-white/5 text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <span className="material-symbols-outlined text-sm">dns</span>
                            {srv}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    <aside className="lg:col-span-3">
                        <div className="sticky top-32 space-y-8">
                            <div className="bg-surface-container-low border border-white/5 rounded-[2rem] p-4">
                                <h3 className="font-label-caps text-xs text-gray-500 mb-4 px-4 font-bold tracking-widest uppercase">Filtros de Categoria</h3>
                                <nav className="flex flex-col gap-2">
                                    <button onClick={() => setCategoriaAtiva('TODOS')} className={`flex items-center gap-3 p-4 text-left font-bold rounded-2xl border transition-all ${categoriaAtiva === 'TODOS' ? 'bg-primary/10 text-primary border-primary/20' : 'hover:bg-white/5 text-gray-400 hover:text-white border-transparent'}`}>
                                        <span className="material-symbols-outlined">apps</span>
                                        Todos os Itens
                                    </button>
                                    <button onClick={() => setCategoriaAtiva('CASH')} className={`flex items-center gap-3 p-4 text-left font-bold rounded-2xl border transition-all ${categoriaAtiva === 'CASH' ? 'bg-primary/10 text-primary border-primary/20' : 'hover:bg-white/5 text-gray-400 hover:text-white border-transparent'}`}>
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                                        Moedas (Cash)
                                    </button>
                                    <button onClick={() => setCategoriaAtiva('UNBAN')} className={`flex items-center gap-3 p-4 text-left font-bold rounded-2xl border transition-all ${categoriaAtiva === 'UNBAN' ? 'bg-primary/10 text-primary border-primary/20' : 'hover:bg-white/5 text-gray-400 hover:text-white border-transparent'}`}>
                                        <span className="material-symbols-outlined">gavel</span>
                                        Revogação (Unban)
                                    </button>
                                </nav>
                            </div>

                            <div className="bg-gradient-to-br from-[#5865F2]/20 to-surface-container-low p-8 rounded-[2rem] border border-[#5865F2]/20 hidden lg:block text-center relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#5865F2]/20 blur-[40px] group-hover:bg-[#5865F2]/40 transition-all"></div>
                                <div className="w-14 h-14 bg-[#5865F2]/20 text-[#5865F2] rounded-2xl flex items-center justify-center mx-auto mb-5 relative z-10 border border-[#5865F2]/30">
                                    <span className="material-symbols-outlined text-2xl">support_agent</span>
                                </div>
                                <p className="font-label-caps text-sm text-white mb-2 font-bold tracking-widest uppercase relative z-10">Dúvidas ou Problemas?</p>
                                <p className="font-body-md text-gray-400 text-sm mb-6 relative z-10">Abra um ticket financeiro no nosso servidor do Discord.</p>
                                <button className="w-full py-3 rounded-xl bg-[#5865F2] text-white hover:bg-[#4752C4] transition-all font-bold uppercase tracking-widest text-xs shadow-lg relative z-10 flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-base">forum</span>
                                    Acionar Suporte
                                </button>
                            </div>
                        </div>
                    </aside>

                    <div className="lg:col-span-9 flex flex-col gap-10">
                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                {renderSkeleton()}
                                {renderSkeleton()}
                                {renderSkeleton()}
                                {renderSkeleton()}
                            </div>
                        ) : produtosFiltrados.length === 0 ? (
                            <div className="text-center py-24 bg-surface-container-low rounded-[2rem] border border-white/5">
                                <span className="material-symbols-outlined text-6xl text-white/10 mb-5 block">inventory_2</span>
                                <h2 className="text-2xl font-black text-white mb-2">Nenhum pacote encontrado</h2>
                                <p className="text-gray-400">Não há produtos ativos para este servidor ou categoria no momento.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                {produtosFiltrados.map((produto) => renderProdutoCard(produto))}
                            </div>
                        )}

                        <section className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] border border-white/5 flex flex-col xl:flex-row items-center justify-between gap-8 mt-6">
                            <div className="text-center xl:text-left flex flex-col md:flex-row items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-500 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-2xl">verified_user</span>
                                </div>
                                <div>
                                    <h4 className="font-label-caps text-sm font-bold text-white mb-1.5 uppercase tracking-widest">Pagamento 100% Seguro</h4>
                                    <p className="text-gray-400 font-body-sm text-sm">A entrega dos pacotes é processada automaticamente logo após a aprovação do pagamento.</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-row items-center justify-center gap-6 md:gap-8 opacity-60 hover:opacity-100 transition-opacity duration-500 w-full xl:w-auto">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-2xl">qr_code_2</span>
                                    <span className="font-label-caps text-xs font-bold tracking-widest">PIX</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-2xl">credit_card</span>
                                    <span className="font-label-caps text-xs font-bold tracking-widest">CARTÃO</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                                    <span className="font-label-caps text-xs font-bold tracking-widest">MERCADO PAGO</span>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </main>
    );
}
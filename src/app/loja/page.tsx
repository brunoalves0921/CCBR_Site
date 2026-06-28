'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Produto = {
    id: string;
    nome: string;
    descricao: string | null;
    preco: number;
    desconto: number;
    categoria: string;
    servidor: string;
    imagem: string | null;
    ativo: boolean; 
};

type CartItem = {
    produto: Produto;
    quantidade: number;
};

type Doador = {
    nick: string;
    total: number;
};

export default function Loja() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [servidores, setServidores] = useState<string[]>(['SURVIVAL']);
    const [servidorAtivo, setServidorAtivo] = useState<string>('SURVIVAL');
    const [categoriaAtiva, setCategoriaAtiva] = useState<string>('TODOS');
    
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    const [topDoadores, setTopDoadores] = useState<Doador[]>([]);
    
    // NOVO ESTADO DA META MENSAL
    const [metaDados, setMetaDados] = useState({
        percentualExato: 0,
        percentualLayout: 0,
        metaValor: 0,
        totalArrecadado: 0
    });
    
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 6; 
    
    const [isLoading, setIsLoading] = useState(true);
    const [isCheckoutLoading, setIsCheckoutLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        // Busca Produtos
        fetch('/api/produtos')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const produtosAtivos = data.filter((p: Produto) => p.ativo === true);
                    setProdutos(produtosAtivos);
                    
                    const listaServidores = Array.from(new Set(produtosAtivos.map((p: Produto) => p.servidor.toUpperCase()))) as string[];
                    if (!listaServidores.includes('SURVIVAL')) listaServidores.unshift('SURVIVAL');
                    setServidores(listaServidores);
                } else setProdutos([]);
                
                setIsLoading(false);
            })
            .catch(() => { setProdutos([]); setIsLoading(false); });

        // Busca Top Doadores
        fetch('/api/top-doadores')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) setTopDoadores(data);
                else {
                    setTopDoadores([
                        { nick: "SucriilhsBR", total: 1500.00 },
                        { nick: "Notch", total: 850.50 }
                    ]);
                }
            })
            .catch(() => {
                setTopDoadores([{ nick: "SucriilhsBR", total: 1500.00 }]);
            });

        // BUSCA A META MENSAL DA API
        fetch('/api/meta-mensal')
            .then(res => res.json())
            .then(data => {
                if (data && data.percentualExato !== undefined) {
                    setMetaDados(data);
                }
            })
            .catch(console.error);

    }, []);

    useEffect(() => { setCurrentPage(1); }, [categoriaAtiva, servidorAtivo]);

    const addToCart = (produto: Produto) => {
        setCart(prev => {
            const existing = prev.find(item => item.produto.id === produto.id);
            if (existing) return prev.map(item => item.produto.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item);
            return [...prev, { produto, quantidade: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (produtoId: string) => setCart(prev => prev.filter(item => item.produto.id !== produtoId));

    const updateQuantity = (produtoId: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.produto.id === produtoId) return { ...item, quantidade: Math.max(1, item.quantidade + delta) }; 
            return item;
        }));
    };

    const totalCart = cart.reduce((acc, item) => {
        const temDesconto = Boolean(item.produto.desconto && item.produto.desconto > 0);
        const precoFinal = temDesconto ? item.produto.preco * (1 - item.produto.desconto / 100) : item.produto.preco;
        return acc + (precoFinal * item.quantidade);
    }, 0);

    const handleFinalizarCompra = async () => {
        setIsCheckoutLoading(true);
        try {
            const itemsToCheckout = cart.map(item => ({ id: item.produto.id, quantidade: item.quantidade, grandfather: item.quantidade }));
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: itemsToCheckout })
            });
            const data = await res.json();
            if (res.ok && data.init_point) {
                window.open(data.init_point, '_blank');
                setIsCheckoutLoading(false);
                setCart([]); 
                setIsCartOpen(false);
            } else if (res.status === 401) router.push('/login');
            else { alert(data.error || 'Erro ao processar a compra.'); setIsCheckoutLoading(false); }
        } catch (error) { alert('Erro de conexão com o servidor.'); setIsCheckoutLoading(false); }
    };

    const produtosFiltrados = produtos.filter(p => {
        const matchesServidor = p.servidor.toUpperCase() === servidorAtivo.toUpperCase();
        const matchesCategoria = categoriaAtiva === 'TODOS' || p.categoria.toUpperCase() === categoriaAtiva.toUpperCase();
        return matchesServidor && matchesCategoria;
    });

    const totalPages = Math.ceil(produtosFiltrados.length / itemsPerPage);
    const paginatedProducts = produtosFiltrados.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const renderSkeleton = (key: number) => (
        <div key={key} className="bg-[#121316] rounded-2xl border border-white/5 h-[400px] animate-pulse flex flex-col overflow-hidden">
            <div className="w-full h-32 bg-white/5 mb-5"></div>
            <div className="px-5 pb-5 flex flex-col flex-grow">
                <div className="h-5 w-3/4 bg-white/5 rounded mb-4"></div>
                <div className="space-y-3 flex-grow mt-2">
                    <div className="h-2 w-full bg-white/5 rounded"></div>
                    <div className="h-2 w-5/6 bg-white/5 rounded"></div>
                    <div className="h-2 w-4/6 bg-white/5 rounded"></div>
                </div>
                <div className="h-11 w-full bg-white/5 rounded-xl mt-auto"></div>
            </div>
        </div>
    );

    const getMedalColor = (index: number) => {
        if (index === 0) return 'bg-[#FFD700] text-[#0A1A08] border-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.5)]'; // Ouro
        if (index === 1) return 'bg-[#C0C0C0] text-[#0A1A08] border-[#C0C0C0] shadow-[0_0_10px_rgba(192,192,192,0.4)]'; // Prata
        if (index === 2) return 'bg-[#CD7F32] text-white border-[#CD7F32] shadow-[0_0_10px_rgba(205,127,50,0.4)]'; // Bronze
        return 'bg-black/50 text-gray-400 border-white/10'; // Outros
    };

    const renderProdutoCard = (produto: Produto) => {
        const beneficios = produto.descricao ? produto.descricao.split(',').map(b => b.trim()) : ['Ativação automática na hora'];
        const temDesconto = Boolean(produto.desconto && produto.desconto > 0);
        const precoFinal = temDesconto ? produto.preco * (1 - produto.desconto / 100) : produto.preco;

        return (
            <div key={produto.id} className="group relative bg-[#121316] rounded-2xl border border-white/10 flex flex-col hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_15px_35px_rgba(140,218,112,0.15)] transition-all duration-500 overflow-hidden h-full">
                <div className="w-full h-32 relative bg-surface-container-low flex items-center justify-center overflow-hidden shrink-0 border-b border-white/5">
                    {produto.imagem ? (
                        <img src={produto.imagem} alt={produto.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                    ) : (
                        <span className="material-symbols-outlined text-5xl text-white/10 group-hover:scale-110 transition-transform duration-700">deployed_code</span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-90"></div>
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${produto.categoria.toUpperCase() === 'VIP' ? 'bg-[#ffdb3c]' : 'bg-primary'}`}></span>
                        <span className="text-[9px] font-black text-white tracking-widest uppercase">{produto.categoria}</span>
                    </div>
                    {temDesconto && (
                        <div className="absolute top-3 right-3 bg-primary text-[#0A1A08] px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(140,218,112,0.5)] z-20">
                            <span className="text-[11px] font-black uppercase tracking-widest">-{produto.desconto}% OFF</span>
                        </div>
                    )}
                </div>

                <div className="p-5 flex flex-col flex-grow relative z-10">
                    <h2 className="text-[17px] text-white font-black leading-tight tracking-tight line-clamp-2 mb-4">{produto.nome}</h2>
                    <ul className="space-y-2 mb-6 flex-grow">
                        {beneficios.map((ben, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-400 text-[11px] font-medium">
                                <span className="material-symbols-outlined text-primary text-[14px] shrink-0 mt-[1px]">check</span>
                                <span className="leading-relaxed line-clamp-2">{ben}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-auto pt-4 border-t border-white/5 space-y-4">
                        <div className="flex flex-col items-center justify-center min-h-[48px]">
                            {temDesconto && (
                                <span className="text-[11px] text-gray-500 line-through font-bold mb-1">
                                    De R$ {produto.preco.toFixed(2).replace('.', ',')} por:
                                </span>
                            )}
                            <div className="flex items-baseline gap-1.5 max-w-full px-2">
                                <span className="text-sm text-primary font-bold shrink-0">R$</span>
                                <span className="text-[28px] text-primary font-black tracking-tighter leading-none drop-shadow-[0_0_10px_rgba(140,218,112,0.3)] truncate" title={precoFinal.toFixed(2).replace('.', ',')}>
                                    {precoFinal.toFixed(2).replace('.', ',')}
                                </span>
                            </div>
                        </div>

                        <button 
                            type="button"
                            onClick={(e) => { e.preventDefault(); addToCart(produto); }}
                            className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-primary hover:text-[#0A1A08] hover:border-primary transition-all text-[11px] flex justify-center items-center gap-2 shadow-lg"
                        >
                            <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Calcula os blocos visuais de acordo com o percentual!
    const blocosAtivos = Math.floor((metaDados.percentualLayout / 100) * 15);

    return (
        <>
            <style>{`
                @keyframes fadeAndSlideUp {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-slide {
                    animation: fadeAndSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Overlay Carrinho */}
            {isCartOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]" onClick={() => setIsCartOpen(false)}></div>
            )}

            {/* Drawer Carrinho */}
            <div className={`fixed top-0 right-0 h-full w-[90vw] sm:w-[420px] bg-[#121316] border-l border-white/10 shadow-2xl z-[100] flex flex-col transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-surface-container-low/50 shrink-0">
                    <h2 className="text-xl font-black text-white flex items-center gap-2 uppercase tracking-widest">
                        <span className="material-symbols-outlined text-primary">shopping_cart</span>
                        Carrinho
                    </h2>
                    <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-3xl">close</span>
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500">
                            <span className="material-symbols-outlined text-6xl mb-4 opacity-50">remove_shopping_cart</span>
                            <p className="font-bold tracking-widest uppercase text-sm">Carrinho Vazio</p>
                        </div>
                    ) : (
                        cart.map(item => {
                            const temDesconto = Boolean(item.produto.desconto && item.produto.desconto > 0);
                            const precoFinal = temDesconto ? item.produto.preco * (1 - item.produto.desconto / 100) : item.produto.preco;
                            
                            return (
                                <div key={item.produto.id} className="bg-surface-container-low border border-white/5 p-4 rounded-2xl flex gap-4 items-center">
                                    {item.produto.imagem ? (
                                        <img src={item.produto.imagem} alt={item.produto.nome} className="w-16 h-16 rounded-xl object-cover bg-black/50 shrink-0" />
                                    ) : (
                                        <div className="w-16 h-16 rounded-xl bg-black/50 flex items-center justify-center border border-white/5 shrink-0">
                                            <span className="material-symbols-outlined text-white/20 text-2xl">deployed_code</span>
                                        </div>
                                    )}
                                    
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-bold text-white truncate">{item.produto.nome}</h3>
                                        <p className="text-primary font-black text-sm whitespace-nowrap">R$ {precoFinal.toFixed(2).replace('.', ',')}</p>
                                        
                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="flex items-center bg-[#121316] rounded-lg border border-white/10 overflow-hidden shrink-0">
                                                <button onClick={() => updateQuantity(item.produto.id, -1)} className="px-2 py-1 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">-</button>
                                                <span className="px-2 text-xs font-bold text-white w-4 text-center">{item.quantidade}</span>
                                                <button onClick={() => updateQuantity(item.produto.id, 1)} className="px-2 py-1 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">+</button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.produto.id)} className="text-red-400 hover:text-red-300 text-[10px] font-bold uppercase tracking-widest shrink-0 whitespace-nowrap">
                                                Remover
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
                
                <div className="p-6 border-t border-white/10 bg-surface-container-low/80 backdrop-blur-md space-y-4 shrink-0">
                    <div className="flex justify-between items-center text-lg">
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">Total:</span>
                        <span className="text-3xl font-black text-primary whitespace-nowrap">R$ {totalCart.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <button 
                        onClick={handleFinalizarCompra}
                        disabled={isCheckoutLoading}
                        className="w-full py-4 rounded-xl bg-primary text-[#0A1A08] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(140,218,112,0.3)] disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {isCheckoutLoading ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#0A1A08] border-t-transparent" />
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-xl shrink-0">payments</span>
                                Finalizar Compra
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* ====== BOTAO FLUTUANTE DO CARRINHO ====== */}
            {cart.length > 0 && (
                <button 
                    onClick={() => setIsCartOpen(true)}
                    className="fixed bottom-8 right-8 bg-primary text-[#0A1A08] p-4 rounded-full shadow-[0_10px_40px_rgba(140,218,112,0.4)] hover:scale-110 transition-transform z-40 flex items-center gap-2 border-2 border-[#0A1A08]"
                >
                    <div className="relative">
                        <span className="material-symbols-outlined text-3xl">shopping_cart</span>
                        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-black min-w-[20px] h-5 flex items-center justify-center rounded-full px-1 border border-[#0A1A08]">
                            {cart.reduce((acc, item) => acc + item.quantidade, 0)}
                        </span>
                    </div>
                </button>
            )}

            <main className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
                <div className="max-w-[1340px] mx-auto px-6 md:px-8 relative z-10">
                    
                    {/* Header */}
                    <header className="mb-10 text-center flex flex-col items-center">
                        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-md">
                            <span className="material-symbols-outlined text-sm text-primary">storefront</span>
                            <span className="font-label-caps text-xs text-primary font-bold tracking-[0.2em] uppercase">
                                Loja Oficial
                            </span>
                        </div>
                        
                        <h1 className="font-display-lg text-5xl md:text-7xl text-white font-black mb-4 tracking-tighter uppercase leading-none">
                            Adquira <span className="text-primary">Cash</span>
                        </h1>
                        <p className="text-gray-400 font-body-lg text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                            Apoie o servidor e receba benefícios exclusivos. Utilize o Cash diretamente no jogo através do comando <strong className="text-white bg-white/10 px-2 py-0.5 rounded-md text-sm border border-white/5">/loja</strong>.
                        </p>
                        
                        <div className="inline-flex flex-wrap gap-2 p-1.5 bg-surface-container-low/50 backdrop-blur-md rounded-2xl border border-white/5 shadow-lg">
                            {servidores.map((srv) => (
                                <button
                                    key={srv}
                                    onClick={() => setServidorAtivo(srv)}
                                    className={`px-8 py-3 rounded-xl font-bold text-xs md:text-sm uppercase tracking-widest transition-all flex items-center gap-2 ${
                                        servidorAtivo === srv 
                                        ? 'bg-primary text-[#0A1A08] shadow-[0_0_15px_rgba(140,218,112,0.2)]' 
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-base">dns</span>
                                    {srv}
                                </button>
                            ))}
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* SIDEBAR ESQUERDA */}
                        <aside className="lg:col-span-3 space-y-6">
                            
                            <div className="bg-surface-container-low p-6 rounded-[1.75rem] border border-white/5 shadow-xl">
                                <h3 className="text-[#6B7280] font-bold text-[11px] tracking-widest uppercase mb-4 ml-1">
                                    Categorias
                                </h3>
                                <nav className="flex flex-col gap-2">
                                    <button onClick={() => setCategoriaAtiva('TODOS')} className={`flex items-center gap-3 px-4 py-3.5 text-left font-bold rounded-xl transition-all text-sm ${categoriaAtiva === 'TODOS' ? 'bg-primary/10 text-primary border border-primary/20 shadow-inner' : 'bg-black/20 border border-transparent text-gray-400 hover:bg-white/5 hover:border-white/5 hover:text-white'}`}>
                                        <span className="material-symbols-outlined text-lg">apps</span>
                                        Todos os Itens
                                    </button>
                                    <button onClick={() => setCategoriaAtiva('CASH')} className={`flex items-center gap-3 px-4 py-3.5 text-left font-bold rounded-xl transition-all text-sm ${categoriaAtiva === 'CASH' ? 'bg-primary/10 text-primary border border-primary/20 shadow-inner' : 'bg-black/20 border border-transparent text-gray-400 hover:bg-white/5 hover:border-white/5 hover:text-white'}`}>
                                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                                        Moedas (Cash)
                                    </button>
                                    <button onClick={() => setCategoriaAtiva('UNBAN')} className={`flex items-center gap-3 px-4 py-3.5 text-left font-bold rounded-xl transition-all text-sm ${categoriaAtiva === 'UNBAN' ? 'bg-primary/10 text-primary border border-primary/20 shadow-inner' : 'bg-black/20 border border-transparent text-gray-400 hover:bg-white/5 hover:border-white/5 hover:text-white'}`}>
                                        <span className="material-symbols-outlined text-lg">gavel</span>
                                        Revogação (Unban)
                                    </button>
                                </nav>
                            </div>

                            {/* ===================== META MENSAL DINÂMICA ===================== */}
                            <div className="bg-surface-container-low p-6 rounded-[1.75rem] border border-primary/20 relative overflow-hidden text-left shadow-xl">
                                <div className="relative z-10">
                                    <h3 className="font-headline-md text-lg font-black uppercase tracking-tight text-white mb-2">
                                        Meta Mensal
                                    </h3>
                                    <p className="font-body-md text-gray-400 text-xs leading-relaxed mb-4">
                                        Sua contribuição ajuda a manter nossos servidores online e com ótima estabilidade.
                                    </p>
                                    <div className="flex items-baseline justify-between mb-2">
                                        <span className="text-3xl font-black text-white leading-none">{metaDados.percentualExato}%</span>
                                        <span className="text-[9px] uppercase tracking-[0.2em] text-primary font-black">Em andamento</span>
                                    </div>
                                    <div className="flex gap-1 h-2.5">
                                        {Array.from({ length: 15 }).map((_, i) => (
                                            <div key={i} className={`flex-1 transition-all duration-300 ${i === 0 ? "rounded-l-full" : ""} ${i === 14 ? "rounded-r-full" : ""} ${i < blocosAtivos ? "bg-primary shadow-[0_0_8px_rgba(140,218,112,0.4)]" : "bg-white/10"}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bloco 3: Top Doadores Vertical */}
                            {topDoadores.length > 0 && (
                                <div className="bg-surface-container-low p-6 rounded-[1.75rem] border border-white/5 shadow-xl">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-[#ffdb3c] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>social_leaderboard</span>
                                        <h3 className="text-[#6B7280] font-bold text-[11px] tracking-widest uppercase">
                                            Top Apoiadores
                                        </h3>
                                    </div>
                                    
                                    <div className="flex flex-col gap-3">
                                        {topDoadores.slice(0, 5).map((doador, index) => (
                                            <div key={doador.nick} className="flex items-center gap-3 bg-black/30 p-2.5 rounded-xl border border-white/5 hover:bg-white/5 transition-colors group">
                                                <div className="relative w-10 h-10 shrink-0">
                                                    <Image 
                                                        unoptimized 
                                                        fill 
                                                        src={`https://mc-heads.net/avatar/${doador.nick}/100`} 
                                                        alt={doador.nick} 
                                                        className="rounded-lg object-contain bg-black/50" 
                                                    />
                                                    <div className={`absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black border ${getMedalColor(index)}`}>
                                                        {index + 1}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-white font-bold truncate text-xs group-hover:text-primary transition-colors">{doador.nick}</span>
                                                    <span className="text-primary font-black text-[10px]">R$ {doador.total.toFixed(2).replace('.', ',')}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </aside>

                        {/* MEIO: Lista de Produtos */}
                        <div className="lg:col-span-8 flex flex-col w-full">
                            {isLoading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                                    {Array.from({ length: 6 }).map((_, i) => renderSkeleton(i))}
                                </div>
                            ) : paginatedProducts.length === 0 ? (
                                <div className="text-center py-24 bg-surface-container-low/50 rounded-[2rem] border border-white/5">
                                    <span className="material-symbols-outlined text-6xl text-white/10 mb-5 block">inventory_2</span>
                                    <h2 className="text-2xl font-black text-white mb-2">Nenhum pacote encontrado</h2>
                                    <p className="text-[#9CA3AF]">Não há produtos ativos para este servidor ou categoria no momento.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="min-h-[820px] w-full">
                                        <div key={`${categoriaAtiva}-${servidorAtivo}-${currentPage}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 animate-fade-slide content-start">
                                            {paginatedProducts.map((produto) => renderProdutoCard(produto))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* DIREITA: Paginação Sticky */}
                        {totalPages > 1 && !isLoading && (
                            <aside className="hidden lg:flex lg:col-span-1 flex-col items-center relative h-full">
                                <div className="sticky top-[30vh] flex flex-col items-center bg-surface-container-low/70 backdrop-blur-xl p-2.5 rounded-full border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] gap-3 z-20">
                                    <button 
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }}
                                        disabled={currentPage === 1}
                                        className="w-11 h-11 rounded-full bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:border-white/5 disabled:hover:text-gray-400 transition-all"
                                    >
                                        <span className="material-symbols-outlined text-2xl">keyboard_arrow_up</span>
                                    </button>
                                    <div className="flex flex-col items-center justify-center w-11 h-11 bg-[#121316] rounded-full border border-white/10 shadow-inner">
                                        <span className="text-white font-black text-sm leading-none">{currentPage}</span>
                                        <span className="text-gray-500 text-[9px] font-bold mt-0.5">/{totalPages}</span>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }}
                                        disabled={currentPage === totalPages}
                                        className="w-11 h-11 rounded-full bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:border-white/5 disabled:hover:text-gray-400 transition-all"
                                    >
                                        <span className="material-symbols-outlined text-2xl">keyboard_arrow_down</span>
                                    </button>
                                </div>
                            </aside>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
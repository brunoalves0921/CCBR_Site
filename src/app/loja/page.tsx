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
                    setProdutos(data);
                    
                    // Mapeia servidores únicos a partir dos produtos cadastrados, garantindo Survival na lista
                    const listaServidores = Array.from(new Set(data.map((p: Produto) => p.servidor.toUpperCase()))) as string[];
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

    const renderProdutoCard = (produto: Produto, index: number) => {
        const styleType = index % 4;
        const beneficios = produto.descricao ? produto.descricao.split(',').map(b => b.trim()) : ['Ativação automática na hora'];

        if (styleType === 2) {
            return (
                <div key={produto.id} className="group bg-surface-container rounded-[2rem] border-2 border-[#ffdb3c] p-8 flex flex-col hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(255,219,60,0.15)] transition-all duration-500 relative overflow-hidden h-full enchanted-glint">
                    <div className="absolute top-0 left-0 w-full bg-[#ffdb3c] text-black text-center py-1.5 font-label-caps text-[10px] font-black tracking-[0.2em] uppercase z-20">
                        Melhor Custo-Benefício
                    </div>
                    <div className="mb-8 mt-4 relative z-10">
                        <h2 className="font-label-caps text-sm font-bold tracking-widest text-[#ffdb3c] mb-3 uppercase">{produto.categoria}</h2>
                        <div className="font-display-lg text-4xl text-white font-black flex items-end gap-1">
                            {produto.nome}
                        </div>
                        <div className="mt-2 text-[#ffdb3c] font-body-sm flex items-center gap-2">
                            <strong className="text-white">R$ {produto.preco.toFixed(2).replace('.', ',')}</strong>
                        </div>
                    </div>
                    <ul className="flex-grow space-y-4 mb-10 relative z-10">
                        {beneficios.map((ben, i) => (
                            <li key={i} className="flex items-start gap-3 text-white text-sm font-medium">
                                <span className="material-symbols-outlined text-[#ffdb3c] text-lg">token</span>
                                {ben}
                            </li>
                        ))}
                    </ul>
                    <button 
                        onClick={() => handleComprar(produto.id)}
                        disabled={isCheckoutLoading === produto.id}
                        className="relative z-10 w-full py-4 rounded-xl bg-[#ffdb3c] text-black font-black uppercase tracking-widest hover:bg-white transition-all text-sm shadow-lg mt-auto disabled:opacity-50 flex justify-center items-center h-[52px]"
                    >
                        {isCheckoutLoading === produto.id ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" /> : 'Comprar Agora'}
                    </button>
                </div>
            );
        }

        if (styleType === 3) {
            return (
                <div key={produto.id} className="group bg-gradient-to-b from-secondary-fixed/5 to-surface-container rounded-[2rem] border border-secondary-fixed/50 p-8 flex flex-col hover:border-secondary-fixed hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,225,109,0.1)] transition-all duration-500 relative overflow-hidden h-full">
                    <div className="mb-8 relative z-10">
                        <h2 className="font-label-caps text-sm font-bold tracking-widest text-secondary-fixed mb-3 uppercase flex items-center gap-2">
                            {produto.categoria}
                        </h2>
                        <div className="font-display-lg text-4xl text-white font-black flex items-end gap-1">
                            {produto.nome}
                        </div>
                        <div className="mt-2 text-secondary-fixed font-body-sm flex items-center gap-2">
                            <strong className="text-white">R$ {produto.preco.toFixed(2).replace('.', ',')}</strong>
                        </div>
                    </div>
                    <ul className="flex-grow space-y-4 mb-10 relative z-10">
                        {beneficios.map((ben, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-300 text-sm font-medium">
                                <span className="material-symbols-outlined text-secondary-fixed text-lg">token</span>
                                {ben}
                            </li>
                        ))}
                    </ul>
                    <button 
                        onClick={() => handleComprar(produto.id)}
                        disabled={isCheckoutLoading === produto.id}
                        className="relative z-10 w-full py-4 rounded-xl bg-surface-container-high border border-secondary-fixed text-secondary-fixed font-bold uppercase tracking-widest hover:bg-secondary-fixed hover:text-black transition-all text-sm mt-auto disabled:opacity-50 flex justify-center items-center h-[52px]"
                    >
                        {isCheckoutLoading === produto.id ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-secondary-fixed border-t-transparent group-hover:border-black" /> : 'Comprar'}
                    </button>
                </div>
            );
        }

        return (
            <div key={produto.id} className="group bg-surface-container-low rounded-[2rem] border border-outline-variant p-8 flex flex-col hover:border-[#8cda70]/50 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(140,218,112,0.1)] transition-all duration-500 relative overflow-hidden h-full">
                <div className="mb-8 relative z-10">
                    <h2 className="font-label-caps text-sm font-bold tracking-widest text-gray-300 mb-3 uppercase">{produto.categoria}</h2>
                    <div className="font-display-lg text-4xl text-white font-black flex items-end gap-1">
                        {produto.nome}
                    </div>
                    <div className="mt-2 text-gray-400 font-body-sm">R$ {produto.preco.toFixed(2).replace('.', ',')}</div>
                </div>
                <ul className="flex-grow space-y-4 mb-10 relative z-10">
                    {beneficios.map((ben, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300 text-sm font-medium">
                            <span className="material-symbols-outlined text-[#8cda70] text-lg">token</span>
                            {ben}
                        </li>
                    ))}
                </ul>
                <button 
                    onClick={() => handleComprar(produto.id)}
                    disabled={isCheckoutLoading === produto.id}
                    className="relative z-10 w-full py-4 rounded-xl bg-surface-container-high border border-outline-variant text-white font-bold uppercase tracking-widest group-hover:bg-[#8cda70] group-hover:text-black group-hover:border-[#8cda70] transition-all text-sm mt-auto disabled:opacity-50 flex justify-center items-center h-[52px]"
                >
                    {isCheckoutLoading === produto.id ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent group-hover:border-black" /> : 'Comprar'}
                </button>
            </div>
        );
    };

    return (
        <main className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

            <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
                
                <header className="mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 border-b border-outline-variant pb-12">
                    <div className="max-w-2xl">
                        <span className="font-label-caps text-sm text-primary font-bold tracking-widest uppercase mb-3 block flex items-center justify-center md:justify-start gap-2">
                            <span className="material-symbols-outlined text-sm">shopping_cart</span>
                            Loja Oficial
                        </span>
                        <h1 className="font-display-lg text-5xl md:text-6xl text-white font-black mb-6 tracking-tighter uppercase">
                            Adquira <span className="text-primary">Cash</span>
                        </h1>
                        <p className="text-gray-400 font-body-lg text-lg leading-relaxed">
                            O Cash é a nossa moeda premium. Utilize diretamente dentro do servidor através do comando <strong className="text-white">/loja</strong> para adquirir Ranks VIP, Chaves, Itens Especiais e Unban.
                        </p>
                    </div>
                    
                    <div className="w-full md:w-auto bg-surface-container-low border border-outline-variant p-6 rounded-3xl flex flex-col items-center justify-center min-w-[280px] shadow-xl">
                        <span className="text-gray-400 font-label-caps text-xs font-bold tracking-widest uppercase mb-2">Meta do Mês</span>
                        <div className="font-display-lg text-4xl text-white font-black mb-3">85%</div>
                        <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(140,218,112,0.8)]" style={{ width: '85%' }}></div>
                        </div>
                    </div>
                </header>

                {/* Seleção Dinâmica de Servidores (Abas) */}
                <div className="flex flex-wrap gap-2 mb-8 border-b border-white/5 pb-4">
                    {servidores.map((srv) => (
                        <button
                            key={srv}
                            onClick={() => setServidorAtivo(srv)}
                            className={`px-5 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${servidorAtivo === srv ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'bg-surface-container-low text-gray-400 hover:text-white hover:bg-surface-container-high'}`}
                        >
                            {srv}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    <aside className="lg:col-span-3 space-y-8">
                        <div>
                            <h3 className="font-label-caps text-xs text-gray-500 mb-4 px-2 font-bold tracking-widest uppercase">Filtros</h3>
                            <nav className="flex flex-col gap-2">
                                <button onClick={() => setCategoriaAtiva('TODOS')} className={`flex items-center gap-3 p-4 text-left font-bold rounded-2xl border transition-all ${categoriaAtiva === 'TODOS' ? 'bg-primary/10 text-primary border-primary/20 shadow-[0_0_15px_rgba(140,218,112,0.1)]' : 'hover:bg-surface-container-low text-gray-400 hover:text-white border-transparent'}`}>
                                    <span className="material-symbols-outlined">apps</span>
                                    Todos os Produtos
                                </button>
                                <button onClick={() => setCategoriaAtiva('CASH')} className={`flex items-center gap-3 p-4 text-left font-bold rounded-2xl border transition-all ${categoriaAtiva === 'CASH' ? 'bg-primary/10 text-primary border-primary/20 shadow-[0_0_15px_rgba(140,218,112,0.1)]' : 'hover:bg-surface-container-low text-gray-400 hover:text-white border-transparent'}`}>
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                                    Moedas (Cash)
                                </button>
                                <button onClick={() => setCategoriaAtiva('UNBAN')} className={`flex items-center gap-3 p-4 text-left font-bold rounded-2xl border transition-all ${categoriaAtiva === 'UNBAN' ? 'bg-primary/10 text-primary border-primary/20 shadow-[0_0_15px_rgba(140,218,112,0.1)]' : 'hover:bg-surface-container-low text-gray-400 hover:text-white border-transparent'}`}>
                                    <span className="material-symbols-outlined">gavel</span>
                                    Revogação (Unban)
                                </button>
                            </nav>
                        </div>

                        <div className="bg-gradient-to-br from-[#5865F2]/10 to-surface-container-low p-6 rounded-3xl border border-[#5865F2]/20 hidden lg:block text-center">
                            <div className="w-12 h-12 bg-[#5865F2]/20 text-[#5865F2] rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined">support_agent</span>
                            </div>
                            <p className="font-label-caps text-xs text-white mb-2 font-bold tracking-widest uppercase">Problemas com o Pix?</p>
                            <p className="font-body-md text-gray-400 text-sm mb-6">Abra um ticket financeiro no nosso Discord.</p>
                            <button className="w-full py-3 rounded-xl bg-[#5865F2] text-white hover:bg-[#4752C4] transition-all font-bold uppercase tracking-wider text-xs shadow-lg">
                                Acionar Suporte
                            </button>
                        </div>
                    </aside>

                    <div className="lg:col-span-9 flex flex-col gap-12">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-40">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                            </div>
                        ) : produtosFiltrados.length === 0 ? (
                            <div className="text-center py-20 bg-surface-container-low rounded-[2rem] border border-outline-variant">
                                <span className="material-symbols-outlined text-5xl text-gray-500 mb-4">inventory_2</span>
                                <h2 className="text-xl font-bold text-white">Nenhum pacote neste servidor</h2>
                                <p className="text-gray-400">Tente alterar os filtros de categorias laterais ou as abas de servidor.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                {produtosFiltrados.map((produto, index) => renderProdutoCard(produto, index))}
                            </div>
                        )}

                        <section className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] border border-outline-variant flex flex-col md:flex-row items-center justify-between gap-8 mt-4 shadow-xl">
                            <div className="text-center md:text-left flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined">lock</span>
                                </div>
                                <div>
                                    <h4 className="font-label-caps text-sm font-bold text-white mb-1 uppercase tracking-widest">Pagamento 100% Seguro</h4>
                                    <p className="text-gray-400 font-body-sm text-sm">A liberação dos itens é processada automaticamente via sistema integrado.</p>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap justify-center gap-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
                                <div className="flex flex-col items-center gap-1">
                                    <span className="material-symbols-outlined text-3xl">qr_code_2</span>
                                    <span className="font-label-caps text-[10px] font-bold tracking-widest">PIX</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="material-symbols-outlined text-3xl">credit_card</span>
                                    <span className="font-label-caps text-[10px] font-bold tracking-widest">CARTÃO</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                                    <span className="font-label-caps text-[10px] font-bold tracking-widest">MERCADO PAGO</span>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </main>
    );
}
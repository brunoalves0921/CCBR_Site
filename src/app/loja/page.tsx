'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

export default function Loja() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [servidores, setServidores] = useState<string[]>(['SURVIVAL']);
    const [servidorAtivo, setServidorAtivo] = useState<string>('SURVIVAL');
    const [categoriaAtiva, setCategoriaAtiva] = useState<string>('TODOS');
    
    // Paginação para 2 linhas de 3 colunas (máx 6 itens)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 6; 
    
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

    // Voltar para a primeira página ao trocar o filtro
    useEffect(() => {
        setCurrentPage(1);
    }, [categoriaAtiva, servidorAtivo]);

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

    const totalPages = Math.ceil(produtosFiltrados.length / itemsPerPage);
    const paginatedProducts = produtosFiltrados.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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

    const renderProdutoCard = (produto: Produto) => {
        const beneficios = produto.descricao ? produto.descricao.split(',').map(b => b.trim()) : ['Ativação automática na hora'];
        
        const temDesconto = Boolean(produto.desconto && produto.desconto > 0);
        const precoFinal = temDesconto ? produto.preco * (1 - produto.desconto / 100) : produto.preco;

        return (
            <div key={produto.id} className="group relative bg-[#121316] rounded-2xl border border-white/10 flex flex-col hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_15px_35px_rgba(140,218,112,0.15)] transition-all duration-500 overflow-hidden h-full">
                
                {/* Header do Card (Imagem) */}
                <div className="w-full h-32 relative bg-surface-container-low flex items-center justify-center overflow-hidden shrink-0 border-b border-white/5">
                    {produto.imagem ? (
                        <img src={produto.imagem} alt={produto.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                    ) : (
                        <span className="material-symbols-outlined text-5xl text-white/10 group-hover:scale-110 transition-transform duration-700">deployed_code</span>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-90"></div>

                    {/* Badge de Categoria (Esquerda) */}
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${produto.categoria.toUpperCase() === 'VIP' ? 'bg-[#ffdb3c]' : 'bg-primary'}`}></span>
                        <span className="text-[9px] font-black text-white tracking-widest uppercase">{produto.categoria}</span>
                    </div>

                    {/* DESTAQUE DE DESCONTO (Topo Direita) */}
                    {temDesconto && (
                        <div className="absolute top-3 right-3 bg-primary text-[#0A1A08] px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(140,218,112,0.5)] z-20">
                            <span className="text-[11px] font-black uppercase tracking-widest">-{produto.desconto}% OFF</span>
                        </div>
                    )}
                </div>

                {/* Corpo de Informações do Card */}
                <div className="p-5 flex flex-col flex-grow relative z-10">
                    
                    <h2 className="text-[17px] text-white font-black leading-tight tracking-tight line-clamp-2 mb-4">
                        {produto.nome}
                    </h2>

                    <ul className="space-y-2 mb-6 flex-grow">
                        {beneficios.map((ben, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-400 text-[11px] font-medium">
                                <span className="material-symbols-outlined text-primary text-[14px] shrink-0 mt-[1px]">check</span>
                                <span className="leading-relaxed line-clamp-2">{ben}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Rodapé do Card: Preço Centralizado e Botão */}
                    <div className="mt-auto pt-4 border-t border-white/5 space-y-4">
                        
                        {/* Bloco de Preço Limpo e Centralizado */}
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
                            onClick={(e) => { e.preventDefault(); handleComprar(produto.id); }}
                            disabled={isCheckoutLoading === produto.id}
                            className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest hover:bg-primary hover:text-[#0A1A08] hover:border-primary transition-all text-[11px] disabled:opacity-50 flex justify-center items-center gap-2 shadow-lg"
                        >
                            {isCheckoutLoading === produto.id ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-[16px]">shopping_cart_checkout</span>
                                    Adicionar
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </div>
        );
    };

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
            `}</style>

            <main className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

                <div className="max-w-[1340px] mx-auto px-6 md:px-8 relative z-10">
                    
                    <header className="mb-14 flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-10">
                        <div className="max-w-2xl text-center lg:text-left flex flex-col justify-center">
                            <h1 className="font-display-lg text-5xl md:text-7xl text-white font-black mb-6 tracking-tighter uppercase leading-none">
                                Adquira <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300 drop-shadow-[0_0_15px_rgba(140,218,112,0.3)]">Cash</span>
                            </h1>
                            <p className="text-gray-400 font-body-lg text-lg leading-relaxed max-w-2xl">
                                Apoie o servidor e receba benefícios exclusivos. Utilize o Cash diretamente no jogo através do comando <strong className="text-white bg-white/10 px-2.5 py-1 rounded-md text-sm border border-white/5">/loja</strong> para adquirir Ranks VIP, Chaves e Itens Especiais.
                            </p>
                        </div>
                        
                        <div className="w-full lg:w-[380px] bg-surface-container-low p-6 rounded-[1.75rem] border border-primary/20 relative overflow-hidden shrink-0 text-left shadow-2xl">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(140,218,112,0.08),transparent_60%)] pointer-events-none"></div>

                            <div className="relative z-10">
                                <h3 className="font-headline-md text-xl font-black uppercase tracking-tight text-white mb-3">
                                    Meta Mensal
                                </h3>
                                <p className="font-body-md text-gray-400 text-sm leading-relaxed mb-5">
                                    Sua contribuição ajuda a manter nossos servidores online, garantindo estabilidade, desempenho e uma melhor experiência.
                                </p>
                                <div className="flex items-baseline justify-between mb-3">
                                    <span className="text-4xl font-black text-white leading-none">35%</span>
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-black">Em andamento</span>
                                </div>
                                <div className="flex gap-1.5 h-3">
                                    {Array.from({ length: 20 }).map((_, i) => (
                                        <div key={i} className={`flex-1 transition-all duration-300 ${i === 0 ? "rounded-l-full" : ""} ${i === 19 ? "rounded-r-full" : ""} ${i < 7 ? "bg-primary shadow-[0_0_8px_rgba(140,218,112,0.4)]" : "bg-white/10"}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="flex justify-center lg:justify-start mb-12">
                        <div className="inline-flex flex-wrap gap-2 p-1.5 bg-surface-container-low/50 backdrop-blur-md rounded-2xl border border-white/5 shadow-lg">
                            {servidores.map((srv) => (
                                <button
                                    key={srv}
                                    onClick={() => setServidorAtivo(srv)}
                                    className={`px-8 py-3.5 rounded-xl font-bold text-xs md:text-sm uppercase tracking-widest transition-all flex items-center gap-2 ${
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
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* ================= BARRA LATERAL ESQUERDA (FILTROS) ================= */}
                        <aside className="lg:col-span-3">
                            <div className="sticky top-32 space-y-8">
                                <div>
                                    <h3 className="text-[#6B7280] font-bold text-[11px] tracking-widest uppercase mb-4 ml-1">
                                        Filtrar por Categoria
                                    </h3>
                                    <nav className="flex flex-col gap-2">
                                        <button onClick={() => setCategoriaAtiva('TODOS')} className={`flex items-center gap-3 px-5 py-4 text-left font-bold rounded-2xl transition-all ${categoriaAtiva === 'TODOS' ? 'bg-primary/10 text-primary border border-primary/20 shadow-inner' : 'bg-surface-container-low/30 border border-white/5 text-gray-400 hover:bg-surface-container-low hover:text-white'}`}>
                                            <span className="material-symbols-outlined text-lg">apps</span>
                                            Todos os Itens
                                        </button>
                                        <button onClick={() => setCategoriaAtiva('CASH')} className={`flex items-center gap-3 px-5 py-4 text-left font-bold rounded-2xl transition-all ${categoriaAtiva === 'CASH' ? 'bg-primary/10 text-primary border border-primary/20 shadow-inner' : 'bg-surface-container-low/30 border border-white/5 text-gray-400 hover:bg-surface-container-low hover:text-white'}`}>
                                            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>monetization_on</span>
                                            Moedas (Cash)
                                        </button>
                                        <button onClick={() => setCategoriaAtiva('UNBAN')} className={`flex items-center gap-3 px-5 py-4 text-left font-bold rounded-2xl transition-all ${categoriaAtiva === 'UNBAN' ? 'bg-primary/10 text-primary border border-primary/20 shadow-inner' : 'bg-surface-container-low/30 border border-white/5 text-gray-400 hover:bg-surface-container-low hover:text-white'}`}>
                                            <span className="material-symbols-outlined text-lg">gavel</span>
                                            Revogação (Unban)
                                        </button>
                                    </nav>
                                </div>

                                <div className="bg-gradient-to-br from-[#5865F2]/10 to-surface-container-low p-8 rounded-3xl border border-[#5865F2]/20 hidden lg:block text-center relative overflow-hidden group shadow-xl">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#5865F2]/20 blur-[40px] group-hover:bg-[#5865F2]/40 transition-all"></div>
                                    <div className="w-14 h-14 bg-[#5865F2]/20 text-[#5865F2] rounded-2xl flex items-center justify-center mx-auto mb-5 relative z-10 border border-[#5865F2]/30">
                                        <span className="material-symbols-outlined text-2xl">support_agent</span>
                                    </div>
                                    <p className="font-label-caps text-sm text-white mb-2 font-bold tracking-widest uppercase relative z-10">Dúvidas?</p>
                                    <p className="font-body-md text-[#9CA3AF] text-sm mb-6 relative z-10">Abra um ticket no servidor do Discord.</p>
                                    <button className="w-full py-3.5 rounded-xl bg-[#5865F2] text-white hover:bg-[#4752C4] transition-all font-bold uppercase tracking-widest text-[11px] shadow-lg relative z-10 flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined text-base">forum</span>
                                        Acionar Suporte
                                    </button>
                                </div>
                            </div>
                        </aside>

                        {/* ================= ÁREA DOS PRODUTOS (CENTRO) ================= */}
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
                                    {/* WRAPPER FIXO: Evita o "pulo" da tela segurando a altura mínima equivalente a 2 linhas de cards */}
                                    <div className="min-h-[820px] w-full">
                                        <div key={`${categoriaAtiva}-${servidorAtivo}-${currentPage}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 animate-fade-slide content-start">
                                            {paginatedProducts.map((produto) => renderProdutoCard(produto))}
                                        </div>
                                    </div>

                                    {/* PAGINAÇÃO MOBILE (Escondida no Desktop) */}
                                    {totalPages > 1 && (
                                        <div className="flex lg:hidden flex-col sm:flex-row items-center justify-between mt-10 pt-6 border-t border-[#374151]">
                                            <span className="text-[#6B7280] font-bold text-[11px] tracking-widest uppercase mb-4 sm:mb-0">
                                                PÁGINA {currentPage} DE {totalPages}
                                            </span>
                                            <div className="flex gap-3">
                                                <button 
                                                    type="button"
                                                    onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }}
                                                    disabled={currentPage === 1}
                                                    className="w-12 h-12 rounded-full bg-surface-container border border-[#374151] flex items-center justify-center text-gray-400 disabled:opacity-30 transition-all"
                                                >
                                                    <span className="material-symbols-outlined text-xl">chevron_left</span>
                                                </button>
                                                <button 
                                                    type="button"
                                                    onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }}
                                                    disabled={currentPage === totalPages}
                                                    className="w-12 h-12 rounded-full bg-surface-container border border-[#374151] flex items-center justify-center text-gray-400 disabled:opacity-30 transition-all"
                                                >
                                                    <span className="material-symbols-outlined text-xl">chevron_right</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* FOOTER DA LOJA */}
                            <section className="bg-gradient-to-r from-surface-container-low/50 to-transparent p-6 md:p-8 rounded-[2rem] border border-white/5 flex flex-col xl:flex-row items-center justify-between gap-8 mt-12 relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500/50 rounded-l-[2rem]"></div>
                                
                                <div className="text-center xl:text-left flex flex-col md:flex-row items-center gap-5 relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                                        <span className="material-symbols-outlined text-2xl">verified_user</span>
                                    </div>
                                    <div>
                                        <h4 className="font-label-caps text-sm font-bold text-white mb-1.5 uppercase tracking-widest">Pagamento 100% Seguro</h4>
                                        <p className="text-[#9CA3AF] font-body-sm text-sm">A entrega dos pacotes é processada automaticamente na sua conta in-game após a aprovação.</p>
                                    </div>
                                </div>
                                
                                <div className="flex flex-row items-center justify-center gap-6 md:gap-8 opacity-50 hover:opacity-100 transition-opacity duration-500 w-full xl:w-auto relative z-10">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-2xl">qr_code_2</span>
                                        <span className="font-label-caps text-[11px] font-bold tracking-widest text-white">PIX</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-2xl">credit_card</span>
                                        <span className="font-label-caps text-[11px] font-bold tracking-widest text-white">CARTÃO</span>
                                    </div>
                                </div>
                            </section>

                        </div>

                        {/* ================= PAGINAÇÃO VERTICAL CLEAN (FLUTUANTE NA DIREITA DESKTOP) ================= */}
                        {totalPages > 1 && !isLoading && (
                            <aside className="hidden lg:flex lg:col-span-1 flex-col items-center relative h-full">
                                <div className="sticky top-[30vh] flex flex-col items-center bg-surface-container-low/70 backdrop-blur-xl p-2.5 rounded-full border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] gap-3 z-20">
                                    
                                    {/* Botão Página Anterior (Cima) */}
                                    <button 
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }}
                                        disabled={currentPage === 1}
                                        className="w-11 h-11 rounded-full bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:border-white/5 disabled:hover:text-gray-400 transition-all"
                                        title="Página Anterior"
                                    >
                                        <span className="material-symbols-outlined text-2xl">keyboard_arrow_up</span>
                                    </button>

                                    {/* Display de Página Atual */}
                                    <div className="flex flex-col items-center justify-center w-11 h-11 bg-[#121316] rounded-full border border-white/10 shadow-inner">
                                        <span className="text-white font-black text-sm leading-none">{currentPage}</span>
                                        <span className="text-gray-500 text-[9px] font-bold mt-0.5">/{totalPages}</span>
                                    </div>

                                    {/* Botão Próxima Página (Baixo) */}
                                    <button 
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }}
                                        disabled={currentPage === totalPages}
                                        className="w-11 h-11 rounded-full bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:border-white/5 disabled:hover:text-gray-400 transition-all"
                                        title="Próxima Página"
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
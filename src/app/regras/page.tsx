'use client';

import { useEffect, useState } from 'react';

type Regra = {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  nivelPunicao: string;
  ordem: number;
};

// 👇 A ORDEM OFICIAL DAS ABAS 👇
// A página vai forçar a exibição das categorias exatamente nesta ordem:
const ORDEM_CATEGORIAS = [
  'Hacks e Cheats',
  'Gerais',
  'Chat e Comunicação',
  'Construções e Terrenos',
  'Economia e Mercado',
  'Contas e Segurança'
];

export default function Regras() {
  const [regras, setRegras] = useState<Regra[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/regras')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setRegras(data);
          
          // Extrai as categorias que vieram do banco
          const catsUnicas = Array.from(new Set(data.map((r: Regra) => r.categoria))) as string[];
          
          // ✨ MÁGICA AQUI: Ordena as categorias com base na nossa lista oficial
          catsUnicas.sort((a, b) => {
            const indexA = ORDEM_CATEGORIAS.indexOf(a);
            const indexB = ORDEM_CATEGORIAS.indexOf(b);
            // Se por acaso alguém criar uma categoria diferente, ela vai pro final (999)
            return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
          });

          setCategorias(catsUnicas);
          if (catsUnicas.length > 0) setCategoriaAtiva(catsUnicas[0]);
        } else {
          // MOCK DE TESTE
          const mockRegras = [
            { id: '1', titulo: 'Toxicidade e Ofensas', descricao: 'Proibido insultos pesados...', categoria: 'Chat e Comunicação', nivelPunicao: 'Advertência', ordem: 1 },
            { id: '2', titulo: 'Uso de Hacks', descricao: 'Uso de modificações...', categoria: 'Hacks e Cheats', nivelPunicao: 'Permanente', ordem: 1 },
          ];
          setRegras(mockRegras);
          setCategorias(['Chat e Comunicação', 'Hacks e Cheats']);
          setCategoriaAtiva('Chat e Comunicação');
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const getCategoryIcon = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes('comunica') || lower.includes('chat')) return 'forum';
    if (lower.includes('jogo') || lower.includes('hacks') || lower.includes('cheat')) return 'sports_esports';
    if (lower.includes('conta') || lower.includes('segurança')) return 'manage_accounts';
    if (lower.includes('economia') || lower.includes('mercado')) return 'monetization_on';
    if (lower.includes('constru')) return 'architecture';
    return 'gavel';
  };

  const getPunishmentStyles = (nivel: string) => {
    if (nivel === 'Permanente') {
      return {
        cardHover: 'hover:border-red-500/50',
        dotHover: 'group-hover:border-red-500',
        badge: 'bg-red-500/10 text-red-500 border-red-500/20'
      };
    }
    if (nivel === 'Suspensão') {
      return {
        cardHover: 'hover:border-orange-500/50',
        dotHover: 'group-hover:border-orange-500',
        badge: 'bg-orange-500/10 text-orange-500 border-orange-500/20'
      };
    }
    return {
      cardHover: 'hover:border-yellow-500/50',
      dotHover: 'group-hover:border-yellow-500',
      badge: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    };
  };

  const regrasFiltradas = regras.filter(r => r.categoria === categoriaAtiva);

  return (
    <main className="min-h-screen pt-32 pb-24 bg-black relative overflow-hidden">
      
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-slide {
          animation: fadeSlide 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-[1340px] mx-auto px-6 md:px-8 relative z-10">
        
        <header className="mb-14 text-center flex flex-col items-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-md">
            <span className="material-symbols-outlined text-sm text-primary">menu_book</span>
            <span className="font-label-caps text-xs text-primary font-bold tracking-[0.2em] uppercase">
              Constituição do Servidor
            </span>
          </div>
          <h1 className="font-display-lg text-5xl md:text-7xl text-white font-black mb-6 tracking-tighter uppercase leading-none drop-shadow-xl">
            Nossas <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300">Regras</span>
          </h1>
          <p className="text-gray-400 font-body-lg text-base md:text-lg leading-relaxed max-w-2xl">
            Para mantermos a melhor experiência de Minecraft do Brasil, precisamos da colaboração de todos. O desconhecimento não isenta de punições.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-32 space-y-6">
              <div className="bg-surface-container-low p-6 rounded-[1.75rem] border border-white/5 shadow-xl">
                <h3 className="text-[#6B7280] font-bold text-[11px] tracking-widest uppercase mb-4 ml-1">
                  Tópicos de Regras
                </h3>
                {isLoading ? (
                  <div className="h-40 w-full animate-pulse bg-white/5 rounded-xl"></div>
                ) : (
                  <nav className="flex flex-col gap-2">
                    {categorias.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setCategoriaAtiva(cat)} 
                        className={`flex items-center gap-3 px-5 py-4 text-left font-bold rounded-2xl transition-all text-sm ${
                          categoriaAtiva === cat 
                          ? 'bg-primary/10 text-primary border border-primary/20 shadow-inner translate-x-2' 
                          : 'bg-black/20 border border-transparent text-gray-400 hover:bg-white/5 hover:border-white/5 hover:text-white'
                        }`}
                      >
                        <span className="material-symbols-outlined text-lg">{getCategoryIcon(cat)}</span>
                        {cat}
                      </button>
                    ))}
                  </nav>
                )}
              </div>

              <div className="bg-[#121316] p-6 rounded-[1.75rem] border border-[#ffdb3c]/30 shadow-[0_10px_30px_rgba(255,219,60,0.05)] relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-9xl text-[#ffdb3c]">gavel</span>
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4 text-[#ffdb3c]">
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                    <h3 className="font-headline-md text-lg font-black uppercase tracking-tight">O Bom Senso</h3>
                  </div>
                  <p className="font-body-sm text-gray-400 text-xs mb-5 leading-relaxed">
                    Nossas regras não cobrem todas as situações. O <strong className="text-white">bom senso</strong> é esperado de todos.
                  </p>
                  <div className="flex gap-1">
                    <div className="h-1 flex-1 bg-[#ffdb3c] rounded-l-full shadow-[0_0_10px_rgba(255,219,60,0.5)]"></div>
                    <div className="h-1 flex-1 bg-[#ffdb3c] shadow-[0_0_10px_rgba(255,219,60,0.5)]"></div>
                    <div className="h-1 flex-1 bg-[#ffdb3c]/20 rounded-r-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8 flex flex-col w-full">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : (
              <div className="bg-surface-container-low p-8 md:p-10 rounded-[2.5rem] border border-white/5 shadow-2xl min-h-[600px]">
                
                <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-inner">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {getCategoryIcon(categoriaAtiva)}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-display-lg text-3xl font-black uppercase tracking-tight text-white">{categoriaAtiva}</h2>
                    <p className="text-primary text-xs font-bold uppercase tracking-widest mt-1">
                      {regrasFiltradas.length} {regrasFiltradas.length === 1 ? 'Regra' : 'Regras'}
                    </p>
                  </div>
                </div>
                
                <div key={categoriaAtiva} className="border-l-2 border-white/10 ml-6 pl-8 md:pl-10 space-y-8 relative animate-fade-slide">
                  {regrasFiltradas.length > 0 ? (
                    regrasFiltradas.map((regra) => {
                      const styles = getPunishmentStyles(regra.nivelPunicao);
                      return (
                        <div key={regra.id} className={`relative group bg-[#121316] p-6 rounded-2xl border border-white/5 bg-white/[0.01] transition-all duration-300 shadow-lg ${styles.cardHover}`}>
                          
                          <div className={`absolute -left-[45px] md:-left-[53px] top-8 w-5 h-5 rounded-full bg-[#121316] border-4 border-white/20 group-hover:scale-125 transition-all duration-300 ${styles.dotHover}`}></div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                            <h3 className="text-white font-bold text-lg md:text-xl flex items-center gap-3">
                              <span className="text-gray-500 font-black text-sm">#{regra.ordem}</span>
                              {regra.titulo}
                            </h3>
                            
                            <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border whitespace-nowrap w-fit ${styles.badge}`}>
                              {regra.nivelPunicao || 'Advertência'}
                            </span>
                          </div>
                          
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {regra.descricao}
                          </p>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">Nenhuma regra encontrada nesta categoria.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            <section className="bg-surface-container-high p-8 md:p-10 rounded-[2rem] border border-outline-variant mt-10 shadow-xl">
              <h2 className="font-display-lg text-2xl font-black uppercase text-white mb-8 text-center">Níveis de Punição</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#121316] p-6 rounded-2xl border-t-4 border-yellow-500 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined">warning</span>
                  </div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Advertência</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">Avisos verbais ou silenciamento (mute) temporário no chat.</p>
                </div>

                <div className="bg-[#121316] p-6 rounded-2xl border-t-4 border-orange-500 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined">timer</span>
                  </div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Suspensão</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">Banimento temporário do servidor (de 1 a 30 dias).</p>
                </div>

                <div className="bg-[#121316] p-6 rounded-2xl border-t-4 border-red-500 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined">block</span>
                  </div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Permanente</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">Exclusão definitiva da conta e IP da nossa rede.</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
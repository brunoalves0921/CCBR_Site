'use client';
import { useState, useEffect, useRef } from 'react';
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

export default function Home() {
  const [ipCopiado, setIpCopiado] = useState(false);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoadingNoticias, setIsLoadingNoticias] = useState(true);
  
  const serverIP = 'jogar.ccbr.com.br';
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/noticias')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setNoticias(data);
          setActiveIndex(0);
        }
        setIsLoadingNoticias(false);
      })
      .catch(() => setIsLoadingNoticias(false));
  }, []);

  useEffect(() => {
    const el = document.getElementById(`news-item-${activeIndex}`);
    if (el && scrollContainerRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeIndex]);

  const copiarIP = () => {
    navigator.clipboard.writeText(serverIP);
    setIpCopiado(true);
    setTimeout(() => setIpCopiado(false), 2000);
  };

  const formatarData = (isoString: string) => {
    const data = new Date(isoString);
    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
      .replace(/ de /g, ' ')
      .replace('.', '')
      .toUpperCase();
  };

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (activeIndex < noticias.length - 1) setActiveIndex(prev => prev + 1);
  };

  const noticiaDestaque = noticias[activeIndex];

  return (
    <main className="mt-[80px]">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[80vh] md:min-h-[800px] flex items-center justify-center overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 z-0">
          <img
             className="w-full h-full object-cover filter brightness-[0.35]"
             alt="Paisagem Cinematográfica do Minecraft"
             src="/banner.webp"
           />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-surface-container-high/80 backdrop-blur-sm rounded-full border border-outline-variant shadow-lg">
            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(140,218,112,0.8)]"></span>
            <span className="font-label-caps text-xs md:text-sm text-gray-200 uppercase tracking-[0.2em] font-bold">
              142 Jogadores Online
            </span>
          </div>
          
          <div className="relative flex justify-center items-center py-6 group">
            <div className="absolute inset-0 bg-secondary-fixed/10 blur-[100px] rounded-full scale-75 opacity-30 group-hover:opacity-60 group-hover:bg-secondary-fixed/20 group-hover:scale-110 transition-all duration-1000 pointer-events-none"></div>
            <img
              src="/logo_ccbr.png"
              alt="Logo CCBR"
              className="w-[280px] sm:w-[350px] md:w-[480px] lg:w-[600px] h-auto object-contain relative z-10 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[0_0_40px_rgba(255,225,109,0.6)] group-hover:-translate-y-4 transition-all duration-700 ease-out"
            />
          </div>
          
          <p className="font-body-lg text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-md">
            A melhor experiência Minecraft do Brasil. Performance impecável, comunidade unida e modos de jogo inovadores em um ambiente competitivo e recompensador.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch mt-6 w-full md:w-auto relative z-20">
            <a href="#modos" className="flex items-center justify-center gap-3 px-12 py-4 bg-primary text-[#0A1A08] font-display-lg text-xl uppercase font-black rounded-lg hover:bg-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(140,218,112,0.3)] tracking-wide">
              <span className="material-symbols-outlined text-2xl">explore</span>
              EXPLORAR REDE
            </a>
            
            <button 
              onClick={copiarIP}
              className="group flex items-center justify-between bg-surface-container-highest/90 backdrop-blur-sm border-2 border-outline-variant rounded-lg cursor-pointer hover:border-primary transition-all overflow-hidden shadow-xl min-w-[280px]"
            >
              <div className="px-8 py-3 flex flex-col items-start">
                <span className="font-label-caps text-[11px] text-primary uppercase font-bold mb-1 tracking-widest">
                  IP DO SERVIDOR
                </span>
                <span className="font-display-lg text-xl text-white font-bold tracking-wide">
                  {ipCopiado ? 'COPIADO!' : serverIP}
                </span>
              </div>
              <div className="h-full px-6 bg-surface-container flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-colors border-l border-outline-variant">
                <span className="material-symbols-outlined text-2xl">{ipCopiado ? 'check' : 'content_copy'}</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ================= NOTÍCIAS ================= */}
      <section className="py-24 max-w-[1280px] mx-auto px-6 md:px-12 relative z-20">
        <div className="mb-12 pb-6">
          <span className="text-primary font-bold text-[11px] tracking-widest uppercase mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">campaign</span>
            Mural de Atualizações
          </span>
          <h2 className="text-white font-black text-3xl md:text-5xl uppercase tracking-tight">
            Últimos <span className="text-primary">Anúncios</span>
          </h2>
        </div>

        {isLoadingNoticias ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : noticias.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-low rounded-3xl border border-outline-variant">
            <span className="material-symbols-outlined text-5xl text-gray-500 mb-4">newspaper</span>
            <h3 className="text-xl font-bold text-white">Nenhum anúncio no momento</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {noticiaDestaque && (
              <div className="lg:col-span-8 flex flex-col overflow-hidden">
                <Link href={`/noticia/${noticiaDestaque.id}`} className="group block w-full">
                  <div className="w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden relative mb-8">
                    {noticiaDestaque.imagem ? (
                      <img src={noticiaDestaque.imagem} alt={noticiaDestaque.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                    ) : (
                      <div className="w-full h-full bg-surface-container-low flex items-center justify-center">
                        <span className="material-symbols-outlined text-7xl text-white/5">article</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 z-10">
                      <span className="bg-primary text-[#0A1A08] font-black px-4 py-1.5 text-[10px] sm:text-xs uppercase tracking-widest rounded-full shadow-lg">
                        {noticiaDestaque.tag || 'ATUALIZAÇÃO'}
                      </span>
                    </div>
                  </div>
                  <div className="pr-4 md:pr-8 w-full">
                    <span className="text-gray-400 font-bold text-xs uppercase tracking-[0.15em] block mb-4">
                      HOJE, {formatarData(noticiaDestaque.createdAt)}
                    </span>
                    <h3 className="text-white font-black text-3xl md:text-4xl lg:text-[42px] leading-tight uppercase mb-6 tracking-tight line-clamp-2 break-all">
                      {noticiaDestaque.titulo}
                    </h3>
                    <p className="text-[#9CA3AF] text-base md:text-lg leading-relaxed mb-8 line-clamp-4 break-words">
                      {noticiaDestaque.conteudo || noticiaDestaque.resumo}
                    </p>
                    <span className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm group-hover:gap-4 transition-all">
                      LER MATÉRIA COMPLETA <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </span>
                  </div>
                </Link>
              </div>
            )}

            <div className="lg:col-span-4 flex flex-col justify-start">
              <h4 className="text-[#6B7280] font-bold text-[11px] tracking-widest uppercase mb-6">RECENTES</h4>
              <div className="relative flex flex-col h-[500px]">
                <div className="absolute left-[11px] top-6 bottom-6 w-px bg-[#374151] z-0"></div>
                {noticias.length > 1 && (
                  <button onClick={handlePrev} disabled={activeIndex === 0} className="w-6 h-6 rounded-full bg-background border border-[#374151] hover:border-gray-400 flex items-center justify-center text-gray-500 hover:text-white disabled:opacity-0 disabled:pointer-events-none transition-all z-10 mb-2 relative left-[0px]">
                    <span className="material-symbols-outlined text-sm">keyboard_arrow_up</span>
                  </button>
                )}
                <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] z-10 py-2">
                  <div className="flex flex-col gap-10 relative">
                    {noticias.map((noticia, index) => {
                      const isActive = index === activeIndex;
                      return (
                        <div key={noticia.id} id={`news-item-${index}`} onClick={() => setActiveIndex(index)} className={`relative group cursor-pointer pl-10 transition-all duration-300 w-full ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}>
                          {isActive ? (
                            <div className="absolute left-[8px] top-1.5 w-2 h-2 rounded-full bg-[#EAB308] shadow-[0_0_10px_rgba(234,179,8,0.8)] z-10"></div>
                          ) : (
                            <div className="absolute left-[8px] top-1.5 w-2 h-2 rounded-full bg-[#4B5563] group-hover:bg-[#9CA3AF] z-10 transition-colors"></div>
                          )}
                          <span className={`font-bold text-[10px] tracking-widest mb-1.5 block uppercase ${isActive ? 'text-[#EAB308]' : 'text-[#6B7280]'}`}>
                            {formatarData(noticia.createdAt)}
                          </span>
                          <h5 className={`font-bold text-lg mb-2 leading-tight line-clamp-2 break-all ${isActive ? 'text-white' : 'text-[#D1D5DB] group-hover:text-white'}`}>
                            {noticia.titulo}
                          </h5>
                          <p className="text-[#9CA3AF] text-[13px] leading-relaxed line-clamp-3 break-words">
                            {noticia.resumo}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {noticias.length > 1 && (
                  <button onClick={handleNext} disabled={activeIndex === noticias.length - 1} className="w-6 h-6 rounded-full bg-background border border-[#374151] hover:border-gray-400 flex items-center justify-center text-gray-500 hover:text-white disabled:opacity-0 disabled:pointer-events-none transition-all z-10 mt-2 relative left-[0px]">
                    <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ================= MODOS DE JOGO ================= */}
      <section id="modos" className="scroll-mt-32 py-24 max-w-[1280px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col items-center text-center mb-16 gap-4">
          <span className="text-primary font-bold text-[11px] tracking-widest uppercase flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">explore</span>
            Escolha seu Caminho
          </span>
          <h2 className="text-white font-black text-4xl md:text-5xl uppercase tracking-tight">
            MODOS DE <span className="text-primary">JOGO</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mt-2">
            Explore nossas diversas dimensões competitivas e casuais. Conheça o seu estilo de jogo e veja os detalhes de cada um.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Survival */}
          <Link href="/modos/survival" className="group relative w-full h-[450px] rounded-[2rem] overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-2xl">
            <img src="/banner.webp" alt="Survival Vanilla" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"></div>
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary text-xl">nature</span>
                <span className="text-primary font-bold text-[10px] tracking-widest uppercase">Mundo Aberto</span>
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-3">Survival Vanilla+</h3>
              <p className="text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                Economia real, sistemas de terrenos e proteção. O survival clássico elevado ao próximo nível com dungeons e eventos.
              </p>
              
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest group-hover:text-primary transition-colors">
                Ver Detalhes <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </Link>

          {/* Card 2: Skyblock */}
          <Link href="/modos/skyblock" className="group relative w-full h-[450px] rounded-[2rem] overflow-hidden border border-white/10 hover:border-secondary-fixed/50 transition-all duration-500 shadow-2xl">
            <img src="/banner.webp" alt="Skyblock" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"></div>
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-secondary-fixed text-xl">auto_awesome</span>
                <span className="text-secondary-fixed font-bold text-[10px] tracking-widest uppercase">Mais Jogado</span>
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-3">Skyblock Épico</h3>
              <p className="text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                Crie sua ilha do zero, automatize geradores de recursos, faça parcerias e torne-se o jogador mais rico do servidor.
              </p>
              
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest group-hover:text-secondary-fixed transition-colors">
                Ver Detalhes <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </Link>

          {/* Card 3: BedWars */}
          <Link href="/modos/bedwars" className="group relative w-full h-[450px] rounded-[2rem] overflow-hidden border border-white/10 hover:border-red-400/50 transition-all duration-500 shadow-2xl">
            <img src="/banner.webp" alt="BedWars" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"></div>
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-red-400 text-xl">swords</span>
                <span className="text-red-400 font-bold text-[10px] tracking-widest uppercase">Competitivo</span>
              </div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-3">BedWars Pro</h3>
              <p className="text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                Mapas exclusivos, proteção de cama estratégica e itens especiais. Partidas rápidas com ping perfeito para PvP.
              </p>
              
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest group-hover:text-red-400 transition-colors">
                Ver Detalhes <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* ================= COMUNIDADE / DISCORD ================= */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-gradient-to-br from-[#5865F2]/10 via-surface-container-high to-surface-container-low border border-[#5865F2]/20 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
            
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#5865F2]/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
              
              <div className="lg:col-span-7 text-center lg:text-left">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#5865F2]/20 border border-[#5865F2]/30 text-[#5865F2] text-xs font-bold font-label-caps rounded-full uppercase tracking-widest mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#5865F2] animate-pulse"></span>
                  Comunidade Ativa
                </span>
                <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white mb-6 tracking-tighter">
                  Sua jornada começa <br className="hidden lg:block" />
                  <span className="text-[#5865F2]">no nosso Discord</span>
                </h2>
                
                <p className="w-full font-body-lg text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Mais do que um servidor de Minecraft, somos uma família com milhares de jogadores. Fique por dentro de sorteios, encontre grupos para jogar e tenha suporte direto com a Staff.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="#" className="flex items-center justify-center gap-3 px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-label-caps font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(88,101,242,0.4)] hover:-translate-y-1">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 127.14 96.36">
                      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.33,46,96.22,53,91.08,65.69,84.69,65.69Z"/>
                    </svg>
                    Aceitar Convite
                  </a>
                  <Link href="/equipe" className="flex items-center justify-center gap-3 px-8 py-4 bg-surface-container border border-outline-variant text-white font-label-caps font-bold uppercase tracking-widest rounded-xl hover:bg-white hover:text-background transition-all hover:-translate-y-1">
                    Ver Equipe
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="w-full max-w-[400px] bg-[#2B2D31] border border-[#1E1F22] rounded-2xl p-6 relative z-10 shadow-2xl flex flex-col gap-4 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                  
                  <div className="flex items-center justify-between border-b border-[#1E1F22] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-background font-black text-xs">CCBR</div>
                      <div>
                        <h4 className="text-white font-bold text-sm">Rede CCBR</h4>
                        <p className="text-[#B5BAC1] text-xs">🟢 1.204 Online</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-3 group">
                      <div className="relative">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-10 h-10 rounded-full bg-[#1E1F22]" />
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#23A559] border-[2.5px] border-[#2B2D31] rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">CraftMaster <span className="text-[#B5BAC1] text-[10px] ml-1">#OWNER</span></p>
                        <p className="text-[#B5BAC1] text-xs">Jogando <span className="text-white font-medium">Minecraft</span></p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 group">
                      <div className="relative">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="w-10 h-10 rounded-full bg-[#1E1F22]" />
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#F0B232] border-[2.5px] border-[#2B2D31] rounded-full"></div>
                      </div>
                      <div>
                        <p className="text-[#F0B232] text-sm font-medium">VoxelKing</p>
                        <p className="text-[#B5BAC1] text-xs">Jogando <span className="text-white font-medium">Skyblock Épico</span></p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 group">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-sm">mic</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">🔊 Bate-Papo Geral</p>
                        <p className="text-[#B5BAC1] text-xs">48 usuários na call</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
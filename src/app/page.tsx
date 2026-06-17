'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [ipCopiado, setIpCopiado] = useState(false);
  const serverIP = 'jogar.ccbr.com.br';

  const copiarIP = () => {
    navigator.clipboard.writeText(serverIP);
    setIpCopiado(true);
    setTimeout(() => setIpCopiado(false), 2000);
  };

  return (
    <main className="mt-[80px]">
      
      {/* Seção Principal (Hero) com altura dinâmica corrigida */}
      <section className="relative min-h-[80vh] md:min-h-[800px] flex items-center justify-center overflow-hidden pt-32 pb-24 border-b border-outline-variant">
        <div className="absolute inset-0 z-0">
          <img
             className="w-full h-full object-cover filter brightness-[0.35]"
             alt="Paisagem Cinematográfica do Minecraft"
             src="/banner.webp"
           />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center gap-6">
          {/* Tag de Status */}
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-surface-container-high/80 backdrop-blur-sm rounded-full border border-outline-variant shadow-lg">
            <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(140,218,112,0.8)]"></span>
            <span className="font-label-caps text-xs md:text-sm text-gray-200 uppercase tracking-[0.2em] font-bold">
              142 Jogadores Online
            </span>
          </div>
          
          {/* Logo Principal com Efeito Encantado (Golden & Floating) */}
          <div className="relative flex justify-center items-center py-6 group">
            {/* Aura Dourada Mágica */}
            <div className="absolute inset-0 bg-secondary-fixed/10 blur-[100px] rounded-full scale-75 opacity-30 group-hover:opacity-60 group-hover:bg-secondary-fixed/20 group-hover:scale-110 transition-all duration-1000 pointer-events-none"></div>
            
            {/* Imagem do Logo com Levitação e Sombra Dourada */}
            <img
              src="/logo_ccbr.png"
              alt="Logo CCBR"
              className="w-[280px] sm:w-[350px] md:w-[480px] lg:w-[600px] h-auto object-contain relative z-10 
                         drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] 
                         group-hover:drop-shadow-[0_0_40px_rgba(255,225,109,0.6)]
                         group-hover:-translate-y-4 transition-all duration-700 ease-out"
            />
          </div>
          
          {/* Subtítulo */}
          <p className="font-body-lg text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-md">
            A melhor experiência Minecraft do Brasil. Performance impecável, comunidade unida e modos de jogo inovadores em um ambiente competitivo e recompensador.
          </p>
          
          {/* Botões de Ação */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch mt-6 w-full md:w-auto relative z-20">
            <Link href="/loja" className="flex items-center justify-center px-12 py-4 bg-primary text-background font-display-lg text-xl uppercase font-black rounded-lg hover:bg-secondary-fixed transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(140,218,112,0.3)] tracking-wide">
              JOGUE AGORA
            </Link>
            
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

      {/* NOVO: Seção de Notícias (Layout Revista / Sem Cards) */}
      <section className="py-24 max-w-[1280px] mx-auto px-6 md:px-12 relative z-20">
        <div className="mb-16 border-b border-outline-variant pb-6 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="font-label-caps text-sm text-primary font-bold tracking-widest uppercase mb-2 block">Central de Informações</span>
            <h2 className="font-display-lg text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              Últimas <span className="text-primary">Notícias</span>
            </h2>
          </div>
          <Link href="#" className="flex items-center gap-2 text-gray-400 hover:text-white font-bold uppercase text-sm tracking-widest transition-colors group">
            Ver Arquivo Completo
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Matéria Principal (Esquerda - 8 colunas) */}
          <div className="lg:col-span-8 group cursor-pointer">
            <div className="w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden relative mb-8 shadow-2xl">
              <img src="/banner.webp" alt="Atualização Principal" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
              {/* Gradiente sutil para escurecer a base da imagem */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 flex gap-3 z-10">
                <span className="bg-primary text-black font-label-caps font-bold px-4 py-1.5 text-xs uppercase tracking-widest rounded-full shadow-lg">
                  Grande Atualização
                </span>
              </div>
            </div>
            
            <div className="pr-4">
              <span className="text-gray-400 font-label-caps text-sm font-bold tracking-[0.15em] block mb-4">HOJE, 16 DE JUNHO DE 2026</span>
              <h3 className="font-display-lg text-4xl md:text-5xl text-white font-black uppercase mb-6 group-hover:text-primary transition-colors leading-tight tracking-tighter">
                A Nova Temporada do Survival Começou!
              </h3>
              <p className="text-gray-400 font-body-lg text-lg leading-relaxed mb-6">
                Prepare-se para o maior reset da nossa história. Reconstruímos o sistema de economia do zero, adicionamos novos biomas exploráveis, dungeons dinâmicas e o aguardado sistema de clãs competitivos. Entre agora e garanta sua tag exclusiva de pioneiro desta temporada.
              </p>
              <span className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm group-hover:gap-3 transition-all">
                Ler matéria completa <span className="material-symbols-outlined text-sm">east</span>
              </span>
            </div>
          </div>

          {/* Linha do Tempo (Direita - 4 colunas) */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <h4 className="font-label-caps text-sm text-white font-bold tracking-widest mb-8 uppercase opacity-50">Recentes</h4>
            
            <div className="flex flex-col gap-8 border-l border-outline-variant pl-8 relative">
              
              {/* Item de Timeline 1 */}
              <div className="relative group cursor-pointer">
                <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-secondary-fixed shadow-[0_0_12px_rgba(255,225,109,0.8)] group-hover:scale-150 transition-transform"></div>
                <span className="text-secondary-fixed font-label-caps text-xs font-bold tracking-widest mb-2 block">12 DE JUN. 2026</span>
                <h5 className="text-white font-headline-md font-bold text-xl mb-2 group-hover:text-secondary-fixed transition-colors">Torneio BedWars de Férias</h5>
                <p className="text-gray-400 font-body-md text-sm leading-relaxed">Inscrições abertas para o campeonato deste final de semana. Junte seu esquadrão e concorra a prêmios em dinheiro e VIPs Ouro.</p>
              </div>

              {/* Item de Timeline 2 */}
              <div className="relative group cursor-pointer">
                <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-surface-variant border-2 border-outline-variant group-hover:bg-white transition-colors"></div>
                <span className="text-gray-500 font-label-caps text-xs font-bold tracking-widest mb-2 block">08 DE JUN. 2026</span>
                <h5 className="text-white font-headline-md font-bold text-xl mb-2 group-hover:text-white transition-colors">Patch Notes: V 2.4.1</h5>
                <p className="text-gray-400 font-body-md text-sm leading-relaxed">Atualização nas medidas do Anti-Cheat, correção de bugs no Skyblock e melhorias de latência (ping).</p>
              </div>

              {/* Item de Timeline 3 */}
              <div className="relative group cursor-pointer">
                <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-surface-variant border-2 border-outline-variant group-hover:bg-white transition-colors"></div>
                <span className="text-gray-500 font-label-caps text-xs font-bold tracking-widest mb-2 block">02 DE JUN. 2026</span>
                <h5 className="text-white font-headline-md font-bold text-xl mb-2 group-hover:text-white transition-colors">Novo Membro na Staff</h5>
                <p className="text-gray-400 font-body-md text-sm leading-relaxed">Dêem as boas vindas ao nosso novo administrador de infraestrutura que vai focar em manter o servidor 100% online.</p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Grid de Modos de Jogo (Mantido, pois os cards aqui fazem sentido para separar os minigames) */}
      <section className="py-24 max-w-[1280px] mx-auto px-6 md:px-12 border-t border-outline-variant">
        <div className="flex flex-col items-center text-center mb-16 gap-5">
          <h2 className="font-display-lg text-4xl md:text-5xl font-black uppercase text-white tracking-tight drop-shadow-sm">
            MODOS DE <span className="text-primary">JOGO</span>
          </h2>
          <p className="font-body-lg text-lg text-gray-400 max-w-2xl font-medium">
            Explore nossas diversas dimensões competitivas e casuais. Escolha o seu caminho e comece a aventura.
          </p>
          <div className="flex gap-2 mt-2">
            <div className="h-2 w-8 bg-primary rounded-full shadow-[0_0_10px_rgba(140,218,112,0.5)]"></div>
            <div className="h-2 w-8 bg-primary rounded-full shadow-[0_0_10px_rgba(140,218,112,0.5)]"></div>
            <div className="h-2 w-8 bg-primary rounded-full opacity-30"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Survival */}
          <div className="group flex flex-col bg-surface-container rounded-2xl border border-outline-variant p-6 hover-ignite transition-all duration-300 shadow-lg">
            <div className="aspect-video w-full mb-6 rounded-xl overflow-hidden border border-outline-variant relative">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Survival Vanilla" src="/banner.webp" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-xl">nature</span>
              <span className="font-label-caps text-xs text-primary uppercase font-bold tracking-widest">Mundo Aberto</span>
            </div>
            <h3 className="font-headline-md text-3xl font-bold mb-3 text-white">Survival Vanilla+</h3>
            <p className="font-body-md text-gray-400 mb-8 flex-grow leading-relaxed">
              Economia real, sistemas de terrenos e proteção. O survival clássico elevado ao próximo nível.
            </p>
            <button className="w-full py-4 rounded-xl bg-surface-container-high border border-outline-variant font-label-caps font-bold text-white hover:bg-primary hover:text-background hover:border-primary transition-all uppercase tracking-widest text-sm">
              Ver Detalhes
            </button>
          </div>
          {/* Skyblock */}
          <div className="group flex flex-col bg-surface-container rounded-2xl border-2 border-secondary-fixed p-6 enchanted-glint hover:shadow-[0_0_30px_rgba(255,225,109,0.15)] transition-all duration-300">
            <div className="aspect-video w-full mb-6 rounded-xl overflow-hidden border border-outline-variant relative">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Skyblock" src="/banner.webp" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary-fixed text-xl">auto_awesome</span>
              <span className="font-label-caps text-xs text-secondary-fixed uppercase font-bold tracking-widest">VIP Em Destaque</span>
            </div>
            <h3 className="font-headline-md text-3xl font-bold mb-3 text-secondary-fixed">Skyblock Épico</h3>
            <p className="font-body-md text-gray-400 mb-8 flex-grow leading-relaxed">
              Crie sua ilha, automatize recursos e torne-se o jogador mais rico do servidor.
            </p>
            <button className="w-full py-4 rounded-xl bg-secondary-fixed text-background font-label-caps font-bold hover:bg-white transition-all uppercase tracking-widest text-sm shadow-md">
              Jogar Agora
            </button>
          </div>
          {/* BedWars */}
          <div className="group flex flex-col bg-surface-container rounded-2xl border border-outline-variant p-6 hover-ignite transition-all duration-300 shadow-lg">
            <div className="aspect-video w-full mb-6 rounded-xl overflow-hidden border border-outline-variant relative">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="BedWars" src="/banner.webp" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-red-400 text-xl">swords</span>
              <span className="font-label-caps text-xs text-red-400 uppercase font-bold tracking-widest">Competitivo</span>
            </div>
            <h3 className="font-headline-md text-3xl font-bold mb-3 text-white">BedWars Pro</h3>
            <p className="font-body-md text-gray-400 mb-8 flex-grow leading-relaxed">
              Mapas exclusivos, proteção de cama e itens especiais. Partidas rápidas com ping zero.
            </p>
            <button className="w-full py-4 rounded-xl bg-surface-container-high border border-outline-variant font-label-caps font-bold text-white hover:bg-primary hover:text-background hover:border-primary transition-all uppercase tracking-widest text-sm">
              Ver Detalhes
            </button>
          </div>
        </div>
      </section>

      {/* Seção Call to Action: Comunidade Imersiva com CSS GRID corrigido */}
      <section className="py-24 px-6 relative z-10 bg-surface-container-lowest border-t border-outline-variant">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-gradient-to-br from-[#5865F2]/10 via-surface-container-high to-surface-container-low border border-[#5865F2]/20 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
            
            {/* Brilho decorativo no fundo */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#5865F2]/20 blur-[120px] rounded-full pointer-events-none"></div>

            {/* Layout em GRID para evitar o achatamento de texto */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
              
              {/* Coluna Esquerda: Textos e Botões (Ocupa 7 colunas) */}
              <div className="lg:col-span-7 text-center lg:text-left">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#5865F2]/20 border border-[#5865F2]/30 text-[#5865F2] text-xs font-bold font-label-caps rounded-full uppercase tracking-widest mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#5865F2] animate-pulse"></span>
                  Comunidade Ativa
                </span>
                <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white mb-6 tracking-tighter">
                  Sua jornada começa <br className="hidden lg:block" />
                  <span className="text-[#5865F2]">no nosso Discord</span>
                </h2>
                
                {/* Aqui está o pulo do gato: w-full e o Grid impedem que este texto amasse! */}
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

              {/* Coluna Direita: Widget Simulado do Discord (Ocupa 5 colunas) */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="w-full max-w-[400px] bg-[#2B2D31] border border-[#1E1F22] rounded-2xl p-6 relative z-10 shadow-2xl flex flex-col gap-4 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                  
                  {/* Header do Widget */}
                  <div className="flex items-center justify-between border-b border-[#1E1F22] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-background font-black text-xs">CCBR</div>
                      <div>
                        <h4 className="text-white font-bold text-sm">Rede CCBR</h4>
                        <p className="text-[#B5BAC1] text-xs">🟢 1.204 Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Lista Mockada de Jogadores */}
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
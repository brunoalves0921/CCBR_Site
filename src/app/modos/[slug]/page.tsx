'use client';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useState } from 'react';

// Dicionário de dados para cada modo de jogo
const modosData: Record<string, any> = {
  survival: {
    nome: 'Survival Vanilla+',
    cor: 'text-primary',
    bgBadge: 'bg-primary',
    icone: 'nature',
    slogan: 'A essência do Minecraft, aprimorada.',
    descricao: 'Nosso Survival Vanilla+ foi desenhado para quem ama a experiência clássica de sobrevivência, mas sente falta de um objetivo a longo prazo. Com uma economia balanceada, sistema de terrenos para proteger suas construções e eventos diários, você pode jogar sozinho ou formar uma vila inteira com seus amigos.',
    dificuldade: 'Média',
    pvp: 'Apenas à noite',
    economia: 'Focada em Lojas de Jogadores',
    features: [
      { icone: 'landscape', titulo: 'Sistema de Terrenos', desc: 'Proteja sua casa e seus baús usando blocos de proteção. Ninguém poderá quebrar nada sem sua permissão.' },
      { icone: 'storefront', titulo: 'Mercado Livre', desc: 'Crie sua própria loja usando placas e baús. Venda seus recursos e torne-se um magnata.' },
      { icone: 'swords', titulo: 'Dungeons & Bosses', desc: 'Explore cavernas personalizadas com chefões únicos que dropam itens raros e cosméticos.' },
      { icone: 'groups', titulo: 'Sistema de Clãs', desc: 'Junte-se a amigos, defina uma base, suba de nível o seu clã e participe de guerras semanais.' }
    ]
  },
  skyblock: {
    nome: 'Skyblock Épico',
    cor: 'text-secondary-fixed',
    bgBadge: 'bg-secondary-fixed',
    icone: 'auto_awesome',
    slogan: 'Do nada absoluto ao império flutuante.',
    descricao: 'Você começa em uma pequena ilha flutuante com recursos limitados. Seu objetivo? Expandir, automatizar e dominar. O Skyblock Épico conta com geradores personalizados, minions que trabalham por você enquanto está offline e uma corrida insana pelo topo do ranking de ilhas.',
    dificuldade: 'Difícil (Grind)',
    pvp: 'Apenas na Arena',
    economia: 'Focada em Automação (Spawners/Farms)',
    features: [
      { icone: 'smart_toy', titulo: 'Minions', desc: 'Robôs trabalhadores que mineram, matam mobs e colhem plantações para você 24h por dia.' },
      { icone: 'upgrade', titulo: 'Geradores de Minérios', desc: 'Melhore seu gerador de pedras para que ele comece a dropar minérios raros como diamantes e esmeraldas.' },
      { icone: 'emoji_events', titulo: 'Ilha Top 1', desc: 'Coloque blocos valiosos na sua ilha para aumentar seu nível. As melhores ilhas ganham Cash todo mês.' },
      { icone: 'hardware', titulo: 'Encantamentos Custom', desc: 'Mais de 50 encantamentos novos para suas ferramentas e armaduras, mudando completamente a jogabilidade.' }
    ]
  },
  bedwars: {
    nome: 'BedWars Pro',
    cor: 'text-red-400',
    bgBadge: 'bg-red-400',
    icone: 'swords',
    slogan: 'Proteja sua cama e destrua seus inimigos.',
    descricao: 'O minigame mais famoso do mundo, rodando liso e sem lag. Compre itens, melhore suas ferramentas, defenda sua base e seja a última equipe de pé. Nosso BedWars possui mapas exclusivos criados pelos nossos construtores e um sistema de pareamento rápido.',
    dificuldade: 'Competitiva',
    pvp: 'Sempre Ativo',
    economia: 'In-game (Ferro, Ouro, Diamante e Esmeralda)',
    features: [
      { icone: 'sports_esports', titulo: 'Vários Modos', desc: 'Jogue Solo, Duplas, Trios ou Quartetos. Chame seu esquadrão e monte a estratégia perfeita.' },
      { icone: 'speed', titulo: 'Ping Perfeito', desc: 'Servidor hospedado no Brasil com rota otimizada para garantir que o seu PvP (hitbox) seja impecável.' },
      { icone: 'leaderboard', titulo: 'Rankings e Ligas', desc: 'Vença partidas para ganhar ELO. Suba de Bronze até o cobiçado rank Radiante.' },
      { icone: 'checkroom', titulo: 'Cosméticos', desc: 'Efeitos de abate, rastros de flechas e danças de vitória personalizadas para você exibir seu estilo.' }
    ]
  }
};

export default function ModoPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [ipCopiado, setIpCopiado] = useState(false);
  const serverIP = 'jogar.ccbr.com.br';

  const copiarIP = () => {
    navigator.clipboard.writeText(serverIP);
    setIpCopiado(true);
    setTimeout(() => setIpCopiado(false), 2000);
  };

  // Trava de segurança para aguardar os parâmetros carregarem antes de validar
  if (!slug) return null;

  const modo = modosData[slug];

  // Se o usuário digitar uma URL que não existe (ex: /modos/teste)
  if (!modo) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
      
      {/* Botão Voltar */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-8 relative z-20">
        <Link href="/#modos" className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors bg-surface-container-low border border-white/5 px-4 py-2 rounded-lg hover:bg-white/5">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Voltar para o Início
        </Link>
      </div>

      {/* HERO DO MODO */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10 mb-16">
        <div className="w-full aspect-[21/9] md:aspect-[21/7] rounded-[2rem] overflow-hidden relative shadow-2xl border border-white/10">
          <img src="/banner.webp" alt={modo.nome} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/80 via-transparent to-transparent"></div>
          
          <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center ${modo.cor}`}>
                <span className="material-symbols-outlined text-2xl">{modo.icone}</span>
              </div>
              <span className={`${modo.cor} font-black text-xs md:text-sm tracking-[0.2em] uppercase bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg`}>
                Guia Oficial
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
              {modo.nome}
            </h1>
            <p className="text-xl text-gray-300 font-medium max-w-2xl">
              {modo.slogan}
            </p>
          </div>
        </div>
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Esquerda: Textos e Features */}
        <div className="lg:col-span-8">
          <div className="bg-surface-container-low border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-lg mb-8">
            <h2 className="text-2xl font-black text-white uppercase mb-6 flex items-center gap-3 border-b border-white/5 pb-6">
              <span className="material-symbols-outlined text-primary">info</span>
              Sobre o Jogo
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {modo.descricao}
            </p>

            <h3 className="text-xl font-bold text-white uppercase mb-6 tracking-wide mt-12">Principais Mecânicas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {modo.features.map((feat: any, idx: number) => (
                <div key={idx} className="bg-black/40 border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors">
                  <span className={`material-symbols-outlined text-3xl mb-4 ${modo.cor}`}>{feat.icone}</span>
                  <h4 className="text-white font-bold text-lg mb-2">{feat.titulo}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Direita: Sidebar / Informações Rápidas */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Card Jogar */}
          <div className="bg-gradient-to-br from-surface-container-high to-surface-container-low border border-white/5 rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 ${modo.bgBadge}/10 blur-[50px] pointer-events-none`}></div>
            
            <h3 className="text-white font-black text-2xl uppercase tracking-tight mb-2">Pronto para jogar?</h3>
            <p className="text-gray-400 text-sm mb-8">Conecte-se agora mesmo e acesse este modo através do menu (Bússola) no Lobby principal.</p>
            
            <button 
              onClick={copiarIP}
              className="w-full bg-[#121316] border border-white/10 hover:border-primary text-white font-bold py-4 rounded-xl transition-all flex items-center justify-between px-6 group"
            >
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-primary uppercase tracking-widest">IP DO SERVIDOR</span>
                <span className="text-lg tracking-wide">{ipCopiado ? 'COPIADO!' : serverIP}</span>
              </div>
              <span className="material-symbols-outlined text-gray-500 group-hover:text-primary transition-colors">
                {ipCopiado ? 'check' : 'content_copy'}
              </span>
            </button>

            <Link href="/loja" className={`mt-4 w-full flex items-center justify-center gap-2 ${modo.bgBadge} text-[#09090b] font-black py-4 rounded-xl hover:bg-white transition-colors uppercase tracking-widest text-sm shadow-lg`}>
              <span className="material-symbols-outlined text-lg">shopping_cart</span>
              Ver Loja VIP
            </Link>
          </div>

          {/* Ficha Técnica */}
          <div className="bg-surface-container-low border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6 pb-4 border-b border-white/5">Ficha Técnica</h3>
            
            <ul className="space-y-6">
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="material-symbols-outlined text-lg">signal_cellular_alt</span>
                  <span className="text-sm font-medium">Dificuldade</span>
                </div>
                <span className="text-white font-bold text-sm bg-white/5 px-3 py-1 rounded-md">{modo.dificuldade}</span>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="material-symbols-outlined text-lg">payments</span>
                  <span className="text-sm font-medium">Economia</span>
                </div>
                <span className="text-white font-bold text-sm bg-white/5 px-3 py-1 rounded-md text-right w-1/2 line-clamp-1 truncate">{modo.economia}</span>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="material-symbols-outlined text-lg">swords</span>
                  <span className="text-sm font-medium">Combate (PvP)</span>
                </div>
                <span className="text-white font-bold text-sm bg-white/5 px-3 py-1 rounded-md">{modo.pvp}</span>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="material-symbols-outlined text-lg">update</span>
                  <span className="text-sm font-medium">Versão Ideal</span>
                </div>
                <span className="text-primary font-black text-sm bg-primary/10 border border-primary/20 px-3 py-1 rounded-md">1.20.x</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

    </main>
  );
}
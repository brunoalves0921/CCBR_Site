  'use client';

  export default function Regras() {
    return (
      <main className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
        
        {/* Luzes de fundo (Aura) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

        <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
          
          {/* Hero Header das Regras */}
          <header className="mb-16 text-center flex flex-col items-center border-b border-outline-variant pb-12">
            <span className="font-label-caps text-sm text-primary font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">menu_book</span>
              Constituição do Servidor
            </span>
            <h1 className="font-display-lg text-5xl md:text-6xl text-white font-black mb-6 tracking-tighter uppercase">
              Diretrizes <span className="text-primary">da Comunidade</span>
            </h1>
            <p className="text-gray-400 font-body-lg text-lg leading-relaxed max-w-2xl">
              Para mantermos a melhor experiência de Minecraft do Brasil, precisamos da colaboração de todos. Leia atentamente as regras abaixo.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Coluna Esquerda: Fixa (Sticky) com Avisos */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="sticky top-32 space-y-8">
                
                {/* Aviso de Bom Senso (Destaque Dourado) */}
                <div className="bg-surface-container-low p-8 rounded-[2rem] border border-secondary-fixed/50 enchanted-glint relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6 text-secondary-fixed">
                      <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
                      <h3 className="font-headline-md text-2xl font-black uppercase tracking-tight">O Bom Senso</h3>
                    </div>
                    
                    <p className="font-body-md text-gray-300 mb-8 leading-relaxed">
                      Nossas regras não cobrem todas as situações. O <strong className="text-white">bom senso</strong> é esperado de todos. A Staff reserva-se o direito de intervir em qualquer comportamento tóxico.
                    </p>
                    
                    <div className="flex gap-1 mb-4">
                      <div className="h-1.5 flex-1 bg-secondary-fixed rounded-l-full shadow-[0_0_10px_rgba(255,225,109,0.5)]"></div>
                      <div className="h-1.5 flex-1 bg-secondary-fixed shadow-[0_0_10px_rgba(255,225,109,0.5)]"></div>
                      <div className="h-1.5 flex-1 bg-secondary-fixed shadow-[0_0_10px_rgba(255,225,109,0.5)]"></div>
                      <div className="h-1.5 flex-1 bg-secondary-fixed/20 rounded-r-full"></div>
                    </div>
                    <span className="font-label-caps text-[10px] text-gray-400 font-bold tracking-widest uppercase">Nível de Rigor: Alto</span>
                  </div>
                </div>

                {/* Como Denunciar */}
                <div className="bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant">
                  <h4 className="font-label-caps text-sm text-primary font-bold tracking-widest mb-4 uppercase">Como Denunciar?</h4>
                  <p className="font-body-sm text-gray-400 mb-6 leading-relaxed">
                    Presenciou uma infração? Use o comando <strong className="text-white bg-surface-variant px-2 py-1 rounded">/report</strong> no servidor ou abra um ticket no Discord.
                  </p>
                  <button className="w-full bg-surface-container text-white py-3 rounded-xl border border-outline-variant font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-black hover:border-primary transition-all uppercase tracking-widest text-xs">
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    Abrir Ticket
                  </button>
                </div>

              </div>
            </aside>

            {/* Coluna Direita: Lista de Regras (Estilo Timeline) */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Bloco 1: Chat */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
                  </div>
                  <h2 className="font-display-lg text-3xl font-black uppercase tracking-tight text-white">Comunicação</h2>
                </div>
                
                <div className="border-l-2 border-surface-variant ml-6 pl-8 space-y-10 relative">
                  
                  <div className="relative group">
                    <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-surface-variant border-4 border-background group-hover:bg-primary transition-colors"></div>
                    <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-3">
                      Toxicidade e Ofensas
                      <span className="bg-surface-variant text-gray-400 text-[10px] px-2 py-0.5 rounded font-label-caps uppercase tracking-widest">Aviso / Mute</span>
                    </h3>
                    <p className="text-gray-400 leading-relaxed">Proibido insultos pesados, discriminação, racismo, assédio ou qualquer discurso de ódio. Mantenha o respeito com todos os jogadores e membros da equipe.</p>
                  </div>

                  <div className="relative group">
                    <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-surface-variant border-4 border-background group-hover:bg-primary transition-colors"></div>
                    <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-3">
                      Spam e Flood
                      <span className="bg-surface-variant text-gray-400 text-[10px] px-2 py-0.5 rounded font-label-caps uppercase tracking-widest">Mute</span>
                    </h3>
                    <p className="text-gray-400 leading-relaxed">Evite repetir a mesma mensagem exaustivamente, abusar de caracteres maiúsculos (CAPS LOCK) ou poluir o chat global sem necessidade.</p>
                  </div>

                  <div className="relative group">
                    <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-surface-variant border-4 border-background group-hover:bg-primary transition-colors"></div>
                    <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-3">
                      Divulgação Externa
                      <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] px-2 py-0.5 rounded font-label-caps uppercase tracking-widest">Banimento</span>
                    </h3>
                    <p className="text-gray-400 leading-relaxed">É estritamente proibido divulgar IPs de outros servidores, links externos maliciosos, ou canais/redes sociais sem parceria oficial com o CCBR.</p>
                  </div>

                </div>
              </section>

              {/* Bloco 2: Jogo */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-fixed/10 text-secondary-fixed flex items-center justify-center border border-secondary-fixed/20">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>sports_esports</span>
                  </div>
                  <h2 className="font-display-lg text-3xl font-black uppercase tracking-tight text-white">Jogabilidade</h2>
                </div>
                
                <div className="border-l-2 border-surface-variant ml-6 pl-8 space-y-10 relative">
                  
                  <div className="relative group">
                    <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-surface-variant border-4 border-background group-hover:bg-secondary-fixed transition-colors"></div>
                    <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-3">
                      Uso de Hacks e Clients
                      <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] px-2 py-0.5 rounded font-label-caps uppercase tracking-widest">Ban Permanente</span>
                    </h3>
                    <p className="text-gray-400 leading-relaxed">O uso de modificações que concedam vantagens desleais (X-Ray, KillAura, Fly, Auto-Clicker extremo) resultará em punição irreversível.</p>
                  </div>

                  <div className="relative group">
                    <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-surface-variant border-4 border-background group-hover:bg-secondary-fixed transition-colors"></div>
                    <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-3">
                      Comércio Real (RWT)
                      <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] px-2 py-0.5 rounded font-label-caps uppercase tracking-widest">Ban Permanente</span>
                    </h3>
                    <p className="text-gray-400 leading-relaxed">É proibida a venda ou troca de itens in-game, contas ou moedas virtuais por dinheiro real (Pix, Transferências, Criptomoedas).</p>
                  </div>

                  <div className="relative group">
                    <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-surface-variant border-4 border-background group-hover:bg-secondary-fixed transition-colors"></div>
                    <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-3">
                      Abuso de Bugs (Exploits)
                      <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] px-2 py-0.5 rounded font-label-caps uppercase tracking-widest">Ban Temporário</span>
                    </h3>
                    <p className="text-gray-400 leading-relaxed">Encontrou uma falha de duplicação ou um erro no mapa? Reporte imediatamente à equipe. Abusar da falha para benefício próprio gerará punição severa.</p>
                  </div>

                </div>
              </section>

              {/* Sistema de Punições Visual */}
              <section className="bg-surface-container-high p-10 rounded-[2rem] border border-outline-variant mt-12 shadow-xl">
                <h2 className="font-display-lg text-2xl font-black uppercase text-white mb-8 text-center">Níveis de Punição</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <div className="bg-surface-container-low p-6 rounded-2xl border-l-4 border-yellow-500 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined">warning</span>
                    </div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Advertência</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">Avisos verbais ou silenciamento (mute) temporário no chat para infrações leves.</p>
                  </div>

                  <div className="bg-surface-container-low p-6 rounded-2xl border-l-4 border-orange-500 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined">timer</span>
                    </div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Suspensão</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">Banimento temporário do servidor (de 1 a 30 dias) para infrações reincidentes ou médias.</p>
                  </div>

                  <div className="bg-surface-container-low p-6 rounded-2xl border-l-4 border-red-500 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined">block</span>
                    </div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">Permanente</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">Exclusão definitiva da conta e IP da nossa rede. Aplicado em uso de hacks ou fraudes.</p>
                  </div>

                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
    );
  }
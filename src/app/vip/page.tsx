'use client';

import Link from 'next/link';

export default function VIP() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
      
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 relative z-10">
        
        {/* ================= HERO HEADER ================= */}
        <header className="mb-20 text-center flex flex-col items-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-surface-container border border-outline-variant mb-6">
            <span className="material-symbols-outlined text-sm text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
            <span className="font-label-caps text-xs text-gray-300 font-bold tracking-[0.2em] uppercase">
              Apoie o Servidor
            </span>
          </div>
          <h1 className="font-display-lg text-5xl md:text-7xl text-white font-black mb-6 tracking-tighter uppercase leading-none">
            Seja um membro <span className="text-primary">Premium</span>
          </h1>
          <p className="text-gray-400 font-body-lg text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            O rank VIP é a melhor forma de apoiar o servidor e garantir vantagens exclusivas que facilitam sua jornada, mantendo o equilíbrio e a diversão do jogo.
          </p>
        </header>

        {/* ================= CARDS DOS VIPS (LIMPOS E UNIFORMES) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          
          {/* Card BRONZE */}
          <div className="bg-surface-container-low border border-outline-variant rounded-3xl p-8 flex flex-col hover:border-[#CD7F32]/50 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center border border-outline-variant">
                <span className="material-symbols-outlined text-2xl text-[#CD7F32]" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Bronze</h3>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Ideal para Iniciar</p>
              </div>
            </div>
            
            <div className="flex-1">
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-300 text-sm"><span className="material-symbols-outlined text-gray-500 text-sm">check</span> Kit Mensal Básico</li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><span className="material-symbols-outlined text-gray-500 text-sm">check</span> Limite de 5 Homes</li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><span className="material-symbols-outlined text-gray-500 text-sm">check</span> Multiplicador 1.2x Coins</li>
              </ul>
            </div>

            <Link href="/loja" className="block w-full py-3 rounded-xl bg-surface-container border border-outline-variant text-white text-center font-bold uppercase tracking-widest text-xs hover:bg-[#CD7F32] hover:border-[#CD7F32] hover:text-black transition-all">
              Ver na Loja
            </Link>
          </div>

          {/* Card PRATA */}
          <div className="bg-surface-container-low border border-outline-variant rounded-3xl p-8 flex flex-col hover:border-[#C0C0C0]/50 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center border border-outline-variant">
                <span className="material-symbols-outlined text-2xl text-[#C0C0C0]" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Prata</h3>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">O Mais Popular</p>
              </div>
            </div>
            
            <div className="flex-1">
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-300 text-sm"><span className="material-symbols-outlined text-gray-500 text-sm">check</span> Kit Mensal Avançado</li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><span className="material-symbols-outlined text-gray-500 text-sm">check</span> Limite de 20 Homes</li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><span className="material-symbols-outlined text-gray-500 text-sm">check</span> Multiplicador 1.5x Coins</li>
              </ul>
            </div>

            <Link href="/loja" className="block w-full py-3 rounded-xl bg-surface-container border border-outline-variant text-white text-center font-bold uppercase tracking-widest text-xs hover:bg-[#C0C0C0] hover:border-[#C0C0C0] hover:text-black transition-all">
              Ver na Loja
            </Link>
          </div>

          {/* Card OURO */}
          <div className="bg-surface-container-low border border-[#FFD700]/30 rounded-3xl p-8 flex flex-col hover:border-[#FFD700]/60 transition-colors relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFD700] text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              A Escolha Definitiva
            </div>

            <div className="flex items-center gap-4 mb-6 mt-2">
              <div className="w-12 h-12 rounded-xl bg-[#FFD700]/10 flex items-center justify-center border border-[#FFD700]/20">
                <span className="material-symbols-outlined text-2xl text-[#FFD700]" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Ouro</h3>
                <p className="text-[#FFD700] text-xs font-bold uppercase tracking-widest">Completo</p>
              </div>
            </div>
            
            <div className="flex-1">
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-300 text-sm"><span className="material-symbols-outlined text-[#FFD700] text-sm">check</span> Kit Mensal Lendário</li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><span className="material-symbols-outlined text-[#FFD700] text-sm">check</span> Homes Ilimitadas & /Fly</li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><span className="material-symbols-outlined text-[#FFD700] text-sm">check</span> Multiplicador 2.0x Coins</li>
                <li className="flex items-center gap-3 text-gray-300 text-sm"><span className="material-symbols-outlined text-[#FFD700] text-sm">check</span> Anúncio Global ao Entrar</li>
              </ul>
            </div>

            <Link href="/loja" className="block w-full py-3 rounded-xl bg-[#FFD700] text-black text-center font-black uppercase tracking-widest text-xs hover:bg-white transition-all">
              Adquirir Agora
            </Link>
          </div>

        </div>

        {/* ================= TABELA DE COMPARAÇÃO EXPANDIDA ================= */}
        <div className="mt-32">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">Comparativo de <span className="text-primary">Vantagens</span></h2>
            <p className="text-gray-500 text-sm mt-2">Compare todos os detalhes técnicos e escolha o melhor para você.</p>
          </div>

          <div className="bg-surface-container-low border border-outline-variant rounded-[2rem] overflow-hidden shadow-2xl relative">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-surface-container border-b border-outline-variant">
                    <th className="p-6 text-gray-400 font-bold uppercase tracking-widest text-xs w-1/3">Recursos & Benefícios</th>
                    <th className="p-6 text-center border-l border-outline-variant/50">
                      <span className="text-white font-black text-lg uppercase tracking-widest block">Bronze</span>
                    </th>
                    <th className="p-6 text-center border-l border-outline-variant/50">
                      <span className="text-white font-black text-lg uppercase tracking-widest block">Prata</span>
                    </th>
                    <th className="p-6 text-center bg-surface-container-high border-l border-outline-variant/50">
                      <span className="text-[#FFD700] font-black text-lg uppercase tracking-widest block">Ouro</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/50">
                  
                  {/* Linha 1 */}
                  <tr className="hover:bg-surface-container/50 transition-colors">
                    <td className="p-6 text-white font-medium flex items-center gap-3">
                      <span className="material-symbols-outlined text-gray-500 text-lg">sell</span>
                      Tag Exclusiva (Chat e Tab)
                    </td>
                    <td className="p-6 text-center border-l border-outline-variant/50"><span className="bg-surface-container text-gray-300 border border-outline-variant px-2 py-1 rounded text-xs font-bold">BRONZE</span></td>
                    <td className="p-6 text-center border-l border-outline-variant/50"><span className="bg-surface-container text-gray-300 border border-outline-variant px-2 py-1 rounded text-xs font-bold">PRATA</span></td>
                    <td className="p-6 text-center border-l border-outline-variant/50 bg-surface-container-high/30"><span className="bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30 px-2 py-1 rounded text-xs font-black">OURO</span></td>
                  </tr>

                  {/* Linha 2 */}
                  <tr className="hover:bg-surface-container/50 transition-colors">
                    <td className="p-6 text-white font-medium flex items-center gap-3">
                      <span className="material-symbols-outlined text-gray-500 text-lg">card_giftcard</span>
                      Kits Especiais In-Game
                    </td>
                    <td className="p-6 text-center border-l border-outline-variant/50 text-gray-400 font-medium">Kit Bronze</td>
                    <td className="p-6 text-center border-l border-outline-variant/50 text-white font-bold">Kit Prata</td>
                    <td className="p-6 text-center border-l border-outline-variant/50 bg-surface-container-high/30 text-[#FFD700] font-black tracking-wide">Kit Ouro</td>
                  </tr>

                  {/* Linha 3 */}
                  <tr className="hover:bg-surface-container/50 transition-colors">
                    <td className="p-6 text-white font-medium flex items-center gap-3">
                      <span className="material-symbols-outlined text-gray-500 text-lg">home</span>
                      Limite de Proteções e Homes
                    </td>
                    <td className="p-6 text-center border-l border-outline-variant/50 text-gray-400 font-medium">5 Homes</td>
                    <td className="p-6 text-center border-l border-outline-variant/50 text-white font-bold">20 Homes</td>
                    <td className="p-6 text-center border-l border-outline-variant/50 bg-surface-container-high/30 text-[#FFD700] font-black tracking-wide">Ilimitadas</td>
                  </tr>

                  {/* Linha 4 */}
                  <tr className="hover:bg-surface-container/50 transition-colors">
                    <td className="p-6 text-white font-medium flex items-center gap-3">
                      <span className="material-symbols-outlined text-gray-500 text-lg">monetization_on</span>
                      Multiplicador de Economia
                    </td>
                    <td className="p-6 text-center border-l border-outline-variant/50 text-gray-400 font-medium">1.2x Coins</td>
                    <td className="p-6 text-center border-l border-outline-variant/50 text-white font-bold">1.5x Coins</td>
                    <td className="p-6 text-center border-l border-outline-variant/50 bg-surface-container-high/30 text-[#FFD700] font-black tracking-wide">2.0x Coins</td>
                  </tr>

                  {/* Linha 5 */}
                  <tr className="hover:bg-surface-container/50 transition-colors">
                    <td className="p-6 text-white font-medium flex items-center gap-3">
                      <span className="material-symbols-outlined text-gray-500 text-lg">flight</span>
                      Acesso ao /fly nas Cidades
                    </td>
                    <td className="p-6 text-center border-l border-outline-variant/50 text-gray-600"><span className="material-symbols-outlined">close</span></td>
                    <td className="p-6 text-center border-l border-outline-variant/50 text-gray-600"><span className="material-symbols-outlined">close</span></td>
                    <td className="p-6 text-center border-l border-outline-variant/50 bg-surface-container-high/30 text-[#FFD700]"><span className="material-symbols-outlined">check</span></td>
                  </tr>

                  {/* Linha 6 */}
                  <tr className="hover:bg-surface-container/50 transition-colors">
                    <td className="p-6 text-white font-medium flex items-center gap-3">
                      <span className="material-symbols-outlined text-gray-500 text-lg">campaign</span>
                      Anúncio de Login Global
                    </td>
                    <td className="p-6 text-center border-l border-outline-variant/50 text-gray-600"><span className="material-symbols-outlined">close</span></td>
                    <td className="p-6 text-center border-l border-outline-variant/50 text-gray-600"><span className="material-symbols-outlined">close</span></td>
                    <td className="p-6 text-center border-l border-outline-variant/50 bg-surface-container-high/30 text-[#FFD700]"><span className="material-symbols-outlined">check</span></td>
                  </tr>

                  {/* Linha 7 */}
                  <tr className="hover:bg-surface-container/50 transition-colors">
                    <td className="p-6 text-white font-medium flex items-center gap-3">
                      <span className="material-symbols-outlined text-gray-500 text-lg">front_hand</span>
                      Prioridade na Fila (Servidor Lotado)
                    </td>
                    <td className="p-6 text-center border-l border-outline-variant/50 text-gray-300"><span className="material-symbols-outlined">check</span></td>
                    <td className="p-6 text-center border-l border-outline-variant/50 text-gray-300"><span className="material-symbols-outlined">check</span></td>
                    <td className="p-6 text-center border-l border-outline-variant/50 bg-surface-container-high/30 text-[#FFD700]"><span className="material-symbols-outlined">check</span></td>
                  </tr>

                </tbody>
              </table>
            </div>
            
            {/* CTA Final (Rodapé da Tabela) */}
            <div className="bg-surface-container p-8 text-center border-t border-outline-variant flex flex-col sm:flex-row items-center justify-center gap-6">
              <span className="text-white font-bold text-lg">Pronto para dominar o servidor?</span>
              <Link href="/loja" className="px-8 py-3 bg-primary text-black font-black uppercase tracking-widest rounded-xl hover:bg-white transition-colors">
                Acessar a Loja Oficial
              </Link>
            </div>
          </div>
        </div>

        {/* ================= FAQ (PERGUNTAS FREQUENTES) ================= */}
        <div className="mt-24 pt-16 border-t border-outline-variant grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <span className="material-symbols-outlined text-primary text-4xl mb-4">help</span>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">Ficou com <br/><span className="text-primary">alguma dúvida?</span></h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Separamos as dúvidas mais comuns dos nossos jogadores. Caso precise de mais ajuda, abra um ticket no nosso Discord!
            </p>
          </div>
          
          <div className="lg:col-span-8 space-y-4">
            
            <div className="bg-surface-container-low border border-outline-variant p-6 rounded-2xl">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">flash_on</span> 
                A entrega do VIP é automática?
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Sim! Assim que o seu pagamento for aprovado pelo Mercado Pago (PIX é instantâneo), o nosso sistema reconhece e envia o seu VIP diretamente para a sua conta dentro do jogo em questão de segundos.
              </p>
            </div>

            <div className="bg-surface-container-low border border-outline-variant p-6 rounded-2xl">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">event_available</span> 
                O plano VIP é permanente ou mensal?
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Nós possuímos opções para ambos os casos! Na loja, você poderá escolher pacotes de 30 dias de duração ou a opção vitalícia (permanente), onde você paga apenas uma vez e tem a tag para sempre.
              </p>
            </div>

            <div className="bg-surface-container-low border border-outline-variant p-6 rounded-2xl">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">payments</span> 
                Quais as formas de pagamento aceitas?
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Trabalhamos com segurança via Mercado Pago. Aceitamos PIX (aprovação imediata), Cartão de Crédito e Boleto Bancário.
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
'use client';
import Link from 'next/link';

export default function Loja() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
      
      {/* Luzes de fundo (Aura) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Hero Header da Loja */}
        <header className="mb-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 border-b border-outline-variant pb-12">
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
          
          {/* Card de Meta Mensal */}
          <div className="w-full md:w-auto bg-surface-container-low border border-outline-variant p-6 rounded-3xl flex flex-col items-center justify-center min-w-[280px] shadow-xl">
            <span className="text-gray-400 font-label-caps text-xs font-bold tracking-widest uppercase mb-2">Meta do Mês</span>
            <div className="font-display-lg text-4xl text-white font-black mb-3">85%</div>
            <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(140,218,112,0.8)]" style={{ width: '85%' }}></div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Menu Lateral de Categorias */}
          <aside className="lg:col-span-3 space-y-8">
            <div>
              <h3 className="font-label-caps text-xs text-gray-500 mb-4 px-2 font-bold tracking-widest uppercase">Categorias</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="flex items-center gap-3 p-4 bg-primary/10 text-primary font-bold rounded-2xl border border-primary/20 transition-all shadow-[0_0_15px_rgba(140,218,112,0.1)]">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                  Moedas (Cash)
                </Link>
                <Link href="#" className="flex items-center gap-3 p-4 hover:bg-surface-container-low text-gray-400 hover:text-white font-medium rounded-2xl transition-all border border-transparent hover:border-outline-variant">
                  <span className="material-symbols-outlined">inventory_2</span>
                  Kits Especiais
                </Link>
                <Link href="#" className="flex items-center gap-3 p-4 hover:bg-surface-container-low text-gray-400 hover:text-white font-medium rounded-2xl transition-all border border-transparent hover:border-outline-variant">
                  <span className="material-symbols-outlined">key</span>
                  Chaves (Caixas)
                </Link>
                <Link href="#" className="flex items-center gap-3 p-4 hover:bg-surface-container-low text-gray-400 hover:text-white font-medium rounded-2xl transition-all border border-transparent hover:border-outline-variant">
                  <span className="material-symbols-outlined">gavel</span>
                  Revogação (Unban)
                </Link>
              </nav>
            </div>

            {/* Banner de Suporte (Discord) */}
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

          {/* Grid de Produtos (Pacotes de Cash - 4 Opções Uniformes) */}
          <div className="lg:col-span-9 flex flex-col gap-12">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              
              {/* Pacote 1: Básico */}
              <div className="group bg-surface-container-low rounded-[2rem] border border-outline-variant p-8 flex flex-col hover:border-[#8cda70]/50 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(140,218,112,0.1)] transition-all duration-500 relative overflow-hidden h-full">
                <div className="mb-8 relative z-10">
                  <h2 className="font-label-caps text-sm font-bold tracking-widest text-gray-300 mb-3 uppercase">Pacote Básico</h2>
                  <div className="font-display-lg text-4xl text-white font-black flex items-end gap-1">
                    1.500<span className="text-sm font-label-caps text-gray-500 font-bold mb-1 ml-1">CASH</span>
                  </div>
                  <div className="mt-2 text-gray-400 font-body-sm">R$ 15,00</div>
                </div>
                
                <ul className="flex-grow space-y-4 mb-10 relative z-10">
                  <li className="flex items-start gap-3 text-gray-300 text-sm font-medium">
                    <span className="material-symbols-outlined text-[#8cda70] text-lg">token</span>
                    Ativação automática na hora
                  </li>
                  <li className="flex items-start gap-3 text-gray-300 text-sm font-medium">
                    <span className="material-symbols-outlined text-[#8cda70] text-lg">token</span>
                    Acesso a todas as áreas do /loja
                  </li>
                  <li className="flex items-start gap-3 text-gray-300 text-sm font-medium">
                    <span className="material-symbols-outlined text-[#8cda70] text-lg">token</span>
                    Ideal para quem está começando
                  </li>
                </ul>
                
                <button className="relative z-10 w-full py-4 rounded-xl bg-surface-container-high border border-outline-variant text-white font-bold uppercase tracking-widest group-hover:bg-[#8cda70] group-hover:text-black group-hover:border-[#8cda70] transition-all text-sm mt-auto">
                  Comprar
                </button>
              </div>

              {/* Pacote 2: Intermediário */}
              <div className="group bg-surface-container-low rounded-[2rem] border border-outline-variant p-8 flex flex-col hover:border-[#8cda70]/80 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(140,218,112,0.1)] transition-all duration-500 relative overflow-hidden h-full">
                
                {/* Badge de Bônus (Ícone padronizado) */}
                <div className="absolute top-6 right-6 bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full font-label-caps text-[10px] font-black tracking-widest uppercase z-20 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">add_circle</span>
                  +500 Bônus
                </div>

                <div className="mb-8 relative z-10">
                  <h2 className="font-label-caps text-sm font-bold tracking-widest text-[#8cda70] mb-3 uppercase">Pacote Intermediário</h2>
                  <div className="font-display-lg text-4xl text-white font-black flex items-end gap-1">
                    3.500<span className="text-sm font-label-caps text-gray-500 font-bold mb-1 ml-1">CASH</span>
                  </div>
                  <div className="mt-2 text-primary font-body-sm flex items-center gap-2">
                    <strong className="text-white">R$ 30,00</strong>
                    <span className="text-gray-500 line-through text-xs">R$ 35,00</span>
                  </div>
                </div>
                
                <ul className="flex-grow space-y-4 mb-10 relative z-10">
                  <li className="flex items-start gap-3 text-gray-300 text-sm font-medium">
                    <span className="material-symbols-outlined text-[#8cda70] text-lg">token</span>
                    Ativação automática na hora
                  </li>
                  <li className="flex items-start gap-3 text-white text-sm font-medium">
                    <span className="material-symbols-outlined text-[#8cda70] text-lg">token</span>
                    Valor exato para comprar VIP Prata
                  </li>
                  <li className="flex items-start gap-3 text-gray-300 text-sm font-medium">
                    <span className="material-symbols-outlined text-[#8cda70] text-lg">token</span>
                    Desconto de 14% aplicado
                  </li>
                </ul>
                
                <button className="relative z-10 w-full py-4 rounded-xl bg-surface-container-high border border-outline-variant text-white font-bold uppercase tracking-widest group-hover:bg-[#8cda70] group-hover:text-black group-hover:border-[#8cda70] transition-all text-sm mt-auto">
                  Comprar
                </button>
              </div>

              {/* Pacote 3: Avançado (Destacado) */}
              <div className="group bg-surface-container rounded-[2rem] border-2 border-[#ffdb3c] p-8 flex flex-col hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(255,219,60,0.15)] transition-all duration-500 relative overflow-hidden h-full enchanted-glint">
                
                <div className="absolute top-0 left-0 w-full bg-[#ffdb3c] text-black text-center py-1.5 font-label-caps text-[10px] font-black tracking-[0.2em] uppercase z-20">
                  Melhor Custo-Benefício
                </div>

                {/* Badge de Bônus (Ícone padronizado) */}
                <div className="absolute top-8 right-6 bg-white text-black px-3 py-1 rounded-full font-label-caps text-[10px] font-black tracking-widest uppercase z-20 shadow-lg flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">add_circle</span>
                  +1.000 Bônus
                </div>

                <div className="mb-8 mt-4 relative z-10">
                  <h2 className="font-label-caps text-sm font-bold tracking-widest text-[#ffdb3c] mb-3 uppercase">Pacote Avançado</h2>
                  <div className="font-display-lg text-4xl text-white font-black flex items-end gap-1">
                    7.000<span className="text-sm font-label-caps text-gray-400 font-bold mb-1 ml-1">CASH</span>
                  </div>
                  <div className="mt-2 text-[#ffdb3c] font-body-sm flex items-center gap-2">
                    <strong className="text-white">R$ 60,00</strong>
                    <span className="text-gray-500 line-through text-xs">R$ 70,00</span>
                  </div>
                </div>
                
                <ul className="flex-grow space-y-4 mb-10 relative z-10">
                  <li className="flex items-start gap-3 text-white text-sm font-bold">
                    <span className="material-symbols-outlined text-[#ffdb3c] text-lg">token</span>
                    Ativação automática na hora
                  </li>
                  <li className="flex items-start gap-3 text-white text-sm font-medium">
                    <span className="material-symbols-outlined text-[#ffdb3c] text-lg">token</span>
                    Garante o VIP Ouro in-game
                  </li>
                  <li className="flex items-start gap-3 text-white text-sm font-medium">
                    <span className="material-symbols-outlined text-[#ffdb3c] text-lg">token</span>
                    Desconto real de 16% aplicado
                  </li>
                </ul>
                
                <button className="relative z-10 w-full py-4 rounded-xl bg-[#ffdb3c] text-black font-black uppercase tracking-widest hover:bg-white transition-all text-sm shadow-lg mt-auto">
                  Comprar Agora
                </button>
              </div>

              {/* Pacote 4: Supremo */}
              <div className="group bg-gradient-to-b from-secondary-fixed/5 to-surface-container rounded-[2rem] border border-secondary-fixed/50 p-8 flex flex-col hover:border-secondary-fixed hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,225,109,0.1)] transition-all duration-500 relative overflow-hidden h-full">
                
                {/* Badge de Bônus (Ícone padronizado) */}
                <div className="absolute top-6 right-6 bg-secondary-fixed/20 text-secondary-fixed border border-secondary-fixed/30 px-3 py-1 rounded-full font-label-caps text-[10px] font-black tracking-widest uppercase z-20 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">add_circle</span>
                  +2.500 Bônus
                </div>

                <div className="mb-8 relative z-10">
                  <h2 className="font-label-caps text-sm font-bold tracking-widest text-secondary-fixed mb-3 uppercase flex items-center gap-2">
                    Pacote Supremo
                  </h2>
                  <div className="font-display-lg text-4xl text-white font-black flex items-end gap-1">
                    12.500<span className="text-sm font-label-caps text-secondary-fixed/80 font-bold mb-1 ml-1">CASH</span>
                  </div>
                  <div className="mt-2 text-secondary-fixed font-body-sm flex items-center gap-2">
                    <strong className="text-white">R$ 100,00</strong>
                    <span className="text-gray-500 line-through text-xs">R$ 125,00</span>
                  </div>
                </div>
                
                <ul className="flex-grow space-y-4 mb-10 relative z-10">
                  <li className="flex items-start gap-3 text-gray-300 text-sm font-medium">
                    <span className="material-symbols-outlined text-secondary-fixed text-lg">token</span>
                    Ativação automática na hora
                  </li>
                  <li className="flex items-start gap-3 text-gray-300 text-sm font-medium">
                    <span className="material-symbols-outlined text-secondary-fixed text-lg">token</span>
                    Compre VIP Ouro e guarde para chaves
                  </li>
                  <li className="flex items-start gap-3 text-white text-sm font-bold">
                    <span className="material-symbols-outlined text-secondary-fixed text-lg">token</span>
                    Nosso maior desconto (25% OFF)
                  </li>
                </ul>
                
                <button className="relative z-10 w-full py-4 rounded-xl bg-surface-container-high border border-secondary-fixed text-secondary-fixed font-bold uppercase tracking-widest hover:bg-secondary-fixed hover:text-black transition-all text-sm mt-auto">
                  Comprar
                </button>
              </div>
              
            </div>

            {/* Barra Inferior: Métodos de Pagamento Seguros */}
            <section className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] border border-outline-variant flex flex-col md:flex-row items-center justify-between gap-8 mt-4 shadow-xl">
              <div className="text-center md:text-left flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">lock</span>
                </div>
                <div>
                  <h4 className="font-label-caps text-sm font-bold text-white mb-1 uppercase tracking-widest">Pagamento 100% Seguro</h4>
                  <p className="text-gray-400 font-body-sm text-sm">A liberação do Cash é processada automaticamente via sistema integrado.</p>
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
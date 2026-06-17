'use client';

import Link from 'next/link';

export default function VIP() {
  return (
    <main className="mt-[100px] pt-12 pb-24 max-w-7xl mx-auto px-6 md:px-12 min-h-screen">
      
      {/* Hero Header */}
      <header className="mb-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary-fixed/10 mb-6 enchanted-glint">
          <span className="material-symbols-outlined text-4xl text-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
        </div>
        <h1 className="font-display-lg text-4xl md:text-6xl text-white font-black mb-4 tracking-tighter uppercase">
          Seja um membro <span className="text-secondary-fixed drop-shadow-[0_0_15px_rgba(255,225,109,0.5)]">Premium</span>
        </h1>
        <p className="text-gray-400 font-body-lg text-lg max-w-2xl mx-auto leading-relaxed">
          O rank VIP é a melhor forma de apoiar o servidor e garantir vantagens exclusivas que facilitam sua jornada, sem desequilibrar o jogo.
        </p>
      </header>

      {/* Tabela de Vantagens (Comparativo) */}
      <div className="bg-surface-container-low border-2 border-outline-variant rounded-3xl overflow-hidden mb-16 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high border-b-2 border-outline-variant">
                <th className="p-6 font-headline-md text-white font-bold w-1/3">Vantagens</th>
                <th className="p-6 text-center border-l border-outline-variant/50">
                  <span className="text-[#CD7F32] font-black text-xl uppercase tracking-widest block">Bronze</span>
                </th>
                <th className="p-6 text-center border-l border-outline-variant/50">
                  <span className="text-[#C0C0C0] font-black text-xl uppercase tracking-widest block">Prata</span>
                </th>
                <th className="p-6 text-center bg-secondary-fixed/5 border-l-2 border-secondary-fixed/30 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-secondary-fixed"></div>
                  <span className="text-secondary-fixed font-black text-xl uppercase tracking-widest block drop-shadow-md">Ouro</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              
              <tr className="hover:bg-surface-container transition-colors">
                <td className="p-6 text-gray-300 font-medium">Kits Exclusivos Mensais</td>
                <td className="p-6 text-center border-l border-outline-variant/50 text-gray-400">Básico</td>
                <td className="p-6 text-center border-l border-outline-variant/50 text-white font-bold">Avançado</td>
                <td className="p-6 text-center border-l-2 border-secondary-fixed/30 bg-secondary-fixed/5 text-secondary-fixed font-bold">Lendário</td>
              </tr>

              <tr className="hover:bg-surface-container transition-colors">
                <td className="p-6 text-gray-300 font-medium">Acesso a comandos (/hat, /nick)</td>
                <td className="p-6 text-center border-l border-outline-variant/50 text-red-400"><span className="material-symbols-outlined">close</span></td>
                <td className="p-6 text-center border-l border-outline-variant/50 text-primary"><span className="material-symbols-outlined">check</span></td>
                <td className="p-6 text-center border-l-2 border-secondary-fixed/30 bg-secondary-fixed/5 text-primary"><span className="material-symbols-outlined">check_circle</span></td>
              </tr>

              <tr className="hover:bg-surface-container transition-colors">
                <td className="p-6 text-gray-300 font-medium">Limite de Homes</td>
                <td className="p-6 text-center border-l border-outline-variant/50 text-gray-400">5 Homes</td>
                <td className="p-6 text-center border-l border-outline-variant/50 text-white font-bold">20 Homes</td>
                <td className="p-6 text-center border-l-2 border-secondary-fixed/30 bg-secondary-fixed/5 text-secondary-fixed font-bold">Homes Ilimitadas</td>
              </tr>

            </tbody>
          </table>
        </div>
        <div className="bg-surface-container p-6 text-center border-t border-outline-variant flex flex-col sm:flex-row items-center justify-center gap-6">
          <span className="text-gray-400 font-body-md">Pronto para escolher o seu lado?</span>
          <Link href="/loja" className="px-8 py-3 bg-primary text-black font-bold uppercase tracking-wider rounded-lg hover:bg-secondary-fixed transition-colors">
            Ir para a Loja Oficial
          </Link>
        </div>
      </div>

    </main>
  );
}
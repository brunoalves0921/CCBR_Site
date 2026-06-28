import Link from 'next/link';

export const metadata = {
  title: 'Termos de Serviço - CCBR',
  description: 'Termos e condições de uso e loja do servidor CCBR.',
};

export default function Termos() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-black relative overflow-hidden">
      
      {/* Luzes de fundo (Aura suave) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Cabeçalho */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-md">
            <span className="material-symbols-outlined text-sm text-primary">gavel</span>
            <span className="font-label-caps text-xs text-primary font-bold tracking-[0.2em] uppercase">
              Informações Legais
            </span>
          </div>
          <h1 className="font-display-lg text-4xl md:text-6xl text-white font-black mb-4 tracking-tighter uppercase leading-none drop-shadow-xl">
            Termos <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300">de Serviço</span>
          </h1>
          <p className="text-gray-400 text-sm tracking-widest uppercase font-bold">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </header>

        {/* Caixa de Texto Glassmorphism */}
        <div className="bg-[#121316]/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-10 text-gray-300 leading-relaxed font-body-md">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-black border border-primary/20">1</span>
              Aceitação dos Termos
            </h2>
            <p className="mb-4">
              Ao acessar e jogar no servidor CCBR, bem como ao utilizar nosso site ou loja oficial, você concorda expressamente com os Termos e Condições aqui descritos. Se você não concorda com qualquer parte destes termos, por favor, não acesse nossos serviços.
            </p>
            <p>
              O CCBR não é afiliado, endossado ou suportado pela Mojang Synergies AB ou Microsoft Corporation. "Minecraft" é uma marca registrada da Mojang AB.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-black border border-primary/20">2</span>
              Contas e Segurança
            </h2>
            <p className="mb-4">
              Você é o único responsável por manter a segurança e a confidencialidade da sua conta no jogo e suas senhas (incluindo o PIN gerado in-game para acesso ao site). 
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>Não compartilhe sua senha ou PIN com terceiros, incluindo membros da nossa equipe. Nossos administradores nunca pedirão sua senha.</li>
              <li>Quaisquer infrações cometidas pela sua conta resultarão em punições aplicadas a ela, independentemente de quem estava jogando no momento.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-black border border-primary/20">3</span>
              Loja, Pagamentos e Reembolsos
            </h2>
            <p className="mb-4">
              A loja do CCBR é um meio de apoiar o desenvolvimento e a manutenção do servidor. Todos os itens oferecidos (como VIPS e Cash) são produtos <strong>intangíveis e digitais</strong>.
            </p>
            <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-2xl mb-4">
              <strong className="text-red-400 block mb-2 uppercase tracking-widest text-xs">Política de Reembolso:</strong>
              Como se trata de bens digitais entregues instantaneamente após a confirmação do pagamento, <strong>NÃO OFERECEMOS REEMBOLSOS</strong> em nenhuma circunstância.
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>Qualquer tentativa de estorno fraudulento (Chargeback) via cartão de crédito ou operadora de pagamento resultará no banimento permanente do jogador e do IP associado.</li>
              <li>A transferência de pacotes VIP entre diferentes contas não é permitida.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-black border border-primary/20">4</span>
              Regras de Conduta
            </h2>
            <p className="mb-4">
              Ao jogar no servidor, você está sujeito às <Link href="/regras" className="text-primary hover:underline">Regras Oficiais do Servidor</Link>. A quebra dessas regras concede à nossa equipe administrativa o direito de suspender ou encerrar seu acesso (banimento) a qualquer momento, com ou sem aviso prévio.
            </p>
            <p>
              Jogadores banidos perdem o direito de usufruir de qualquer produto adquirido na loja, sem direito a ressarcimento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-black border border-primary/20">5</span>
              Modificações dos Termos
            </h2>
            <p>
              O CCBR reserva-se o direito de atualizar, modificar ou substituir qualquer parte destes Termos de Serviço a qualquer momento. É responsabilidade do jogador verificar esta página periodicamente para verificar as mudanças.
            </p>
          </section>

          {/* Botões de Ação */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
              &larr; Voltar para Home
            </Link>
            <Link href="/loja" className="bg-primary text-[#0A1A08] px-8 py-3 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(140,218,112,0.2)]">
              Ir para a Loja
            </Link>
          </div>
          
        </div>
      </div>
    </main>
  );
}
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-surface-variant bg-surface-container-lowest mt-12">
      
      {/* Container limitador de largura (Isso impede que o layout quebre) */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto] gap-8 items-start">
        
        {/* Coluna 1: Marca e Status */}
        <div className="flex flex-col items-start">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
            <img 
              src="/logo_footer.png" 
              alt="Logo CCBR" 
              className="h-10 md:h-12 w-auto object-contain opacity-80 group-hover:opacity-100 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(140,218,112,0.3)] transition-all duration-300" 
            />
          </Link>

          <p className="text-sm text-gray-500 leading-snug max-w-xs mb-4">
            O maior servidor de Minecraft do Brasil. Uma comunidade apaixonada por aventura e criatividade.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-400/10 border border-green-400/25 rounded-full px-3 py-1 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Servidor online
            </span>

            <div className="inline-flex items-center gap-1.5 bg-surface-container border border-outline-variant rounded-full px-3 py-1 text-xs font-mono text-gray-400 whitespace-nowrap">
              <span className="material-symbols-outlined text-[14px]">dns</span>
              <span className="text-white">play.ccbr.com.br</span>
            </div>
          </div>
        </div>

        {/* Coluna 2: Servidor */}
        <div>
          <span className="block text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-3">
            Servidor
          </span>
          <nav className="flex flex-col gap-2">
            {[
              { icon: 'map', label: 'Mapa ao vivo' },
              { icon: 'shield', label: 'Regras' },
              { icon: 'emoji_events', label: 'Rankings' },
              { icon: 'newspaper', label: 'Novidades' },
            ].map(({ icon, label }) => (
              <Link key={label} href="#" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors whitespace-nowrap">
                <span className="material-symbols-outlined text-[16px] opacity-60">{icon}</span>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Coluna 3: Legal */}
        <div>
          <span className="block text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-3">
            Legal
          </span>
          <nav className="flex flex-col gap-2">
            {[
              { icon: 'lock', label: 'Privacidade' },
              { icon: 'description', label: 'Termos de uso' },
              { icon: 'cookie', label: 'Cookies' },
            ].map(({ icon, label }) => (
              <Link key={label} href="#" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors whitespace-nowrap">
                <span className="material-symbols-outlined text-[16px] opacity-60">{icon}</span>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Coluna 4: Comunidade */}
        <div>
          <span className="block text-[11px] font-bold tracking-[0.1em] uppercase text-gray-500 mb-3">
            Comunidade
          </span>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Discord', icon: 'diamond' },
              { label: 'Twitter / X', icon: 'tag' },
            ].map(({ label, icon }) => (
              <Link key={label} href="#" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant text-sm text-gray-400 hover:border-primary hover:text-white transition-all whitespace-nowrap">
                <span className="material-symbols-outlined text-[16px]">{icon}</span>
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Rodapé inferior (Copyright e Botões menores) */}
      <div className="max-w-7xl mx-auto px-6 py-4 border-t border-surface-variant flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-600 text-center sm:text-left whitespace-nowrap">
          © {new Date().getFullYear()} CCBR. Todos os direitos reservados. <span className="hidden sm:inline">| Não é um produto oficial da Mojang.</span>
        </p>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-surface-container border border-outline-variant text-gray-500 hover:border-primary hover:text-primary transition-all">
            <span className="material-symbols-outlined text-[16px]">language</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-surface-container border border-outline-variant text-gray-500 hover:border-primary hover:text-primary transition-all">
            <span className="material-symbols-outlined text-[16px]">dark_mode</span>
          </button>
        </div>
      </div>

    </footer>
  );
}
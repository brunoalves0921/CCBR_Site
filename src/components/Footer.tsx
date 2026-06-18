import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-surface-variant bg-surface-container-lowest mt-12">
      
      {/* Container limitador de largura */}
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
            
            {/* Discord */}
            <Link href="#" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant text-sm text-gray-400 hover:border-primary hover:text-white transition-all whitespace-nowrap">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.298 12.298 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/>
              </svg>
              Discord
            </Link>

            {/* Twitter / X */}
            <Link href="#" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant text-sm text-gray-400 hover:border-primary hover:text-white transition-all whitespace-nowrap">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Twitter / X
            </Link>

            {/* Instagram */}
            <Link href="#" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant text-sm text-gray-400 hover:border-primary hover:text-white transition-all whitespace-nowrap">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
              Instagram
            </Link>

          </div>
        </div>

      </div>

      {/* Rodapé inferior (Apenas com Copyright) */}
      <div className="max-w-7xl mx-auto px-6 py-4 border-t border-surface-variant flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-600 text-center sm:text-left whitespace-nowrap">
          © {new Date().getFullYear()} CCBR. Todos os direitos reservados. <span className="hidden sm:inline">| Não é um produto oficial da Mojang.</span>
        </p>
      </div>

    </footer>
  );
}
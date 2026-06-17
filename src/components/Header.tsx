'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    // Novo estilo de navegação: "Pills" (botões arredondados)
    const getLinkStyle = (path: string) => {
        const isActive = pathname === path;
        return isActive
            ? "px-4 py-2 bg-white/10 text-white rounded-xl font-bold shadow-sm transition-all"
            : "px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all";
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <div className="max-w-[1280px] mx-auto w-full flex justify-between items-center px-6 py-3">
                
                {/* Logo Principal com Efeito Glint e Aceleração de GPU */}
                <Link href="/" className="relative flex items-center group">
                    <div 
                        className="relative h-16 md:h-20 w-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-105 drop-shadow-md transform-gpu will-change-transform"
                        style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
                    >
                        {/* 1. Imagem Original */}
                        <Image
                            src="/logo_ccbr.png"
                            alt="Logo CCBR"
                            width={280}
                            height={80}
                            className="h-full w-auto object-contain relative z-10"
                            style={{ width: 'auto' }} /* <-- Essa linha resolve o Warning */
                            priority
                        />
                        
                        {/* 2. Camada de Sobreposição com a Máscara */}
                        <div 
                            className="absolute inset-0 z-20 pointer-events-none"
                            style={{
                                WebkitMaskImage: "url('/logo_ccbr.png')",
                                WebkitMaskSize: "contain",
                                WebkitMaskRepeat: "no-repeat",
                                WebkitMaskPosition: "center",
                                maskImage: "url('/logo_ccbr.png')",
                                maskSize: "contain",
                                maskRepeat: "no-repeat",
                                maskPosition: "center"
                            }}
                        >
                            {/* 3. Feixe de Luz Dourado Animado */}
                            <div 
                                className="absolute top-0 left-[-150%] w-[50%] h-full"
                                style={{
                                    background: "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), rgba(255, 215, 0, 0.7), rgba(255, 215, 0, 0.3), transparent)",
                                    transform: "skewX(-25deg)",
                                    animation: "glint 4s infinite ease-in-out"
                                }}
                            ></div>
                        </div>
                    </div>
                </Link>

                {/* Menu de Navegação Central (Desktop) */}
                <nav className="hidden md:flex gap-2 items-center bg-surface-container-low/50 p-1.5 rounded-2xl border border-white/5">
                    <Link href="/" className={getLinkStyle('/')}>Início</Link>
                    <Link href="/loja" className={getLinkStyle('/loja')}>Loja</Link>
                    <Link href="/regras" className={getLinkStyle('/regras')}>Regras</Link>
                    <Link href="/equipe" className={getLinkStyle('/equipe')}>Equipe</Link>
                </nav>

                {/* Botões de Ação (Direita) */}
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="hidden lg:flex items-center gap-3 mr-2">
                        
                        {/* Botão Fórum/Discord */}
                        <Link
                            href="#"
                            className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-white bg-surface-container hover:bg-[#5865F2]/20 border border-outline-variant hover:border-[#5865F2]/50 rounded-xl transition-all group"
                            title="Comunidade Discord"
                        >
                            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">forum</span>
                        </Link>

                        {/* Botão VIP */}
                        <Link
                            href="/vip"
                            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary-fixed/10 text-secondary-fixed border border-secondary-fixed/20 hover:bg-secondary-fixed/20 hover:border-secondary-fixed/50 hover:shadow-[0_0_15px_rgba(255,225,109,0.2)] transition-all group"
                            title="Página VIP"
                        >
                            <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                            <span className="font-bold text-xs tracking-widest uppercase mt-0.5">VIP</span>
                        </Link>
                    </div>

                    {/* Botão Call to Action: Fazer Login */}
                    <Link 
                        href="/login" 
                        className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high border border-outline-variant text-white font-bold rounded-xl hover:bg-primary hover:text-background hover:border-primary hover:shadow-[0_0_25px_rgba(140,218,112,0.4)] transition-all uppercase text-sm tracking-widest group"
                    >
                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-0.5 transition-transform">login</span>
                        Fazer Login
                    </Link>
                </div>
            </div>
        </header>
    );
}
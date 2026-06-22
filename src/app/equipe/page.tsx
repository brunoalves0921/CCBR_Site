'use client';

import Image from 'next/image';

export default function Equipe() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Mensagem enviada com sucesso!');
    };

    const renderStaffCard = (nick: string, cargo: string, isBody: boolean, colorClass: string = "bg-primary") => (
        <div key={nick} className="group relative bg-[#121316] rounded-2xl border border-white/10 flex flex-col hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_15px_35px_rgba(140,218,112,0.15)] transition-all duration-500 overflow-hidden h-full">
            
            {/* Container da Imagem */}
            <div className={`w-full ${isBody ? 'h-56' : 'h-32'} relative bg-surface-container-low flex items-center justify-center overflow-hidden shrink-0 border-b border-white/5`}>
                <Image
                    fill
                    unoptimized
                    src={isBody ? `https://mc-heads.net/body/${nick}/right` : `https://mc-heads.net/avatar/${nick}/100`}
                    alt={`Avatar ${nick}`}
                    className={`object-contain group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 ${isBody ? 'p-2 mt-4' : 'p-6'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-90"></div>
            </div>
            
            {/* Container de Texto e Tags */}
            <div className="p-6 flex flex-col flex-grow relative z-10 text-center items-center justify-center">
                <div className="inline-flex items-center gap-1.5 mb-3 bg-black/60 border border-white/10 px-3 py-1.5 rounded-lg shadow-sm">
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${colorClass}`}></span>
                    <span className="text-[10px] font-black text-white tracking-widest uppercase">{cargo}</span>
                </div>
                <h2 className="text-xl text-white font-black leading-tight tracking-tight">{nick}</h2>
            </div>
            
        </div>
    );

    return (
        <main className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
            {/* Luz de fundo */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

            <div className="max-w-[1340px] mx-auto px-6 md:px-8 relative z-10">
                
                {/* Header Centralizado (Sem a caixa de suporte) */}
                <header className="mb-16 text-center">
                    <h1 className="font-display-lg text-5xl md:text-7xl text-white font-black mb-6 tracking-tighter uppercase leading-none">
                        Nossa <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300 drop-shadow-[0_0_15px_rgba(140,218,112,0.3)]">Equipe</span>
                    </h1>
                    <p className="text-gray-400 font-body-lg text-lg leading-relaxed max-w-2xl mx-auto">
                        Conheça os responsáveis por manter a ordem no servidor. Utilize o formulário para entrar em contato diretamente com nossos administradores ou acesse o Discord.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Coluna Esquerda: Listagem de Membros (8 colunas) */}
                    <div className="lg:col-span-8 flex flex-col w-full space-y-12">
                        
                        {/* Seção Administração */}
                        <div>
                            <h3 className="text-[#6B7280] font-bold text-[11px] tracking-widest uppercase mb-4 ml-1">
                                Administração
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
                                {renderStaffCard('SucriilhsBR', 'Owner', true, 'bg-[#ffdb3c]')}
                                {renderStaffCard('Notch', 'Admin', true, 'bg-[#ffdb3c]')}
                            </div>
                        </div>

                        {/* Seção Moderação e Ajudantes */}
                        <div>
                            <h3 className="text-[#6B7280] font-bold text-[11px] tracking-widest uppercase mb-4 ml-1">
                                Moderação & Ajudantes
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                                {renderStaffCard('IronWill', 'Moderador', false, 'bg-primary')}
                                {renderStaffCard('BlockShield', 'Moderador', false, 'bg-primary')}
                                {renderStaffCard('Dinnerbone', 'Ajudante', false, 'bg-blue-400')}
                            </div>
                        </div>
                    </div>

                    {/* Coluna Direita: Formulário e Discord (4 colunas) */}
                    <aside className="lg:col-span-4 space-y-8">
                        
                        {/* Formulário de Contato */}
                        <div className="bg-[#121316] rounded-2xl border border-white/10 flex flex-col overflow-hidden">
                            <div className="p-6 border-b border-white/10 bg-surface-container-low/50 shrink-0">
                                <h2 className="text-xl font-black text-white flex items-center gap-2 uppercase tracking-widest">
                                    <span className="material-symbols-outlined text-primary">support_agent</span>
                                    Contato
                                </h2>
                            </div>
                            
                            <form className="p-6 space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-300">Nickname</label>
                                    <input 
                                        type="text" 
                                        placeholder="Seu nick do Minecraft" 
                                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition focus:border-primary text-sm" 
                                        required 
                                    />
                                </div>
                                
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-300">E-mail</label>
                                    <input 
                                        type="email" 
                                        placeholder="contato@exemplo.com" 
                                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition focus:border-primary text-sm" 
                                        required 
                                    />
                                </div>
                                
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-300">Mensagem</label>
                                    <textarea 
                                        placeholder="Como podemos ajudar?" 
                                        rows={4} 
                                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition focus:border-primary text-sm resize-none" 
                                        required 
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full py-4 mt-2 rounded-xl bg-primary text-[#0A1A08] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(140,218,112,0.3)] text-sm"
                                >
                                    Enviar Chamado
                                </button>
                            </form>
                        </div>

                        {/* Widget Discord */}
                        <a href="#" className="group bg-[#121316] rounded-2xl border border-[#5865F2]/30 flex flex-col hover:-translate-y-1.5 hover:border-[#5865F2] hover:shadow-[0_15px_35px_rgba(88,101,242,0.15)] transition-all duration-500 overflow-hidden relative p-6">
                            <div className="flex items-center gap-4 mb-4 relative z-10">
                                <div className="w-12 h-12 bg-[#5865F2]/10 rounded-xl flex items-center justify-center text-[#5865F2] shrink-0 border border-[#5865F2]/20">
                                    <span className="material-symbols-outlined text-2xl">forum</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white uppercase tracking-widest">Discord</h3>
                                    <p className="text-gray-400 text-[11px] font-medium uppercase tracking-widest">Comunidade Oficial</p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm mb-6 relative z-10 leading-relaxed">
                                Junte-se ao nosso servidor do Discord para suporte em tempo real, denúncias, sorteios e avisos importantes.
                            </p>
                            <div className="w-full py-3.5 rounded-xl bg-[#5865F2] text-white font-bold uppercase tracking-widest text-center text-[11px] transition-all shadow-lg group-hover:scale-[1.02] relative z-10">
                                Entrar no Servidor
                            </div>
                        </a>

                    </aside>
                </div>
            </div>
        </main>
    );
}
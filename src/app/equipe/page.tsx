'use client';
import Image from 'next/image';

export default function Equipe() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso!');
  };

  return (
    <main className="min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
      
      {/* Luzes de fundo (Aura) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Hero Header */}
        <header className="mb-16 text-center border-b border-outline-variant pb-12">
          <span className="font-label-caps text-sm text-primary font-bold tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">shield_person</span>
            Guardiões do Servidor
          </span>
          <h1 className="font-display-lg text-5xl md:text-6xl text-white font-black mb-6 tracking-tighter uppercase">
            Nossa <span className="text-primary">Equipe</span>
          </h1>
          <p className="text-gray-400 font-body-lg text-lg leading-relaxed max-w-2xl mx-auto">
            Conheça os responsáveis por manter a ordem no reino e entre em contato caso precise de auxílio em sua jornada no CCBR.
          </p>
        </header>

        {/* Bento Grid Layout Original Repaginado */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Coluna Esquerda (Staff - 8 Colunas) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Bloco Administração */}
            <div className="bg-surface-container-low border border-outline-variant p-8 rounded-[2rem] shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-secondary-fixed text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                <h2 className="font-display-lg text-3xl font-black uppercase tracking-tight text-white">Administração</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Admin 1 */}
                <div className="flex flex-col items-center p-6 bg-surface-container rounded-2xl border-b-4 border-secondary-fixed enchanted-glint hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(255,225,109,0.15)] transition-all relative overflow-hidden">
                  <div className="w-24 h-24 mb-4 relative z-10">
                    <Image fill alt="Avatar CraftMaster" className="rounded-2xl bg-surface-variant object-cover border-2 border-secondary-fixed" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAdv0BUmgq6wO3BRHpHe6omfPxTyer1b_aX8nmiDdmMViCupBR-D-187Isxx4r9pUmv_yz3dP9-fevwEEWFjvmc4iO1aikYD0PC6c9vikDZa-3qn4vfdsVXmgTrpEvZodjIYaKOmpq2J3ysBvg-IBKGdXCH_HtJ4ZWoiCcSwhI8PO49Tzi7gSJRxZgCD-0y_g0bb85axKZeaT7gyWGPwc7gXmO6wx_Lm6zb7zE-8hKWVsqM0DUI5P7Hs6lOewkQmnO4i93syswpiU" />
                  </div>
                  <span className="font-label-caps text-xs text-secondary-fixed mb-1 font-black tracking-widest relative z-10">OWNER</span>
                  <span className="font-headline-md text-xl font-bold text-white relative z-10">CraftMaster</span>
                </div>
                
                {/* Admin 2 */}
                <div className="flex flex-col items-center p-6 bg-surface-container rounded-2xl border-b-4 border-[#ffdb3c] hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(255,219,60,0.15)] transition-all relative overflow-hidden">
                  <div className="w-24 h-24 mb-4 relative z-10">
                    <Image fill alt="Avatar VoxelKing" className="rounded-2xl bg-surface-variant object-cover border-2 border-[#ffdb3c]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdLfL4kpd3ymJT-ygh9TtliyqEv3d_WSfkoWky_56XZB-4XVWHv17lfaA5Gsc1Tlra5McRkxrJmN69kK2WAgMhTl3juoy8CTo2xZv3T5M8a-n9ZRXO2XbbepAV_-87c8hMoBUNwUYMXtFIangmPvCsH7E7ZAma3OOhjTwPNeT97EY15txVigVxmAtRu90AimRiS8VqwmR4WrDywXnzgQMIh-jWgH86TJwi_xEDn0L66qJHrjQi6u0nf0fVl9QUbg0QR8O8Kpv0oaU" />
                  </div>
                  <span className="font-label-caps text-xs text-[#ffdb3c] mb-1 font-black tracking-widest relative z-10">ADMIN</span>
                  <span className="font-headline-md text-xl font-bold text-white relative z-10">VoxelKing</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              {/* Bloco Moderação */}
              <div className="bg-surface-container-low border border-outline-variant p-8 rounded-[2rem] shadow-lg">
                <h3 className="font-display-lg text-2xl font-black uppercase tracking-tight text-white mb-6">Moderação</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-surface-container rounded-xl hover:border-primary/50 border border-transparent transition-colors">
                    <div className="relative w-14 h-14 shrink-0">
                      <Image fill className="rounded-xl object-cover" alt="Avatar IronWill" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVT3oQAYpaqK6fVEet9_eveTRpz4ClqG-ChiSa5pZjjm2lStkCG68h2GDMhOnAtiHSHso0mfQ5cTipmNe9K-y1zY2IpL8UJGSDcC9Odp_S3nToka3bg6uPu4nlMmXSeubBf0x4xK0C9YlvOaifVEOtvQzugIkRlqkaPZk43C2NOOACDhFgalUvATXgRRuRTDXEZhlhG8y1lWG0ZPheWIqZmu3wastr_AeApe_rgq8xhihTo-Sbv2-B_KFdYvHJoWd8ZxmHrwOCPK4" />
                    </div>
                    <div>
                      <p className="font-headline-md font-bold text-lg text-white">IronWill</p>
                      <p className="text-[10px] font-label-caps font-bold tracking-widest text-primary uppercase">Moderador</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-surface-container rounded-xl hover:border-primary/50 border border-transparent transition-colors">
                    <div className="relative w-14 h-14 shrink-0">
                      <Image fill className="rounded-xl object-cover" alt="Avatar BlockShield" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClc62KOiro30C_q_U8MIPf_aZzWNVcdgSNYTUdeG_4YeiRPLskrjvDSMZHO0ibEfi79WuY5p-wyYT9i8cEak9uRedrlEeM_y_esqrOJ6ExNwsMHNYBmWKK5gbZJQg9mKiUDp6Bmi47tmgqHbDWtHwxGUP0sJopK2HQaicChQUCBRlO-RHyO_yRKFJynrRU_OSeCXU4yVBfw6QTd51yy6tFlJIuHjeFs9TNCmhtFmf_xLfidBC5XVWfY8ghe0xV4cQZWpyboR1KxGk" />
                    </div>
                    <div>
                      <p className="font-headline-md font-bold text-lg text-white">BlockShield</p>
                      <p className="text-[10px] font-label-caps font-bold tracking-widest text-primary uppercase">Moderador</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloco Ajudantes */}
              <div className="bg-surface-container-low border border-outline-variant p-8 rounded-[2rem] shadow-lg">
                <h3 className="font-display-lg text-2xl font-black uppercase tracking-tight text-white mb-6">Ajudantes</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-surface-container rounded-xl border-l-4 border-primary">
                    <div className="relative w-14 h-14 shrink-0">
                      <Image fill className="rounded-xl object-cover" alt="Avatar FriendlyBot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv17MP5vcVc6Y1dEu5UYfezBg-yRHamD9N4Ly8KQxZicpo9d00rfjB1QNcpY4nhphVO0SUU4ow3ET2bH2Pe4Vn70hDIjh3Lt66eIQlKOlnxYXkzxBXuClOm5ox7QxesFW_Qbtw-lkPdlLCXIQCNlRZgUvPM7K1ImzxhGCtjw3H6PiuOLLcKFVOuZPqdlsfhjW4l7BBeirS_FGBlj0xuXI_5FEZ1JP-zzz-IuTy-tZH5uyhJ9VHi7LslwADGDiTrtOi98EJ4peaWlo" />
                    </div>
                    <div>
                      <p className="font-headline-md font-bold text-lg text-white">FriendlyBot</p>
                      <p className="text-[10px] font-label-caps font-bold tracking-widest text-gray-400 uppercase">Ajudante</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-surface-container rounded-xl border-l-4 border-primary">
                    <div className="relative w-14 h-14 shrink-0">
                      <Image fill className="rounded-xl object-cover" alt="Avatar NovaGuide" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSM7tmFdUYvkA8kR39RjLU4OEkoRJbnYmSPwqlgoBMdKyNN4oPhnfJFpxYT6NfQaKkGQeF81aM8-Tsb7ixtqhaoNXU0WDyzjXn9m0NRLYhnTOtgnh7sdEOZVP4waWrUFvuoYDCeOc_ehvp3DWCokxk_VY4yngKVztObH4UpBhB1l8o-v1d6iKMcSNCD4l89U3J5qmXq6kvd9mypyolwnXxj3jk5Sj_cIABEWommZmwtY_9oDL4PYc3Oq9eq9nUeSAEk4Y7Vhy4QTY" />
                    </div>
                    <div>
                      <p className="font-headline-md font-bold text-lg text-white">NovaGuide</p>
                      <p className="text-[10px] font-label-caps font-bold tracking-widest text-gray-400 uppercase">Ajudante</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Coluna Direita (Suporte - 4 Colunas) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Formulário de Contato */}
            <div className="bg-surface-container-low border border-outline-variant p-8 rounded-[2rem] relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <span className="material-symbols-outlined text-[100px]">support_agent</span>
              </div>
              
              <h2 className="font-display-lg text-2xl font-black uppercase tracking-tight text-white mb-6 relative z-10">Suporte Direto</h2>
              
              <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
                <div className="group">
                  <label className="block text-[10px] font-label-caps font-bold tracking-widest text-gray-400 mb-2 group-focus-within:text-primary transition-colors">NOME / NICK</label>
                  <input className="w-full bg-surface-container border border-outline-variant focus:border-primary focus:ring-0 text-white px-4 py-3 rounded-xl transition-all outline-none" placeholder="Seu Nick no Jogo" type="text" required />
                </div>
                
                <div className="group">
                  <label className="block text-[10px] font-label-caps font-bold tracking-widest text-gray-400 mb-2 group-focus-within:text-primary transition-colors">EMAIL</label>
                  <input className="w-full bg-surface-container border border-outline-variant focus:border-primary focus:ring-0 text-white px-4 py-3 rounded-xl transition-all outline-none" placeholder="contato@exemplo.com" type="email" required />
                </div>
                
                <div className="group">
                  <label className="block text-[10px] font-label-caps font-bold tracking-widest text-gray-400 mb-2 group-focus-within:text-primary transition-colors">MENSAGEM</label>
                  <textarea className="w-full bg-surface-container border border-outline-variant focus:border-primary focus:ring-0 text-white px-4 py-3 rounded-xl transition-all outline-none resize-none" placeholder="Como podemos ajudar?" rows={4} required></textarea>
                </div>
                
                <button type="submit" className="w-full bg-primary text-background font-black py-4 rounded-xl hover:bg-white hover:shadow-[0_0_20px_rgba(140,218,112,0.4)] transition-all uppercase tracking-widest text-sm">
                  Enviar Chamado
                </button>
              </form>
            </div>

            {/* Status do Suporte Original */}
            <div className="bg-surface-container-highest border border-outline-variant p-8 rounded-[2rem] shadow-md">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-label-caps font-bold tracking-widest text-gray-400 uppercase">Tempo de Resposta</span>
                <span className="text-[10px] font-label-caps font-bold tracking-widest text-primary uppercase bg-primary/10 px-2 py-1 rounded">Rápido</span>
              </div>
              
              <div className="flex gap-1 mb-4 h-3">
                <div className="flex-1 bg-primary rounded-l-sm clip-path-slant"></div>
                <div className="flex-1 bg-primary clip-path-slant"></div>
                <div className="flex-1 bg-primary clip-path-slant"></div>
                <div className="flex-1 bg-primary clip-path-slant"></div>
                <div className="flex-1 bg-primary clip-path-slant"></div>
                <div className="flex-1 bg-primary clip-path-slant"></div>
                <div className="flex-1 bg-surface-variant clip-path-slant"></div>
                <div className="flex-1 bg-surface-variant rounded-r-sm clip-path-slant"></div>
              </div>
              
              <p className="text-xs text-gray-400 leading-relaxed font-medium">Atualmente operando com <strong className="text-white">85% de eficiência</strong> na equipe de suporte online.</p>
            </div>

            {/* Widget Discord */}
            <a className="group block bg-gradient-to-br from-[#5865F2] to-[#4752C4] p-8 rounded-[2rem] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(88,101,242,0.3)] transition-all overflow-hidden relative" href="#">
              <div className="absolute -right-6 -bottom-6 opacity-20 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-[120px] text-white">diamond</span>
              </div>
              <div className="relative z-10 flex flex-col items-start">
                <h3 className="font-display-lg text-2xl font-black uppercase mb-2 text-white tracking-tight">Comunidade</h3>
                <p className="text-sm text-white/90 mb-6 max-w-[200px] font-medium leading-relaxed">Suporte em tempo real, denúncias e avisos.</p>
                <div className="px-5 py-2.5 bg-white text-[#5865F2] rounded-xl font-bold font-label-caps text-xs tracking-widest uppercase shadow-lg">
                  Entrar no Discord
                </div>
              </div>
            </a>

          </div>
        </div>
      </div>
    </main>
  );
}
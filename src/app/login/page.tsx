'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { authenticatePlayer } from '../actions/auth';

function LoginForm() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [nickname, setNickname] = useState('');
    const [pin, setPin] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const pinParam = searchParams.get('pin');
        if (pinParam) {
            setPin(pinParam.toUpperCase());
        }

        const nickParam = searchParams.get('nick');
        if (nickParam) {
            setNickname(nickParam);
        }
    }, [searchParams]);

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'ccbr_login_sync') {
                router.push('/');
                router.refresh();
            }
        };
        
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!nickname || !pin) {
            setErrorMessage('Preencha todos os campos.');
            return;
        }

        setIsLoading(true);

        const result = await authenticatePlayer(nickname, pin);

        if (result.success) {
            localStorage.setItem('ccbr_login_sync', Date.now().toString());
            window.close();
            setSuccessMessage('Você já pode fechar esta aba e retornar para a página principal.');
            setIsLoading(false);
        } else {
            setErrorMessage(result.error || 'Erro desconhecido.');
            setIsLoading(false);
        }
    };

    if (successMessage) {
        return (
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-10">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-2">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <h2 className="text-2xl font-black text-white">Autenticado com Sucesso!</h2>
                <p className="text-gray-400 text-sm max-w-sm">{successMessage}</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleLogin} className="space-y-5">
            {errorMessage && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                    {errorMessage}
                </div>
            )}

            <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                    Nickname
                </label>
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Seu nick do Minecraft"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition focus:border-primary"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-gray-300">
                    Código PIN
                </label>
                <input
                    type="text"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value.toUpperCase())}
                    placeholder="ABC123"
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-center text-lg font-bold uppercase tracking-[0.3em] text-white outline-none transition focus:border-primary"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="flex h-14 w-full items-center justify-center rounded-xl bg-primary font-black text-black transition hover:opacity-80 disabled:opacity-70"
            >
                {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                ) : (
                    'ENTRAR NO SISTEMA'
                )}
            </button>
        </form>
    );
}

export default function Login() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-black">
            <div className="absolute inset-0">
                <Image
                    src="/banner.webp"
                    alt="Minecraft"
                    fill
                    priority
                    className="object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-black/70" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />
                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
            </div>

            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
                <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
                    <div className="grid lg:grid-cols-2">
                        <div className="p-8 md:p-12">
                            <Link
                                href="/"
                                className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
                            >
                                ← Voltar para Home
                            </Link>

                            <div className="mb-8">
                                <div className="mb-6 flex items-center gap-4">
                                    <div>
                                        <h1 className="text-3xl font-black text-white">
                                            Acessar Conta
                                        </h1>
                                        <p className="text-gray-400">
                                            Entre utilizando o código gerado dentro do servidor.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Suspense fallback={<div className="text-white">Carregando formulário...</div>}>
                                <LoginForm />
                            </Suspense>
                        </div>

                        <div className="border-t border-white/10 bg-black/20 p-8 lg:border-l lg:border-t-0 lg:p-12">
                            <h2 className="mb-6 text-2xl font-bold text-white">
                                Como obter seu PIN?
                            </h2>
                            <div className="space-y-5">
                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-black text-black">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">
                                            Entre no servidor
                                        </h3>
                                        <p className="text-gray-400">
                                            jogar.ccbr.com.br
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-black text-black">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">
                                            Execute o comando
                                        </h3>
                                        <code className="rounded bg-black/40 px-2 py-1 text-primary">
                                            /logar
                                        </code>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-black text-black">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">
                                            Copie o código gerado
                                        </h3>
                                        <p className="text-gray-400">
                                            O código expira em 5 minutos.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/10 p-5">
                                <p className="text-sm text-primary">
                                    Segurança garantida. Nenhuma senha do Minecraft
                                    é armazenada em nosso sistema.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
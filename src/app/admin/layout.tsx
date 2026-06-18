// src/app/admin/layout.tsx
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Pega o cookie da sessão
  const cookieStore = await cookies();
  const session = cookieStore.get('ccbr_session');

  // Se não tem sessão, vai pro login
  if (!session) {
    redirect('/login');
  }

  // 2. Busca o usuário no banco de dados para checar o cargo (role)
  // IMPORTANTE: Ajuste a busca (where) de acordo com a lógica que você usa no seu banco
  const user = await prisma.user.findFirst({
    where: {
      // Exemplo: sessionToken: session.value
      // Ou busque pelo ID/Nick salvo na sua sessão
    },
  });

  // 3. Se o usuário não existir ou não for ADMIN/STAFF, expulsa imediatamente
  if (!user || (user.role !== 'ADMIN' && user.role !== 'STAFF')) {
    redirect('/'); // Redireciona para a página inicial ANTES da tela carregar
  }

  // Se passou por tudo, renderiza a página Admin normalmente
  return <>{children}</>;
}
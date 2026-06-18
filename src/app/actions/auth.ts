'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function authenticatePlayer(nickname: string, pin: string) {
    try {
        const sitePin = await prisma.sitePin.findUnique({
            where: { pinCode: pin }
        });

        if (!sitePin) {
            return { success: false, error: 'PIN inválido ou não encontrado.' };
        }

        if (sitePin.playerNick.toLowerCase() !== nickname.toLowerCase()) {
            return { success: false, error: 'Nickname não corresponde ao PIN.' };
        }

        // Criamos uma margem de erro de 2 minutos para evitar problemas de fuso horário
        const now = new Date();
        const buffer = 2 * 60 * 1000; 
        
        if (sitePin.expiresAt.getTime() < (now.getTime() - buffer)) {
            await prisma.sitePin.delete({ where: { id: sitePin.id } });
            return { success: false, error: 'Este PIN expirou. Gere um novo no servidor.' };
        }

        await prisma.sitePin.delete({ where: { id: sitePin.id } });

        const cookieStore = await cookies();
        cookieStore.set('ccbr_session', sitePin.playerNick, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 
        });

        return { success: true };
    } catch (error) {
        console.error('Erro na autenticação:', error);
        return { success: false, error: 'Erro interno de servidor.' };
    }
}
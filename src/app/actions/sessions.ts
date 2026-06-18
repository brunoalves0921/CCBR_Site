'use server';

import { cookies } from 'next/headers';

export async function getSession() {
    const cookieStore = await cookies();
    return cookieStore.get('ccbr_session')?.value || null;
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('ccbr_session');
}
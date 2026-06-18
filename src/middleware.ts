import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('ccbr_session')?.value;
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin') || pathname.startsWith('/api/checkout')) {
        if (!token) {
            if (pathname.startsWith('/api/')) {
                return NextResponse.json({ error: 'Acesso negado. Não autenticado.' }, { status: 401 });
            }
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/api/admin/:path*',
        '/api/checkout/:path*'
    ]
};
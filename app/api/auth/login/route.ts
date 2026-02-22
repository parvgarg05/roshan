import { NextResponse } from 'next/server';
import { signAuthToken } from '@/lib/auth';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const inputPassword = typeof body?.password === 'string' ? body.password : '';

        if (!ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: 'Admin password is not configured on the server.' },
                { status: 500 }
            );
        }

        if (!inputPassword || inputPassword !== ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        const token = await signAuthToken({ role: 'admin' });

        const response = NextResponse.json({ ok: true });
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24,
        });

        return response;
    } catch {
        return NextResponse.json({ error: 'Something went wrong. Try again.' }, { status: 500 });
    }
}

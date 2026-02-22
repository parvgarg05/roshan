import { NextRequest, NextResponse } from 'next/server';
import { signAuthToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        const { password } = await req.json();

        // In a full system we'd verify against Prisma AdminUser.
        // For this MVP, we use a single strong environment password.
        const CORRECT_PASSWORD = process.env.ADMIN_PASSWORD || 'roshanlal123';

        if (password !== CORRECT_PASSWORD) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        // Sign the token
        const token = await signAuthToken({ role: 'admin' });

        // Create the response and set the HttpOnly cookie
        const response = NextResponse.json({ success: true });

        response.cookies.set({
            name: 'admin_token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

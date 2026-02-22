'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function AdminLoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                const from = searchParams?.get('from') || '/admin';
                router.push(from);
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || 'Invalid password');
            }
        } catch {
            setError('Something went wrong. Try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-cream-50">
            <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-warm border border-cream-200 text-center">
                <div className="w-12 h-12 bg-maroon-100 text-maroon-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock size={24} />
                </div>

                <h1 className="font-display font-bold text-2xl text-maroon-900 mb-2">Admin Login</h1>
                <p className="text-sm text-maroon-500 mb-8">Enter your master password to access the L.Roshanlal Ji Sweets dashboard.</p>

                <form onSubmit={handleLogin} className="space-y-4 text-left">
                    <Input
                        type="password"
                        label="Password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                    />

                    {error && (
                        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
                            {error}
                        </p>
                    )}

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full mt-2"
                        loading={isLoading}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
}

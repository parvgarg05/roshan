import type { Metadata } from 'next';
import { Inter, Playfair_Display, Noto_Serif_Devanagari } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── Font Definitions ──────────────────────────────────── */
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
    weight: ['400', '600', '700'],
    style: ['normal', 'italic'],
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
    subsets: ['devanagari'],
    variable: '--font-noto-serif-devanagari',
    display: 'swap',
    weight: ['400', '600', '700'],
});

/* ─── Metadata ──────────────────────────────────────────── */
export const metadata: Metadata = {
    title: {
        default: 'Roshanlal & Sons – Premium Indian Sweets | Nadrai Gate, UP',
        template: '%s | Roshanlal & Sons',
    },
    description:
        'Order fresh, handcrafted Indian sweets and mithai online from Roshanlal & Sons – a trusted sweet shop at Circular Road, Malgodam Crossing Nadrai Gate, UP 207123. Delivering happiness since generations.',
    keywords: [
        'Indian sweets', 'mithai', 'online sweet shop UP', 'Roshanlal sweets',
        'Nadrai Gate sweets', 'traditional Indian mithai', 'gulab jamun', 'barfi',
    ],
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        siteName: 'Roshanlal & Sons',
        title: 'Roshanlal & Sons – Premium Indian Sweets',
        description: 'Handcrafted Indian sweets delivered to your door.',
    },
    robots: { index: true, follow: true },
    themeColor: '#f97316',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
};

/* ─── Root Layout ───────────────────────────────────────── */
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${playfair.variable} ${notoSerifDevanagari.variable}`}
        >
            <body className="min-h-screen bg-cream-100 flex flex-col">
                <CartProvider>
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </CartProvider>
            </body>
        </html>
    );
}

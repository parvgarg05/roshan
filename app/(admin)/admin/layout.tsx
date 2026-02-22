import Link from 'next/link';
import { PackageSearch, LayoutDashboard, Settings, LogOut, Tags } from 'lucide-react';
import LogoutButton from './LogoutButton';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-cream-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-maroon-900 text-cream-100 flex flex-col hidden md:flex shrink-0">
                <div className="p-6 border-b border-maroon-800">
                    <h2 className="font-display font-bold text-xl text-saffron-400">Admin Panel</h2>
                    <p className="text-xs text-maroon-300 mt-1">Roshanlal & Sons</p>
                </div>

                <nav className="flex-1 py-6 px-4 space-y-1">
                    <NavItem href="/admin" icon={LayoutDashboard} label="Overview" />
                    <NavItem href="/admin/orders" icon={PackageSearch} label="Orders" />
                    <NavItem href="/admin/products" icon={Tags} label="Products" />
                </nav>

                <div className="p-4 border-t border-maroon-800">
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden relative">
                <div className="md:hidden bg-maroon-900 text-white p-4 flex justify-between items-center">
                    <h2 className="font-display font-bold text-lg text-saffron-400">Admin Panel</h2>
                    <LogoutButton iconOnly />
                </div>
                {children}
            </main>
        </div>
    );
}

function NavItem({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-cream-200 hover:bg-maroon-800 hover:text-white transition-colors"
        >
            <Icon size={18} />
            <span className="font-medium text-sm">{label}</span>
        </Link>
    );
}

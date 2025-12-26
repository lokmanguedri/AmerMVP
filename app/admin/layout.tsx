'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Menu, X, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { t } = useLanguage();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navItems = [
        { name: t('dashboard'), href: '/admin', icon: LayoutDashboard },
        { name: t('products'), href: '/admin/products', icon: Package },
        { name: t('orders'), href: '/admin/orders', icon: ShoppingCart },
        { name: t('settings'), href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-50 h-screen w-64 bg-[#1a1a1a] text-white transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:static
            `}>
                <div className="h-16 flex items-center px-6 border-b border-gray-800">
                    <span className="text-xl font-black text-orange-500 tracking-tighter">TOLI<span className="text-white">ADMIN</span></span>
                    <button className="ml-auto lg:hidden text-gray-400" onClick={toggleSidebar}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive
                                    ? 'bg-orange-500 text-white font-bold'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Icon size={20} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-4 left-4 right-4">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors p-2 w-full">
                        <LogOut size={20} />
                        <span>{t('signOut')}</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:hidden sticky top-0 z-30">
                    <button onClick={toggleSidebar} className="text-gray-600 p-2">
                        <Menu size={24} />
                    </button>
                    <span className="ml-4 font-bold text-gray-900">Admin Panel</span>
                </header>

                <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

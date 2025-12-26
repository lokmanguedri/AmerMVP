'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu, User, Globe, ChevronDown, Home, LayoutGrid } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Language } from '@/lib/translations';
import { useCart } from '@/components/providers/CartProvider';

export function Navbar() {
    const { t, language, setLanguage } = useLanguage();
    const { itemsCount } = useCart();
    const [showLangMenu, setShowLangMenu] = useState(false);

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
        setShowLangMenu(false);
    };

    const getLangLabel = (lang: Language) => {
        switch (lang) {
            case 'en': return 'En';
            case 'fr': return 'Fr';
            case 'ar': return 'عربي';
        }
    };

    return (
        <>
            {/* DESKTOP & TABLET HEADER */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 transition-all">
                {/* Top Bar (Hidden on Mobile) */}
                <div className="hidden md:block bg-gray-100 border-b border-gray-200 text-xs py-2">
                    <div className="max-w-[1400px] mx-auto px-4 flex justify-between text-gray-600">
                        <div className="flex gap-4">
                            <span>Ship to: <strong>Algeria</strong></span>
                            <span>{t('support247')}</span>
                        </div>
                        <div className="flex gap-4 relative">
                            <span
                                className="flex items-center gap-1 cursor-pointer hover:text-orange-500 relative"
                                onMouseEnter={() => setShowLangMenu(true)}
                                onMouseLeave={() => setShowLangMenu(false)}
                            >
                                {getLangLabel(language)} <ChevronDown size={12} />

                                {showLangMenu && (
                                    <div className="absolute top-full right-0 bg-white border border-gray-200 shadow-md rounded-md py-2 min-w-[100px] z-50">
                                        <button onClick={() => handleLanguageChange('en')} className="block w-full text-left px-4 py-1 hover:bg-gray-100 hover:text-orange-500">English</button>
                                        <button onClick={() => handleLanguageChange('fr')} className="block w-full text-left px-4 py-1 hover:bg-gray-100 hover:text-orange-500">Français</button>
                                        <button onClick={() => handleLanguageChange('ar')} className="block w-full text-left px-4 py-1 hover:bg-gray-100 hover:text-orange-500">العربية</button>
                                    </div>
                                )}
                            </span>
                            <span className="cursor-pointer hover:text-orange-500">{t('returnsOrders')}</span>
                        </div>
                    </div>
                </div>

                {/* Main Header */}
                <div className="max-w-[1400px] mx-auto px-4 py-3 md:py-4 flex items-center justify-between md:justify-start gap-4 md:gap-8">
                    {/* Brand */}
                    <Link href="/" className="flex-shrink-0">
                        <span className="text-2xl md:text-3xl font-black text-orange-500 tracking-tighter">TOLI<span className="text-black">PARTS</span></span>
                    </Link>

                    {/* Search Bar - Dominant */}
                    <div className="hidden md:flex flex-1 max-w-2xl relative">
                        <div className="bg-gray-100 border border-gray-300 rounded-lg flex w-full overflow-hidden hover:border-orange-500 transition-colors">
                            <select className="bg-gray-100 text-xs font-bold text-gray-600 px-3 border-r border-gray-300 outline-none cursor-pointer">
                                <option>{t('allCategories')}</option>
                                <option>{t('catBodywork')}</option>
                                <option>{t('catLighting')}</option>
                            </select>
                            <input
                                type="text"
                                placeholder={t('searchPlaceholder')}
                                className="flex-1 px-4 py-2.5 text-sm outline-none text-black bg-transparent"
                            />
                            <button className="bg-orange-400 hover:bg-orange-500 text-white px-6 font-bold flex items-center justify-center">
                                <Search size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search Icon */}
                    <button className="md:hidden p-2 text-gray-600">
                        <Search size={24} />
                    </button>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-6 flex-shrink-0">
                        <Link href="/login" className="flex flex-col text-xs cursor-pointer hover:text-orange-500">
                            <span className="text-gray-500">{t('helloSignIn')}</span>
                            <span className="font-bold flex items-center gap-1">{t('accountLists')} <ChevronDown size={12} /></span>
                        </Link>

                        <div className="flex flex-col text-xs cursor-pointer hover:text-orange-500">
                            <span className="text-gray-500">Returns</span>
                            <span className="font-bold">& Orders</span>
                        </div>

                        <Link href="/cart" className="flex items-center gap-2 group">
                            <div className="relative">
                                <ShoppingCart size={32} className="text-gray-800 group-hover:text-orange-500" />
                                {itemsCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white">
                                        {itemsCount}
                                    </span>
                                )}
                            </div>
                            <span className="font-bold text-sm hidden lg:block group-hover:text-orange-500">{t('cart')}</span>
                        </Link>
                    </div>

                    {/* Mobile Cart Icon Only */}
                    <Link href="/cart" className="relative md:hidden">
                        <ShoppingCart size={24} className="text-gray-800" />
                        {itemsCount > 0 && (
                            <span className="absolute -top-2 -right-2 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                {itemsCount}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Category Bar (Desktop Only) */}
                <div className="hidden md:block bg-gray-800 text-white text-sm py-2">
                    <div className="max-w-[1400px] mx-auto px-4 flex items-center gap-6 overflow-x-auto">
                        <button className="flex items-center gap-2 font-bold hover:text-orange-400 whitespace-nowrap">
                            <Menu size={18} /> {t('allCategories')}
                        </button>
                        <Link href="/shop?cat=bodywork" className="hover:text-orange-400 whitespace-nowrap transition-colors">{t('catBodywork')}</Link>
                        <Link href="/shop?cat=headlights" className="hover:text-orange-400 whitespace-nowrap transition-colors">{t('catHeadlights')}</Link>
                        <Link href="/shop?cat=tail lights" className="hover:text-orange-400 whitespace-nowrap transition-colors">{t('catTailLights')}</Link>
                        <Link href="/shop?cat=bumpers" className="hover:text-orange-400 whitespace-nowrap transition-colors">{t('catBumpers')}</Link>
                    </div>
                </div>
            </header>

            {/* MOBILE BOTTOM NAVIGATION */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
                <div className="grid grid-cols-4 h-16">
                    <Link href="/" className="flex flex-col items-center justify-center text-gray-500 hover:text-orange-500">
                        <Home size={20} />
                        <span className="text-[10px] mt-1 font-medium">{t('home')}</span>
                    </Link>
                    <Link href="/shop" className="flex flex-col items-center justify-center text-gray-500 hover:text-orange-500">
                        <LayoutGrid size={20} />
                        <span className="text-[10px] mt-1 font-medium">{t('shop')}</span>
                    </Link>
                    <Link href="/cart" className="flex flex-col items-center justify-center text-gray-500 hover:text-orange-500 relative">
                        <ShoppingCart size={20} />
                        <span className="text-[10px] mt-1 font-medium">{t('cart')}</span>
                        {itemsCount > 0 && (
                            <span className="absolute top-2 right-6 w-3 h-3 bg-orange-500 rounded-full border border-white"></span>
                        )}
                    </Link>

                    {/* Language Switcher / Account on Mobile */}
                    <button
                        onClick={() => {
                            // Cycle languages for simplicity in mobile nav
                            const next = language === 'en' ? 'fr' : language === 'fr' ? 'ar' : 'en';
                            handleLanguageChange(next);
                        }}
                        className="flex flex-col items-center justify-center text-gray-500 hover:text-orange-500"
                    >
                        <Globe size={20} />
                        <span className="text-[10px] mt-1 font-bold uppercase">{getLangLabel(language)}</span>
                    </button>
                </div>
            </div>
        </>
    );
}

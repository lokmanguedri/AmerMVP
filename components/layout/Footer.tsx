'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-[#232f3e] text-white pt-16 pb-8 mt-20">
            <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-gray-700 pb-12">

                {/* Brand Column */}
                <div>
                    <h2 className="text-2xl font-black text-orange-400 tracking-tighter mb-6">TOLI<span className="text-white">PARTS</span></h2>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        {t('heroSubtitle')}
                    </p>
                </div>

                {/* Links Column 1 */}
                <div>
                    <h3 className="font-bold text-white mb-4">{t('knowUs')}</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li className="hover:underline cursor-pointer"><Link href="/about">{t('aboutUs')}</Link></li>
                        <li className="hover:underline cursor-pointer">{t('careers')}</li>
                        <li className="hover:underline cursor-pointer">{t('blog')}</li>
                    </ul>
                </div>

                {/* Links Column 2 */}
                <div>
                    <h3 className="font-bold text-white mb-4">{t('helpYou')}</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li className="hover:underline cursor-pointer"><Link href="/login">{t('yourAccount')}</Link></li>
                        <li className="hover:underline cursor-pointer">{t('shippingRates')}</li>
                        <li className="hover:underline cursor-pointer"><Link href="/contact">{t('contactSupport')}</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="font-bold text-white mb-4">{t('stayConnected')}</h3>
                    <p className="text-gray-300 text-sm mb-4">{t('newsletterDesc')}</p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder={t('emailPlaceholder')}
                            className="bg-white text-black px-4 py-2 rounded-sm w-full outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button className="bg-orange-500 text-white font-bold px-4 py-2 rounded-sm hover:bg-orange-600 whitespace-nowrap">
                            {t('signUp')}
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-center text-xs text-gray-500">
                {t('copyright')}
            </div>
        </footer>
    );
}

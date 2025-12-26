'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TRANSLATIONS, Language } from '@/lib/translations';

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: keyof typeof TRANSLATIONS['en']) => string;
    isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        // Handle RTL direction for Arabic
        if (language === 'ar') {
            document.documentElement.dir = 'rtl';
            document.documentElement.lang = 'ar';
        } else {
            document.documentElement.dir = 'ltr';
            document.documentElement.lang = language;
        }
    }, [language]);

    const t = (key: keyof typeof TRANSLATIONS['en']) => {
        return TRANSLATIONS[language][key] || TRANSLATIONS['en'][key] || key;
    };

    const isRTL = language === 'ar';

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

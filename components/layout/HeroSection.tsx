'use client';

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { ArrowDown, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

// Lazy Load 3D Scene for Performance
const HeroScene = dynamic(() => import('@/components/3d/HeroScene').then(mod => mod.HeroScene), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-[#111] animate-pulse" />
});

export function HeroSection() {
    return (
        <section className="relative w-full bg-[#111] overflow-hidden flex flex-col md:block">
            {/* 
               Mobile Layout: Flex Column 
               - Text Content First (Top)
               - 3D Scene Second (Bottom)
               
               Desktop Layout: Block with Absolute Positioning
            */}

            {/* Content Layer */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 pt-12 pb-8 md:pt-0 md:pb-0 md:h-[600px] flex flex-col justify-center order-1 md:order-none">
                <div className="max-w-2xl text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-[#00f0ff] uppercase border border-[#00f0ff]/30 rounded backdrop-blur-sm">
                            Precision Engineering
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight"
                    >
                        UPGRADE YOUR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                            MACHINE
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="text-gray-400 text-base md:text-xl mb-8 max-w-lg leading-relaxed"
                    >
                        Discover premium body kits, high-performance lighting, and carbon fiber upgrades for the modern driver.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link href="/shop" className="flex-1 md:flex-none">
                            <Button
                                size="lg"
                                className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white border-0 font-bold px-8 py-6 text-lg shadow-[0_0_20px_rgba(255,153,0,0.4)]"
                            >
                                <ShoppingBag className="mr-2" /> Shop Collection
                            </Button>
                        </Link>
                        <Link href="/shop?cat=clearance" className="flex-1 md:flex-none">
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full md:w-auto border-white/20 text-white hover:bg-white/10 hover:border-white px-8 py-6 text-lg backdrop-blur-sm"
                            >
                                View Deals
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* 3D Background Layer */}
            {/* Mobile: Relative height box. Desktop: Absolute full cover */}
            <div className="relative h-[300px] md:h-auto md:absolute md:inset-0 z-0 opacity-100 md:opacity-80 order-2 md:order-none pointer-events-none md:pointer-events-auto">
                <HeroScene />
                {/* Gradient fade for mobile integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent md:hidden pointer-events-none"></div>
            </div>

            {/* Scroll Indicator (Hidden on Mobile) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex-col items-center gap-2"
            >
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <ArrowDown size={20} />
                </motion.div>
            </motion.div>
        </section>
    );
}

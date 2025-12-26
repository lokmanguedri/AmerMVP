'use client';

import { Product } from '@/lib/products';
import { Button } from '@/components/ui/Button';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/components/providers/CartProvider';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useVehicle } from '@/components/providers/VehicleContext';
import { CheckCircle } from 'lucide-react';

export function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const { vehicle } = useVehicle();
    const { t } = useLanguage();

    const isGuaranteedFit = vehicle ? product.compatibility.some(c =>
        c.make === vehicle.brand &&
        c.model === vehicle.model &&
        c.years.includes(parseInt(vehicle.year))
    ) : false;

    return (
        <div className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full relative group hover:-translate-y-1">
            {/* Badges */}
            <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                {product.isNew && (
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">NEW</span>
                )}
                {!product.inStock && (
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">OUT OF STOCK</span>
                )}
                {isGuaranteedFit && (
                    <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1 shadow-sm border border-green-500">
                        <CheckCircle size={10} className="text-white" /> GUARANTEED FIT
                    </span>
                )}
            </div>

            {/* Image Area */}
            <div className="p-4 h-48 flex items-center justify-center relative overflow-hidden bg-gray-50/50 rounded-t-lg">
                <div className="w-full h-full flex items-center justify-center relative transition-transform duration-500 group-hover:scale-105">
                    {/* Using next/image with a placeholder since real images are not available yet */}
                    {/* In production, product.image would be a valid path */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain"
                            // Fallback for placeholder
                            onError={(e) => {
                                e.currentTarget.src = "https://placehold.co/400x300/f3f4f6/a3a3a3?text=No+Image";
                            }}
                        />
                        {/* Fallback Text if image fails or is placeholder */}
                        <span className="text-gray-400 font-bold text-xs uppercase absolute opacity-20">{product.category}</span>
                    </div>
                </div>

                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href={`/shop/${product.id}`}>
                        <Button size="sm" className="bg-white text-black hover:bg-orange-500 hover:text-white transition-colors flex items-center gap-2">
                            <Eye size={16} /> Quick View
                        </Button>
                    </Link>
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors bg-white p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 duration-300">
                    <Heart size={18} />
                </button>
            </div>

            {/* Info Area */}
            <div className="p-4 flex-1 flex flex-col">
                <Link href={`/shop/${product.id}`} className="text-sm font-medium text-gray-900 hover:text-orange-600 line-clamp-2 mb-2 leading-snug">
                    {product.brand} - {product.name}
                </Link>

                {/* Rating Mockup */}
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-yellow-400 text-xs">★★★★☆</div>
                    <span className="text-xs text-blue-600 hover:underline cursor-pointer">{product.reviews || 0}</span>
                </div>

                <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-lg font-bold text-black">{product.price.toLocaleString()} DA</span>
                        <span className="text-xs text-gray-500 line-through">{(product.price * 1.2).toLocaleString()} DA</span>
                    </div>

                    <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                    >
                        {t('addToCart')}
                    </Button>
                </div>
            </div>
        </div>
    );
}

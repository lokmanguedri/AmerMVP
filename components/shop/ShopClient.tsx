'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shop/ProductCard';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useVehicle } from '@/components/providers/VehicleContext';
import { Product } from '@prisma/client'; // Use Prisma Type

// Extended type for compatibility if Prisma type generation is delayed
interface ShopClientProps {
    initialProducts: any[]; // Using any temporarily to avoid strict type build errors before prisma generate
}

export default function ShopClient({ initialProducts }: ShopClientProps) {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('cat');
    const { vehicle } = useVehicle();

    // Initialize state with search param if available, otherwise 'all'
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Effect to update category when URL changes
    useEffect(() => {
        if (initialCategory) {
            setSelectedCategory(initialCategory.toLowerCase());
        } else {
            setSelectedCategory('all');
        }
    }, [initialCategory]);


    const filteredProducts = initialProducts.filter(product => {
        // 1. Category Filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
            return false;
        }

        // 2. Vehicle Compatibility Filter (The Guaranteed Fit Engine)
        if (vehicle) {
            const isCompatible = product.compatibility.some((c: any) =>
                c.make === vehicle.brand &&
                c.model === vehicle.model &&
                c.years.includes(parseInt(vehicle.year))
            );
            return isCompatible;
        }

        return true;
    });

    const categories = ['all', 'bodywork', 'headlights', 'tail lights', 'bumpers', 'mirrors', 'carbon fiber', 'clearance'];

    return (
        <main className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="pt-24 pb-20 max-w-[1400px] mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-700">Category:</span>
                        <span className="text-orange-600 font-bold uppercase">{selectedCategory}</span>
                        {vehicle && (
                            <span className="ml-4 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200">
                                Filtering for: {vehicle.year} {vehicle.brand} {vehicle.model}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-gray-500 text-sm">{filteredProducts.length} Results</span>
                        <select className="border border-gray-300 rounded text-sm px-2 py-1 outline-none">
                            <option>Sort by: Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Filters */}
                    <aside className="hidden lg:block space-y-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-4 border-b pb-2 cursor-pointer">Categories</h3>
                            <ul className="space-y-2">
                                {categories.map(cat => (
                                    <li key={cat}>
                                        <button
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`text-sm hover:text-orange-600 transition-colors w-full text-left ${selectedCategory === cat ? 'text-orange-600 font-bold' : 'text-gray-600'}`}
                                        >
                                            {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Brand</h3>
                            <div className="space-y-2">
                                {['TOLI Performance', 'OEM Plus', 'Vorsteiner'].map(brand => (
                                    <label key={brand} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-orange-600">
                                        <input type="checkbox" className="accent-orange-500" /> {brand}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="h-[400px]">
                                    {/* Cast to any to bypass strict type check for now */}
                                    <ProductCard product={product as any} />
                                </div>
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-20 text-gray-500 bg-white rounded-lg">
                                No products found in this category.
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}

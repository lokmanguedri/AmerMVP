'use client';

import { Product } from '@/lib/products';
import { useCart } from '@/components/providers/CartProvider';
import { useVehicle } from '@/components/providers/VehicleContext';
import { Button } from '@/components/ui/Button';
import { Check, AlertCircle, ShoppingCart, Truck, Shield, RotateCcw, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useState, Suspense } from 'react';
import { ProductViewer } from '@/components/3d/ProductViewer';

export function ProductClientView({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const { vehicle } = useVehicle();
    const [activeImage, setActiveImage] = useState(0);

    // Compatibility check logic
    const isCompatible = vehicle ? product.compatibility.some(c =>
        c.make === vehicle.brand &&
        c.model === vehicle.model &&
        c.years.includes(parseInt(vehicle.year))
    ) : null;

    // Formatting currency for Algerian Market (DZD)
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-DZ', { style: 'currency', currency: 'DZD' }).format(price).replace('DZD', 'DA');
    };

    // WhatsApp Dynamic Link Generator
    const getWhatsAppLink = () => {
        const phoneNumber = "213771015314"; // Updated Number

        let message = `Salam TOLI Parts, I am interested in: *${product.name}* (Ref: ${product.id}).`;
        if (vehicle) {
            message += `\nMy Vehicle: ${vehicle.year} ${vehicle.brand} ${vehicle.model}`;
        } else {
            message += `\nI haven't selected a vehicle yet.`;
        }
        return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    };

    return (
        <div className="container-custom py-8">
            {/* Breadcrumb Navigation */}
            <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                <Link href="/shop" className="hover:text-orange-600">Shop</Link>
                <span>/</span>
                <Link href={`/shop?cat=${product.category}`} className="hover:text-orange-600 capitalize">{product.category}</Link>
                <span>/</span>
                <span className="text-gray-900 truncate max-w-[300px]">{product.name}</span>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">

                    {/* Left Column: Image Gallery & 3D Viewer */}
                    <div className="border-b md:border-b-0 md:border-r border-gray-100">
                        {product.model3d ? (
                            <div className="mb-4">
                                <Suspense fallback={<div className="h-[500px] bg-gray-50 animate-pulse rounded-lg" />}>
                                    <ProductViewer modelType={product.model3d} />
                                </Suspense>
                            </div>
                        ) : (
                            <div className="p-6">
                                <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden group">
                                    <div className="text-gray-400 text-center">
                                        <span className="block text-6xl mb-2">{product.category === 'headlights' ? '💡' : '📦'}</span>
                                        <span className="text-sm font-mono">{product.category}</span>
                                    </div>
                                    {product.isNew && (
                                        <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">New Arrival</span>
                                    )}
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {[1, 2, 3, 4].map((i, idx) => (
                                        <div
                                            key={i}
                                            className={`aspect-square bg-gray-50 rounded cursor-pointer border-2 transition-colors ${activeImage === idx ? 'border-orange-500' : 'border-transparent hover:border-gray-200'}`}
                                            onClick={() => setActiveImage(idx)}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Product Info & Actions */}
                    <div className="p-6 md:p-8">
                        <div className="mb-2">
                            <span className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">{product.brand}</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex text-yellow-500 text-sm">★★★★☆</div>
                            <span className="text-sm text-gray-500">{product.reviews} reviews</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-sm text-gray-500">SKU: {product.id.toUpperCase()}</span>
                        </div>

                        {/* Guaranteed Fit Logic */}
                        <div className={`rounded-md p-4 mb-6 border ${vehicle ? (isCompatible ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200') : 'bg-blue-50 border-blue-200'}`}>
                            {!vehicle ? (
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={20} />
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-sm">Check Fitment</h3>
                                        <p className="text-sm text-gray-600 mt-1">Select your vehicle to check if this part fits.</p>
                                    </div>
                                </div>
                            ) : isCompatible ? (
                                <div className="flex items-start gap-3">
                                    <Check className="text-green-600 shrink-0 mt-0.5" size={20} />
                                    <div>
                                        <h3 className="font-bold text-green-800 text-sm">Guaranteed Fit</h3>
                                        <p className="text-sm text-green-700 mt-1">This part fits your <strong>{vehicle.year} {vehicle.brand} {vehicle.model}</strong>.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
                                    <div>
                                        <h3 className="font-bold text-red-800 text-sm">Does Not Fit</h3>
                                        <p className="text-sm text-red-700 mt-1">This part does not fit your <strong>{vehicle.year} {vehicle.brand} {vehicle.model}</strong>.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Price & Stock */}
                        <div className="mb-8">
                            <div className="flex items-baseline gap-3 mb-2">
                                <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                                <span className="text-sm text-gray-500 line-through">{formatPrice(product.price * 1.25)}</span>
                            </div>
                            <p className="text-green-600 text-sm font-medium">In Stock. Ships from Algiers.</p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-3 mb-8">
                            <Button size="lg" className="w-full flex items-center justify-center gap-2" onClick={() => addToCart(product)}>
                                <ShoppingCart size={20} /> Add to Cart
                            </Button>
                            <a
                                href={getWhatsAppLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2"
                            >
                                <MessageCircle size={20} /> Consult Expert on WhatsApp
                            </a>
                        </div>

                        {/* Value Props */}
                        <div className="flex items-center justify-between py-4 border-t border-gray-100 text-xs text-gray-500">
                            <div className="flex flex-col items-center gap-1">
                                <Truck size={20} className="text-gray-400" />
                                <span>Fast Delivery</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <Shield size={20} className="text-gray-400" />
                                <span>Warranty</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <RotateCcw size={20} className="text-gray-400" />
                                <span>Free Returns</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Description & Specs */}
                <div className="border-t border-gray-200 bg-gray-50 p-6 md:p-10">
                    <div className="max-w-3xl">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Product Description</h3>
                        <div className="prose prose-sm text-gray-600 mb-8">
                            <p>{product.description}</p>
                            <ul>
                                <li>Direct fit replacement</li>
                                <li>OEM quality materials</li>
                                <li>1-year manufacturer warranty</li>
                            </ul>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-4">Compatibility List</h3>
                        <div className="bg-white rounded border border-gray-200 overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-100 text-gray-700 font-bold">
                                    <tr>
                                        <th className="p-3 border-b">Make</th>
                                        <th className="p-3 border-b">Model</th>
                                        <th className="p-3 border-b">Years</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.compatibility.map((c, idx) => (
                                        <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                                            <td className="p-3 font-medium">{c.make}</td>
                                            <td className="p-3">{c.model}</td>
                                            <td className="p-3 text-gray-500">{c.years.join(', ')}</td>
                                        </tr>
                                    ))}
                                    {product.compatibility.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="p-4 text-center text-gray-500 italic">
                                                Universal fitment or check with support.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

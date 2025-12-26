import { PRODUCTS } from '@/lib/products'; // Temporary mock source until DB is live
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import Image from 'next/image';

export default function AdminProductsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <p className="text-gray-500">Manage your inventory and compatibility.</p>
                </div>
                <Link href="/admin/products/new">
                    <Button className="flex items-center gap-2">
                        <Plus size={18} /> Add New Product
                    </Button>
                </Link>
            </div>

            {/* Search / Filter Bar */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
                {/* Add filters later */}
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                            <tr>
                                <th className="p-4">Item</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">SKU</th>
                                <th className="p-4">Price (DZD)</th>
                                <th className="p-4">Stock</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {PRODUCTS.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden relative border border-gray-200">
                                                {/* Placeholder Image Check */}
                                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                                            </div>
                                            <span className="font-medium text-gray-900 line-clamp-1 max-w-[200px]">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 capitalize">{product.category}</td>
                                    <td className="p-4 text-gray-500 font-mono text-xs">{product.id.toUpperCase()}</td>
                                    <td className="p-4 font-bold">{product.price.toLocaleString()} DA</td>
                                    <td className="p-4">
                                        {product.inStock ? (
                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">In Stock</span>
                                        ) : (
                                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">Out of Stock</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                                <Pencil size={16} />
                                            </button>
                                            <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

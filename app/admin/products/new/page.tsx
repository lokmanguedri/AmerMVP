'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2, Save, ArrowLeft, UploadCloud } from 'lucide-react';
import Link from 'next/link';

export default function AddProductPage() {
    const [loading, setLoading] = useState(false);

    // Form State
    const [compatibility, setCompatibility] = useState([
        { make: '', model: '', startYear: '', endYear: '' }
    ]);

    const addCompatibilityRow = () => {
        setCompatibility([...compatibility, { make: '', model: '', startYear: '', endYear: '' }]);
    };

    const removeCompatibilityRow = (index: number) => {
        const newRows = [...compatibility];
        newRows.splice(index, 1);
        setCompatibility(newRows);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API Call
        setTimeout(() => setLoading(false), 1000);
        alert('Product created (Demo)');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
            <div className="flex items-center gap-4">
                <Link href="/admin/products">
                    <Button variant='outline' className="p-2"><ArrowLeft size={20} /></Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* General Info */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">General Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700">Product Name</label>
                            <input required type="text" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none" placeholder="e.g. Laser Headlight" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700">Brand</label>
                            <input required type="text" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none" placeholder="e.g. OEM Plus" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700">SKU</label>
                            <input required type="text" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none" placeholder="e.g. HL-009" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700">Category</label>
                            <select className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none bg-white">
                                <option value="bodywork">Bodywork</option>
                                <option value="headlights">Headlights</option>
                                <option value="taillights">Tail Lights</option>
                                <option value="bumpers">Bumpers</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Description</label>
                        <textarea rows={4} className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Product details..."></textarea>
                    </div>
                </div>

                {/* Pricing & Media */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Pricing & Inventory</h2>
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700">Price (DZD)</label>
                            <input required type="number" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none" placeholder="0" />
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 mt-4">
                                <input type="checkbox" id="stock" className="w-4 h-4 text-orange-600 rounded" />
                                <label htmlFor="stock" className="text-sm font-medium text-gray-700">In Stock</label>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Media</h2>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                            <UploadCloud className="text-gray-400 mb-2" size={32} />
                            <p className="text-sm text-gray-600 font-medium">Click to upload image</p>
                            <span className="text-xs text-gray-400">SVG, PNG, JPG (max 2MB)</span>
                        </div>
                        <input type="text" placeholder="Or enter Image URL..." className="w-full border border-gray-300 p-2 rounded text-sm" />
                    </div>
                </div>

                {/* Compatibility Grid */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                        <h2 className="text-lg font-bold text-gray-900">Compatibility</h2>
                        <Button type="button" onClick={addCompatibilityRow} size="sm" variant="outline" className="text-xs">
                            <Plus size={14} className="mr-1" /> Add Vehicle
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {compatibility.map((row, idx) => (
                            <div key={idx} className="flex gap-2 items-start">
                                <input
                                    placeholder="Make (e.g. BMW)"
                                    className="flex-1 border border-gray-300 p-2 rounded text-sm"
                                />
                                <input
                                    placeholder="Model (e.g. M3)"
                                    className="flex-1 border border-gray-300 p-2 rounded text-sm"
                                />
                                <input
                                    placeholder="Start Year"
                                    type="number"
                                    className="w-24 border border-gray-300 p-2 rounded text-sm"
                                />
                                <input
                                    placeholder="End Year"
                                    type="number"
                                    className="w-24 border border-gray-300 p-2 rounded text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeCompatibilityRow(idx)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Link href="/admin/products">
                        <Button type="button" variant="outline" size="lg">Cancel</Button>
                    </Link>
                    <Button type="submit" size="lg" disabled={loading} className="px-8">
                        {loading ? 'Saving...' : 'Save Product'}
                    </Button>
                </div>

            </form>
        </div>
    );
}

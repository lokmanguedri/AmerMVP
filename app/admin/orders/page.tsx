'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Package, Truck, Printer, AlertTriangle, CheckCircle } from 'lucide-react';
import { YalidineService } from '@/lib/yalidine';

// Mock Data (matches Prisma Schema structure roughly)
const MOCK_ORDERS = [
    {
        id: 'ord_123',
        customer: 'Amine Benali',
        phone: '0550123456',
        wilaya: '16 - Algiers',
        total: 15400,
        status: 'PENDING', // PENDING, SHIPPED, DELIVERED
        tracking: null as string | null,
        items: 2,
        date: '2024-12-25'
    },
    {
        id: 'ord_124',
        customer: 'Karim Ziani',
        phone: '0661987654',
        wilaya: '31 - Oran',
        total: 8200,
        status: 'SHIPPED',
        tracking: 'YAL-55921',
        items: 1,
        date: '2024-12-24'
    }
];

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState(MOCK_ORDERS);
    const [processing, setProcessing] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSendToYalidine = async (orderId: string) => {
        setProcessing(orderId);
        setError(null);

        try {
            const order = orders.find(o => o.id === orderId);
            if (!order) throw new Error("Order not found");

            // Call Yalidine API
            const result = await YalidineService.createParcel({
                orderId: order.id,
                name: order.customer,
                phone: order.phone,
                wilaya: order.wilaya
            });

            // Update Mock State (in real app, this would be a DB update)
            setOrders(prev => prev.map(o =>
                o.id === orderId
                    ? { ...o, status: 'SHIPPED', tracking: result.tracking }
                    : o
            ));

            // Simulate opening label
            // window.open(result.labelUrl, '_blank'); 

        } catch (err) {
            console.error(err);
            setError("Failed to create parcel. Check API connection.");
        } finally {
            setProcessing(null);
        }
    };

    const handlePrintLabel = (tracking: string) => {
        // Mock opening label
        alert(`Opening label for ${tracking}...`);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                    <p className="text-gray-500">Manage shipments and track deliveries.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Export CSV</Button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-md border border-red-200 flex items-center gap-2">
                    <AlertTriangle size={18} />
                    {error}
                </div>
            )}

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                            <tr>
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Location</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Yalidine Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="p-4 font-mono text-gray-500">#{order.id.slice(-6).toUpperCase()}</td>
                                    <td className="p-4">
                                        <div className="font-bold text-gray-900">{order.customer}</div>
                                        <div className="text-xs text-gray-500">{order.phone}</div>
                                    </td>
                                    <td className="p-4">{order.wilaya}</td>
                                    <td className="p-4 font-mono font-bold">{order.total.toLocaleString()} DA</td>
                                    <td className="p-4">
                                        {order.status === 'PENDING' && (
                                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
                                                <Package size={12} /> Pending
                                            </span>
                                        )}
                                        {order.status === 'SHIPPED' && (
                                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
                                                <Truck size={12} /> Shipped
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        {order.status === 'PENDING' ? (
                                            <Button
                                                size="sm"
                                                onClick={() => handleSendToYalidine(order.id)}
                                                disabled={processing === order.id}
                                                className="bg-purple-600 hover:bg-purple-700 text-white"
                                            >
                                                {processing === order.id ? 'Sending...' : 'Send to Yalidine'}
                                            </Button>
                                        ) : (
                                            <div className="flex items-center justify-end gap-2">
                                                <div className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                    {order.tracking}
                                                </div>
                                                <button
                                                    onClick={() => handlePrintLabel(order.tracking!)}
                                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded border border-gray-200"
                                                    title="Print Label"
                                                >
                                                    <Printer size={16} />
                                                </button>
                                            </div>
                                        )}
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

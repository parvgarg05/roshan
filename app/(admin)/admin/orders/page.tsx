import { prisma } from '@/lib/prisma';
import { formatCurrency, formatDateTimeIST } from '@/lib/utils';
import StatusSelect from './StatusSelect';

export default async function OrdersPage() {
    // Fetch all orders with their customer and first few items
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            customer: true,
            items: true,
        },
    });

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-display font-bold text-3xl text-maroon-900">Orders</h1>
                    <p className="text-maroon-500 mt-1">Manage all incoming orders and update their fulfillment status.</p>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-cream-200 shadow-warm-sm overflow-hidden auto-cols-auto overflow-x-auto">
                {orders.length === 0 ? (
                    <div className="p-12 text-center text-maroon-400">
                        <p>No orders found yet.</p>
                    </div>
                ) : (
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-cream-50 text-maroon-500 font-semibold border-b border-cream-200">
                            <tr>
                                <th className="px-5 py-4">Order Details</th>
                                <th className="px-5 py-4">Customer</th>
                                <th className="px-5 py-4">Address</th>
                                <th className="px-5 py-4 text-right">Total</th>
                                <th className="px-5 py-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cream-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-cream-50/50 transition-colors">
                                    {/* Order Details */}
                                    <td className="px-5 py-4 align-top">
                                        <div className="font-mono text-xs text-maroon-400 mb-1">
                                            #{order.id.slice(-8).toUpperCase()}
                                        </div>
                                        <div className="text-maroon-900 font-medium mb-2">
                                            {formatDateTimeIST(order.createdAt)}
                                        </div>
                                        <ul className="text-xs text-maroon-600 space-y-1 max-w-[200px] truncate">
                                            {order.items.map(item => (
                                                <li key={item.id} className="truncate">
                                                    {item.quantity}x {item.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>

                                    {/* Customer */}
                                    <td className="px-5 py-4 align-top">
                                        <div className="text-maroon-900 font-medium">{order.customer.name}</div>
                                        <div className="text-maroon-500 text-xs mt-0.5">{order.customer.phone}</div>
                                        <div className="text-maroon-500 text-xs truncate max-w-[150px]">{order.customer.email}</div>
                                    </td>

                                    {/* Address */}
                                    <td className="px-5 py-4 align-top max-w-[200px]">
                                        <div className="text-maroon-700 text-xs whitespace-normal line-clamp-2 leading-relaxed">
                                            {order.addressLine}, {order.city}, {order.state} {order.pincode}
                                        </div>
                                    </td>

                                    {/* Total */}
                                    <td className="px-5 py-4 align-top text-right">
                                        <div className="text-maroon-900 font-bold">
                                            {formatCurrency(order.totalPaise / 100)}
                                        </div>
                                        {order.razorpayPaymentId && (
                                            <div className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded uppercase font-semibold inline-block mt-1">
                                                Paid online
                                            </div>
                                        )}
                                    </td>

                                    {/* Status Column */}
                                    <td className="px-5 py-4 align-top text-center">
                                        <StatusSelect orderId={order.id} currentStatus={order.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

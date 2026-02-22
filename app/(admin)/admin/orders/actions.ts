'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';

export async function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { status: newStatus },
        });

        // Rebuild the orders page instantly
        revalidatePath('/admin/orders');
        return { success: true };
    } catch (error) {
        console.error('[updateOrderStatus]', error);
        return { error: 'Failed to update order status' };
    }
}

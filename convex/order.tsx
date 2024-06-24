import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createOrder = mutation({
    args: {
        orderCode: v.string(),
        userEmail: v.string(),
        status: v.string(),
        description: v.string(),
        planName: v.string(),
        expirationDate: v.optional(v.string()),
        paymentOrderCode: v.string(),
    },
    handler: async (ctx, args) => {
        // Check for existing pending or paid orders
        const existingOrders = await ctx.db
            .query('orders')
            .filter((q) => q.eq(q.field('userEmail'), args.userEmail))
            .filter((q) =>
                q.or(
                    q.eq(q.field('status'), 'PENDING'),
                    q.and(
                        q.eq(q.field('status'), 'PAID'),
                        q.gte(q.field('expirationDate'), new Date().toISOString().split('T')[0]),
                    ),
                ),
            )
            .collect();

        if (existingOrders.length > 0) {
            throw new Error('User already has pending or active paid orders.');
        }

        // Get plan info
        const plan = await ctx.db
            .query('subscriptionPlans')
            .filter((q) => q.eq(q.field('name'), args.planName))
            .first();
        if (!plan) throw new Error('Plan not found');

        // Calculate expiration date
        let expirationDate = '';
        if (plan.durationDays > 0) {
            const date = new Date();
            date.setDate(date.getDate() + plan.durationDays);
            expirationDate = date.toISOString().split('T')[0];
        }

        // Insert new order
        const result = await ctx.db.insert('orders', {
            ...args,
            amount: plan.price,
            expirationDate,
        });
        return result;
    },
});
export const getOrderByCode = query({
    args: {
        orderCode: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db
            .query('orders')
            .filter((q) => q.eq(q.field('orderCode'), args.orderCode))
            .first();
        return result;
    },
});

export const getOrdersByUserEmail = query({
    args: {
        userEmail: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db
            .query('orders')
            .filter((q) => q.eq(q.field('userEmail'), args.userEmail))
            .order('desc')
            .collect();
        return result;
    },
});

export const updateOrderStatus = mutation({
    args: {
        orderCode: v.string(),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db
            .query('orders')
            .filter((q) => q.eq(q.field('orderCode'), args.orderCode))
            .first();
        if (!result) {
            throw new Error('Order not found');
        }

        // Update order status
        await ctx.db.patch(result._id, { status: args.status });

        const user = await ctx.db
            .query('user')
            .filter((q) => q.eq(q.field('email'), result.userEmail))
            .first();
        if (!user) {
            throw new Error('User not found');
        }

        // If the order is being marked as PAID, update the user's current plan
        if (args.status === 'PAID') {
            await ctx.db.patch(user._id, { currentPlan: result.planName });
        }

        // If the order is being marked as EXPIRED, update the user's current plan to FREE
        if (args.status === 'EXPIRED') {
            await ctx.db.patch(user._id, { currentPlan: 'Free' });
        }

        return result;
    },
});

export const updateOrderStatusByPaymentCodeAndUserEmail = mutation({
    args: {
        userEmail: v.string(),
        paymentOrderCode: v.string(),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db
            .query('orders')
            .filter((q) => q.eq(q.field('userEmail'), args.userEmail))
            .filter((q) => q.eq(q.field('paymentOrderCode'), args.paymentOrderCode))
            .first();
        if (!result) {
            throw new Error('Order not found');
        }

        // Update order status
        await ctx.db.patch(result._id, { status: args.status });

        const user = await ctx.db
            .query('user')
            .filter((q) => q.eq(q.field('email'), result.userEmail))
            .first();
        if (!user) {
            throw new Error('User not found');
        }

        // If the order is being marked as PAID, update the user's current plan
        if (args.status === 'PAID') {
            await ctx.db.patch(user._id, { currentPlan: result.planName });
        }

        // If the order is being marked as EXPIRED, update the user's current plan to FREE
        if (args.status === 'EXPIRED') {
            await ctx.db.patch(user._id, { currentPlan: 'Free' });
        }

        return result;
    },
});

export const deleteOrder = mutation({
    args: {
        orderCode: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db
            .query('orders')
            .filter((q) => q.eq(q.field('orderCode'), args.orderCode))
            .first();
        if (result) {
            await ctx.db.delete(result._id);
        }
        return { success: true, message: 'Order deleted successfully' };
    },
});

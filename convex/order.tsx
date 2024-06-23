import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const createOrder = mutation({
    args: {
        orderCode: v.string(),
        amount: v.number(),
        userEmail: v.string(),
        status: v.string(),
        description: v.string(),
        planName: v.string(),
        expirationDate: v.string(),
        paymentOrderCode: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert('orders', args);
        return result;
    },
});

export const getOrderByCode = query({
    args: {
        orderCode: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('orders')
            .filter(q => q.eq(q.field('orderCode'), args.orderCode))
            .first();
        return result;
    },
});

export const getOrdersByUserEmail = query({
    args: {
        userEmail: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('orders')
            .filter(q => q.eq(q.field('userEmail'), args.userEmail))
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
        const result = await ctx.db.query('orders')
            .filter(q => q.eq(q.field('orderCode'), args.orderCode))
            .first();
        if (result) {
            await ctx.db.patch(result._id, { status: args.status });
        }
        return result;
    },
});

export const deleteOrder = mutation({
    args: {
        orderCode: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('orders')
            .filter(q => q.eq(q.field('orderCode'), args.orderCode))
            .first();
        if (result) {
            await ctx.db.delete(result._id);
        }
        return { success: true, message: 'Order deleted successfully' };
    },
});

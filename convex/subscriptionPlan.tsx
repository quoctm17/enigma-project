import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const getSubscriptionPlans = query({
    handler: async (ctx) => {
        const result = await ctx.db.query('subscriptionPlans').collect();
        return result;
    },
});

export const createSubscriptionPlan = mutation({
    args: {
        name: v.string(),
        price: v.number(),
        durationDays: v.number(),
        maxFiles: v.number(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert('subscriptionPlans', args);
        return result;
    },
});

export const updateSubscriptionPlan = mutation({
    args: {
        id: v.id('subscriptionPlans'),
        name: v.string(),
        price: v.number(),
        durationDays: v.number(),
        maxFiles: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.patch(args.id, {
            name: args.name,
            price: args.price,
            durationDays: args.durationDays,
            maxFiles: args.maxFiles,
        });
    },
});

export const getMaxFilesByName = query({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const plan = await ctx.db.query('subscriptionPlans')
            .filter(q => q.eq(q.field('name'), args.name))
            .first();
        if (!plan) {
            throw new Error('Plan not found');
        }
        return plan.maxFiles;
    },
});

export const getPriceByName = query({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const plan = await ctx.db.query('subscriptionPlans')
            .filter(q => q.eq(q.field('name'), args.name))
            .first();
        if (!plan) {
            throw new Error('Plan not found');
        }
        return plan.price;
    },
});

export const getDurationDaysByName = query({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const plan = await ctx.db.query('subscriptionPlans')
            .filter(q => q.eq(q.field('name'), args.name))
            .first();
        if (!plan) {
            throw new Error('Plan not found');
        }
        return plan.durationDays;
    },
});

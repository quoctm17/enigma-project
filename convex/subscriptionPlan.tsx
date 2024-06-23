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

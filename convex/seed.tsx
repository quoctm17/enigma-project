import { mutation } from './_generated/server';

export const seedSubscriptionPlans = mutation({
    handler: async (ctx) => {
        const existingPlans = await ctx.db.query('subscriptionPlans').first();
        if (!existingPlans) {
            const plans = [
                { name: 'Free', price: 0, durationDays: 0, maxFiles: 5 },
                { name: 'Monthly', price: 10000, durationDays: 30, maxFiles: 10 },
                { name: 'Semi-annual', price: 27000, durationDays: 180, maxFiles: 20 },
                { name: 'Annual', price: 50000, durationDays: 365, maxFiles: 30 },
            ];

            for (const plan of plans) {
                await ctx.db.insert('subscriptionPlans', plan);
            }
            return { success: true, message: 'Seeding completed' };
        } else {
            return { success: false, message: 'Plans already seeded' };
        }
    },
});

export const seedOrders = mutation({
    handler: async (ctx) => {
        const existingOrders = await ctx.db.query('orders').first();
        if (!existingOrders) {
            const orders = [
                {
                    orderCode: '1',
                    amount: 5000,
                    userEmail: 'choppervipkute52@gmail.com',
                    status: 'PAID',
                    description: 'Subscription payment',
                    planName: 'Monthly',
                    expirationDate: '2024-07-01',
                    paymentOrderCode: 'PAY123',
                },
                {
                    orderCode: '2',
                    amount: 10000,
                    userEmail: 'choppervipkute52@gmail.com',
                    status: 'PENDING',
                    description: 'Subscription payment',
                    planName: 'Semi-annual',
                    expirationDate: '2024-12-01',
                    paymentOrderCode: 'PAY456',
                },
                {
                    orderCode: '3',
                    amount: 15000,
                    userEmail: 'choppervipkute52@gmail.com',
                    status: 'FAILED',
                    description: 'Subscription payment',
                    planName: 'Annual',
                    expirationDate: '2025-07-01',
                    paymentOrderCode: 'PAY789',
                },
            ];

            for (const order of orders) {
                await ctx.db.insert('orders', order);
            }
            return { success: true, message: 'Seeding completed' };
        } else {
            return { success: false, message: 'Orders already seeded' };
        }
    },
});

export const seedUsers = mutation({
    handler: async (ctx) => {
        const existingUsers = await ctx.db.query('user').first();
        if (!existingUsers) {
            const users = [
                {
                    name: 'User One',
                    email: 'userone@example.com',
                    image: 'https://example.com/image1.jpg',
                    currentPlan: 'Free'
                },
                {
                    name: 'User Two',
                    email: 'usertwo@example.com',
                    image: 'https://example.com/image2.jpg',
                    currentPlan: 'Monthly'
                },

            ];

            for (const user of users) {
                await ctx.db.insert('user', user);
            }
            return { success: true, message: 'Seeding completed' };
        } else {
            return { success: false, message: 'Users already seeded' };
        }
    },
});

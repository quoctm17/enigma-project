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
            const ordersData = [
                {
                    orderCode: '1',
                    userEmail: 'choppervipkute52@gmail.com',
                    status: 'PAID',
                    description: 'Subscription payment',
                    planName: 'Monthly',
                    paymentOrderCode: 'PAY123',
                },
                {
                    orderCode: '2',
                    userEmail: 'userone@example.com',
                    status: 'PENDING',
                    description: 'Subscription payment',
                    planName: 'Semi-annual',
                    paymentOrderCode: 'PAY456',
                },
                {
                    orderCode: '3',
                    userEmail: 'usertwo@example.com',
                    status: 'FAILED',
                    description: 'Subscription payment',
                    planName: 'Annual',
                    paymentOrderCode: 'PAY789',
                },
            ];

            for (const order of ordersData) {
                const plan = await ctx.db.query('subscriptionPlans')
                    .filter(q => q.eq(q.field('name'), order.planName))
                    .first();
                if (!plan) throw new Error('Plan not found');

                let expirationDate = '';
                if (plan.durationDays > 0) {
                    const date = new Date();
                    date.setDate(date.getDate() + plan.durationDays);
                    expirationDate = date.toISOString().split('T')[0];
                }

                await ctx.db.insert('orders', {
                    ...order,
                    amount: plan.price,
                    expirationDate,
                });
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
                    name: 'Quốc',
                    email: 'choppervipkute52@gmail.com',
                    image: 'https://example.com/image1.jpg',
                    currentPlan: 'Monthly'
                },
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
                    currentPlan: 'Annual'
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

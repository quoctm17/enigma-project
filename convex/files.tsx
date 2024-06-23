import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

// export const createFile = mutation({
//     args: {
//         fileName: v.string(),
//         teamId: v.string(),
//         createdBy: v.string(),
//         archive: v.boolean(),
//         document: v.string(),
//         whiteboard: v.string()
//     },
//     handler: async (ctx, args) => {
//         const result = await ctx.db.insert('files', args);
//         return result;
//     },
// })
export const createFile = mutation({
    args: {
        fileName: v.string(),
        teamId: v.id('teams'),
        createdBy: v.string(),
        archive: v.boolean(),
        document: v.string(),
        whiteboard: v.string()
    },
    handler: async (ctx, args) => {
        // Get team info
        const team = await ctx.db.get(args.teamId);
        if (!team) throw new Error('Team not found');

        // Get user info
        const user = await ctx.db.query('user')
            .filter(q => q.eq(q.field('email'), team.createBy))
            .first();
        if (!user) throw new Error('User not found');

        // Get plan info
        const plan = await ctx.db.query('subscriptionPlans')
            .filter(q => q.eq(q.field('name'), user.currentPlan))
            .first();
        if (!plan) throw new Error('Plan not found');

        // Get current files count
        const currentFiles = await ctx.db.query('files')
            .filter(q => q.eq(q.field('teamId'), args.teamId))
            .collect();
        const currentFilesCount = currentFiles.length;

        // Check max files limit
        if (currentFilesCount >= plan.maxFiles) {
            throw new Error('Max files limit reached');
        }

        // Insert new file
        const result = await ctx.db.insert('files', args);
        return result;
    },
});

export const getFiles = query({
    args: {
        teamId: v.string()
    },
    handler: async (ctx, args) => {
        const result = ctx.db.query('files')
            .filter(q => q.eq(q.field('teamId'), args.teamId))
            .order('desc')
            .collect();

        return result;
    },
})

export const updateDocument = mutation({
    args: {
        _id: v.id('files'),
        document: v.string()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args._id, { document: args.document });
        return result;
    },
})

export const updateWhiteboard = mutation({
    args: {
        _id: v.id('files'),
        whiteboard: v.string()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args._id, { whiteboard: args.whiteboard });
        return result;
    },
})



export const getFileById = query({
    args: {
        _id: v.id('files')
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.get(args._id);
        return result;
    },
})
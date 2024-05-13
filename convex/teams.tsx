import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTeam = query({
    args: {
        email: v.string()
    },

    handler: async (ctx, args) => {
        const allTeams = await ctx.db.query('teams').collect();
        const result = allTeams.filter(team => team.members.includes(args.email));
        return result;

    },
})

export const createTeam = mutation({
    args: { teamName: v.string(), createBy: v.string() },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert('teams', {
            teamName: args.teamName,
            createBy: args.createBy,
            members: [args.createBy]
        });
        return result;
    },
})

export const inviteUser = mutation({
    args: {
        teamId: v.id("teams"),
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const team = await ctx.db.get(args.teamId);
        if (!team) {
            throw new Error("Team not found");
        }

        if (team.members.includes(args.email)) {
            throw new Error("User is already a member of the team");
        }

        await ctx.db.patch(args.teamId, {
            members: [...team.members, args.email],
        });

        return { success: true };
    },
});

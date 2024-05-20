import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Định nghĩa kiểu Team
interface Team {
    _id: string;
    teamName: string;
    createBy: string;
    members: string[];
    roles: { [key: string]: string };
}

export const getTeam = query({
    args: {
        email: v.string()
    },

    handler: async (ctx, args) => {
        const allTeams = await ctx.db.query('teams').collect();
        const result = allTeams.filter((team: Team) => team.members.includes(args.email));
        return result;
    },
})

export const createTeam = mutation({
    args: { teamName: v.string(), createBy: v.string() },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert('teams', {
            teamName: args.teamName,
            createBy: args.createBy,
            members: [args.createBy],
            roles: { [args.createBy]: 'Owner' } // Gán vai trò Owner cho người tạo
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
        const team = await ctx.db.get(args.teamId) as Team;
        if (!team) {
            throw new Error("Team not found");
        }

        if (team.members.includes(args.email)) {
            return { success: false, message: "User is already a member of this team" };
        }

        const updatedMembers = [...team.members, args.email];
        const updatedRoles = { ...team.roles, [args.email]: 'Collaborator' }; // Gán vai trò Collaborator cho người được mời
        await ctx.db.patch(args.teamId, {
            members: updatedMembers,
            roles: updatedRoles
        });

        return { success: true, message: "User invited successfully" };
    },
});

export const removeUser = mutation({
    args: {
        teamId: v.id("teams"),
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const team = await ctx.db.get(args.teamId) as Team;
        if (!team) {
            throw new Error("Team not found");
        }

        // Loại bỏ thành viên khỏi danh sách members và roles
        const updatedMembers = team.members.filter((member: string) => member !== args.email);
        const { [args.email]: removedRole, ...updatedRoles } = team.roles;

        await ctx.db.patch(args.teamId, {
            members: updatedMembers,
            roles: updatedRoles
        });

        return { success: true, message: "User removed successfully" };
    },
});

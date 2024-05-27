import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

interface Team {
    _id: string;
    teamName: string;
    createBy: string;
    members: string[];
    roles: { [key: string]: string };
    images: { [key: string]: string }; // Thêm trường images để lưu URL ảnh của các thành viên
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
});

export const createTeam = mutation({
    args: { teamName: v.string(), createBy: v.string(), image: v.string() },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert('teams', {
            teamName: args.teamName,
            createBy: args.createBy,
            members: [args.createBy],
            roles: { [args.createBy]: 'Owner' },
            images: { [args.createBy]: args.image }
        });
        return result;
    },
});

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

        // Truy vấn bảng user để lấy URL ảnh của thành viên mới
        const user = await ctx.db.query('user')
            .filter((q) => q.eq(q.field('email'), args.email))
            .collect();

        if (!user.length) {
            throw new Error("User not found");
        }

        const userImage = user[0].image;

        const updatedMembers = [...team.members, args.email];
        const updatedRoles = { ...team.roles, [args.email]: 'Collaborator' };
        const updatedImages = { ...team.images, [args.email]: userImage };

        await ctx.db.patch(args.teamId, {
            members: updatedMembers,
            roles: updatedRoles,
            images: updatedImages,
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

        const updatedMembers = team.members.filter((member: string) => member !== args.email);
        const { [args.email]: removedRole, ...updatedRoles } = team.roles;
        const { [args.email]: removedImage, ...updatedImages } = team.images; // Loại bỏ URL ảnh của thành viên

        await ctx.db.patch(args.teamId, {
            members: updatedMembers,
            roles: updatedRoles,
            images: updatedImages,
        });

        return { success: true, message: "User removed successfully" };
    },
});

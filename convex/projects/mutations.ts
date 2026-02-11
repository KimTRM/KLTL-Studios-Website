import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { requireAuth } from "../lib/requireAuth";

/**
 * Project mutations — all require a valid admin session.
 */

const categoryValidator = v.union(
    v.literal("game"),
    v.literal("web"),
    v.literal("design"),
    v.literal("other"),
);

/** Create a new project. */
export const createProject = mutation({
    args: {
        sessionToken: v.string(),
        title: v.string(),
        slug: v.string(),
        description: v.string(),
        image: v.string(),
        link: v.string(),
        featured: v.boolean(),
        category: v.optional(categoryValidator),
        tags: v.optional(v.array(v.string())),
        subtitle: v.optional(v.string()),
        github: v.optional(v.string()),
        playLink: v.optional(v.string()),
        demoLink: v.optional(v.string()),
        gallery: v.optional(v.array(v.string())),
        technologies: v.optional(v.array(v.string())),
        year: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await requireAuth(ctx, args.sessionToken);

        // Auto-assign order: one higher than current max
        const existing = await ctx.db
            .query("projects")
            .withIndex("by_order")
            .collect();
        const maxOrder = existing.reduce((max, p) => Math.max(max, p.order), 0);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { sessionToken: _token, ...fields } = args;
        return await ctx.db.insert("projects", {
            ...fields,
            archived: false,
            order: maxOrder + 1,
        });
    },
});

/** Update an existing project. Only provided fields are changed. */
export const updateProject = mutation({
    args: {
        sessionToken: v.string(),
        id: v.id("projects"),
        title: v.optional(v.string()),
        slug: v.optional(v.string()),
        description: v.optional(v.string()),
        image: v.optional(v.string()),
        link: v.optional(v.string()),
        featured: v.optional(v.boolean()),
        archived: v.optional(v.boolean()),
        order: v.optional(v.number()),
        category: v.optional(categoryValidator),
        tags: v.optional(v.array(v.string())),
        subtitle: v.optional(v.string()),
        github: v.optional(v.string()),
        playLink: v.optional(v.string()),
        demoLink: v.optional(v.string()),
        gallery: v.optional(v.array(v.string())),
        technologies: v.optional(v.array(v.string())),
        year: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await requireAuth(ctx, args.sessionToken);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { sessionToken: _token, id, ...updates } = args;

        // Strip undefined values so we don't overwrite with undefined
        const patch: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined) {
                patch[key] = value;
            }
        }

        if (Object.keys(patch).length === 0) {
            throw new Error("No fields to update");
        }

        await ctx.db.patch(id, patch);
    },
});

/** Permanently delete a project. */
export const deleteProject = mutation({
    args: {
        sessionToken: v.string(),
        id: v.id("projects"),
    },
    handler: async (ctx, { sessionToken, id }) => {
        await requireAuth(ctx, sessionToken);
        await ctx.db.delete(id);
    },
});

/** Toggle featured flag. */
export const toggleFeatured = mutation({
    args: {
        sessionToken: v.string(),
        id: v.id("projects"),
    },
    handler: async (ctx, { sessionToken, id }) => {
        await requireAuth(ctx, sessionToken);
        const project = await ctx.db.get(id);
        if (!project) throw new Error("Project not found");
        await ctx.db.patch(id, { featured: !project.featured });
    },
});

/** Set archived status. */
export const updateStatus = mutation({
    args: {
        sessionToken: v.string(),
        id: v.id("projects"),
        archived: v.boolean(),
    },
    handler: async (ctx, { sessionToken, id, archived }) => {
        await requireAuth(ctx, sessionToken);
        await ctx.db.patch(id, { archived });
    },
});

/** Get ALL projects (including archived) for admin listing. */
export const adminGetAll = mutation({
    args: { sessionToken: v.string() },
    handler: async (ctx, { sessionToken }) => {
        await requireAuth(ctx, sessionToken);
        return await ctx.db.query("projects").withIndex("by_order").collect();
    },
});

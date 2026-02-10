import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Project queries — read-only, no mutations, no auth.
 */

/** All non-archived projects, ordered by `order`. */
export const getAllProjects = query({
    handler: async (ctx) => {
        const rows = await ctx.db
            .query("projects")
            .withIndex("by_order")
            .collect();
        return rows.filter((p) => !p.archived);
    },
});

/** Featured, non-archived projects, ordered by `order`. */
export const getFeaturedProjects = query({
    handler: async (ctx) => {
        const rows = await ctx.db
            .query("projects")
            .withIndex("by_featured", (q) => q.eq("featured", true))
            .collect();
        return rows.filter((p) => !p.archived);
    },
});

/** Single project by slug. Returns null when not found. */
export const getProjectBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, { slug }) => {
        return await ctx.db
            .query("projects")
            .withIndex("by_slug", (q) => q.eq("slug", slug))
            .first();
    },
});

import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { requireAuth } from "../lib/requireAuth";

/**
 * Skills mutations — all require a valid admin session.
 */

/** Update a skill category's title and/or description. */
export const updateSkillCategory = mutation({
    args: {
        sessionToken: v.string(),
        id: v.id("skills"),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
    },
    handler: async (ctx, { sessionToken, id, title, description }) => {
        await requireAuth(ctx, sessionToken);

        const patch: Record<string, string> = {};
        if (title !== undefined) patch.title = title;
        if (description !== undefined) patch.description = description;

        if (Object.keys(patch).length === 0) {
            throw new Error("No fields to update");
        }

        await ctx.db.patch(id, patch);
    },
});

/** Add a new skill category. */
export const addSkill = mutation({
    args: {
        sessionToken: v.string(),
        title: v.string(),
        description: v.string(),
    },
    handler: async (ctx, { sessionToken, title, description }) => {
        await requireAuth(ctx, sessionToken);

        const existing = await ctx.db
            .query("skills")
            .withIndex("by_order")
            .collect();
        const maxOrder = existing.reduce((max, s) => Math.max(max, s.order), 0);

        return await ctx.db.insert("skills", {
            title,
            description,
            order: maxOrder + 1,
        });
    },
});

/** Remove a skill category. */
export const removeSkill = mutation({
    args: {
        sessionToken: v.string(),
        id: v.id("skills"),
    },
    handler: async (ctx, { sessionToken, id }) => {
        await requireAuth(ctx, sessionToken);
        await ctx.db.delete(id);
    },
});

/** Reorder skill categories. */
export const reorderSkills = mutation({
    args: {
        sessionToken: v.string(),
        items: v.array(
            v.object({
                id: v.id("skills"),
                order: v.number(),
            }),
        ),
    },
    handler: async (ctx, { sessionToken, items }) => {
        await requireAuth(ctx, sessionToken);

        for (const { id, order } of items) {
            await ctx.db.patch(id, { order });
        }
    },
});

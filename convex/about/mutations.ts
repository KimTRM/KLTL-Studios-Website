import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { requireAuth } from "../lib/requireAuth";

/**
 * About-section mutations — all require a valid admin session.
 */

/** Update an about section's heading and/or body. */
export const updateAboutSection = mutation({
    args: {
        sessionToken: v.string(),
        id: v.id("aboutSections"),
        heading: v.optional(v.string()),
        body: v.optional(v.string()),
    },
    handler: async (ctx, { sessionToken, id, heading, body }) => {
        await requireAuth(ctx, sessionToken);

        const patch: Record<string, string> = {};
        if (heading !== undefined) patch.heading = heading;
        if (body !== undefined) patch.body = body;

        if (Object.keys(patch).length === 0) {
            throw new Error("No fields to update");
        }

        await ctx.db.patch(id, patch);
    },
});

/** Reorder about sections. Accepts an array of { id, order } pairs. */
export const reorderAboutSections = mutation({
    args: {
        sessionToken: v.string(),
        items: v.array(
            v.object({
                id: v.id("aboutSections"),
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

/** Create a new about section. */
export const createAboutSection = mutation({
    args: {
        sessionToken: v.string(),
        heading: v.string(),
        body: v.string(),
    },
    handler: async (ctx, { sessionToken, heading, body }) => {
        await requireAuth(ctx, sessionToken);

        const existing = await ctx.db
            .query("aboutSections")
            .withIndex("by_order")
            .collect();
        const maxOrder = existing.reduce((max, s) => Math.max(max, s.order), 0);

        return await ctx.db.insert("aboutSections", {
            heading,
            body,
            order: maxOrder + 1,
        });
    },
});

/** Delete an about section. */
export const deleteAboutSection = mutation({
    args: {
        sessionToken: v.string(),
        id: v.id("aboutSections"),
    },
    handler: async (ctx, { sessionToken, id }) => {
        await requireAuth(ctx, sessionToken);
        await ctx.db.delete(id);
    },
});

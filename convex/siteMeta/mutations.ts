import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { requireAuth } from "../lib/requireAuth";

/**
 * Site meta mutations — all require a valid admin session.
 *
 * siteMeta is a key-value store. Upsert semantics: if the key exists
 * update it, otherwise insert it.
 */

/** Upsert a single siteMeta value. */
export const upsertSiteMeta = mutation({
    args: {
        sessionToken: v.string(),
        key: v.string(),
        value: v.string(),
    },
    handler: async (ctx, { sessionToken, key, value }) => {
        await requireAuth(ctx, sessionToken);

        const existing = await ctx.db
            .query("siteMeta")
            .withIndex("by_key", (q) => q.eq("key", key))
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, { value });
        } else {
            await ctx.db.insert("siteMeta", { key, value });
        }
    },
});

/** Upsert multiple siteMeta values at once. */
export const upsertMany = mutation({
    args: {
        sessionToken: v.string(),
        entries: v.array(
            v.object({
                key: v.string(),
                value: v.string(),
            }),
        ),
    },
    handler: async (ctx, { sessionToken, entries }) => {
        await requireAuth(ctx, sessionToken);

        for (const { key, value } of entries) {
            const existing = await ctx.db
                .query("siteMeta")
                .withIndex("by_key", (q) => q.eq("key", key))
                .first();

            if (existing) {
                await ctx.db.patch(existing._id, { value });
            } else {
                await ctx.db.insert("siteMeta", { key, value });
            }
        }
    },
});

import { query } from "./_generated/server";

/**
 * About section queries — read-only.
 */

/** All about sections in display order. */
export const getAll = query({
    handler: async (ctx) => {
        return await ctx.db
            .query("aboutSections")
            .withIndex("by_order")
            .collect();
    },
});

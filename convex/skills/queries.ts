import { query } from "../_generated/server";

/**
 * Skills queries — read-only.
 */

/** All skill groups in display order. */
export const getAll = query({
    handler: async (ctx) => {
        return await ctx.db.query("skills").withIndex("by_order").collect();
    },
});

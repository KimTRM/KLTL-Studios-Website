import { query } from "../_generated/server";
import { v } from "convex/values";

/**
 * Admin authentication queries.
 */

/** Check whether a session token is still valid. */
export const validateSession = query({
    args: { sessionToken: v.string() },
    handler: async (ctx, { sessionToken }) => {
        if (!sessionToken) return null;

        const session = await ctx.db
            .query("adminSessions")
            .withIndex("by_token", (q) => q.eq("token", sessionToken))
            .first();

        if (!session || session.expiresAt < Date.now()) {
            return null;
        }

        const allowedEmail = process.env.ADMIN_EMAIL;
        if (!allowedEmail || session.email !== allowedEmail) {
            return null;
        }

        return { email: session.email, expiresAt: session.expiresAt };
    },
});

import type { MutationCtx, QueryCtx } from "../_generated/server";

/**
 * Auth guard for Convex mutations and queries.
 *
 * Validates the session token against the adminSessions table and the
 * ADMIN_EMAIL environment variable.  Throws if anything is wrong — callers
 * never have to worry about partial auth states.
 *
 * Usage inside a mutation / query handler:
 *   await requireAuth(ctx, sessionToken);
 */
export async function requireAuth(
    ctx: MutationCtx | QueryCtx,
    sessionToken: string,
) {
    if (!sessionToken) {
        throw new Error("Authentication required");
    }

    const session = await ctx.db
        .query("adminSessions")
        .withIndex("by_token", (q) => q.eq("token", sessionToken))
        .first();

    if (!session) {
        throw new Error("Invalid session");
    }

    if (session.expiresAt < Date.now()) {
        throw new Error("Session expired");
    }

    const allowedEmail = process.env.ADMIN_EMAIL;
    if (!allowedEmail || session.email !== allowedEmail) {
        throw new Error("Unauthorized");
    }

    return { email: session.email };
}

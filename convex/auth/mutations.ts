import { mutation } from "../_generated/server";
import { v } from "convex/values";

/**
 * Admin authentication mutations — single-user, session-based.
 *
 * Environment variables (set via `npx convex env set`):
 *   ADMIN_EMAIL    — the one email allowed to log in
 *   ADMIN_PASSWORD — the admin password
 */

function generateToken(): string {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < 64; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

/** Log in with email + password. Returns a session token on success. */
export const login = mutation({
    args: {
        email: v.string(),
        password: v.string(),
    },
    handler: async (ctx, { email, password }) => {
        const allowedEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!allowedEmail || !adminPassword) {
            throw new Error("Admin configuration missing");
        }

        if (email !== allowedEmail || password !== adminPassword) {
            throw new Error("Invalid credentials");
        }

        // Clean up old / expired sessions
        const allSessions = await ctx.db.query("adminSessions").collect();
        const now = Date.now();
        for (const s of allSessions) {
            if (s.email === email || s.expiresAt < now) {
                await ctx.db.delete(s._id);
            }
        }

        const token = generateToken();
        const expiresAt = now + 24 * 60 * 60 * 1000; // 24 hours

        await ctx.db.insert("adminSessions", {
            token,
            email,
            createdAt: now,
            expiresAt,
        });

        return { token, expiresAt };
    },
});

/** Destroy a session. */
export const logout = mutation({
    args: { sessionToken: v.string() },
    handler: async (ctx, { sessionToken }) => {
        const session = await ctx.db
            .query("adminSessions")
            .withIndex("by_token", (q) => q.eq("token", sessionToken))
            .first();
        if (session) {
            await ctx.db.delete(session._id);
        }
    },
});

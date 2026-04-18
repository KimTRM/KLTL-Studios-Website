import { query } from "../_generated/server";
import { v } from "convex/values";

/**
 * Site-level metadata queries (hero, footer, contact, socials).
 * All read-only — no mutations, no auth.
 */

/** Fetch a single siteMeta value by key, with a safe default. */
export const get = query({
    args: { key: v.string() },
    handler: async (ctx, { key }) => {
        const row = await ctx.db
            .query("siteMeta")
            .withIndex("by_key", (q) => q.eq("key", key))
            .first();
        return row?.value ?? null;
    },
});

/** Fetch multiple siteMeta values at once. Returns a Record<key, value>. */
export const getMany = query({
    args: { keys: v.array(v.string()) },
    handler: async (ctx, { keys }) => {
        const result: Record<string, string> = {};
        for (const key of keys) {
            const row = await ctx.db
                .query("siteMeta")
                .withIndex("by_key", (q) => q.eq("key", key))
                .first();
            if (row) result[key] = row.value;
        }
        return result;
    },
});

/** Convenience: fetch all hero-related fields in one call. */
export const getHero = query({
    handler: async (ctx) => {
        const keys = ["heroTitle", "heroSubtitle", "heroMotto", "heroImage"];
        const result: Record<string, string> = {};
        for (const key of keys) {
            const row = await ctx.db
                .query("siteMeta")
                .withIndex("by_key", (q) => q.eq("key", key))
                .first();
            if (row) result[key] = row.value;
        }
        return {
            title: result.heroTitle ?? "Kim Louise Labrador",
            subtitle: result.heroSubtitle ?? "Developer · Designer · Musician",
            motto: result.heroMotto ?? "Ad Astra Per Aspera",
            image: result.heroImage ?? "/res/DSC_1453.png",
        };
    },
});

/** Convenience: fetch footer-related fields. */
export const getFooter = query({
    handler: async (ctx) => {
        const keys = ["footerText", "githubUrl", "linkedinUrl", "youtubeUrl"];
        const result: Record<string, string> = {};
        for (const key of keys) {
            const row = await ctx.db
                .query("siteMeta")
                .withIndex("by_key", (q) => q.eq("key", key))
                .first();
            if (row) result[key] = row.value;
        }
        return {
            text: result.footerText ?? "© 2025 KLTL Studios.",
            githubUrl: result.githubUrl ?? "https://github.com/kimtrm",
            linkedinUrl:
                result.linkedinUrl ??
                "https://www.linkedin.com/in/kim-louise-labrador/",
            youtubeUrl: result.youtubeUrl ?? "https://youtube.com/@kltlstudios",
        };
    },
});

/** Convenience: fetch contact section fields. */
export const getContact = query({
    handler: async (ctx) => {
        const keys = ["contactEmail", "contactHeading", "contactSubheading"];
        const result: Record<string, string> = {};
        for (const key of keys) {
            const row = await ctx.db
                .query("siteMeta")
                .withIndex("by_key", (q) => q.eq("key", key))
                .first();
            if (row) result[key] = row.value;
        }
        return {
            email: result.contactEmail ?? "kimlabrador71@gmail.com",
            heading: result.contactHeading ?? "Let's Work Together",
            subheading:
                result.contactSubheading ??
                "Have a project in mind or just want to say hi? Let's talk!",
        };
    },
});

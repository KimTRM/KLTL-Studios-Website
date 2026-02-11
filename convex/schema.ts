import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Convex Schema — Phase 2 (Read-only)
 *
 * Tables:
 *
 * projects
 *   Portfolio projects with title, description, image, link, ordering,
 *   slug for URL-friendly lookups, featured flag, optional category and tags.
 *   Indexes: by_slug, by_featured, by_order.
 *
 * aboutSections
 *   About-page content blocks rendered in order.
 *   Each section has a heading, body text, and display order.
 *   Index: by_order.
 *
 * skills
 *   Skill groups (e.g. "Game Development") with a description listing
 *   technologies/tools and a display order.
 *   Index: by_order.
 *
 * siteMeta
 *   Key-value metadata for the site (hero title, hero subtitle, footer
 *   quote, contact email, social links, etc.).
 *   Index: by_key (unique lookup).
 *
 * adminSessions
 *   Session tokens for single-user admin authentication.
 *   Tokens are generated on login and validated on every mutation.
 *   Index: by_token (unique lookup).
 */

export default defineSchema({
    projects: defineTable({
        title: v.string(),
        slug: v.string(),
        description: v.string(),
        image: v.string(),
        link: v.string(),
        featured: v.boolean(),
        archived: v.boolean(),
        order: v.number(),
        category: v.optional(
            v.union(
                v.literal("game"),
                v.literal("web"),
                v.literal("design"),
                v.literal("other"),
            ),
        ),
        tags: v.optional(v.array(v.string())),
        subtitle: v.optional(v.string()),
        github: v.optional(v.string()),
        playLink: v.optional(v.string()),
        demoLink: v.optional(v.string()),
        gallery: v.optional(v.array(v.string())),
        technologies: v.optional(v.array(v.string())),
        year: v.optional(v.string()),
    })
        .index("by_slug", ["slug"])
        .index("by_featured", ["featured", "order"])
        .index("by_order", ["order"]),

    aboutSections: defineTable({
        heading: v.string(),
        body: v.string(),
        order: v.number(),
    }).index("by_order", ["order"]),

    skills: defineTable({
        title: v.string(),
        description: v.string(),
        order: v.number(),
    }).index("by_order", ["order"]),

    siteMeta: defineTable({
        key: v.string(),
        value: v.string(),
    }).index("by_key", ["key"]),

    adminSessions: defineTable({
        token: v.string(),
        email: v.string(),
        createdAt: v.number(),
        expiresAt: v.number(),
    }).index("by_token", ["token"]),
});

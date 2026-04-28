"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import AdminGuard from "./AdminGuard";
import AdminSidebar from "./AdminSidebar";
import { useAdminAuth } from "../hooks/useAdminAuth";
import "../css/admin.css";

/**
 * AdminLayout — wraps all `/admin` pages.
 *
 * Shows the login form if unauthenticated, otherwise renders the
 * sidebar + main content area.
 */
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { token } = useAdminAuth();
    const upsertMany = useMutation(api.siteMeta.mutations.upsertMany);

    const labelMap: Record<string, string> = {
        projects: "Projects",
        about: "About Sections",
        skills: "Skills",
        "site-meta": "Site Meta",
        new: "New",
    };

    const segments = pathname
        .split("/")
        .filter(Boolean)
        .slice(1);

    const crumbs = [
        { label: "Admin", href: "/admin" },
        ...segments.map((segment, index) => ({
            label: labelMap[segment] ?? decodeURIComponent(segment),
            href: `/admin/${segments.slice(0, index + 1).join("/")}`,
        })),
    ];

    // Contextual actions based on current page
    const getContextualActions = () => {
        const handleResetSection = async (keys: string[]) => {
            if (!token) return;
            const entries = keys.map(key => ({ key, value: "" }));
            await upsertMany({ sessionToken: token, entries });
        };

        if (pathname.startsWith("/admin/projects")) {
            return (
                <>
                    <button className="admin-btn admin-btn-secondary" onClick={() => window.location.reload()}>
                        Refresh
                    </button>
                </>
            );
        }
        if (pathname === "/admin/site-meta") {
            return (
                <>
                    <button className="admin-btn admin-btn-secondary" onClick={() => handleResetSection(["heroTitle", "heroSubtitle", "heroDescription", "heroCtaText", "heroCtaUrl"])}>
                        Reset Hero
                    </button>
                    <button className="admin-btn admin-btn-secondary" onClick={() => handleResetSection(["contactEmail", "contactPhone", "contactAddress"])}>
                        Reset Contact
                    </button>
                    <button className="admin-btn admin-btn-secondary" onClick={() => handleResetSection(["socialGithub", "socialLinkedIn", "socialTwitter"])}>
                        Reset Social
                    </button>
                    <button className="admin-btn admin-btn-secondary" onClick={() => handleResetSection(["seoTitle", "seoDescription", "seoKeywords"])}>
                        Reset SEO
                    </button>
                </>
            );
        }
        if (pathname.startsWith("/admin/about")) {
            return (
                <>
                    <button className="admin-btn admin-btn-secondary" onClick={() => alert("Reorder Sections - not implemented yet")}>
                        Reorder All
                    </button>
                </>
            );
        }
        if (pathname.startsWith("/admin/skills")) {
            return (
                <>
                    <button className="admin-btn admin-btn-secondary" onClick={() => alert("Reorder Skills - not implemented yet")}>
                        Reorder All
                    </button>
                </>
            );
        }
        return null;
    };

    return (
        <AdminGuard>
            <div className="admin-shell">
                <AdminSidebar />
                <main className="admin-main">
                    <header className="admin-topbar" aria-label="Admin context bar">
                        <nav className="admin-breadcrumbs" aria-label="Breadcrumb">
                            {crumbs.map((crumb, index) => (
                                <span key={crumb.href} className="admin-breadcrumb-item">
                                    {index > 0 && <span className="admin-breadcrumb-sep">/</span>}
                                    {index === crumbs.length - 1 ? (
                                        <span className="admin-breadcrumb-current">{crumb.label}</span>
                                    ) : (
                                        <Link href={crumb.href} className="admin-link">
                                            {crumb.label}
                                        </Link>
                                    )}
                                </span>
                            ))}
                        </nav>
                    </header>

                    <div className="admin-content">{children}</div>
                </main>
            </div>
        </AdminGuard>
    );
}

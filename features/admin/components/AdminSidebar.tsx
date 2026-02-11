"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "../hooks/useAdminAuth";

const navItems = [
    { href: "/admin", label: "Dashboard", exact: true },
    { href: "/admin/projects", label: "Projects" },
    { href: "/admin/about", label: "About Sections" },
    { href: "/admin/skills", label: "Skills" },
    { href: "/admin/site-meta", label: "Site Meta" },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { logout, session } = useAdminAuth();

    function isActive(href: string, exact?: boolean) {
        if (exact) return pathname === href;
        return pathname.startsWith(href);
    }

    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar-title">Admin Panel</div>

            <nav>
                {navItems.map(({ href, label, exact }) => (
                    <Link
                        key={href}
                        href={href}
                        className={isActive(href, exact) ? "active" : ""}
                    >
                        {label}
                    </Link>
                ))}
            </nav>

            <div className="admin-sidebar-footer">
                {session && (
                    <p
                        style={{
                            fontSize: "0.7rem",
                            color: "#666",
                            margin: "0 0 0.5rem",
                            wordBreak: "break-all",
                        }}
                    >
                        {session.email}
                    </p>
                )}
                <button className="admin-logout-btn" onClick={logout}>
                    Logout
                </button>
            </div>
        </aside>
    );
}

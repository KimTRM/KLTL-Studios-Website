"use client";

import AdminGuard from "./AdminGuard";
import AdminSidebar from "./AdminSidebar";
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
    return (
        <AdminGuard>
            <div className="admin-shell">
                <AdminSidebar />
                <main className="admin-main">{children}</main>
            </div>
        </AdminGuard>
    );
}

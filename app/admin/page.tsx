"use client";

import Link from "next/link";

/**
 * Admin Dashboard — landing page for /admin.
 */
export default function AdminDashboard() {
    return (
        <div>
            <div className="admin-page-header">
                <h2>Dashboard</h2>
            </div>

            <div className="admin-dashboard-grid">
                <Link href="/admin/projects" className="admin-dashboard-card">
                    <h3>Projects</h3>
                    <p>Manage portfolio projects</p>
                </Link>

                <Link href="/admin/about" className="admin-dashboard-card">
                    <h3>About Sections</h3>
                    <p>Edit about page content</p>
                </Link>

                <Link href="/admin/skills" className="admin-dashboard-card">
                    <h3>Skills</h3>
                    <p>Manage skill categories</p>
                </Link>

                <Link href="/admin/site-meta" className="admin-dashboard-card">
                    <h3>Site Meta</h3>
                    <p>Hero text, footer, contact info</p>
                </Link>
            </div>
        </div>
    );
}

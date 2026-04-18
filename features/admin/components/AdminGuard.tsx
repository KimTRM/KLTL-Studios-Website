"use client";

import { useAdminAuth } from "../hooks/useAdminAuth";
import LoginForm from "./LoginForm";

/**
 * AdminGuard — wraps admin content.
 *
 * Shows a loading state during hydration, the login form when
 * unauthenticated, and the children when authenticated.
 */
export default function AdminGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, isLoading } = useAdminAuth();

    if (isLoading) {
        return (
            <div className="admin-loading">
                <p>Verifying session…</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <LoginForm />;
    }

    return <>{children}</>;
}

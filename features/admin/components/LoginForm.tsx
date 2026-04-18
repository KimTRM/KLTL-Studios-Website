"use client";

import { useState, FormEvent } from "react";
import { useAdminAuth } from "../hooks/useAdminAuth";

/**
 * LoginForm — minimal admin login.
 *
 * Accepts email + password, validates against Convex env vars.
 * Shown automatically by AdminGuard when no valid session exists.
 */
export default function LoginForm() {
    const { login } = useAdminAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setPending(true);
        try {
            await login(email, password);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Login failed",
            );
        } finally {
            setPending(false);
        }
    }

    return (
        <div className="admin-login-wrapper">
            <form className="admin-login-form" onSubmit={handleSubmit}>
                <h1>Admin Login</h1>

                {error && <p className="admin-error">{error}</p>}

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    disabled={pending}
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    disabled={pending}
                />

                <button type="submit" disabled={pending}>
                    {pending ? "Signing in…" : "Sign in"}
                </button>
            </form>
        </div>
    );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const TOKEN_KEY = "admin_session_token";

/**
 * useAdminAuth — client-side session management.
 *
 * Stores the session token in localStorage and validates it against
 * Convex on every render.  Provides login / logout helpers and the
 * current auth state.
 */
export function useAdminAuth() {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Hydrate from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(TOKEN_KEY);
        setToken(stored);
        setIsLoading(false);
    }, []);

    // Validate the token reactively via Convex query
    const session = useQuery(
        api.auth.queries.validateSession,
        token ? { sessionToken: token } : "skip",
    );

    const loginMutation = useMutation(api.auth.mutations.login);
    const logoutMutation = useMutation(api.auth.mutations.logout);

    const login = useCallback(
        async (email: string, password: string) => {
            const result = await loginMutation({ email, password });
            localStorage.setItem(TOKEN_KEY, result.token);
            setToken(result.token);
            return result;
        },
        [loginMutation],
    );

    const logout = useCallback(async () => {
        if (token) {
            await logoutMutation({ sessionToken: token });
        }
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
    }, [token, logoutMutation]);

    const isAuthenticated = !!session && !!token;

    return {
        /** Current session token (null when logged out). */
        token,
        /** Validated session data from Convex (null when invalid). */
        session,
        /** True when the user has a valid session. */
        isAuthenticated,
        /** True during initial hydration or while the session query is in flight. */
        isLoading: isLoading || (!!token && session === undefined),
        login,
        logout,
    };
}

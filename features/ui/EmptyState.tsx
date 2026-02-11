"use client";

import type { ReactNode, CSSProperties } from "react";
import { RiFileList3Line } from "react-icons/ri";

interface EmptyStateProps {
    icon?: ReactNode;
    message?: string;
    sub?: string;
    style?: CSSProperties;
}

export default function EmptyState({
    icon,
    message = "Nothing here yet.",
    sub,
    style,
}: EmptyStateProps) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "4rem 2rem",
                color: "var(--text-faint)",
                textAlign: "center",
                ...style,
            }}
        >
            <span style={{ fontSize: "2.5rem", marginBottom: "1rem", opacity: 0.4 }}>
                {icon ?? <RiFileList3Line />}
            </span>
            <p style={{ fontSize: "1.05rem", margin: 0 }}>{message}</p>
            {sub && (
                <p style={{ fontSize: "0.85rem", marginTop: "0.5rem", opacity: 0.6 }}>
                    {sub}
                </p>
            )}
        </div>
    );
}

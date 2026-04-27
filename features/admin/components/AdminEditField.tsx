"use client";

import type { CSSProperties, ChangeEventHandler, ReactNode } from "react";

type AdminEditFieldProps = {
    label: ReactNode;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    placeholder?: string;
    multiline?: boolean;
    minHeight?: number;
    style?: CSSProperties;
};

export default function AdminEditField({
    label,
    value,
    onChange,
    placeholder,
    multiline = false,
    minHeight,
    style,
}: AdminEditFieldProps) {
    return (
        <div className="admin-field" style={style}>
            <label>{label}</label>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    style={minHeight ? { minHeight } : undefined}
                />
            ) : (
                <input
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
}
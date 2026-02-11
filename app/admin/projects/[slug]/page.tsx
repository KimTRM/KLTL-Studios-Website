"use client";

import { use } from "react";
import AdminProjectForm from "@/features/admin/projects/AdminProjectForm";

export default function EditProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    return <AdminProjectForm slug={slug} />;
}

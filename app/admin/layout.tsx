import AdminLayout from "@/features/admin/components/AdminLayout";

/**
 * Admin layout — isolates admin pages from the public site.
 *
 * Removes Header/Footer from the public layout and wraps everything
 * in the AdminLayout (sidebar + guard).
 */
export default function Layout({ children }: { children: React.ReactNode }) {
    return <AdminLayout>{children}</AdminLayout>;
}

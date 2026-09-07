import AdminSidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100" dir="rtl">
      {/* سایدبار سمت راست قرار می‌گیرد */}
      <AdminSidebar />

      {/* محتوای اصلی صفحات سمت چپ قرار می‌گیرد */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
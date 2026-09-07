"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { 
  Mail, 
  LogOut, 
  UserCheck, 
  ShieldCheck 
} from "lucide-react";

interface JwtPayload {
  email?: string;
  role?: string;
  sub?: string;
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // مقدار اولیه ساده برای جلوگیری از عدم تطابق SSR و Client
  const [userInfo, setUserInfo] = useState<{ email: string; role: string }>({
    email: "مدیر سیستم",
    role: "Admin",
  });

  useEffect(() => {
    // خواندن localStorage فقط پس از Mount شدن در مرورگر (کلاینت)
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUserInfo({
          email: decoded.email || "کاربر ادمین",
          role: decoded.role || "Admin",
        });
      } catch (error) {
        console.error("خطا در خواندن توکن:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    localStorage.removeItem("token");
    router.push("/login");
    router.refresh();
  };

  const navItems = [
    {
      title: "مدیریت پیام‌ها",
      href: "/admin/messages",
      icon: Mail,
    },
  ];

  return (
    <aside className="w-64 bg-white border-l border-slate-200 min-h-screen flex flex-col justify-between p-4" dir="rtl">
      {/* بخش بالای سایدبار */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2 py-3 border-b border-slate-100">
          <div className="p-2 bg-blue-600 text-white rounded-xl">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-base">سورین رایان</h2>
            <p className="text-xs text-slate-400">پنل مدیریت سیستم</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* بخش پایین سایدبار: اطلاعات کاربر و دکمه خروج */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="p-2 bg-slate-200 text-slate-700 rounded-xl">
            <UserCheck className="h-5 w-5" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-slate-800 truncate" title={userInfo.email}>
              {userInfo.email}
            </p>
            <span className="inline-block mt-0.5 text-[10px] font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md">
              {userInfo.role}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-2xl transition-colors text-sm font-semibold"
        >
          <LogOut className="h-4 w-4" />
          <span>خروج از حساب</span>
        </button>
      </div>
    </aside>
  );
}
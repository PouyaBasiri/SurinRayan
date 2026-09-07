"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import { loginAdmin } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("لطفاً تمامی فیلدها را پر کنید.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await loginAdmin({ email, password });
      
      // ذخیره توکن در کوکی برای دسترسی Middleware
      document.cookie = `token=${response.token}; path=/; max-age=86400; SameSite=Lax`;
      localStorage.setItem("token", response.token);

      // هدایت به داشبورد ادمین
      router.push("/admin/messages");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "نام کاربری یا رمز عبور اشتباه است.");
      } else {
        setError("خطا در ارتباط با سرور.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-200 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-2xl mb-2">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">ورود به پنل مدیریت</h1>
          <p className="text-sm text-slate-500">برای دسترسی به داشبورد اطلاعات حساب خود را وارد کنید.</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-2xl flex items-center gap-2">
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">ایمیل / نام کاربری</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@surinrayan.ir"
                className="w-full pl-4 pr-10 py-3 rounded-2xl border border-slate-200 text-sm focus:border-blue-600 focus:outline-none"
                required
              />
              <Mail className="h-5 w-5 text-slate-400 absolute right-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">رمز عبور</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-4 pr-10 py-3 rounded-2xl border border-slate-200 text-sm focus:border-blue-600 focus:outline-none"
                required
              />
              <Lock className="h-5 w-5 text-slate-400 absolute right-3 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl transition-colors shadow-sm flex items-center justify-center gap-2 disabled:bg-slate-300"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>در حال بررسی...</span>
              </>
            ) : (
              <span>ورود به حساب</span>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
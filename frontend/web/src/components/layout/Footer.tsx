import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Sparkles, ArrowUpLeft } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-300 border-t border-slate-800/80">
      {/* ============================================================ */}
      {/* 🎨 پس‌زمینه نوری و انیمیشن‌دار (مشابه هدر) */}
      {/* ============================================================ */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
        {/* شبکه توری شطرنجی */}
        <div 
          className="absolute inset-0 opacity-[0.12]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* هاله‌های نوری متحرک (Glow Blobs) */}
        <div className="absolute -bottom-12 right-1/4 h-48 w-96 rounded-full bg-blue-600/15 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-10 h-36 w-72 rounded-full bg-indigo-500/10 blur-3xl animate-pulse [animation-delay:2s]" />

        {/* خط نوری درخشان در مرز بالای فوتر */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse" />
      </div>

      {/* ============================================================ */}
      {/* 🏛️ محتوای اصلی فوتر */}
      {/* ============================================================ */}
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Company Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-black text-blue-500 tracking-tight group">
              <Sparkles className="h-5 w-5 text-blue-400 animate-spin-slow group-hover:scale-110 transition-transform" />
              <Image
                   src="/assets/images/Photoroom.png" 
                   alt="سورین رایان"
                   width={120} 
                   height={40} 
                   priority
                  className="h-18 w-auto object-contain transition-transform group-hover:scale-105 opacity-80"
                />
            </Link>
            <p className="text-xs leading-6 text-slate-400">
              ارائه‌دهنده راهکارهای نوین نرم‌افزاری و توسعه سامانه‌های سازمانی با بالاترین استانداردهای فنی.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider border-r-2 border-blue-500 pr-2">
              دسترسی سریع
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              {[
                { name: "صفحه اصلی", href: "/" },
                { name: "خدمات ما", href: "/services" },
                { name: "درباره ما", href: "/about" },
                { name: "تماس با ما", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="relative text-sm font-semibold leading-6 text-slate-300 hover:text-blue-400 transition-colors group py-1"
                  >
                   {item.name}
                   <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3.5 text-xs">
            <h4 className="text-sm font-semibold text-white tracking-wider border-r-2 border-blue-500 pr-2">
              اطلاعات تماس
            </h4>
            <div className="flex items-center gap-2.5 text-slate-300">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-blue-400">
                <Phone className="h-4 w-4" />
              </div>
              <span>0919-4006705</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-blue-400">
                <Mail className="h-4 w-4" />
              </div>
              <span className="font-mono dir-ltr">info@surinrayan.ir</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-blue-400">
                <MapPin className="h-4 w-4" />
              </div>
              <span>تهران، خیابان آزادی، سلسبیل شمالی،کوچه کریمی،پلاک 10</span>
            </div>
          </div>

          {/* Trust / Slogan */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider border-r-2 border-blue-500 pr-2">
              سیاست حفظ حریم خصوصی
            </h4>
            <p className="mt-4 text-xs leading-6 text-slate-400 bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-xl">
              تمامی خدمات رایان توسعه سورین با ضمانت پشتیبانی و بر اساس آخرین متدولوژی‌های روز توسعه داده می‌شوند.
             مهم‌ترین سرمایه‌ی ما مشتریانی هستند که به این شرکت اعتماد می کنند.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} رایان توسعه سورین (surinrayan.ir). تمامی حقوق محفوظ است.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="relative text-sm font-semibold leading-6 text-slate-300 hover:text-blue-400 transition-colors group py-1">مقالات</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">سورین رایان</h3>
            <p className="text-sm leading-6 text-slate-400">
              ارائه‌دهنده راهکارهای نوین نرم‌افزاری و توسعه سامانه‌های سازمانی با بالاترین استانداردهای فنی.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider">دسترسی سریع</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-white transition-colors">خدمات ما</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">درباره ما</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">تماس با ما</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-sm">
            <h4 className="text-sm font-semibold text-white tracking-wider">اطلاعات تماس</h4>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-400" />
              <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-400" />
              <span>info@surinrayan.ir</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-400" />
              <span>تهران، خیابان آزادی، پلاک ۱</span>
            </div>
          </div>

          {/* Trust / Slogan */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider">تعهد به کیفیت</h4>
            <p className="mt-4 text-xs leading-5 text-slate-400">
              تمامی خدمات سورین رایان با ضمانت پشتیبانی و بر اساس آخرین متدولوژی‌های روز توسعه داده می‌شوند.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} سورین رایان (surinrayan.ir). تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  );
}
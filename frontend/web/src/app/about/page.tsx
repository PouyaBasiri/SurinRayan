import type { Metadata } from "next";
import Link from "next/link";
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Zap, 
  Users, 
  Award, 
  CheckCircle2, 
  ArrowLeft 
} from "lucide-react";

export const metadata: Metadata = {
  title: "درباره ما | شرکت توسعه نرم‌افزار سورین رایان",
  description: "آشنایی با ماموریت، چشم‌انداز، ارزش‌های سازمانی و سوابق شرکت سورین رایان در حوزه توسعه سامانه‌های تحت وب و نرم‌افزارهای سازمانی.",
};

export default function AboutPage() {
  return (
    <div className="bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* ۱. بخش سربرگ (Header Section) */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            درباره سورین رایان
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
            همراه هوشمند شما در <span className="text-blue-600">تحول دیجیتال</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed">
            شرکت **سورین رایان** با تکیه بر دانش فنی پیشرفته و تجارب ارزشمند در صنعت نرم‌افزار، راهکارهای جامع و سفارشی برای توسعه سامانه‌های سازمانی، بسترهای ابری و اپلیکیشن‌های وب ارائه می‌دهد.
          </p>
        </div>

        {/* ۲. بخش ماموریت و چشم‌انداز (Mission & Vision) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Mission */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-md shadow-blue-500/20">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">ماموریت ما</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              ارائه راهکارهای نرم‌افزاری باکیفیت، مقیاس‌پذیر و امن که فرآیندهای پیچیده کسب‌وکارها را ساده‌سازی کرده و ارزش افزوده واقعی برای صاحبان صنایع و مخاطبان ایجاد می‌کند. ما متعهد به استفاده از برترین و به‌روزترین فناوری‌های بین‌المللی هستیم.
            </p>
          </div>

          {/* Vision */}
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-md shadow-blue-500/20">
              <Eye className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">چشم‌انداز ما</h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              تبدیل شدن به مرجع مطمئن و برتر در حوزه طراحی، معماری سیستم‌های نرم‌افزاری و استقرار زیرساخت‌های ابرپایه در منطقه، به‌طوری که نام «سورین رایان» مرادف کیفیت، نوآوری و پایداری در نرم‌افزار باشد.
            </p>
          </div>
        </div>

        {/* ۳. ارزش‌های سازمانی (Core Values) */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">ارزش‌های بنیادین سورین رایان</h2>
            <p className="mt-3 text-sm text-slate-600">
              اصولی که تمام فعالیت‌ها و تصمیم‌گیری‌های ما در پروژه‌ها بر پایه آن‌ها استوار است.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <ShieldCheck className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">کیفیت و استاندارد عالی</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                کدنویسی تمیز، رعایت معماری Clean Architecture و تست‌پذیری کامل، تضمین‌کننده خروجی بی‌نقص در پروژه‌های ماست.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <Zap className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">نوآوری و به‌روز بودن</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                استفاده مداوم از آخرین نسخه‌های فناوری (مانند .NET 10 و Next.js App Router) جهت حفظ سرعت و رقابت‌پذیری پروژه.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <Users className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">شفافیت و تعهد به کارفرما</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                ارتباط مداوم در تمام مراحل توسعه، تحویل به موقع بر اساس برنامه اسپرینت‌ها و ارائه پشتیبانی واقعی پس از تحویل.
              </p>
            </div>
          </div>
        </div>

        {/* ۴. آمارهای کلیدی (Key Stats) */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 lg:p-12 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-extrabold text-blue-400">٪۹۹.۹</div>
              <div className="text-xs lg:text-sm text-slate-400 mt-2">پایداری سرویس‌ها (Uptime)</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-extrabold text-blue-400">۱۰+</div>
              <div className="text-xs lg:text-sm text-slate-400 mt-2">پروژه موفق سازمانی</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-extrabold text-blue-400">۲۴/۷</div>
              <div className="text-xs lg:text-sm text-slate-400 mt-2">مانیتورینگ و پشتیبانی</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-extrabold text-blue-400">۱۰۰٪</div>
              <div className="text-xs lg:text-sm text-slate-400 mt-2">رضایت کارفرمایان</div>
            </div>
          </div>
        </div>

        {/* ۵. دعوت به همکاری (CTA) */}
        <div className="text-center bg-blue-50/60 rounded-3xl p-8 lg:p-12 border border-blue-100">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            آیا آماده شروع پروژه نرم‌افزاری خود هستید؟
          </h2>
          <p className="mt-3 text-sm text-slate-600 max-w-xl mx-auto">
            تیم سورین رایان آماده ارائه مشاوره تخصصی و بررسی نیازمندی‌های فنی کسب‌وکار شماست.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 transition-all"
            >
              ارتباط با کارشناسان ما
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
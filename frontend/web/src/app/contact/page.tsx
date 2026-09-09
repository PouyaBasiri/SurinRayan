import type { Metadata } from "next";
import { ContactForm } from "@/components/modules/contact/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "تماس با ما | شرکت رایان توسعه سورین",
  description: "ارتباط با کارشناسان شرکت رایان توسعه سورین جهت دریافت مشاوره رایگان و ثبت سفارش پروژه‌های نرم‌افزاری.",
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full">
            ارتباط با ما
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            منتظر شنیدن صدای گرم شما هستیم
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            برای شروع پروژه جدید یا دریافت مشاوره فنی، با ما در تماس باشید.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 flex items-start gap-4">
              <Phone className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">شماره تلفن</h3>
                <p className="text-slate-600 text-sm mt-1">۰۲۱-۱۲۳۴۵۶۷۸</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 flex items-start gap-4">
              <Mail className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">پست الکترونیک</h3>
                <p className="text-slate-600 text-sm mt-1">info@surinrayan.ir</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 flex items-start gap-4">
              <MapPin className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">آدرس دفتر مرکزی</h3>
                <p className="text-slate-600 text-sm mt-1">تهران، خیابان آزادی، پلاک ۱</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 flex items-start gap-4">
              <Clock className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">ساعات کاری</h3>
                <p className="text-slate-600 text-sm mt-1">شنبه تا چهارشنبه: ۹:۰۰ الی ۱۷:۰۰</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
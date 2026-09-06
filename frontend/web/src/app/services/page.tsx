import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES_DATA } from "@/types/service";
import { Globe, Server, Container, ArrowLeft, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "خدمات تخصصی | شرکت سورین رایان",
  description: "لیست خدمات تخصصی توسعه نرم‌افزار، طراحی وب‌سایت، توسعه APIهای دات‌نت و خدمات DevOps توسط شرکت سورین رایان.",
};

const iconMap = {
  Globe: Globe,
  Server: Server,
  Container: Container,
};

export default function ServicesPage() {
  return (
    <div className="bg-slate-50/50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full">
            خدمات سورین رایان
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            راهکارهای تخصصی نرم‌افزار برای کسب‌وکار شما
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            ما پروژه‌های شما را با آخرین استانداردهای مهندسی نرم‌افزار و معماری‌های مدرن پیاده‌سازی می‌کنیم.
          </p>
        </div>

        {/* Services List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => {
            const Icon = iconMap[service.iconName as keyof typeof iconMap] || Globe;
            return (
              <div
                key={service.slug}
                className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200/60 hover:shadow-md hover:ring-blue-300 transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  <ul className="space-y-2.5 mb-8 border-t border-slate-100 pt-6">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-blue-600 hover:text-white transition-all group"
                >
                  اطلاعات بیشتر و جزئیات
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
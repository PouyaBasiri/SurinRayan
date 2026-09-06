import Link from "next/link";
import { Server, Globe, Container, ArrowLeft } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "طراحی و توسعه سامانه‌های وب",
    desc: "طراحی وب‌سایت‌ها و سامانه‌های پیشرفته سفارشی با فرانت‌اند Next.js و React.",
  },
  {
    icon: Server,
    title: "توسعه API و وب‌سرویس‌های سازمانی",
    desc: "طراحی سرویس‌های قدرتمند دات‌نت (.NET 10)، Microservices و RESTful APIs.",
  },
  {
    icon: Container,
    title: "استقرار ابرپایه و DevOps",
    desc: "پیاده‌سازی CI/CD، داکرایز کردن پروژه‌ها و استقرار روی سرورهای لینوکس با پایداری ۹۹.۹٪.",
  },
];

export function ServicesSummary() {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-blue-400 font-semibold text-sm">خدمات تخصصی</span>
            <h2 className="text-3xl font-bold mt-2">چه خدماتی ارائه می‌دهیم؟</h2>
          </div>
          <Link
            href="/services"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            مشاهده همه خدمات
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-slate-800/60 border border-slate-700/50 hover:border-blue-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{srv.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{srv.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
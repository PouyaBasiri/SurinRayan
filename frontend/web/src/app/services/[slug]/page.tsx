import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES_DATA } from "@/types/service";
import { Globe, Server, Container, Check, ArrowLeft, Cpu, Layers } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

const iconMap = {
  Globe: Globe,
  Server: Server,
  Container: Container,
};

// برای Static Site Generation سفارشی
export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) return { title: "خدمت یافت نشد" };

  return {
    title: `${service.title} | سورین رایان`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.iconName as keyof typeof iconMap] || Globe;

  return (
    <div className="bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Top Breadcrumb & Title */}
        <div className="mb-12 border-b border-slate-100 pb-8">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 rotate-180" />
            بازگشت به همه خدمات
          </Link>
          <div className="flex items-center gap-4 mt-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
              <Icon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{service.title}</h1>
              <p className="text-slate-500 text-sm mt-1">{service.shortDescription}</p>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content (2 Cols) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Full Description */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Layers className="h-6 w-6 text-blue-600" />
                توضیحات و نیازمندی‌ها
              </h2>
              <p className="text-slate-600 text-base leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100">
                {service.fullDescription}
              </p>
            </section>

            {/* Technologies */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-blue-600" />
                فناوری‌ها و لایبرری‌های مورد استفاده
              </h2>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Process Steps */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">مراحل اجرای خدمت در سورین رایان</h2>
              <div className="space-y-4">
                {service.processSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{step.title}</h3>
                      <p className="text-slate-600 text-sm mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar CTA & Benefits (1 Col) */}
          <div className="space-y-8">
            
            {/* CTA Box */}
            <div className="rounded-3xl bg-slate-900 text-white p-8">
              <h3 className="text-xl font-bold mb-3">نیاز به این خدمت دارید؟</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                جهت برآورد زمان، هزینه و دریافت مشاوره تخصصی رایگان، با کارشناسان سورین رایان تماس بگیرید.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 transition-all"
              >
                ثبت درخواست مشاوره
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>

            {/* Benefits */}
            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">مزایای همکاری با ما</h3>
              <ul className="space-y-3">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs font-medium text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
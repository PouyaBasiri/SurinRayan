import { Layers, Cpu, Lock, Headphones } from "lucide-react";

const values = [
  {
    icon: Layers,
    title: "معماری مقیاس‌ پذیر و تمیز",
    description:
      "توسعه کدها با جدیدترین فناوری‌های دات‌نت (.NET 10) و Next.js تا توسعه‌های آتی و اضافه کردن فیچرها بدون خطرات بدهی فنی انجام شود.",
  },
  {
    icon: Cpu,
    title: "کارایی و سرعت فوق‌العاده",
    description:
      "بهینه‌سازی پایگاه داده، پاسخ‌دهی لایه API زیر چند میلی‌ثانیه و رندرینگ بهینه برای تجربه کاربری روان.",
  },
  {
    icon: Lock,
    title: "امنیت چندلایه‌ای",
    description:
      "رعایت استانداردهای OWASP، اعتبارسنجی دقیق داده‌ها و زیرساخت‌های امن ایزوله شده با داکر برای حفاظت از اطلاعات شما.",
  },
  {
    icon: Headphones,
    title: "پشتیبانی و همراهی مداوم",
    description:
      "تیم فنی سورین رایان در تمام مراحل طراحی، استقرار و نگهداشت سیستم، پاسخگو و در کنار شماست.",
  },
];

export function ValueProposition() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold text-blue-600 uppercase tracking-wide">
            ارزش‌های کلیدی ما
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            چرا شرکت‌ها سورین رایان را انتخاب می‌کنند؟
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
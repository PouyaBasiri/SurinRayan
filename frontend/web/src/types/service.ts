export interface ServiceItem {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: "Globe" | "Server" | "Container" | "Database" | "ShieldCheck";
  features: string[];
  technologies: string[];
  benefits: string[];
  processSteps: { title: string; desc: string }[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    slug: "web-development",
    title: "طراحی و توسعه سامانه‌های تحت وب",
    shortDescription: "توسعه وب‌سایت‌ها و سامانه‌های پیشرفته سفارشی با فرانت‌اند مدرن Next.js و React.",
    fullDescription: "ما در سورین رایان سامانه‌های تحت وب را بر پایه جدیدترین متدولوژی‌های فرانت‌اند و رندرینگ بهینه (SSR/SSG) پیاده‌سازی می‌کنیم. تمرکز اصلی ما بر سرعت بارگذاری بالا، تجربه کاربری (UX) استاندارد و سئوی فنی قوی است.",
    iconName: "Globe",
    features: [
      "طراحی سیستم‌های یکپارچه وب (Web Applications)",
      "رندرینگ فوق‌العاده سریع با Next.js App Router",
      "طراحی واکنش‌گرا (Responsive) برای تمامی دستگاه‌ها",
      "رعایت استانداردهای سئو و بهینه‌سازی موتورهای جستجو"
    ],
    technologies: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
    benefits: ["افزایش نرخ تبدیل مخاطبان", "بارگذاری زیر ۱ ثانیه", "رتبه بهتر در گوگل"],
    processSteps: [
      { title: "تحلیل نیازمندی‌ها", desc: "بررسی اهداف پروژه و تدوین سند RFC و Wireframe" },
      { title: "طراحی UI/UX", desc: "طراحی پروتوتایپ‌های تعاملی و فیگما" },
      { title: "توسعه کلاینت", desc: "کدنویسی تمیز با TypeScript و کامپوننت‌های مدرن" },
      { title: "تحویل و استقرار", desc: "تست سلامت و تحویل رایگان با کانفیگ SEO" }
    ]
  },
  {
    slug: "backend-api",
    title: "توسعه API و وب‌سرویس‌های سازمانی",
    shortDescription: "طراحی سرویس‌های قدرتمند دات‌نت (.NET 10)، Microservices و RESTful APIs مقیاس‌پذیر.",
    fullDescription: "هسته اصلی سامانه‌های نرم‌افزاری نیازمند معماری استوار است. ما با استفاده از Clean Architecture و دات‌نت، APIهایی با امنیت بالا، عملکرد بی‌نظیر در زیر چند میلی‌ثانیه و ساختار تست‌پذیر پیاده‌سازی می‌کنیم.",
    iconName: "Server",
    features: [
      "طراحی معماری Clean Architecture و CQRS",
      "توسعه وب‌سرویس‌های RESTful و gRPC",
      "اتصال امن به پایگاه‌های داده Relational و NoSQL",
      "مستندسازی استاندارد با Swagger/OpenAPI"
    ],
    technologies: [".NET 10", "C#", "EF Core", "PostgreSQL", "MediatR", "Redis"],
    benefits: ["مقیاس‌پذیری بالا برای ترافیک سنگین", "کاهش خطاهای سیستم", "امنیت لایه‌بندی‌شده"],
    processSteps: [
      { title: "طراحی پایگاه‌داده", desc: "مدل‌سازی انتیتی‌ها و روابط با EF Core" },
      { title: "کدنویسی لایه‌ای", desc: "پیاده‌سازی لایه‌های Domain, Application و Infrastructure" },
      { title: "تست‌های یکپارچگی", desc: "اجرای تست‌های اتوماتیک برای لایه‌ها" },
      { title: "انتشار API", desc: "استقرار روی سرور لینوکس با داکر" }
    ]
  },
  {
    slug: "devops-cloud",
    title: "استقرار ابرپایه و خدمات DevOps",
    shortDescription: "پیاده‌سازی pipelines CI/CD، داکرایز کردن پروژه‌ها و استقرار روی سرورهای لینوکس با پایداری ۹۹.۹٪.",
    fullDescription: "تحویل مداوم نرم‌افزار بدون قطعی، نیازمند زیرساخت‌های حرفه‌ای DevOps است. تیم سورین رایان فرآیندهای تست، ساخت و استقرار پروژه‌های شما را اتوماتیک کرده و پایداری سرویس را تضمین می‌کند.",
    iconName: "Container",
    features: [
      "کانتینرسازی پروژه‌ها با Docker و Docker Compose",
      "راه‌اندازی خطوط اتوماتیک GitLab CI/CD یا GitHub Actions",
      "پیکربندی سرورهای لینوکس (Ubuntu Server) و Nginx/Caddy",
      "مانیتورینگ و لاگینگ متمرکز سیستم"
    ],
    technologies: ["Docker", "GitLab CI/CD", "Linux (Ubuntu)", "Nginx", "PostgreSQL Docker"],
    benefits: ["کاهش ریسک قطعی در زمان انتشار", "تحویل سریع‌تر نسخه جدید", "کاهش هزینه‌های سرور"],
    processSteps: [
      { title: "بررسی زیرساخت", desc: "تحلیل سرورها و ساختار پروژه فعلی" },
      { title: "ساخت Dockerfile", desc: "کانتینرایز کردن برنامه‌ها به صورت چندمرحله‌ای (Multi-stage)" },
      { title: "کانفیگ CI/CD", desc: "اتوماسیون ساخت و استقرار روی سرور" },
      { title: "مانیتورینگ", desc: "تنظیم هشدارها و لاگینگ برای پایداری" }
    ]
  }
];
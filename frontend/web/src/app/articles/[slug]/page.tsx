import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
  ArrowRight,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  Eye,
  Tag,
  ThumbsUp,
} from "lucide-react";

interface Article {
  slug: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  publishedAt: string;
  readTime: string;
  viewsCount: number;
  tags: string[];
}

// دیتای نمونه نگاشت‌شده بر اساس slug
const MOCK_ARTICLES: Record<string, Article> = {
  "clean-architecture-dotnet-8": {
    slug: "clean-architecture-dotnet-8",
    title: "مقدمه‌ای بر معماری Clean Architecture در .NET 8",
    summary:
      "نگاهی جامع به اصول Clean Architecture و چگونگی پیاده‌سازی آن در پروژه‌های مقیاس‌پذیر .NET به همراه ساختار لایه‌بندی استاندارد.",
    content: `
      <p>معماری پاک (Clean Architecture) یکی از محبوب‌ترین الگوهای ساختاردهی به نرم‌افزار است که توسط **روبرت سی. مارتین (Uncle Bob)** معرفی شد. هدف اصلی این معماری، جداسازی مسئولیت‌ها و مستقل‌سازی منطق تجاری (Business Logic) از فریم‌ورک‌ها، دیتابیس‌ها و رابط‌های کاربری است.</p>
      
      <h3>چرا باید از Clean Architecture استفاده کنیم؟</h3>
      <p>در پروژه‌های بزرگ و سازمانی، با گذشت زمان تغییر در تکنولوژی‌ها یا بانک‌های اطلاعاتی اجتناب‌ناپذیر است. استفاده از این معماری به شما این امکان را می‌دهد که بدون آسیب به منطق اصلی برنامه، زیرساخت‌ها را ارتقا دهید.</p>
      
      <ul>
        <li><strong>مستقل از فریم‌ورک:</strong> معماری به وجود یک کتابخانه یا فریم‌ورک خاص وابسته نیست.</li>
        <li><strong>تست‌پذیری بالا:</strong> منطق برنامه بدون نیاز به UI، دیتابیس یا سرور وب قابل تست است.</li>
        <li><strong>مستقل از UI:</strong> رابط کاربری می‌تواند به راحتی تغییر کند بدون اینکه منطق برنامه دستخوش تغییر شود.</li>
      </ul>

      <h3>لایه‌های اصلی معماری پاک</h3>
      <p>این معماری معمولاً از ۴ لایه اصلی تشکیل شده است که به‌صورت لایه‌های پیاز دور هم قرار می‌گیرند:</p>
      <ol>
        <li><strong>Domain Layer:</strong> شامل موجودیت‌ها (Entities) و منطق اصلی کسب‌وکار.</li>
        <li><strong>Application Layer:</strong> شامل Use Caseها، اینترفیس‌ها و DTOها.</li>
        <li><strong>Infrastructure Layer:</strong> پیاده‌سازی دسترسی به دیتابیس (EF Core)، سرویس‌های ایمیل و هوش مصنوعی.</li>
        <li><strong>Web / API Layer:</strong> کنترلرها، Middlewareها و نقطه ورود برنامه.</li>
      </ol>
    `,
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "پویا خیاط بصیری",
      role: "توسعه‌دهنده ارشد Backend & DevOps",
      avatar:
        "/assets/images/PouyaBasiri.jpg",
    },
    category: "دات‌نت",
    publishedAt: "۲ مهر ۱۴۰۵",
    readTime: "۸ دقیقه",
    viewsCount: 1240,
    tags: [".NET 8", "Clean Architecture", "C#", "DevOps", "Backend"],
  },
  "docker-standalone-nextjs": {
    slug: "docker-standalone-nextjs",
    title: "بهینه‌سازی حجم امیج داکر در Next.js با Standalone Output",
    summary:
      "چگونه حجم کانتینر Next.js را با خروجی Standalone از چند گیگابایت به زیر ۲۰۰ مگابایت برسانیم.",
    content: `
      <p>در فرایند Deployment برنامه‌های Next.js، حجم کانتینر نهایی نقش تعیین‌کننده‌ای در سرعت Build و Deploy مجدد دارد. به صورت پیش‌فرض، پوشه node_modules شامل تمام وابستگی‌های زمان توسعه است که حجم امیج داکر را به شدت افزایش می‌دهد.</p>
      
      <h3>ویژگی Standalone Output چیست؟</h3>
      <p>با فعال‌سازی خروجی standalone در فایل next.config.js، فریم‌ورک Next.js تنها کدهایی را که واقعاً برای اجرای سرور تولیدی لازم هستند استخراج می‌کند.</p>
    `,
    imageUrl:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "پویا خیاط بصیری",
      role: "توسعه‌دهنده ارشد Backend & DevOps",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    },
    category: "DevOps",
    publishedAt: "۲۸ شهریور ۱۴۰۵",
    readTime: "۵ دقیقه",
    viewsCount: 890,
    tags: ["Next.js", "Docker", "DevOps", "CI/CD"],
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = MOCK_ARTICLES[slug];

  // اگر مقاله یافت نشد، صفحه 404 نمایش داده شود
  if (!article) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* ۱. دکمه بازگشت */}
        <div>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors bg-slate-900/60 border border-slate-800 px-4 py-2 rounded-xl"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت به لیست مقالات
          </Link>
        </div>

        {/* ۲. هدر مقاله */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-blue-400">
            <span className="bg-blue-950/80 border border-blue-800/60 px-3 py-1 rounded-full font-semibold">
              {article.category}
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime} مطالعه
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Eye className="h-3.5 w-3.5" />
              {article.viewsCount} بازدید
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 leading-tight">
            {article.title}
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {article.summary}
          </p>
        </header>

        {/* ۳. مشخصات نویسنده و تاریخ */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-full overflow-hidden border border-blue-500/30">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-200">
                {article.author.name}
              </h3>
              <p className="text-xs text-slate-400">{article.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-blue-400" />
              {article.publishedAt}
            </span>
            <div className="flex items-center gap-2">
              <button
                title="اشتراک‌گذاری"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:text-blue-400 transition-colors"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                title="ذخیره مقاله"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:text-blue-400 transition-colors"
              >
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ۴. تصویر اصلی مقاله */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-800 shadow-2xl">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* ۵. محتوای اصلی مقاله */}
        <div
          className="prose prose-invert max-w-none prose-headings:text-slate-100 prose-p:text-slate-300 prose-p:leading-relaxed prose-li:text-slate-300 prose-strong:text-blue-400 pt-4"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* ۶. برچسب‌ها (Tags) */}
        <div className="pt-8 border-t border-slate-800/80 space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-400 font-semibold">
            <Tag className="h-4 w-4 text-blue-400" />
            برچسب‌های مرتبط:
          </div>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-slate-300 bg-slate-900 border border-slate-800 hover:border-blue-500/40 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* ۷. کارت تعاملی پایین مقاله */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-slate-200">
              آیا این مقاله برای شما مفید بود؟
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              نظر شما به ما در بهبود کیفیت محتوا کمک می‌کند.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-lg shadow-blue-600/20">
            <ThumbsUp className="h-4 w-4" />
            مفید بود
          </button>
        </div>
      </div>
    </article>
  );
}
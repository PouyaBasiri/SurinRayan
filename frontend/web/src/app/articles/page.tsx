import type { Metadata } from "next";
import { ArticleCard } from "@/components/blog/ArticleCard";

export const metadata: Metadata = {
  title: "بلاگ و مقالات آموزشی | رایان توسعه سورین",
  description: "جدیدترین مقالات تخصصی در حوزه برنامه نویسی، داکر و معماری نرم افزار",
};

const articles = [
  {
    slug: "clean-architecture-dotnet-8",
    title: "پیاده‌سازی Clean Architecture در .NET 8 با C#",
    summary: "بررسی لایه‌بندی اصول Clean Architecture و مدیریت وابستگی‌ها در پروژه‌های بزرگ سازمانی.",
    category: "دات‌نت",
    readTime: "۸ دقیقه",
    date: "۲ مهر ۱۴۰۵",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "docker-standalone-nextjs",
    title: "بهینه‌سازی حجم امیج داکر در Next.js با Standalone Output",
    summary: "چگونه حجم کانتینر Next.js را با خروجی Standalone از چند گیگابایت به زیر ۲۰۰ مگابایت برسانیم.",
    category: "DevOps",
    readTime: "۵ دقیقه",
    date: "۲۸ شهریور ۱۴۰۵",
    imageUrl: "https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=800&auto=format&fit=crop",
  },
];

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-slate-900 py-12 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* سربرگ صفحه */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-black sm:text-4xl text-white">
            مقالات و آموزش‌های تخصصی
          </h1>
          <p className="mt-4 text-sm text-slate-400">
            آخرین دستاوردها و آموزش‌های دنیای نرم‌افزار، معماری و DevOps
          </p>
        </div>

        {/* گرید مقالات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

      </div>
    </main>
  );
}
import Link from "next/link";
import Image from "next/image";

interface ArticleProps {
  article: {
    slug: string;
    title: string;
    summary: string;
    category: string;
    readTime: string;
    date: string;
    imageUrl: string;
  };
}

export function ArticleCard({ article }: ArticleProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-blue-500/40 transition-all duration-300">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-800">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="rounded-full bg-blue-950/80 border border-blue-800/60 px-3 py-1 font-semibold text-blue-400">
              {article.category}
            </span>
            <span>{article.readTime}</span>
          </div>

          <h2 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
            {/* 👈 استفاده از slug در آدرس‌دهی لینک */}
            <Link href={`/articles/${article.slug}`}>
              <span className="absolute inset-0" />
              {article.title}
            </Link>
          </h2>

          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-500">
          {article.date}
        </div>
      </div>
    </div>
  );
}
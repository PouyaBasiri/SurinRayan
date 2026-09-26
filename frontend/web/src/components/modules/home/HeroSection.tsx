"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Code2, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 border-b border-slate-800 bg-slate-950">
      {/* ۱. ویدئوی پس‌زمینه */}
      <video
        autoPlay
        loop
        muted
        playsInline
        //preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
        //poster="/logo.svg" //
      >
        <source src="/assets/videos/6fa3ceb1.mp4" type="video/mp4" />
        مرورگر شما از تگ ویدئو پشتیبانی نمی‌کند.
      </video>

      {/* ۲. لایه تیره (Overlay) جهت ایجاد کنتراست و خوانایی متون */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] z-10" />

      {/* ۳. محتوای اصلی بخش Hero */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-blue-300 ring-1 ring-inset ring-blue-500/30 mb-6"
          >
            <Zap className="h-3.5 w-3.5 text-blue-400" />
            توسعه نرم‌افزار سازمانی و سامانه با استانداردهای روز
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl leading-[1.25]"
          >
            راهکارهای هوشمند نرم‌افزاری برای{" "}
            <span className="text-blue-400">رشد کسب‌وکار شما</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg leading-8 text-slate-200"
          >
            <strong className="text-white">رایان توسعه سورین</strong> طراح و مجری سامانه‌های تحت وب مقیاس‌پذیر، معماری‌های ابرپایه (Cloud-Native) و پلتفرم‌های اختصاصی برای سازمان‌ها و شرکت‌های پیشرو است.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-all"
            >
              درخواست مشاوره رایگان
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md px-6 py-3.5 text-sm font-semibold text-white border border-white/20 hover:bg-white/20 transition-all"
            >
              مشاهده خدمات رایان توسعه سورین
            </Link>
          </motion.div>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-xs font-medium text-slate-300"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-blue-400" />
              ضمانت پایداری و امنیت نرم‌افزار
            </div>
            <div className="flex items-center gap-1.5">
              <Code2 className="h-4 w-4 text-blue-400" />
              توسعه بر پایه Clean Architecture
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
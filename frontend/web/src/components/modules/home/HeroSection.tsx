"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Code2, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-95/50 py-20 lg:py-28 border-b border-slate-100">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/2 -z-10 h-[400px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-50/70 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20 mb-6"
          >
            <Zap className="h-3.5 w-3.5 text-blue-600" />
            توسعه نرم‌افزار سازمانی و سامانه با استانداردهای روز
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl leading-[1.25]"
          >
            راهکارهای هوشمند نرم‌افزاری برای <span className="text-blue-600">رشد کسب‌وکار شما</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg leading-8 text-slate-600"
          >
            شرکت **سورین رایان** طراح و مجری سامانه‌های تحت وب مقیاس‌پذیر، معماری‌های ابرپایه (Cloud-Native) و پلتفرم‌های اختصاصی برای سازمان‌ها و شرکت‌های پیشرو است.
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
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 transition-all"
            >
              درخواست مشاوره رایگان
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 transition-all"
            >
              مشاهده خدمات سورین رایان
            </Link>
          </motion.div>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-xs font-medium text-slate-500"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              ضمانت پایداری و امنیت نرم‌افزار
            </div>
            <div className="flex items-center gap-1.5">
              <Code2 className="h-4 w-4 text-blue-600" />
              توسعه بر پایه Clean Architecture
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

interface TopCampaignBannerProps {
  imageSrc?: string;
  linkHref?: string;
  altText?: string;
}

export function TopCampaignBanner({
  imageSrc = "/assets/images/campaign/devops-top-layout.jpg",
  linkHref = "/services",
  altText = "کمپین تخصصی DevOps و زیرساخت",
}: TopCampaignBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative w-full overflow-hidden bg-slate-900 border-b border-slate-800">
      {/* لینک کلیک‌پذیر روی کل بنر */}
      <Link href={linkHref} className="block w-full relative">
        <Image
          src={imageSrc}
          alt={altText}
          width={1920}
          height={80}
          priority
          sizes="100vw"
          className="w-full h-auto max-h-[80px] object-cover object-center transition-opacity hover:opacity-95"
        />
      </Link>

      {/* دکمه بستن بنر */}
      <button
        onClick={() => setIsVisible(false)}
        aria-label="بستن بنر"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-950/60 p-1.5 text-slate-300 hover:text-white hover:bg-slate-900/90 backdrop-blur-md transition-all focus:outline-none"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
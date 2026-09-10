"use client";

import { Search } from "lucide-react";

interface MessageFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeTab: "all" | "unread" | "replied";
  onTabChange: (tab: "all" | "unread" | "replied") => void;
}

export default function MessageFilters({
  searchTerm,
  onSearchChange,
  activeTab,
  onTabChange,
}: MessageFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      {/* Search Box */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="جستجو در نام، ایمیل یا موضوع..."
          className="w-full rounded-lg border border-gray-300 bg-white pr-10 pl-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => onTabChange("all")}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
            activeTab === "all"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          همه پیام‌ها
        </button>
        <button
          onClick={() => onTabChange("unread")}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
            activeTab === "unread"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          خوانده‌نشده
        </button>
        <button
          onClick={() => onTabChange("replied")}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
            activeTab === "replied"
              ? "bg-white text-green-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          پاسخ داده‌شده
        </button>
      </div>
    </div>
  );
}
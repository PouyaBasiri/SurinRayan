"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getContactRequests,
  markContactRequestAsRead,
  replyToContactRequest,
  ContactRequestDto,
  PaginatedResult,
} from "@/lib/api";
import MessageFilters from "./MessageFilters";
import {
  Mail,
  MailOpen,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  X,
  Clock,
  User,
  Phone,
} from "lucide-react";

export function ContactMessagesManager() {
  const [data, setData] = useState<PaginatedResult<ContactRequestDto> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [selectedMessage, setSelectedMessage] = useState<ContactRequestDto | null>(null);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "replied">("all");

  // Modal Reply States
  const [replyText, setReplyText] = useState<string>("");
  const [sendingReply, setSendingReply] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // 1. هندلر تغییر کلمه جستجو (صفحه به 1 ریست می‌شود)
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  // 2. هندلر تغییر تب (صفحه به 1 ریست می‌شود)
  const handleTabChange = (tab: "all" | "unread" | "replied") => {
    setActiveTab(tab);
    setPage(1);
  };

  // 3. Debounce فقط برای به‌روزرسانی مقدار debouncedSearch استفاده می‌شود
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 4. تابع دریافت اطلاعات با برطرف شدن مشکل setState همزمان
  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setAlert(null);

    let isRead: boolean | undefined = undefined;
    let isReplied: boolean | undefined = undefined;

    if (activeTab === "unread") {
      isRead = false;
    } else if (activeTab === "replied") {
      isReplied = true;
    }

    try {
      const result = await getContactRequests(
        page,
        10,
        debouncedSearch,
        isRead,
        isReplied
      );

      if (result && Array.isArray(result.items)) {
        setData(result);
      } else {
        setData({
          items: [],
          totalCount: 0,
          pageIndex: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        });
        setAlert({ type: "error", text: "فرمت داده‌های دریافتی از سرور معتبر نیست." });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAlert({ type: "error", text: err.message || "خطا در ارتباط با سرور" });
      } else {
        setAlert({ type: "error", text: "یک خطای ناشناخته رخ داد." });
      }
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, activeTab]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // باز کردن پیام و Optimistic Update
  const handleOpenMessage = async (msg: ContactRequestDto) => {
    setSelectedMessage(msg);
    setReplyText("");

    if (!msg.isRead) {
      setData((prevData) => {
        if (!prevData) return null;
        return {
          ...prevData,
          items: prevData.items.map((item) =>
            item.id === msg.id ? { ...item, isRead: true } : item
          ),
        };
      });

      try {
        await markContactRequestAsRead(msg.id);
      } catch {
        setData((prevData) => {
          if (!prevData) return null;
          return {
            ...prevData,
            items: prevData.items.map((item) =>
              item.id === msg.id ? { ...item, isRead: false } : item
            ),
          };
        });
      }
    }
  };

  // ارسال پاسخ ایمیل
  const handleSendReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    setSendingReply(true);
    setAlert(null);

    try {
      await replyToContactRequest(selectedMessage.id, replyText);
      setAlert({ type: "success", text: "پاسخ با موفقیت ثبت/ارسال شد." });
      setReplyText("");
      setTimeout(() => {
        setSelectedMessage(null);
        fetchMessages();
      }, 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAlert({ type: "error", text: err.message });
      }
    } finally {
      setSendingReply(false);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">مدیریت پیام‌های تماس</h1>
            <p className="text-slate-500 text-sm mt-1">
              پیام‌های دریافتی از فرم تماس با ما را بررسی، جستجو و پاسخ دهید.
            </p>
          </div>
        </div>

        {/* Global Alert */}
        {alert && (
          <div
            className={`p-4 rounded-xl flex items-center gap-3 text-sm ${
              alert.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            {alert.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
            )}
            <span>{alert.text}</span>
          </div>
        )}

        {/* Message Filters Component */}
        <MessageFilters
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Messages Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center p-12 text-slate-500 gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              <span>در حال بارگذاری پیام‌ها...</span>
            </div>
          ) : !data || data.items.length === 0 ? (
            <div className="p-12 text-center text-slate-500">هیچ پیامی یافت نشد.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="p-4">وضعیت</th>
                    <th className="p-4">فرستنده</th>
                    <th className="p-4">موضوع</th>
                    <th className="p-4">تاریخ ارسال</th>
                    <th className="p-4">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.items.map((msg) => (
                    <tr
                      key={msg.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        !msg.isRead ? "bg-blue-50/30 font-medium" : ""
                      }`}
                    >
                      <td className="p-4">
                        {msg.isRead ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                            <MailOpen className="h-3.5 w-3.5" /> خوانده شده
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full font-semibold">
                            <Mail className="h-3.5 w-3.5" /> جدید
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-slate-900">{msg.fullName}</td>
                      <td className="p-4 text-slate-700 max-w-xs truncate">{msg.subject}</td>
                      <td className="p-4 text-slate-500 text-xs">
                        {msg.createdAtUtc && !msg.createdAtUtc.startsWith("0001")
                         ? new Date(msg.createdAtUtc).toLocaleDateString("fa-IR")
                         : "نامشخص"}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleOpenMessage(msg)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors"
                        >
                          مشاهده و پاسخ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-slate-50 text-sm">
              <span className="text-slate-500 text-xs">
                صفحه {data.pageIndex} از {data.totalPages} (مجموع: {data.totalCount} پیام)
              </span>
              <div className="flex gap-2">
                <button
                  disabled={!data.hasPreviousPage}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className="p-2 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-white transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  disabled={!data.hasNextPage}
                  onClick={() => setPage((p) => p + 1)}
                  className="p-2 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-white transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal View/Reply */}
        {selectedMessage && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-xl border border-slate-100 space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-900">جزئیات پیام و ارسال پاسخ</h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl space-y-3 border border-slate-100">
                <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <User className="h-4 w-4 text-slate-400" />
                    <span><strong>نام:</strong> {selectedMessage.fullName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span><strong>ایمیل:</strong> {selectedMessage.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span><strong>تلفن:</strong> {selectedMessage.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span>
                      <strong>تاریخ:</strong>{" "}
                      {new Date(selectedMessage.createdAtUtc).toLocaleString("fa-IR")}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60">
                  <p className="text-xs font-semibold text-slate-500 mb-1">موضوع: {selectedMessage.subject}</p>
                  <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-700">
                  متن پاسخ ایمیلی به {selectedMessage.fullName}:
                </label>
                <textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="پاسخ خود را بنویسید..."
                  className="w-full rounded-2xl border border-slate-200 p-4 text-sm focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition-colors"
                >
                  انصراف
                </button>
                <button
                  disabled={sendingReply || !replyText.trim()}
                  onClick={handleSendReply}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 disabled:bg-slate-300 transition-colors shadow-sm"
                >
                  {sendingReply ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      در حال ارسال پاسخ...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      ارسال پاسخ ایمیلی
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
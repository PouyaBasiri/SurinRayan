const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5054/api";

// --- Types ---

export interface ContactFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

export interface ContactRequestDto {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface PaginatedResult<T> {
  items: T[];
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// --- Public APIs ---

// ۱. ارسال فرم تماس با ما (کاربر عادی)
export async function sendContactRequest(data: ContactFormData) {
  const response = await fetch(`${API_BASE_URL}/Contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("خطا در ارسال اطلاعات. لطفاً مجدداً تلاش کنید.");
  }

  return response.json();
}

// --- Admin Panel APIs ---

// ۲. دریافت لیست پیام‌ها با صفحه‌بندی (پنل مدیریت)
export async function getContactRequests(page: number = 1, pageSize: number = 10) {
  // 🔴 آدرس پورت بک‌اند دات‌نت خود را بررسی کنید (مثلاً 5000 یا 7000 یا 5123)
  const API_URL = `http://localhost:5054/api/ContactRequest?pageNumber=${page}&pageSize=${pageSize}`;

  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // در صورت وجود توکن لاگین:
      // "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
  });

  if (!response.ok) {
    throw new Error(`خطای سرور: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

// ۳. علامت‌گذاری پیام به عنوان خوانده‌شده (پنل مدیریت)
export async function markContactRequestAsRead(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/Contact/${id}/read`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("خطا در تغییر وضعیت پیام.");
  }
}

// ۴. ارسال پاسخ ایمیلی به پیام (پنل مدیریت)
export async function replyToContactRequest(id: string, replyMessage: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/ContactRequest/${id}/reply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(replyMessage),
  });

  if (!response.ok) {
    throw new Error("خطا در ارسال پاسخ ایمیلی.");
  }
}
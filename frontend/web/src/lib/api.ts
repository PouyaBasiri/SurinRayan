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
  const response = await fetch(`${API_BASE_URL}/ContactRequest`, {
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

function getAuthHeader(): Record<string, string> {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
}

// ۲. دریافت لیست پیام‌ها با صفحه‌بندی (پنل مدیریت)
export async function getContactRequests(page: number = 1, pageSize: number = 10) {
const response = await fetch(
    `http://localhost:5054/api/ContactRequest?pageNumber=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(), // 👈 ارسال توکن
      },
    }
  );

if (response.status === 401) {
    // اگر توکن منقضی شده بود، هدایت به لاگین
    if (typeof window !== "undefined") {
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    throw new Error("نشست شما منقضی شده است. لطفا مجددا وارد شوید.");
  }

  if (!response.ok) {
    throw new Error("خطا در دریافت اطلاعات از سرور");
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

export async function loginAdmin(credentials: { email: string; password: string }) {
  const response = await fetch("http://localhost:5054/api/Auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "نام کاربری یا رمز عبور نادرست است.");
  }

  return await response.json(); // خروجی متناسب: { token: "..." }
}
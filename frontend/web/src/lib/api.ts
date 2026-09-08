const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

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

// 1. Submitting the "Contact Us" form (Standard User)
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

// 2. Retrieve paginated list of messages (Admin panel)
export async function getContactRequests(page: number = 1, pageSize: number = 10) {
const response = await fetch(
    `http://localhost:5000/api/ContactRequest?pageNumber=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(), // 👈 Send token
      },
    }
  );

if (response.status === 401) {
    // Redirect to login if the token has expired.
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

// 3. Mark message as read (Admin panel)
export async function markContactRequestAsRead(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/Contact/${id}/read`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("خطا در تغییر وضعیت پیام.");
  }
}

// 4. Send email reply to message (Admin panel)
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
  const response = await fetch("http://localhost:5000/api/Auth/login", {
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

  return await response.json(); 
}
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
  IsReplied: boolean;
  createdAt: string;
  createdAtUtc: string;
}

export interface PaginatedResult<T> {
  items: T[];
  pageIndex?: number;
  pageNumber?: number;
  pageSize: number;
  totalPages?: number;
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
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getContactRequests(
  pageNumber: number = 1,
  pageSize: number = 10,
  searchTerm?: string,
  isRead?: boolean,
  isReplied?: boolean
): Promise<PaginatedResult<ContactRequestDto>> {
  const hasSearchOrFilter =
    Boolean(searchTerm && searchTerm.trim() !== "") ||
    typeof isRead === "boolean" ||
    typeof isReplied === "boolean";

  const params = new URLSearchParams();
  params.append("pageNumber", pageNumber.toString());
  params.append("pageSize", pageSize.toString());

  let targetUrl = "";

  if (hasSearchOrFilter) {
    // مسیر سرچ و فیلتر
    targetUrl = `${BASE_URL}/api/Messages`;

    if (searchTerm && searchTerm.trim() !== "") {
      params.append("searchTerm", searchTerm.trim());
    }
    if (typeof isRead === "boolean") {
      params.append("isRead", isRead.toString());
    }
    if (typeof isReplied === "boolean") {
      params.append("isReplied", isReplied.toString());
    }
  } else {
    // مسیر عمومی دریافت پیام‌ها
    targetUrl = `${BASE_URL}/api/ContactRequest`;
  }

  const response = await fetch(`${targetUrl}?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`خطای سرور (${response.status}): ${errorText || "عدم پاسخگویی سرویس"}`);
  }
    const result = await response.json();

  return {
  ...result,
  pageIndex: result.pageIndex ?? result.pageNumber ?? 1,
  totalPages: result.totalPages ?? Math.ceil(result.totalCount / result.pageSize),
};
  
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
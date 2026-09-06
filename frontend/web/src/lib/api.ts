const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5054/api";

export interface ContactFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

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
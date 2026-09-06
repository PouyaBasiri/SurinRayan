import type { Metadata } from "next";
import { ContactMessagesManager } from "@/components/admin/ContactMessagesManager";

export const metadata: Metadata = {
  title: "پنل مدیریت | پیام‌های دریافتی",
  robots: { index: false, follow: false },
};

export default function AdminMessagesPage() {
  return <ContactMessagesManager />;
}
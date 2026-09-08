# 🚀 SurinRayan - Admin Panel & Contact Management System

سیستم مدیریت پیام‌ها و پنل ادمین سورین رایان، توسعه داده شده با معماری مدرن وب شامل بک‌اند .NET 8 و فرانت‌اند Next.js 15.

---

## 🛠 تکنولوژی‌های استفاده شده (Tech Stack)

### Backend (.NET 10)
- **Framework:** ASP.NET Core Web API (.NET 8)
- **Authentication:** JWT Bearer Token Validation
- **Architecture:** Clean Architecture / CQRS Ready
- **Email Service:** MailKit & MimeKit (SMTP Integration)

### Frontend (Next.js)
- **Framework:** Next.js (App Router) & React 19
- **Styling:** Tailwind CSS & Lucide Icons
- **Security:** Middleware-based Route Protection & Cookie/JWT Management

---

## 🔑 ویژگی‌های کلیدی (Features)

- [x] **سیستم احراز هویت (Auth):** ورود امن با JWT Token و قابلیت Logout.
- [x] **محافظت از روت‌ها:** استفاده از Next.js Middleware جهت بستن دسترسی‌های غیرمجاز به مسیرهای `/admin/*`.
- [x] **مدیریت پیام‌ها:** مشاهده پیام‌های دریافتی، فیلتر کردن بر اساس وضعیت و پاسخ به کاربران.
- [x] **ارسال پاسخ (Email/Database):** قابلیت ذخیره پاسخ در دیتابیس و ارسال ایمیل پاسخ به کاربر.

---

## 🚀 راه اندازی پروژه (Getting Started)

### 1. اجرای بک‌اند (.NET 10)
```bash
cd backend
dotnet restore
dotnet run
http://localhost:5054
```

### ### 2. اجرای فرانت‌اند (Next.js)
```bash
cd frontend
npm install
npm run dev

http://localhost:3000
```
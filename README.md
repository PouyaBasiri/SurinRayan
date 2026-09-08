# 🚀 SurinRayan — Admin Dashboard & Contact Management System

A modern full-stack web application designed for managing incoming customer support requests and administrative management, built with a **.NET 8 Web API** backend and a **Next.js 15 (App Router)** frontend.

---

## 🛠 Tech Stack

### Backend (.NET 10)
- **Framework:** ASP.NET Core Web API (.NET 10)
- **Authentication & Security:** JWT Bearer Token, Claim-based authorization
- **Architecture:** Clean Layered Architecture / DTO Patterns
- **Services:** Protocol Buffers / gRPC support, MailKit/MimeKit integration

### Frontend (Next.js 15)
- **Framework:** Next.js 15 (App Router) & React 19
- **Styling:** Tailwind CSS, Lucide Icons
- **State & Auth:** JWT Decode, Secure Cookie/Storage Management, Middleware Route Guarding

---

## ✨ Key Features

- 🔐 **JWT Authentication System:** Secure admin login flow with token generation, decoding, and cookie/local storage persistence.
- 🛡️ **Protected Route Guards:** Client-side and server-side route protection using Next.js `middleware.ts` for all `/admin/*` routes.
- 💬 **Contact Request Management:** View, filter, and review incoming user messages in an intuitive admin panel.
- 📬 **Database Persistence & Email Handler:** Flexible reply system designed to persist admin responses in the database with optional email transmission handlers.
- 🎨 **Responsive Admin UI:** Custom sidebar navigation with active path highlighting, dynamic user profile presentation, and hydration-safe rendering.

---

## 📁 Repository Structure

```text
SurinRayan/
├── backend/          # .NET 8 Web API Solution
│   ├── Controllers/  # Auth & ContactRequest Controllers
│   ├── DTOs/         # Request & Response Data Transfer Objects
│   ├── Services/     # JWT Generator & Business Logic Services
│   └── Program.cs    # Middleware Configuration & Dependency Injection
│
├── frontend/         # Next.js 15 Application
│   ├── src/
│   │   ├── app/      # App Router Pages (/admin, /login)
│   │   ├── components# Admin Layout, Sidebar, UI Modules
│   │   ├── lib/      # API Handlers & HTTP Clients
│   │   └── middleware.ts # Route Protection Guard
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### 1.‌ .NET 10
```bash
cd backend
dotnet restore
dotnet run

URL:http://localhost:5054
```

### 2. Next.js
```bash
cd frontend
npm install
npm run dev

URL:http://localhost:3000
```

## 🔑 Demo Access Credentials
To test the admin panel out of the box:

Login Route: /login

Email: admin@surinrayan.ir

Password: admin123
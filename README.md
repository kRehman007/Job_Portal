# JobLink — Job Portal

A full-stack job portal built on the **PERN** stack (PostgreSQL, Express, React, Node.js) with TypeScript, Prisma, and Material UI. It drives a complete **Job Seeker ↔ Employer** hiring flow — from posting and discovering jobs to applying, reviewing, and approving/rejecting applications.

---

## ✨ Key Features

### 🎯 For Job Seekers

- Responsive job board with rich **job detail** pages
- **One-click apply** with instant status feedback
- Save **favourite jobs** to revisit later
- **Application dashboard** tracking every role with **Pending / Accepted / Rejected** statuses
- Full profile management: tagline, bio, experience, skills, and **PDF resume**
- **View Resume** (inline preview) or **Download Resume**

### 🏢 For Employers

- Post jobs with title, description, location, salary, experience, skills, and a **company logo**
- **Employer dashboard** showing total posted jobs and **aggregated applicant count**
- Review all applicants and open candidate profiles + **resumes**
- **Approve / reject** applications, automatically notifying the candidate by email

### ⚙️ Platform-wide

- **Role-based authentication** (Job Seeker / Employer) via **JWT** in httpOnly cookies, password hashing with **bcrypt**
- Protected routes and guards on both client and server
- **Email notifications** (Nodemailer) on apply, accept, and reject
- **PDF-only resume uploads** validated on the frontend (Zod) and backend (Multer)
- Responsive UI built with **Material UI**

---

## 🧱 Tech Stack

| Layer        | Technology                                                                 |
| ------------ | -------------------------------------------------------------------------- |
| Frontend     | React, TypeScript, Vite, Redux Toolkit + RTK Query, Material UI, React Router, React Hook Form + Zod |
| Backend      | Node.js, Express, Prisma ORM                                               |
| Database     | PostgreSQL                                                                 |
| Auth         | JWT (httpOnly cookie), bcryptjs                                            |
| File Upload  | Multer (local disk storage)                                                |
| Email        | Nodemailer                                                                 |
| Caching      | Redis                                                                      |

---

## 📁 Project Structure

```
Job_Portal_PERN
├── backend/
│   ├── prisma/                  # Prisma schema & migrations
│   └── src/
│       ├── config/              # Multer, Redis, Prisma client wiring
│       ├── controllers/         # User & Job business logic
│       ├── middlewares/         # Auth guards
│       ├── routes/              # Express route definitions
│       ├── utils/               # Email, token helpers
│       └── index.ts             # App entry point
├── frontend/
│   └── src/
│       ├── JOB_SEEKER/          # Sidebar, pages, components, Redux slices
│       ├── EMPLOYER/            # Employer pages & components
│       ├── utils/               # Axios instance, resume helpers
│       └── App.tsx              # Routes & providers
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- PostgreSQL
- (Optional) Redis for caching

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env     # configure DATABASE_URL, JWT_SECRET, etc.
npx prisma migrate dev   # create the database schema
npm run dev              # API server → http://localhost:5001
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev              # Vite dev server → http://localhost:5173
```

---

## 👤 Default Credentials / Demo

> Registration is open to everyone for both **Job Seeker** and **Employer** roles.

- Sign up as an **Employer**, post a job, upload a company logo.
- Sign up as a **Job Seeker**, complete your profile (with a PDF resume), and apply.
- As an **Employer**, open the job's applicants, view profiles/resumes, and approve or reject.

---

## 🔑 Scripts

| Directory  | Command        | Description                            |
| ---------- | -------------- | -------------------------------------- |
| backend    | `npm run dev`    | Run API with hot reload                |
| backend    | `npm run build`  | Compile TypeScript to `dist/`          |
| backend    | `npm start`      | Run the compiled server                |
| frontend   | `npm run dev`    | Run Vite dev server                    |
| frontend   | `npm run build`  | Production build                        |

---

## 🎯 Highlights

- End-to-end **two-role** hiring loop (Seeker → Employer) with application status tracking
- **Automatic emails** when applications are submitted, approved, or rejected
- Reliable **PDF resume handling** — inline preview in a new tab and a dedicated force-download endpoint, with automatic cleanup of replaced files
- TypeScript end-to-end with a clean, structured codebase
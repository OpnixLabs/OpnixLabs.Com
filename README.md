# OpnixLabs Full-Stack Showcase & Gemini AI Auto-Blogging System

A company showcase website with a dynamic blog engine and background auto-blogging cron job powered by Google Gemini AI.

## Stack Overview
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, TipTap WYSIWYG Editor.
- **Backend (API & Cron)**: Go (Chi Router, `robfig/cron/v3`, `google.golang.org/genai` official SDK).
- **Database & ORM**: PostgreSQL (hosted on Neon) managed by Drizzle ORM (`drizzle-orm/pg-core`).

---

## Project Folder Structure

```
OpnixLabs.Com/
├── backend/                  # Go REST API & Gemini AI Cron Engine
│   ├── config/
│   │   └── config.go         # Env variables loader
│   ├── cron/
│   │   └── gemini_cron.go    # robfig/cron + google.golang.org/genai weekly auto-blogger
│   ├── db/
│   │   └── db.go             # Neon PostgreSQL database initializer
│   ├── handlers/
│   │   └── posts.go          # GET /api/posts, GET /api/posts/{slug}, POST /api/posts
│   ├── utils/
│   │   └── slug.go           # Title slugification + Unix timestamp helper
│   ├── go.mod
│   ├── main.go               # Server initialization, CORS & Chi router
│   └── .env.example
│
├── frontend/                 # Next.js 14 Frontend Application
│   ├── drizzle.config.ts     # Drizzle ORM configuration for Neon Postgres
│   ├── package.json
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── src/
│       ├── app/
│       │   ├── page.tsx               # Home marketing landing page
│       │   ├── services/page.tsx      # Services page
│       │   ├── portfolio/page.tsx     # Portfolio showcase page
│       │   ├── about/page.tsx         # Company history & team page
│       │   ├── contact/page.tsx       # Contact form page
│       │   ├── blog/
│       │   │   ├── page.tsx           # Blog post grid (fetches Go API)
│       │   │   └── [slug]/page.tsx    # Dynamic blog post detail with SEO metadata
│       │   ├── admin/
│       │   │   └── create-post/page.tsx # Admin post creation with TipTap editor
│       │   ├── globals.css
│       │   └── layout.tsx             # Global layout with responsive Nav & Footer
│       ├── components/
│       │   ├── Navbar.tsx
│       │   ├── Footer.tsx
│       │   └── TiptapEditor.tsx       # TipTap WYSIWYG rich-text editor component
│       ├── db/
│       │   └── schema.ts              # Drizzle ORM PostgreSQL posts schema
│       └── lib/
│           └── api.ts                 # API client utilities (GET & POST)
```

---

## Getting Started

### 1. Configure Environment Variables
Copy `.env.example` to `.env` in both `backend` and `frontend` folders:

**`backend/.env`**:
```env
PORT=8080
DATABASE_URL=postgresql://user:password@ep-example-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
GEMINI_API_KEY=your_gemini_api_key
```

**`frontend/.env.local`**:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
DATABASE_URL=postgresql://user:password@ep-example-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 2. Run Go Backend API & Cron Scheduler
```bash
cd backend
go mod tidy
go run main.go
```
The Go server starts on `http://localhost:8080` and schedules the `@weekly` Gemini auto-blogging cron job.

### 3. Run Next.js Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## Key Feature Implementation Highlights

1. **Database Schema (`frontend/src/db/schema.ts`)**:
   Uses `drizzle-orm/pg-core` to define `posts` table with `id`, `title`, `slug` (unique), `content_html`, and `created_at`.
2. **Server-side Slug Generation (`backend/utils/slug.go`)**:
   Formats `title` to lowercase, replaces spaces with hyphens, and appends current Unix timestamp (e.g., `my-post-title-1691523423`).
3. **Gemini GenAI Auto-Blogging Cron Job (`backend/cron/gemini_cron.go`)**:
   Uses `robfig/cron/v3` and `google.golang.org/genai` to generate weekly tech news formatted in clean HTML and structured JSON, slugifying and saving directly to Neon Postgres.
4. **TipTap Admin Rich-Text Editor (`frontend/src/app/admin/create-post/page.tsx`)**:
   WYSIWYG editor component allowing authors to format titles, headers, code snippets, lists, and links, submitting HTML to `POST /api/posts`.

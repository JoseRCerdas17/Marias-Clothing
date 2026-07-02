# Maria's Clothing - Project Agents

## Project Structure

```
Marias-Clothing/
├── frontend/          # Next.js 15 (App Router) - React 19, TypeScript, Tailwind CSS 4
├── backend/           # FastAPI - Python, SQLAlchemy, SQLite (dev) / PostgreSQL (prod)
└── skills/           # Agent skills
```

## Developer Commands

### Frontend
```bash
cd frontend
npm run dev     # Development server on :3000
npm run build   # Production build
npm run lint    # ESLint
```

### Backend
```bash
cd backend
.\venv\Scripts\python main.py  # Run dev server on :8000
pip install -r requirements.txt
```

## Architecture Notes

### Frontend (Next.js 15 App Router)
- **Server Components**: Default for pages. Add `'use client'` only for interactivity
- **Key patterns**:
  - `loading.tsx` + `error.tsx` + `not-found.tsx` for route boundaries
  - `AnimatedSection` component in `src/components/` for scroll animations
  - `useInView` hook for intersection observer-based reveals
  - `Suspense` boundaries for client components using `useSearchParams`
- **Styling**: Tailwind CSS 4 with custom theme in `globals.css`
- **Icons**: Material Symbols (Outlined) via Google Fonts CDN - use `class="material-symbols-outlined"`
- **Images**: Use `next/image` with hosts configured in `next.config.ts`

### Backend (FastAPI)
- **ORM**: SQLAlchemy 2.0 with declarative base
- **Database**: SQLite for local dev, PostgreSQL for production (set `DATABASE_URL`)
- **CORS**: Enabled for all origins (configure before production)
- **Startup**: Auto-seeds sample products/categories on first run

## Common Issues & Fixes

- **`<a>` nested in `<a>`**: ProductCard WhatsApp button must be `<button>` with `window.open()`, not nested `<a>`
- **`useSearchParams` without Suspense**: Wrap in `<Suspense>` or Next.js build fails
- **Python 3.14 wheels**: Use `pydantic>=2.10` (has pre-built wheels for Python 3.14)
- **Image host not configured**: Add hostname to `next.config.ts` `images.remotePatterns`

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000  # Dev
NEXT_PUBLIC_API_URL=https://your-railway-app.up.railway.app  # Prod
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:pass@host:5432/db  # Production
# Local dev defaults to SQLite if not set
```

## Deployment

- **Frontend**: Vercel - connect GitHub repo, set `NEXT_PUBLIC_API_URL`
- **Backend**: Railway - set `DATABASE_URL` to PostgreSQL connection string

## Skills Available

Install with: `npx skills add <owner/repo@skill> -g -y`

- `vercel-labs/agent-skills@vercel-react-best-practices` - React/Next.js patterns
- `wshobson/agents@nextjs-app-router-patterns` - Next.js 14+ App Router patterns

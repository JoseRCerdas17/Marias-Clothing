# Maria's Clothing

Small catalog storefront for Maria's Clothing.

## Structure

- `frontend/` - Next.js storefront deployed to Vercel
- `backend/` - FastAPI catalog API deployed to Railway
- `ropa/` - Product image assets served by the backend
- `railway.toml` - Railway backend deployment configuration
- `DEPLOYMENT.md` - Production deployment checklist

## Local Development

Start the backend:

```powershell
cd backend
uvicorn app.main:app --reload
```

Start the frontend:

```powershell
cd frontend
npm run dev
```

The frontend expects the API URL in `frontend/.env.local`:

```text
NEXT_PUBLIC_API_URL=http://localhost:8000
```

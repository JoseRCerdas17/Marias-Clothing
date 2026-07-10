# Deployment

## Railway Backend

Create a Railway service from this GitHub repository.

Use these settings:

- Root directory: repository root, not `backend`
- Config file: `railway.toml`
- Start command: handled by `railway.toml`

Add a Railway PostgreSQL database and set this environment variable on the backend service:

```text
DATABASE_URL=<Railway PostgreSQL connection URL>
```

The backend serves product images from the repo-level `ropa` folder at:

```text
/product-images/<filename>
```

After deploy, copy the generated Railway backend URL, for example:

```text
https://your-backend.up.railway.app
```

## Vercel Frontend

Create a Vercel project from the same GitHub repository.

Use these settings:

- Framework preset: Next.js
- Root directory: `frontend`
- Build command: `npm run build`
- Install command: `npm install`
- Output directory: leave default

Set this Vercel environment variable:

```text
NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app
```

Replace `https://your-backend.up.railway.app` with your actual Railway backend URL.

Deploy Railway first, then Vercel.

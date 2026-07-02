<!-- BEGIN:nextjs-agent-rules -->
# Next.js 16 App Router - Important Differences

This version has breaking changes from older Next.js. Heed these:

## Critical Patterns

### 1. `useSearchParams()` requires Suspense
```tsx
// ❌ Wrong - will fail build
export default function Page() {
  const searchParams = useSearchParams();
  // ...
}

// ✅ Correct
export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <PageContent />
    </Suspense>
  );
}
```

### 2. Link vs Button for navigation
- Use `<Link>` for internal routes
- Use `<button>` with `window.open()` or `router.push()` for external links or actions

### 3. No nested `<a>` inside `<a>`
- ProductCard wraps in `<Link>` (renders `<a>`)
- WhatsApp buttons inside must be `<button>` with `onClick` + `window.open()`
- Favorite buttons must be `<button>`, not nested `<a>`

### 4. Image Configuration
Add image hosts to `next.config.ts`:
```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "lh3.googleusercontent.com" },
    // ... other hosts
  ]
}
```

### 5. Server vs Client Components
- Pages are Server Components by default
- Add `'use client'` only when using hooks, event handlers, or browser APIs
- Fetch data in Server Components, pass to Client Components as props

### 6. Metadata API
```tsx
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // ...
}
```

## Route Conventions
- `page.tsx` - Route UI
- `loading.tsx` - Loading UI (Suspense fallback)
- `error.tsx` - Error boundary
- `not-found.tsx` - 404 UI
- `layout.tsx` - Shared UI wrapper
- `route.ts` - API endpoint

## Available Components
- `src/components/AnimatedSection.tsx` - Scroll animations with IntersectionObserver
- `src/components/ProductCard.tsx` - Product grid card with hover effects
- `src/components/BottomNav.tsx` - Bottom tab navigation
- `src/components/Header.tsx` - Page header with back/cart
- `src/hooks/useInView.ts` - IntersectionObserver hook
<!-- END:nextjs-agent-rules -->

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full z-50 bg-surface-container-low/90 backdrop-blur-md h-16" />
      <main className="pt-16 pb-24">
        <div className="aspect-[3/4] bg-surface-container animate-pulse" />
        <div className="px-5 py-6 space-y-4">
          <div className="h-6 bg-surface-container rounded w-1/4 animate-pulse" />
          <div className="h-8 bg-surface-container rounded w-3/4 animate-pulse" />
          <div className="h-6 bg-surface-container rounded w-1/3 animate-pulse" />
          <div className="h-24 bg-surface-container rounded w-full animate-pulse" />
        </div>
      </main>
    </div>
  );
}

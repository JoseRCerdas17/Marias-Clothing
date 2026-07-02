export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full z-50 bg-surface-container-low/90 backdrop-blur-md h-16" />
      <main className="pt-20 pb-24 px-5 max-w-lg mx-auto">
        <div className="space-y-8 animate-pulse">
          <div className="text-center py-10">
            <div className="h-8 bg-surface-container rounded w-1/3 mx-auto mb-4" />
            <div className="h-4 bg-surface-container rounded w-1/2 mx-auto" />
          </div>
          <div className="space-y-4">
            <div className="h-20 bg-surface-container rounded-xl" />
            <div className="h-20 bg-surface-container rounded-xl" />
          </div>
          <div className="py-8 space-y-4">
            <div className="h-6 bg-surface-container rounded w-1/4" />
            <div className="h-12 bg-surface-container rounded-xl" />
            <div className="h-12 bg-surface-container rounded-xl" />
            <div className="h-24 bg-surface-container rounded-xl" />
            <div className="h-12 bg-surface-container rounded-xl" />
          </div>
        </div>
      </main>
    </div>
  );
}

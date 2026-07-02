export default function Loading() {
  return (
    <div className="pt-20 pb-24 px-5 max-w-lg mx-auto">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-surface-container rounded w-1/3 mx-auto" />
        <div className="text-center space-y-2">
          <div className="h-6 bg-surface-container rounded w-2/3 mx-auto" />
          <div className="h-4 bg-surface-container rounded w-1/2 mx-auto" />
        </div>

        <div className="space-y-4">
          <div className="h-16 bg-surface-container rounded-2xl" />
          <div className="h-16 bg-surface-container rounded-2xl" />
        </div>

        <div className="h-6 bg-surface-container rounded w-1/4" />

        <div className="space-y-4">
          <div className="h-12 bg-surface-container rounded-xl" />
          <div className="h-12 bg-surface-container rounded-xl" />
          <div className="h-24 bg-surface-container rounded-xl" />
          <div className="h-12 bg-surface-container rounded-xl" />
        </div>
      </div>
    </div>
  );
}

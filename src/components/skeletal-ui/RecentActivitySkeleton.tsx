function RecentActivitySkeleton() {
  return (
    <div className="bg-white p-6" style={{ borderRadius: 0 }}>
      <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
          >
            {/* Icon skeleton */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>

            {/* Content skeleton */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-baseline gap-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivitySkeleton


function StatsCardSkeleton() {
  return (
    <div className="relative bg-white p-6 flex flex-col gap-2 overflow-hidden" style={{ borderRadius: 0 }}>
      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
      
      {/* Icon placeholder */}
      <div className="pointer-events-none absolute -bottom-6 -right-6 opacity-20">
        <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}

export default StatsCardSkeleton


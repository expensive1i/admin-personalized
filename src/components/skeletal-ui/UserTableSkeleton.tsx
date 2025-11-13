function UserTableSkeleton() {
  return (
    <div className="bg-white" style={{ borderRadius: 0 }}>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-600">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-gray-400 border-b border-gray-100">
              <th className="py-4 px-4 text-left font-medium">#</th>
              <th className="py-4 px-4 text-left font-medium">Name</th>
              <th className="py-4 px-4 text-left font-medium">Account Number</th>
              <th className="py-4 px-4 text-left font-medium">Email</th>
              <th className="py-4 px-4 text-left font-medium">Registration Date</th>
              <th className="py-4 px-4 text-left font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="border-b border-gray-100 last:border-0">
                <td className="py-4 px-4 align-middle">
                  <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="py-4 px-4 align-middle">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="py-4 px-4 align-middle">
                  <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="py-4 px-4 align-middle">
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="py-4 px-4 align-middle">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="py-4 px-4 align-middle">
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-9 w-9 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-9 w-9 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-gray-100 bg-white px-4 py-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
            ))}
          </div>
          <div className="h-8 w-16 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default UserTableSkeleton


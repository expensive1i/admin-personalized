import { useMemo, useState, useEffect } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { EyeIcon, PencilEdit01Icon } from '@hugeicons/core-free-icons'
import { type UserRecord } from '../types/user'

export type { UserRecord }

interface UserTableProps {
  users: UserRecord[]
  pageSize?: number
  onViewUser?: (user: UserRecord) => void
}

const formatDate = (value: string) => {
  if (!value) return '—'
  const parsed = new Date(value)
  if (isNaN(parsed.getTime())) return '—'
  
  const now = new Date()
  const diffInMs = now.getTime() - parsed.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  // If less than 7 days ago, show relative time
  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
      return diffInMinutes <= 1 ? 'Just now' : `${diffInMinutes} minutes ago`
    }
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`
  } else if (diffInDays === 1) {
    return 'Yesterday'
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`
  }
  
  // Otherwise show formatted date
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(parsed)
}

function UserTable({ users, pageSize = 10, onViewUser }: UserTableProps) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(users.length / pageSize))

  // Reset to page 1 when users list changes significantly (e.g., after adding new user)
  useEffect(() => {
    // If we're on a page that doesn't exist anymore, go to page 1
    if (totalPages > 0 && page > totalPages) {
      setPage(1)
    }
  }, [users.length, totalPages, page])

  const handlePageChange = (nextPage: number) => {
    const clamped = Math.min(Math.max(nextPage, 1), totalPages)
    setPage(clamped)
  }

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * pageSize
    return users.slice(start, start + pageSize)
  }, [users, page, pageSize])

  const startRow = (page - 1) * pageSize + 1
  const endRow = startRow + paginatedUsers.length - 1

  return (
    <div className="bg-white" style={{ borderRadius: 0 }}>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-600">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-gray-400 border-b border-gray-100">
              <th className="py-4 px-4 text-left font-medium">#</th>
              <th className="py-4 px-4 text-left font-medium">Name</th>
              <th className="py-4 px-4 text-left font-medium">Account Number</th>
              <th className="py-4 px-4 text-left font-medium">Phone Number</th>
              <th className="py-4 px-4 text-left font-medium">Registration Date</th>
              <th className="py-4 px-4 text-left font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => {
              const rowNumber = startRow + index
              return (
                <tr key={user.id} className="border-b border-gray-100 last:border-0 hover:bg-red-50/30 transition-colors">
                  <td className="py-4 px-4 align-middle text-gray-400">{rowNumber.toString().padStart(2, '0')}</td>
                  <td className="py-4 px-4 align-middle font-medium text-gray-900">{user.name}</td>
                  <td className="py-4 px-4 align-middle font-mono text-gray-700">{user.accountNumber || '—'}</td>
                  <td className="py-4 px-4 align-middle text-gray-600">{user.email || '—'}</td>
                  <td className="py-4 px-4 align-middle text-gray-600">{formatDate(user.registrationDate)}</td>
                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        aria-label="View user"
                        title="View user details"
                        onClick={() => onViewUser?.(user)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors focus:outline-none focus-visible:outline-none active:outline-none"
                      >
                        <HugeiconsIcon icon={EyeIcon} className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="Edit user"
                        title="Edit user information"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors focus:outline-none focus-visible:outline-none active:outline-none"
                      >
                        <HugeiconsIcon icon={PencilEdit01Icon} className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-gray-100 bg-white px-4 py-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
        <span>
          Showing <strong className="text-gray-700">{startRow}</strong>-<strong className="text-gray-700">{endRow}</strong> of{' '}
          <strong className="text-gray-700">{users.length}</strong> users
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="inline-flex items-center rounded-full border border-red-100 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:outline-none active:outline-none"
          >
            Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => handlePageChange(pageNumber)}
                className={`h-8 w-8 rounded-full text-xs font-semibold transition-colors focus:outline-none focus-visible:outline-none active:outline-none ${
                  pageNumber === page ? 'bg-red-500 text-white' : 'border border-red-100 bg-white text-gray-700 hover:bg-red-50'
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="inline-flex items-center rounded-full border border-red-100 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:outline-none active:outline-none"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserTable

import { useEffect, useMemo, useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { type ApiUser } from '../types/user'

interface SideModalProps {
  isOpen: boolean
  onClose: () => void
  user: ApiUser | null
  loading?: boolean
}

function SideModal({ isOpen, onClose, user, loading = false }: SideModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const formatRelativeTime = (dateString?: string | null) => {
    if (!dateString) return '—'
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return '—'

    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`
    }
    if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`
    }
    if (diffInMinutes > 0) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`
    }
    return 'Just now'
  }

  const userActivities = useMemo(() => {
    if (!user) return []

    const activities: Array<{
      id: string
      title: string
      description: string
      amount: number
      status: string
      kind: 'transaction' | 'bill'
      direction?: 'credit' | 'debit'
      timestamp: string | null
    }> = []

    user.transactions?.forEach((transaction) => {
      activities.push({
        id: `txn-${transaction.id}`,
        title: transaction.receiverName || 'Transaction',
        description: `${transaction.transactionType === 'credit' ? 'Credit' : 'Debit'} • ${transaction.reference}`,
        amount: transaction.amount,
        status: transaction.status || 'pending',
        kind: 'transaction',
        direction: transaction.transactionType === 'credit' ? 'credit' : 'debit',
        timestamp: transaction.transactionDate || transaction.createdAt || null,
      })
    })

    user.billPayments?.forEach((payment) => {
      activities.push({
        id: `bill-${payment.id}`,
        title: `${payment.paymentType?.toUpperCase() || 'Bill'} • ${payment.provider || 'Provider'}`,
        description: `Reference • ${payment.reference}`,
        amount: payment.amount,
        status: payment.status || 'pending',
        kind: 'bill',
        timestamp: payment.paymentDate || payment.createdAt || null,
      })
    })

    activities.sort((a, b) => {
      const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0
      const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0
      return timeB - timeA
    })

    return activities.slice(0, 6)
  }, [user])

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure element is mounted before animating
      const timer = setTimeout(() => {
        setIsAnimating(true)
      }, 10)
      return () => clearTimeout(timer)
    } else {
      setIsAnimating(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-[#E3000F]/50 z-40 transition-opacity duration-500 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Side modal */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-1/2 bg-white z-50 overflow-y-auto transform transition-all duration-500 ease-in-out ${
          isAnimating && isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">User Details</h2>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-600 hover:text-gray-900 transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <HugeiconsIcon icon={Cancel01Icon} className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-5 space-y-4">
            {loading ? (
              <>
                {/* Profile Section Skeleton */}
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Account Balance Skeleton */}
                <div className="space-y-2">
                  <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="bg-gray-200 rounded-lg p-4 space-y-2 animate-pulse">
                    <div className="h-3 w-20 bg-gray-300 rounded"></div>
                    <div className="h-8 w-40 bg-gray-300 rounded"></div>
                    <div className="h-3 w-24 bg-gray-300 rounded"></div>
                  </div>
                </div>

                {/* Account Information Skeleton */}
                <div className="space-y-2">
                  <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
                  <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="p-3 flex justify-between items-center">
                        <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Accounts Skeleton */}
                <div className="space-y-2">
                  <div className="h-3 w-28 bg-gray-200 rounded animate-pulse"></div>
                  <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
                    {[1, 2].map((i) => (
                      <div key={i} className="p-3 flex justify-between items-center">
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity Skeleton */}
                <div className="space-y-2">
                  <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="h-3 w-48 bg-gray-200 rounded animate-pulse mx-auto"></div>
                  </div>
                </div>
              </>
            ) : user ? (
              <>
                {/* Profile Section */}
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className="h-12 w-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-700 text-base font-semibold">
                    {user.customerName.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{user.customerName}</h3>
                    <p className="text-xs text-gray-500">{user.phoneNumber}</p>
                  </div>
                </div>

                {/* Account Balance */}
                {user.accounts && user.accounts.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Account Balance</h4>
                    
                    <div className="bg-gradient-to-br from-red-700 to-red-800 rounded-lg p-4 text-white">
                      <p className="text-xs opacity-90 mb-1">Total Balance</p>
                      <p className="text-2xl font-medium">
                        ₦{user.accounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs opacity-75 mt-2">
                        {user.accounts.length} account{user.accounts.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                )}

                {/* Account Details */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Account Information</h4>
                  
                  <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
                    <div className="p-3 flex justify-between items-center">
                      <span className="text-xs text-gray-600">Account Number</span>
                      <span className="text-xs font-mono font-medium text-gray-900">{user.accountNumber}</span>
                    </div>
                    
                    <div className="p-3 flex justify-between items-center">
                      <span className="text-xs text-gray-600">Phone Number</span>
                      <span className="text-xs font-medium text-gray-900">{user.phoneNumber}</span>
                    </div>

                    <div className="p-3 flex justify-between items-center">
                      <span className="text-xs text-gray-600">Bank Name</span>
                      <span className="text-xs font-medium text-gray-900">{user.bankName || 'N/A'}</span>
                    </div>

                    {user.createdAt && (
                      <div className="p-3 flex justify-between items-center">
                        <span className="text-xs text-gray-600">Registration Date</span>
                        <span className="text-xs font-medium text-gray-900">
                          {new Intl.DateTimeFormat('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          }).format(new Date(user.createdAt))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Accounts List */}
                {user.accounts && user.accounts.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">All Accounts</h4>
                    
                    <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
                      {user.accounts.map((account, index) => (
                        <div key={account.id || index} className="p-3 flex justify-between items-center">
                          <div className="flex-1">
                            <p className="text-xs font-mono font-medium text-gray-900">{account.accountNumber}</p>
                            <p className="text-xs text-gray-500">{account.bankName || 'N/A'}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-semibold text-gray-900">
                              ₦{account.balance.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className="text-xs text-gray-500">{account.currency}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Activity */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Recent Activity</h4>
                  {userActivities.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-4 text-center text-gray-500">
                      <p className="text-xs">No recent activity to display</p>
                    </div>
                  ) : (
                    <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
                      {userActivities.map((activity) => {
                        const amountFormatted = `${activity.direction === 'debit' ? '-' : ''}₦${activity.amount.toLocaleString('en-NG', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                        const amountColor =
                          activity.direction === 'credit'
                            ? 'text-green-600'
                            : activity.direction === 'debit'
                              ? 'text-red-500'
                              : 'text-gray-800'

                        return (
                          <div key={activity.id} className="flex items-start justify-between gap-4 p-3">
                            <div className="space-y-1">
                              <p className="text-xs font-semibold text-gray-900">{activity.title}</p>
                              <p className="text-[11px] text-gray-500">{activity.description}</p>
                              <p className="text-[11px] text-gray-400">{formatRelativeTime(activity.timestamp)}</p>
                            </div>
                            <div className="text-right space-y-1">
                              <p className={`text-xs font-semibold ${amountColor}`}>{amountFormatted}</p>
                              <p className="text-[11px] uppercase tracking-wide text-gray-400">{activity.status}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default SideModal

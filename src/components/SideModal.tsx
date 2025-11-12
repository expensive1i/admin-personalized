import { useEffect, useState } from 'react'
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
              <div className="flex items-center justify-center py-12">
                <p className="text-sm text-gray-500">Loading user details...</p>
              </div>
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
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center text-gray-500">
                    <p className="text-xs">No recent activity to display</p>
                  </div>
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

import { useState, useEffect } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { createUser } from '../services/userService'
import type { CreateUserRequest } from '../types/user'

interface AddUserModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

function AddUserModal({ isOpen, onClose, onSuccess }: AddUserModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<CreateUserRequest>({
    phoneNumber: '',
    customerName: '',
    bankName: 'Zenith Bank',
  })

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure element is mounted before animating
      const timer = setTimeout(() => {
        setIsAnimating(true)
      }, 10)
      return () => clearTimeout(timer)
    } else {
      setIsAnimating(false)
      // Reset form when modal closes
      setFormData({
        phoneNumber: '',
        customerName: '',
        bankName: 'Zenith Bank',
      })
      setError(null)
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await createUser(formData)
      // Reset form
      setFormData({
        phoneNumber: '',
        customerName: '',
        bankName: 'Zenith Bank',
      })
      // Call success callback
      if (onSuccess) {
        onSuccess()
      }
      // Close modal
      onClose()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user'
      setError(errorMessage)
      console.error('Error creating user:', err)
    } finally {
      setLoading(false)
    }
  }

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
            <h2 className="text-base font-semibold text-gray-900">Add New User</h2>
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
          <div className="flex-1 p-5">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 px-4 py-3" style={{ borderRadius: 0 }}>
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="+2348012345678"
                  className="w-full px-4 py-2.5 border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#E3000F] focus:border-[#E3000F] transition-colors"
                  style={{ borderRadius: 0 }}
                  disabled={loading}
                />
              </div>

              {/* Customer Name */}
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Name
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                  placeholder="John Adebayo"
                  className="w-full px-4 py-2.5 border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#E3000F] focus:border-[#E3000F] transition-colors"
                  style={{ borderRadius: 0 }}
                  disabled={loading}
                />
              </div>

              {/* Bank Name */}
              <div>
                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  required
                  placeholder="Zenith Bank"
                  className="w-full px-4 py-2.5 border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#E3000F] focus:border-[#E3000F] transition-colors"
                  style={{ borderRadius: 0 }}
                  disabled={loading}
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="px-6 py-2.5 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderRadius: 0 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-[#E3000F] text-white hover:bg-[#C2000D] transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderRadius: 0 }}
                >
                  {loading ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddUserModal

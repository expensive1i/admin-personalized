import { useState, useEffect } from 'react'
import TopBar from '../components/TopBar'
import UserTable from '../components/UserTable'
import UserTableSkeleton from '../components/skeletal-ui/UserTableSkeleton'
import SideModal from '../components/SideModal'
import ErrorDisplay from '../components/ErrorDisplay'
import { getAllUsers, getUserById } from '../services/userService'
import { type UserRecord, type ApiUser } from '../types/user'
import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon } from '@hugeicons/core-free-icons'

function UsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<ApiUser | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadingUserDetails, setLoadingUserDetails] = useState(false)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedUsers = await getAllUsers()
      setUsers(fetchedUsers)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users'
      setError(errorMessage)
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleViewUser = async (user: UserRecord) => {
    try {
      setLoadingUserDetails(true)
      setIsModalOpen(true)
      const userDetails = await getUserById(user.id)
      setSelectedUser(userDetails)
    } catch (err) {
      console.error('Error fetching user details:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch user details')
      setIsModalOpen(false)
    } finally {
      setLoadingUserDetails(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedUser(null), 300)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        title="Users"
        titleClassName="text-white text-lg font-semibold"
        backgroundClassName="bg-[#E3000F]"
        paddingClasses="pt-4 pb-3"
      />

      <div className="px-5 pt-10 pb-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-base text-gray-600">View, manage, and monitor all registered user accounts on the platform.</p>
          <button
            className="bg-[#E3000F] text-white px-6 py-2.5 flex items-center gap-2 hover:bg-[#C2000D] transition-colors font-medium text-sm"
            style={{ borderRadius: 0 }}
          >
            <HugeiconsIcon icon={Add01Icon} className="w-5 h-5" />
            <span>Add User</span>
          </button>
        </div>

        <section>
          {loading && <UserTableSkeleton />}
          {error && !loading && (
            <ErrorDisplay error={error} onRetry={fetchUsers} />
          )}
          {!loading && !error && (
            <UserTable users={users} onViewUser={handleViewUser} />
          )}
        </section>
      </div>

      <SideModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
        loading={loadingUserDetails}
      />
    </div>
  )
}
  
export default UsersPage

import { HugeiconsIcon } from '@hugeicons/react'
import { 
  UserIcon, 
  Notification01Icon,
  TransactionHistoryIcon
} from '@hugeicons/core-free-icons'

export interface ActivityItem {
  id: string
  type: 'transaction' | 'user' | 'ticket'
  title: string
  description: string
  amount: string | null
  time: string
  status: 'completed' | 'pending'
}

interface RecentActivityProps {
  activities?: ActivityItem[]
  maxItems?: number
}

function RecentActivity({ activities = [], maxItems = 5 }: RecentActivityProps) {
  const displayActivities = activities.slice(0, maxItems)

  const getIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return TransactionHistoryIcon
      case 'user':
        return UserIcon
      case 'ticket':
        return Notification01Icon
      default:
        return TransactionHistoryIcon
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case 'transaction':
        return 'text-gray-600'
      case 'user':
        return 'text-gray-600'
      case 'ticket':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusColor = (status: string) => {
    return status === 'completed' ? 'text-gray-500' : 'text-red-600'
  }

  if (displayActivities.length === 0) {
    return (
      <div className="bg-white p-6" style={{ borderRadius: 0 }}>
        <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No recent activity to display</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6" style={{ borderRadius: 0 }}>
      <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {displayActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
          >
            {/* Icon */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center ${getIconColor(activity.type)}`}>
              <HugeiconsIcon icon={getIcon(activity.type)} className="w-5 h-5" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                {activity.amount && (
                  <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">{activity.amount}</p>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-gray-500">{activity.description}</p>
                <span className="text-xs text-gray-400">•</span>
                <span className={`text-xs ${getStatusColor(activity.status)}`}>
                  {activity.status === 'completed' ? 'Completed' : 'Pending'}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity


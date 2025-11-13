import apiRequest from './api'
import { ENDPOINTS } from './endpoints'
import type { GetUsersResponse, Transaction, BillPayment } from '../types/user'
import type { ActivityItem } from '../components/RecentActivity'

type ActivityWithDate = ActivityItem & { _date: number }

/**
 * Format date to relative time (e.g., "2 hours ago", "3 days ago")
 */
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInSeconds = Math.floor(diffInMs / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInDays > 0) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`
  } else if (diffInHours > 0) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`
  } else {
    return 'Just now'
  }
}

/**
 * Format currency amount
 */
function formatCurrency(amount: number): string {
  return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

/**
 * Get recent activities from the API
 */
export async function getRecentActivities(maxItems: number = 10): Promise<ActivityItem[]> {
  try {
    const response = await apiRequest<GetUsersResponse>(ENDPOINTS.USERS.GET_ALL, {
      method: 'GET',
    })

    const users = response.data.users
    const activities: ActivityWithDate[] = []

    // Process transactions from all users
    users.forEach((user) => {
      user.transactions?.forEach((transaction: Transaction) => {
        const isCredit = transaction.transactionType === 'credit'
        const title = isCredit ? 'Payment Received' : 'Payment Sent'
        const description = isCredit 
          ? `From ${transaction.receiverName}` 
          : `To ${transaction.receiverName}`
        const date = transaction.transactionDate || transaction.createdAt || new Date().toISOString()
        
        activities.push({
          id: `txn-${transaction.id}`,
          type: 'transaction',
          title,
          description,
          amount: formatCurrency(transaction.amount),
          time: formatRelativeTime(date),
          status: transaction.status === 'success' ? 'completed' : 'pending',
          _date: new Date(date).getTime(), // Store timestamp for sorting
        })
      })

      // Process bill payments
      user.billPayments?.forEach((payment: BillPayment) => {
        const paymentTypeLabel = payment.paymentType.charAt(0).toUpperCase() + payment.paymentType.slice(1)
        const date = payment.paymentDate || payment.createdAt || new Date().toISOString()
        
        activities.push({
          id: `bill-${payment.id}`,
          type: 'ticket',
          title: `${paymentTypeLabel} Payment`,
          description: `${payment.provider} - ${payment.reference}`,
          amount: formatCurrency(payment.amount),
          time: formatRelativeTime(date),
          status: payment.status === 'success' ? 'completed' : 'pending',
          _date: new Date(date).getTime(), // Store timestamp for sorting
        })
      })

      // Process user registrations (new users)
      if (user.createdAt) {
        activities.push({
          id: `user-${user.id}`,
          type: 'user',
          title: 'New User Registration',
          description: `${user.customerName} registered`,
          amount: null,
          time: formatRelativeTime(user.createdAt),
          status: 'completed',
          _date: new Date(user.createdAt).getTime(), // Store timestamp for sorting
        })
      }
    })

    // Sort by date (most recent first) and remove the temporary _date property
    activities.sort((a, b) => b._date - a._date) // Descending order (newest first)

    // Remove the temporary _date property
    const cleanedActivities = activities.map(({ _date, ...activity }) => activity)

    // Return the most recent items
    return cleanedActivities.slice(0, maxItems)
  } catch (error) {
    console.error('Error fetching recent activities:', error)
    return []
  }
}


import apiRequest from './api'
import { ENDPOINTS } from './endpoints'
import type { GetUsersResponse } from '../types/user'

export interface DashboardStats {
  totalUsers: number
  totalTransactions: number
  totalBalance: number
  totalActivities: number
}

/**
 * Get dashboard statistics from the API
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const response = await apiRequest<GetUsersResponse>(ENDPOINTS.USERS.GET_ALL, {
      method: 'GET',
    })

    const users = response.data.users

    // Calculate total users
    const totalUsers = users.length

    // Calculate total balance from all accounts
    const totalBalance = users.reduce((sum, user) => {
      const userBalance = user.accounts?.reduce((accSum, account) => {
        return accSum + (account.balance || 0)
      }, 0) || 0
      return sum + userBalance
    }, 0)

    // Calculate total transactions (sum of all transaction amounts)
    const totalTransactions = users.reduce((sum, user) => {
      const userTransactions = user.transactions?.reduce((txnSum, transaction) => {
        return txnSum + (transaction.amount || 0)
      }, 0) || 0
      return sum + userTransactions
    }, 0)

    const totalActivities = users.reduce((sum, user) => {
      const transactionsCount = user.transactions?.length || 0
      const billPaymentsCount = user.billPayments?.length || 0
      return sum + transactionsCount + billPaymentsCount
    }, 0)

    return {
      totalUsers,
      totalTransactions,
      totalBalance,
      totalActivities,
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    throw error
  }
}


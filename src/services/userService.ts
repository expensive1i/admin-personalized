import apiRequest from './api'
import { ENDPOINTS } from './endpoints'
import type { GetUsersResponse, UserRecord, ApiUser } from '../types/user'

/**
 * Get all users from the API
 */
export async function getAllUsers(): Promise<UserRecord[]> {
  try {
    const response = await apiRequest<GetUsersResponse>(ENDPOINTS.USERS.GET_ALL, {
      method: 'GET',
    })

    // Map API response to UserRecord format
    return response.data.users.map((user) => ({
      id: user.id.toString(),
      name: user.customerName,
      accountNumber: user.accountNumber,
      registrationDate: user.createdAt || user.updatedAt || new Date().toISOString(),
      email: user.phoneNumber, // Using phoneNumber as email since API doesn't provide email
      status: 'Active', // Default status, can be enhanced based on business logic
    }))
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

/**
 * Get user by ID with complete details
 */
export async function getUserById(id: string | number): Promise<ApiUser> {
  try {
    const response = await apiRequest<ApiUser>(ENDPOINTS.USERS.GET_BY_ID(id), {
      method: 'GET',
    })

    return response.data
  } catch (error) {
    console.error('Error fetching user by ID:', error)
    throw error
  }
}

/**
 * Fetch all users with full details (raw API response)
 */
export async function getUsersWithDetails(): Promise<GetUsersResponse> {
  try {
    const response = await apiRequest<GetUsersResponse>(ENDPOINTS.USERS.GET_ALL, {
      method: 'GET',
    })

    return response.data
  } catch (error) {
    console.error('Error fetching users with details:', error)
    throw error
  }
}


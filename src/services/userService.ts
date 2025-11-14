import apiRequest from './api'
import { ENDPOINTS } from './endpoints'
import type { GetUsersResponse, UserRecord, ApiUser, CreateUserRequest, CreateUserResponse } from '../types/user'

/**
 * Get all users from the API
 */
export async function getAllUsers(): Promise<UserRecord[]> {
  try {
    const response = await apiRequest<GetUsersResponse>(ENDPOINTS.USERS.GET_ALL, {
      method: 'GET',
    })

    // Map API response to UserRecord format and sort by latest first
    const users = response.data.users.map((user) => ({
      id: user.id.toString(),
      name: user.customerName,
      accountNumber: user.accountNumber,
      registrationDate: user.createdAt || user.updatedAt || new Date().toISOString(),
      email: user.phoneNumber, // Using phoneNumber as email since API doesn't provide email
      status: 'Active', // Default status, can be enhanced based on business logic
    }))

    // Sort by registration date (newest first)
    return users.sort((a, b) => {
      const dateA = new Date(a.registrationDate).getTime()
      const dateB = new Date(b.registrationDate).getTime()
      // If dates are invalid, put them at the end
      if (isNaN(dateA) && isNaN(dateB)) return 0
      if (isNaN(dateA)) return 1
      if (isNaN(dateB)) return -1
      // Sort descending (newest first)
      return dateB - dateA
    })
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

/**
 * Create a new user (register account)
 */
export async function createUser(userData: CreateUserRequest): Promise<CreateUserResponse['data']> {
  try {
    const response = await apiRequest<CreateUserResponse['data']>(ENDPOINTS.USERS.CREATE, {
      method: 'POST',
      body: JSON.stringify(userData),
    })

    return response.data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}


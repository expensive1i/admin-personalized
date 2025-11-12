// In development, use proxy (no base URL needed)
// In production, use full URL from environment variable
const isDevelopment = import.meta.env.DEV
const API_BASE_URL = isDevelopment 
  ? '' // Use Vite proxy in development
  : import.meta.env.VITE_API_BASE_URL

export interface ApiResponse<T> {
  success: boolean
  response: string
  data: T
}

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = `API request failed: ${response.status} ${response.statusText}`
      
      try {
        const errorData = await response.json()
        if (errorData.message) {
          errorMessage = errorData.message
        } else if (errorData.response) {
          errorMessage = errorData.response
        } else if (errorData.error) {
          errorMessage = errorData.error
        }
      } catch {
        // If response is not JSON, use status-based messages
        if (response.status === 500) {
          errorMessage = 'Internal Server Error: The server encountered an error while processing your request.'
        } else if (response.status === 404) {
          errorMessage = 'Not Found: The requested resource could not be found.'
        } else if (response.status === 403) {
          errorMessage = 'Forbidden: You do not have permission to access this resource.'
        } else if (response.status === 401) {
          errorMessage = 'Unauthorized: Please check your credentials.'
        }
      }
      
      throw new Error(errorMessage)
    }

    return response.json()
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network Error: Unable to connect to the server. Please check your internet connection.')
    }
    throw error
  }
}

export default apiRequest


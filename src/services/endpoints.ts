/**
 * API Endpoints
 * Base URL: https://personalize-production-8a33.up.railway.app
 */

export const ENDPOINTS = {
  // Users
  USERS: {
    GET_ALL: '/api/users',
    GET_BY_ID: (id: string | number) => `/api/users/${id}`,
    CREATE: '/api/register-account',
  },
} as const


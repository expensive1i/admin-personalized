export interface ApiUser {
  id: number
  customerName: string
  phoneNumber: string
  accountNumber: string
  bankName: string | null
  createdAt: string | null
  updatedAt: string | null
  accounts: Array<{
    id: number
    accountNumber: string
    balance: number
    currency: string
    bankName: string | null
    createdAt: string | null
  }>
  transactions: any[]
  billPayments: any[]
  beneficiaries: any[]
}

export interface GetUsersResponse {
  totalUsers: number
  users: ApiUser[]
}

export interface GetUserByIdResponse {
  success: boolean
  response: string
  data: ApiUser
}

export interface UserRecord {
  id: string
  name: string
  accountNumber: string
  registrationDate: string
  email: string
  status: string
}


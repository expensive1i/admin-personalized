export interface Transaction {
  id: number
  receiverName: string
  bankName: string | null
  bankAccount: string
  accountNumber: string
  amount: number
  balanceBefore: number
  balanceAfter: number
  transactionDate: string
  status: string
  transactionType: string
  reference: string
  createdAt: string | null
}

export interface BillPayment {
  id: number
  paymentType: string
  provider: string
  phoneNumber: string
  meterNumber: string
  accountNumber: string
  amount: number
  balanceBefore: number
  balanceAfter: number
  paymentDate: string
  status: string
  reference: string
  description: string
  createdAt: string | null
}

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
  transactions: Transaction[]
  billPayments: BillPayment[]
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


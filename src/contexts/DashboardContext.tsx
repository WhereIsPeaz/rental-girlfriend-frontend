'use client'

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    type ReactNode,
} from 'react'
import toast from 'react-hot-toast'
import * as usersApi from '@/lib/api/users'
import * as transactionsApi from '@/lib/api/transactions'
import * as withdrawalsApi from '@/lib/api/withdrawals'
import * as bookingsApi from '@/lib/api/bookings'
import type { Transaction, UserBalance, Booking } from '@/lib/types'

interface WithdrawalData {
    amount: number
    bankName: string
    accountNumber: string
    accountName: string
}

interface DashboardState {
    balance: UserBalance | null
    transactions: Transaction[]
    bookings: Booking[]
    loading: boolean
    loadData: (
        userId: string,
        userType?: 'customer' | 'provider'
    ) => Promise<void>
    processWithdrawalAction: (
        userId: string,
        data: WithdrawalData
    ) => Promise<void>
    topUpBalanceAction: (userId: string, amount: number) => Promise<void>
}

const DashboardContext = createContext<DashboardState | undefined>(undefined)

interface DashboardProviderProps {
    children: ReactNode
}

export function DashboardProvider({ children }: DashboardProviderProps) {
    const [balance, setBalance] = useState<UserBalance | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)

    const loadData = useCallback(
        async (userId: string, userType?: 'customer' | 'provider') => {
            setLoading(true)

            try {
                // Fetch balance and transactions from API
                const [userBalance, transactionsList] = await Promise.all([
                    usersApi.getUserBalance(userId),
                    transactionsApi.listTransactions({ customerId: userId }),
                ])

                setBalance(userBalance)
                setTransactions(transactionsList.slice(0, 50)) // Limit to 50

                // Load bookings for providers
                if (userType === 'provider') {
                    const providerBookingsResponse = await bookingsApi.listBookings({
                        providerId: userId,
                        limit: 100,
                    })
                    setBookings(providerBookingsResponse.data)
                }
            } catch (error) {
                console.error('Error loading dashboard data:', error)
                toast.error('ไม่สามารถโหลดข้อมูลได้')
            } finally {
                setLoading(false)
            }
        },
        []
    )

    const processWithdrawalAction = useCallback(
        async (userId: string, data: WithdrawalData) => {
            // Show loading toast
            const processingToast = toast.loading('กำลังดำเนินการถอนเงิน...', {
                duration: Infinity,
            })

            try {
                await withdrawalsApi.createWithdrawal({
                    userId,
                    amount: data.amount,
                    bankName: data.bankName,
                    accountNumber: data.accountNumber,
                    accountName: data.accountName,
                })

                toast.dismiss(processingToast)
                toast.success('ถอนเงินสำเร็จ!')

                // Reload data after successful withdrawal
                await loadData(userId)
            } catch (error) {
                toast.dismiss(processingToast)
                toast.error(
                    (error as Error).message ?? 'เกิดข้อผิดพลาดในการถอนเงิน'
                )
                throw error
            }
        },
        [loadData]
    )

    const topUpBalanceAction = useCallback(
        async (userId: string, amount: number) => {
            // Show loading toast
            const processingToast = toast.loading('กำลังดำเนินการเติมเงิน...', {
                duration: Infinity,
            })

            try {
                await transactionsApi.createTransaction({
                    customerId: userId,
                    amount,
                    currency: 'THB',
                    method: 'topup',
                    type: 'topup',
                    status: 'completed',
                    note: 'เติมเงินเข้าบัญชี',
                })

                toast.dismiss(processingToast)
                toast.success('เติมเงินสำเร็จ!')

                // Reload data after successful top-up
                await loadData(userId)
            } catch (error) {
                toast.dismiss(processingToast)
                toast.error(
                    (error as Error).message ?? 'เกิดข้อผิดพลาดในการเติมเงิน'
                )
                throw error
            }
        },
        [loadData]
    )

    const value: DashboardState = {
        balance,
        transactions,
        bookings,
        loading,
        loadData,
        processWithdrawalAction,
        topUpBalanceAction,
    }

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    )
}

export function useDashboard() {
    const context = useContext(DashboardContext)
    if (context === undefined) {
        throw new Error('useDashboard must be used within a DashboardProvider')
    }
    return context
}

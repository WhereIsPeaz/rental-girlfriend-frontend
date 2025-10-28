'use client'

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    type ReactNode,
} from 'react'
import toast from 'react-hot-toast'
import {
    getUserBalance,
    getTransactionHistory,
    processWithdrawal,
    topUpBalance,
    getBookingsByProvider,
    initializeSampleData,
    type Transaction,
    type UserBalance,
    type Booking,
} from '@/lib/localStorage'

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
                // Initialize sample data if needed
                initializeSampleData()

                // Simulate API delay for data loading
                await new Promise((resolve) => setTimeout(resolve, 800))

                const userBalance = getUserBalance(userId)
                setBalance(userBalance)

                const transactionHistory = getTransactionHistory(userId, {
                    limit: 50,
                })
                setTransactions(transactionHistory)

                // Load bookings for providers
                if (userType === 'provider') {
                    const providerBookings = getBookingsByProvider(userId)
                    setBookings(providerBookings)
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
                // Simulate API delay for withdrawal processing
                await new Promise((resolve) => setTimeout(resolve, 2500))

                processWithdrawal(
                    userId,
                    data.amount,
                    data.bankName,
                    data.accountNumber,
                    data.accountName
                )

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
                // Simulate API delay for top-up processing
                await new Promise((resolve) => setTimeout(resolve, 1800))

                topUpBalance(userId, amount)

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

'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
    Wallet,
    TrendingUp,
    ArrowUpRight,
    ArrowDownLeft,
    Minus,
    Filter,
    Calendar,
    Users,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuthContext } from '@/contexts/AuthContext'
import {
    getUserBalance,
    getTransactionHistory,
    processWithdrawal,
    getBookingsByProvider,
    initializeSampleData,
    type Transaction,
    type UserBalance,
    type Booking,
} from '@/lib/localStorage'

export default function ProviderDashboard() {
    const { user, isAuthenticated, isProvider } = useAuthContext()
    const router = useRouter()

    const [balance, setBalance] = useState<UserBalance | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [showWithdrawModal, setShowWithdrawModal] = useState(false)
    const [filterType, setFilterType] = useState<Transaction['type'] | 'all'>(
        'all'
    )

    // Withdrawal form state
    const [withdrawalForm, setWithdrawalForm] = useState({
        amount: '',
        bankName: '',
        accountNumber: '',
        accountName: '',
    })
    const [isProcessingWithdrawal, setIsProcessingWithdrawal] = useState(false)

    const loadData = useCallback(async () => {
        if (!user) return

        setLoading(true)

        try {
            // Simulate API delay for data loading
            await new Promise((resolve) => setTimeout(resolve, 800))

            const userBalance = getUserBalance(user.id)
            setBalance(userBalance)

            const transactionHistory = getTransactionHistory(user.id, {
                limit: 50,
            })
            setTransactions(transactionHistory)

            const providerBookings = getBookingsByProvider(user.id)
            setBookings(providerBookings)
        } catch {
            toast.error('ไม่สามารถโหลดข้อมูลได้')
        } finally {
            setLoading(false)
        }
    }, [user])

    useEffect(() => {
        initializeSampleData()

        if (!isAuthenticated) {
            router.push('/login')
            return
        }

        if (!user || !isProvider) {
            toast.error('เฉพาะผู้ให้บริการเท่านั้นที่สามารถเข้าถึงหน้านี้ได้')
            router.push('/')
            return
        }

        void loadData()
    }, [user, isAuthenticated, isProvider, router, loadData])

    const filteredTransactions = transactions.filter(
        (t) => filterType === 'all' || t.type === filterType
    )

    const completedBookings = bookings.filter((b) => b.status === 'completed')
    const thisMonthEarnings = completedBookings
        .filter((b) => {
            const bookingDate = new Date(b.createdAt)
            const now = new Date()
            return (
                bookingDate.getMonth() === now.getMonth() &&
                bookingDate.getFullYear() === now.getFullYear()
            )
        })
        .reduce((sum, booking) => sum + booking.totalAmount, 0)

    const handleWithdrawal = async () => {
        if (!user) return

        const amount = parseFloat(withdrawalForm.amount)
        if (isNaN(amount) || amount <= 0) {
            toast.error('กรุณากรอกจำนวนเงินที่ถูกต้อง')
            return
        }

        if (
            !withdrawalForm.bankName ||
            !withdrawalForm.accountNumber ||
            !withdrawalForm.accountName
        ) {
            toast.error('กรุณากรอกข้อมูลธนาคารให้ครบถ้วน')
            return
        }

        // Validate account number: must be numbers only
        if (!/^\d+$/.test(withdrawalForm.accountNumber)) {
            toast.error('เลขที่บัญชีต้องเป็นตัวเลขเท่านั้น')
            return
        }

        // Validate account name: must be characters only (no numbers)
        if (/\d/.test(withdrawalForm.accountName)) {
            toast.error(
                'ชื่อบัญชีต้องเป็นตัวอักษรเท่านั้น ไม่สามารถมีตัวเลขได้'
            )
            return
        }
        if (/\d/.test(withdrawalForm.bankName)) {
            toast.error(
                'ชื่อธนาคารต้องเป็นตัวอักษรเท่านั้น ไม่สามารถมีตัวเลขได้'
            )
            return
        }

        setIsProcessingWithdrawal(true)

        // Show loading toast
        const processingToast = toast.loading('กำลังดำเนินการถอนเงิน...', {
            duration: Infinity,
        })

        try {
            // Simulate API delay for withdrawal processing
            await new Promise((resolve) => setTimeout(resolve, 2500))

            processWithdrawal(
                user.id,
                amount,
                withdrawalForm.bankName,
                withdrawalForm.accountNumber,
                withdrawalForm.accountName
            )

            toast.dismiss(processingToast)
            toast.success('ถอนเงินสำเร็จ!')
            setShowWithdrawModal(false)
            setWithdrawalForm({
                amount: '',
                bankName: '',
                accountNumber: '',
                accountName: '',
            })
            void loadData()
        } catch (error: unknown) {
            toast.dismiss(processingToast)
            toast.error(
                (error as Error).message ?? 'เกิดข้อผิดพลาดในการถอนเงิน'
            )
        } finally {
            setIsProcessingWithdrawal(false)
        }
    }

    const getTransactionIcon = (type: Transaction['type']) => {
        switch (type) {
            case 'earning':
                return <ArrowDownLeft className="h-4 w-4 text-green-500" />
            case 'commission':
                return <ArrowUpRight className="h-4 w-4 text-red-500" />
            case 'withdrawal':
                return <Minus className="h-4 w-4 text-orange-500" />
            default:
                return <ArrowUpRight className="h-4 w-4 text-gray-500" />
        }
    }

    const getTransactionTypeText = (type: Transaction['type']) => {
        switch (type) {
            case 'earning':
                return 'รายได้'
            case 'commission':
                return 'ค่าคอมมิชชั่น'
            case 'withdrawal':
                return 'ถอนเงิน'
            default:
                return type
        }
    }

    const suggestedAmounts = [500, 1000, 2000, 5000]

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-pink-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        แดชบอร์ด ผู้ให้บริการ
                    </h1>
                    <p className="text-gray-600">
                        จัดการรายได้และดูสถิติการให้บริการ
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                    <div className="rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-pink-100">ยอดเงินคงเหลือ</p>
                                <p className="text-3xl font-bold">
                                    ฿{balance?.balance.toLocaleString() ?? '0'}
                                </p>
                            </div>
                            <Wallet className="h-12 w-12 text-pink-200" />
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    รายได้ทั้งหมด
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ฿
                                    {balance?.totalEarnings.toLocaleString() ??
                                        '0'}
                                </p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-500" />
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    รายได้เดือนนี้
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ฿{thisMonthEarnings.toLocaleString()}
                                </p>
                            </div>
                            <Calendar className="h-8 w-8 text-blue-500" />
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    การจองสำเร็จ
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {completedBookings.length}
                                </p>
                            </div>
                            <Users className="h-8 w-8 text-purple-500" />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mb-8 flex gap-4">
                    <button
                        onClick={() => setShowWithdrawModal(true)}
                        disabled={!balance?.balance || balance.balance < 100}
                        className="flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition-all hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Minus className="h-5 w-5" />
                        ถอนเงิน
                    </button>
                    {(!balance?.balance || balance.balance < 100) && (
                        <p className="flex items-center text-sm text-gray-500">
                            ยอดเงินขั้นต่ำในการถอน ฿100
                        </p>
                    )}
                </div>

                {/* Recent Bookings Summary */}
                <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold text-gray-900">
                        สรุปการจองล่าสุด
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="rounded-lg bg-yellow-50 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-yellow-800">
                                        รอยืนยัน
                                    </p>
                                    <p className="text-2xl font-bold text-yellow-900">
                                        {
                                            bookings.filter(
                                                (b) => b.status === 'pending'
                                            ).length
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg bg-green-50 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-green-800">
                                        ยืนยันแล้ว
                                    </p>
                                    <p className="text-2xl font-bold text-green-900">
                                        {
                                            bookings.filter(
                                                (b) => b.status === 'confirmed'
                                            ).length
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg bg-blue-50 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-blue-800">
                                        เสร็จสิ้น
                                    </p>
                                    <p className="text-2xl font-bold text-blue-900">
                                        {completedBookings.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">
                            ประวัติการทำธุรกรรม
                        </h2>
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-gray-500" />
                            <select
                                value={filterType}
                                onChange={(e) =>
                                    setFilterType(
                                        e.target.value as
                                            | Transaction['type']
                                            | 'all'
                                    )
                                }
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
                            >
                                <option value="all">ทั้งหมด</option>
                                <option value="earning">รายได้</option>
                                <option value="commission">
                                    ค่าคอมมิชชั่น
                                </option>
                                <option value="withdrawal">ถอนเงิน</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filteredTransactions.length === 0 ? (
                            <div className="py-12 text-center text-gray-500">
                                ไม่มีประวัติการทำธุรกรรม
                            </div>
                        ) : (
                            filteredTransactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                                >
                                    <div className="flex items-center gap-4">
                                        {getTransactionIcon(transaction.type)}
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {getTransactionTypeText(
                                                    transaction.type
                                                )}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {transaction.description}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {new Date(
                                                    transaction.createdAt
                                                ).toLocaleDateString('th-TH', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p
                                            className={`text-lg font-semibold ${
                                                transaction.amount > 0
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }`}
                                        >
                                            {transaction.amount > 0 ? '+' : ''}฿
                                            {Math.abs(
                                                transaction.amount
                                            ).toLocaleString()}
                                        </p>
                                        <p
                                            className={`text-xs ${
                                                transaction.status ===
                                                'completed'
                                                    ? 'text-green-500'
                                                    : transaction.status ===
                                                        'pending'
                                                      ? 'text-yellow-500'
                                                      : 'text-red-500'
                                            }`}
                                        >
                                            {transaction.status === 'completed'
                                                ? 'สำเร็จ'
                                                : transaction.status ===
                                                    'pending'
                                                  ? 'รอดำเนินการ'
                                                  : 'ล้มเหลว'}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Withdrawal Modal */}
            {showWithdrawModal && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-6">
                        <h3 className="mb-4 text-xl font-semibold text-gray-900">
                            ถอนเงินรายได้
                        </h3>
                        <div className="mb-4 rounded-lg bg-gray-50 p-3">
                            <p className="text-sm text-gray-600">
                                ยอดเงินคงเหลือ:{' '}
                                <span className="font-semibold text-gray-900">
                                    ฿{balance?.balance.toLocaleString()}
                                </span>
                            </p>
                        </div>
                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                จำนวนเงิน (฿)
                            </label>
                            <input
                                type="number"
                                value={withdrawalForm.amount}
                                onChange={(e) =>
                                    setWithdrawalForm((prev) => ({
                                        ...prev,
                                        amount: e.target.value,
                                    }))
                                }
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
                                placeholder="กรอกจำนวนเงิน (ขั้นต่ำ ฿100)"
                                min="100"
                                max={balance?.balance ?? 0}
                            />
                        </div>
                        <div className="mb-4">
                            <p className="mb-2 text-sm font-medium text-gray-700">
                                จำนวนเงินแนะนำ
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {suggestedAmounts
                                    .filter(
                                        (amount) =>
                                            amount <= (balance?.balance ?? 0)
                                    )
                                    .map((amount) => (
                                        <button
                                            key={amount}
                                            onClick={() =>
                                                setWithdrawalForm((prev) => ({
                                                    ...prev,
                                                    amount: amount.toString(),
                                                }))
                                            }
                                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors hover:border-pink-500 hover:bg-pink-50"
                                        >
                                            ฿{amount.toLocaleString()}
                                        </button>
                                    ))}
                                <button
                                    onClick={() =>
                                        setWithdrawalForm((prev) => ({
                                            ...prev,
                                            amount: (
                                                balance?.balance ?? 0
                                            ).toString(),
                                        }))
                                    }
                                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors hover:border-pink-500 hover:bg-pink-50"
                                >
                                    ทั้งหมด
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                ชื่อธนาคาร
                            </label>
                            <input
                                type="text"
                                value={withdrawalForm.bankName}
                                onChange={(e) =>
                                    setWithdrawalForm((prev) => ({
                                        ...prev,
                                        bankName: e.target.value,
                                    }))
                                }
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
                                placeholder="เช่น ธนาคารกสิกรไทย"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                เลขที่บัญชี
                            </label>
                            <input
                                type="text"
                                value={withdrawalForm.accountNumber}
                                onChange={(e) => {
                                    // Only allow numbers
                                    const value = e.target.value.replace(
                                        /\D/g,
                                        ''
                                    )
                                    setWithdrawalForm((prev) => ({
                                        ...prev,
                                        accountNumber: value,
                                    }))
                                }}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
                                placeholder="กรอกเลขที่บัญชี"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                ชื่อบัญชี
                            </label>
                            <input
                                type="text"
                                value={withdrawalForm.accountName}
                                onChange={(e) => {
                                    // Only allow characters (letters, spaces, Thai characters) - remove numbers
                                    const value = e.target.value.replace(
                                        /\d/g,
                                        ''
                                    )
                                    setWithdrawalForm((prev) => ({
                                        ...prev,
                                        accountName: value,
                                    }))
                                }}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
                                placeholder="กรอกชื่อบัญชี"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowWithdrawModal(false)}
                                className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={handleWithdrawal}
                                disabled={isProcessingWithdrawal}
                                className="flex-1 rounded-xl bg-orange-600 py-3 font-semibold text-white transition-colors hover:bg-orange-700 disabled:opacity-50"
                            >
                                {isProcessingWithdrawal
                                    ? 'กำลังดำเนินการ...'
                                    : 'ถอนเงิน'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

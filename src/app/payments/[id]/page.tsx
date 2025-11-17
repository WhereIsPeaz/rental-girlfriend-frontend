'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { CreditCard, CheckCircle, ArrowLeft, Wallet } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuthContext } from '@/contexts/AuthContext'
import * as servicesApi from '@/lib/api/services'
import * as usersApi from '@/lib/api/users'
import * as bookingsApi from '@/lib/api/bookings'
import * as paymentsApi from '@/lib/api/payments'
import * as transactionsApi from '@/lib/api/transactions'
import type { Service, User, UserBalance } from '@/lib/types'

interface BookingFormData {
    date: string
    startTime: string
    endTime?: string
    duration?: number
    serviceType: 'hourly' | 'daily'
    specialRequests?: string
    totalAmount: number
    depositAmount: number
}

export default function PaymentPage() {
    const { id } = useParams()
    const router = useRouter()
    const { user, isAuthenticated } = useAuthContext()

    const idString = Array.isArray(id) ? id[0] : id

    const [service, setService] = useState<Service | null>(null)
    const [provider, setProvider] = useState<User | null>(null)
    const [bookingData, setBookingData] = useState<BookingFormData | null>(null)
    const [userBalance, setUserBalance] = useState<UserBalance | null>(null)
    const [loading, setLoading] = useState(true)

    const [paymentMethod, setPaymentMethod] = useState('credit_card')
    const [isProcessing, setIsProcessing] = useState(false)
    const [paymentComplete, setPaymentComplete] = useState(false)

    useEffect(() => {
        // Check authentication
        if (!isAuthenticated) {
            router.push('/login')
            return
        }

        if (!user || user.type !== 'customer') {
            toast.error('เฉพาะลูกค้าเท่านั้นที่สามารถชำระเงินได้')
            router.push('/services')
            return
        }

        if (!id) {
            router.push('/services')
            return
        }

        // Get booking data from sessionStorage (passed from booking page)
        const storedBookingData = sessionStorage.getItem(
            `bookingData_${idString}`
        )
        if (!storedBookingData) {
            toast.error('ไม่พบข้อมูลการจอง กรุณาทำการจองใหม่')
            router.push(`/booking/${idString}`)
            return
        }

        const parsedBookingData = JSON.parse(
            storedBookingData
        ) as BookingFormData
        setBookingData(parsedBookingData)

        // Load service, provider, and user balance from API
        const loadPaymentData = async () => {
            try {
                const foundService = await servicesApi.getService(idString!)

                if (!foundService) {
                    toast.error('ไม่พบบริการที่ต้องการ')
                    router.push('/services')
                    return
                }

                setService(foundService)

                // Load provider data
                const foundProvider = await usersApi.getUser(
                    foundService.providerId
                )

                if (!foundProvider) {
                    toast.error('ไม่พบผู้ให้บริการ')
                    router.push('/services')
                    return
                }

                setProvider(foundProvider)

                // Load user balance
                const balance = await usersApi.getUserBalance(user.id)
                setUserBalance(balance)

                setLoading(false)
            } catch (error) {
                console.error('Error loading payment data:', error)
                toast.error('ไม่สามารถโหลดข้อมูลได้')
                router.push('/services')
            }
        }

        void loadPaymentData()
    }, [id, idString, router, isAuthenticated, user])

    const handlePayment = async () => {
        if (!service || !provider || !user || !bookingData) return

        setIsProcessing(true)

        // Show processing toast
        const processingToast = toast.loading('กำลังดำเนินการชำระเงิน...', {
            duration: Infinity,
        })

        try {
            if (!bookingData || !userBalance) {
                throw new Error('ข้อมูลการจองหรือยอดเงินไม่ครบถ้วน')
            }

            // Use the total amount from booking data (100% payment)
            const totalAmount = bookingData.totalAmount
            const depositAmount = bookingData.depositAmount // This is already 100% from booking page

            // Handle wallet payment
            if (paymentMethod === 'wallet') {
                if (userBalance.balance < depositAmount) {
                    throw new Error('ยอดเงินในกระเป๋าไม่เพียงพอ')
                }

                // Deduct from wallet via transaction API
                await transactionsApi.createTransaction({
                    customerId: user.id,
                    amount: depositAmount,
                    currency: 'THB',
                    method: 'wallet',
                    type: 'payment',
                    status: 'completed',
                    note: `ชำระเงิน - ${service.name}`,
                })
            } else {
                // Simulate payment processing delay for other methods
                await new Promise((resolve) => setTimeout(resolve, 2000))
            }

            // Create booking via API
            const booking = await bookingsApi.createBooking({
                serviceId: service.id,
                date: bookingData.date,
                startTime: bookingData.startTime,
                endTime:
                    bookingData.serviceType === 'daily'
                        ? '23:59'
                        : (bookingData.endTime ?? '18:00'),
                totalHours:
                    bookingData.serviceType === 'daily'
                        ? 8
                        : (bookingData.duration ?? 1),
                totalAmount,
                depositAmount: depositAmount,
                status: 'pending',
                paymentStatus: 'pending',
                specialRequests: bookingData.specialRequests,
            })

            // Create payment record via API
            await paymentsApi.createPayment({
                bookingId: booking.id,
                customerId: user.id,
                providerId: provider.id,
                amount: depositAmount,
                paymentMethod: paymentMethod as
                    | 'credit_card'
                    | 'promptpay'
                    | 'bank_transfer',
                status: 'completed',
                transactionId: `txn_${Date.now()}`,
            })

            // Update booking payment status
            await bookingsApi.updateBooking(booking.id, {
                paymentStatus: 'paid',
            })

            // Clear booking data from sessionStorage
            sessionStorage.removeItem(`bookingData_${idString}`)

            setPaymentComplete(true)
            setIsProcessing(false)

            // Dismiss processing toast and show success
            toast.dismiss(processingToast)
            toast.success('ชำระเงินสำเร็จ! 🎉', {
                duration: 4000,
            })

            // Additional success notification
            setTimeout(() => {
                toast.success(
                    'การจองของคุณถูกส่งไปแล้ว รอผู้ให้บริการตอบกลับในเร็วๆ นี้',
                    {
                        duration: 5000,
                    }
                )
            }, 1000)
        } catch (error) {
            console.error('Payment error:', error)
            setIsProcessing(false)

            // Dismiss processing toast and show error
            toast.dismiss(processingToast)
            toast.error('เกิดข้อผิดพลาดในการชำระเงิน กรุณาลองใหม่อีกครั้ง', {
                duration: 4000,
            })
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-pink-500"></div>
            </div>
        )
    }

    if (!service || !provider || !bookingData) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">
                        ไม่พบข้อมูลการจองที่ต้องการ
                    </h2>
                    <button
                        onClick={() => router.push('/services')}
                        className="rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 font-semibold text-white transition-all hover:from-pink-600 hover:to-rose-600"
                    >
                        กลับไปหน้าบริการ
                    </button>
                </div>
            </div>
        )
    }

    // Use amounts from booking data
    const totalAmount = bookingData.totalAmount
    const depositAmount = bookingData.depositAmount

    if (paymentComplete) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="mx-4 w-full max-w-md">
                    <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                        <h2 className="mb-4 text-2xl font-bold text-gray-900">
                            ชำระเงินสำเร็จ!
                        </h2>
                        <p className="mb-6 text-gray-600">
                            คำขอของคุณถูกส่งไปแล้ว รอผู้ให้บริการตอบกลับในเร็วๆ
                            นี้
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={() => {
                                    toast.success('กำลังไปหน้าสถานะการจอง', {
                                        duration: 2000,
                                    })
                                    router.push('/bookings')
                                }}
                                className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 font-semibold text-white transition-all hover:from-pink-600 hover:to-rose-600"
                            >
                                ดูการจองของฉัน
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex items-center">
                    <button
                        onClick={() => router.back()}
                        className="mr-4 p-2 text-gray-600 transition-colors hover:text-gray-800"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </button>
                    <div>
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            ชำระเงิน
                        </h1>
                        <p className="text-gray-600">
                            ชำระเงินเต็มจำนวนเพื่อยืนยันการจอง
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Payment Form */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Payment Methods */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                เลือกวิธีการชำระเงิน
                            </h3>
                            <div className="space-y-3">
                                <label
                                    className={`flex cursor-pointer items-center rounded-xl border-2 p-4 transition-colors hover:border-pink-200 ${
                                        paymentMethod === 'wallet'
                                            ? 'border-pink-500 bg-pink-50'
                                            : 'border-gray-200'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="wallet"
                                        checked={paymentMethod === 'wallet'}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        className="text-pink-600 focus:ring-pink-500"
                                    />
                                    <Wallet className="mr-4 ml-3 h-6 w-6 text-gray-600" />
                                    <div className="flex-1">
                                        <div className="font-medium">
                                            กระเป๋าเงิน
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            ยอดคงเหลือ: ฿
                                            {userBalance?.balance.toLocaleString() ??
                                                '0'}
                                        </div>
                                        {userBalance &&
                                            userBalance.balance <
                                                depositAmount && (
                                                <div className="text-sm text-red-500">
                                                    ยอดเงินไม่เพียงพอ
                                                </div>
                                            )}
                                    </div>
                                </label>

                                <label
                                    className={`flex cursor-pointer items-center rounded-xl border-2 p-4 transition-colors hover:border-pink-200 ${
                                        paymentMethod === 'credit_card'
                                            ? 'border-pink-500 bg-pink-50'
                                            : 'border-gray-200'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="credit_card"
                                        checked={
                                            paymentMethod === 'credit_card'
                                        }
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        className="text-pink-600 focus:ring-pink-500"
                                    />
                                    <CreditCard className="mr-4 ml-3 h-6 w-6 text-gray-600" />
                                    <div>
                                        <div className="font-medium">
                                            บัตรเครดิต/เดบิต
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Visa, Mastercard, JCB
                                        </div>
                                    </div>
                                </label>

                                <label
                                    className={`flex cursor-pointer items-center rounded-xl border-2 p-4 transition-colors hover:border-pink-200 ${
                                        paymentMethod === 'promptpay'
                                            ? 'border-pink-500 bg-pink-50'
                                            : 'border-gray-200'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="promptpay"
                                        checked={paymentMethod === 'promptpay'}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        className="text-pink-600 focus:ring-pink-500"
                                    />
                                    <div className="mr-4 ml-3 flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
                                        PP
                                    </div>
                                    <div>
                                        <div className="font-medium">
                                            PromptPay
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            โอนผ่าน QR Code
                                        </div>
                                    </div>
                                </label>

                                <label
                                    className={`flex cursor-pointer items-center rounded-xl border-2 p-4 transition-colors hover:border-pink-200 ${
                                        paymentMethod === 'bank_transfer'
                                            ? 'border-pink-500 bg-pink-50'
                                            : 'border-gray-200'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="bank_transfer"
                                        checked={
                                            paymentMethod === 'bank_transfer'
                                        }
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                        className="text-pink-600 focus:ring-pink-500"
                                    />
                                    <div className="mr-4 ml-3 flex h-6 w-6 items-center justify-center rounded bg-green-600 text-xs font-bold text-white">
                                        B
                                    </div>
                                    <div>
                                        <div className="font-medium">
                                            โอนเงินผ่านธนาคาร
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            โอนผ่านแอปธนาคาร
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Payment Details */}
                        {paymentMethod === 'credit_card' && (
                            <div className="rounded-2xl bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                    ข้อมูลบัตร
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            หมายเลขบัตร
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-pink-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                วันหมดอายุ
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-pink-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-pink-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            ชื่อผู้ถือบัตร
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="ชื่อตามบัตร"
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-pink-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6">
                        {/* Booking Details */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                รายละเอียดการจอง
                            </h3>

                            {/* Provider */}
                            <div className="mb-4 flex items-center space-x-3 border-b pb-4">
                                <Image
                                    src={provider.img ?? '/img/p1.jpg'}
                                    alt={provider.firstName}
                                    width={48}
                                    height={48}
                                    className="h-12 w-12 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-medium">
                                        {provider.firstName} {provider.lastName}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        ผู้ให้บริการ
                                    </div>
                                </div>
                            </div>

                            {/* Booking Info */}
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        วันที่
                                    </span>
                                    <span className="font-medium">
                                        {new Date(
                                            bookingData.date
                                        ).toLocaleDateString('th-TH')}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">เวลา</span>
                                    <span className="font-medium">
                                        {bookingData.startTime} -{' '}
                                        {bookingData.serviceType === 'daily'
                                            ? '23:59'
                                            : bookingData.endTime}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        ระยะเวลา
                                    </span>
                                    <span className="font-medium">
                                        {bookingData.serviceType === 'daily'
                                            ? '1 วัน (8 ชั่วโมง)'
                                            : `${bookingData.duration} ชั่วโมง`}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Summary */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                สรุปการชำระเงิน
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        {bookingData.serviceType === 'daily'
                                            ? 'ค่าบริการรายวัน'
                                            : `ค่าบริการ ${bookingData.duration} ชั่วโมง`}
                                    </span>
                                    <span className="font-medium">
                                        ฿{totalAmount.toLocaleString()}
                                    </span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>รวมทั้งหมด</span>
                                        <span className="text-gray-900">
                                            ฿{totalAmount.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-between text-pink-600">
                                    <span>มัดจำ (50%)</span>
                                    <span className="font-semibold">
                                        ฿
                                        {(depositAmount * 0.5).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Button */}
                        <button
                            onClick={handlePayment}
                            disabled={
                                isProcessing ||
                                (paymentMethod === 'wallet' &&
                                    userBalance !== null &&
                                    userBalance.balance < depositAmount)
                            }
                            className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-4 font-semibold text-white transition-all duration-200 hover:from-pink-600 hover:to-rose-600 disabled:opacity-50"
                        >
                            {isProcessing ? (
                                <>
                                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                                    <span>กำลังดำเนินการ...</span>
                                </>
                            ) : (
                                <>
                                    <CreditCard className="h-5 w-5" />
                                    <span>
                                        ชำระเงิน ฿
                                        {depositAmount.toLocaleString()}
                                    </span>
                                </>
                            )}
                        </button>

                        {/* Terms */}
                        <div className="text-center text-xs text-gray-500">
                            การชำระเงินแสดงว่าคุณยอมรับ
                            <a
                                href="/privacy"
                                className="ml-1 text-pink-600 hover:underline"
                            >
                                ข้อกำหนดการใช้งาน
                            </a>
                            และ
                            <a
                                href="/privacy"
                                className="ml-1 text-pink-600 hover:underline"
                            >
                                นโยบายการยกเลิก
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

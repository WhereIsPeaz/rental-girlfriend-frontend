'use client'

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    type ReactNode,
} from 'react'
import toast from 'react-hot-toast'
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

interface PaymentState {
    paymentMethod: string
    isProcessing: boolean
    paymentComplete: boolean
    setPaymentMethod: (method: string) => void
    handlePayment: (
        service: Service,
        provider: User,
        user: User,
        bookingData: BookingFormData,
        userBalance: UserBalance | null,
        serviceId: string
    ) => Promise<void>
    resetPaymentState: () => void
}

const PaymentContext = createContext<PaymentState | undefined>(undefined)

interface PaymentProviderProps {
    children: ReactNode
}

export function PaymentProvider({ children }: PaymentProviderProps) {
    const [paymentMethod, setPaymentMethod] = useState('credit_card')
    const [isProcessing, setIsProcessing] = useState(false)
    const [paymentComplete, setPaymentComplete] = useState(false)

    const handlePayment = useCallback(
        async (
            service: Service,
            provider: User,
            user: User,
            bookingData: BookingFormData,
            userBalance: UserBalance | null,
            serviceId: string
        ) => {
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

                // Create booking first
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

                // Handle wallet payment
                if (paymentMethod === 'wallet') {
                    if (userBalance.balance < depositAmount) {
                        throw new Error('ยอดเงินในกระเป๋าไม่เพียงพอ')
                    }

                    // Create transaction for wallet payment
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

                // Create payment record
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
                sessionStorage.removeItem(`bookingData_${serviceId}`)

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
                toast.error(
                    'เกิดข้อผิดพลาดในการชำระเงิน กรุณาลองใหม่อีกครั้ง',
                    {
                        duration: 4000,
                    }
                )
                throw error
            }
        },
        [paymentMethod]
    )

    const resetPaymentState = useCallback(() => {
        setPaymentMethod('credit_card')
        setIsProcessing(false)
        setPaymentComplete(false)
    }, [])

    const value: PaymentState = {
        paymentMethod,
        isProcessing,
        paymentComplete,
        setPaymentMethod,
        handlePayment,
        resetPaymentState,
    }

    return (
        <PaymentContext.Provider value={value}>
            {children}
        </PaymentContext.Provider>
    )
}

export function usePayment() {
    const context = useContext(PaymentContext)
    if (context === undefined) {
        throw new Error('usePayment must be used within a PaymentProvider')
    }
    return context
}

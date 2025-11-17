// Type definitions for the application
import { z } from 'zod'

// User types
export interface User {
    id: string
    email: string
    username: string
    password?: string // Optional since API doesn't return it
    firstName: string
    lastName: string
    birthdate?: string
    idCard?: string
    phone?: string
    gender?: string
    interestedGender?: string
    type: 'customer' | 'provider' | 'admin'
    img?: string
    joined?: string
    verified?: boolean
    createdAt?: string
    updatedAt?: string
}

// Service types
export interface Service {
    id: string
    providerId: string
    name: string
    description: string
    categories: string[]
    priceHour: number
    priceDay: number
    images: string[]
    rating: number
    reviewCount: number
    bookingCount: number
    active: boolean
    createdAt: string
}

// Review types
export interface Review {
    id: string
    serviceId: string
    customerId: string
    rating: number
    comment: string
    createdAt: string
    bookingId?: string
}

// Booking types
export interface Booking {
    id: string
    customerId: string
    providerId: string
    serviceId: string
    serviceName: string
    date: string
    startTime: string
    endTime: string
    totalHours: number
    totalAmount: number
    depositAmount: number
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
    paymentStatus: 'pending' | 'paid' | 'refunded' | 'partially_refunded'
    specialRequests?: string
    cancelledBy?: 'customer' | 'provider'
    refundAmount?: number
    createdAt: string
    updatedAt: string
    // Optional fields when includeDetails=true
    providerDetails?: {
        id: string
        firstName: string
        lastName: string
        username: string
        email: string
        img?: string
    }
    customerDetails?: {
        id: string
        firstName: string
        lastName: string
        username: string
        email: string
        img?: string
    }
    hasReview?: boolean
    chatId?: string | null
}

// Payment types
export interface Payment {
    id: string
    bookingId: string
    customerId: string
    providerId: string
    amount: number
    paymentMethod: 'credit_card' | 'promptpay' | 'bank_transfer' | 'wallet'
    status:
        | 'pending'
        | 'completed'
        | 'failed'
        | 'refunded'
        | 'partially_refunded'
    transactionId?: string | null
    refundAmount?: number | null
    refundReason?: string | null
    createdAt: string
    completedAt?: string | null
    refundedAt?: string | null
}

// Transaction types
export interface Transaction {
    id: string
    customerId: string
    amount: number
    currency?: string
    method: string
    type: 'payment' | 'refund' | 'topup' | 'withdrawal'
    status: 'pending' | 'completed' | 'failed'
    note?: string
    description?: string
    createdAt: string
    updatedAt?: string
}

// Withdrawal types
export interface Withdrawal {
    id: string
    userId: string
    amount: number
    bankName: string
    accountNumber: string
    accountName: string
    status: 'pending' | 'completed' | 'failed'
    requestedAt: string
    completedAt?: string | null
    failureReason?: string | null
}

// UserBalance types
export interface UserBalance {
    userId: string
    balance: number
    pendingEarnings: number
    totalEarnings: number
    totalSpent: number
    lastUpdated: string
}

// Chat Message types
export interface ChatMessage {
    senderId: string
    senderType: 'customer' | 'provider'
    content: string
    sentAt: string
}

// Chat types
export interface Chat {
    id: string
    bookingId: string
    customerId: string
    providerId: string
    customerName?: string | null
    providerName?: string | null
    customerImg?: string | null
    providerImg?: string | null
    bookingDetails?: {
        bookingDate: string
        startTime: string
        endTime: string
        serviceName: string | null
        status: string
        totalAmount: number
    }
    messages: ChatMessage[]
    createdAt?: string
    updatedAt?: string
}

// API Response types
export interface ApiResponse<T> {
    success: boolean
    data?: T
    message?: string
}

export interface PaginatedResponse<T> {
    success: boolean
    data: T[]
    meta: {
        page: number
        limit: number
        total: number
    }
    message?: string
}

// Zod schemas for validation
export const UserSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    birthdate: z.string().optional(),
    idCard: z.string().optional(),
    phone: z.string().optional(),
    gender: z.string().optional(),
    interestedGender: z.string().optional(),
    type: z.enum(['customer', 'provider', 'admin']),
    img: z.string().optional(),
    joined: z.string().optional(),
    verified: z.boolean().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
})

export const ServiceSchema = z.object({
    id: z.string(),
    providerId: z.string(),
    name: z.string(),
    description: z.string(),
    categories: z.array(z.string()),
    priceHour: z.number(),
    priceDay: z.number(),
    images: z.array(z.string()),
    rating: z.number(),
    reviewCount: z.number(),
    bookingCount: z.number(),
    active: z.boolean(),
    createdAt: z.string(),
})

export const ReviewSchema = z.object({
    id: z.string(),
    serviceId: z.string(),
    customerId: z.string(),
    rating: z.number(),
    comment: z.string(),
    createdAt: z.string(),
    bookingId: z.string().optional(),
})

export const BookingSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    providerId: z.string(),
    serviceId: z.string(),
    serviceName: z.string(),
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    totalHours: z.number(),
    totalAmount: z.number(),
    depositAmount: z.number(),
    status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
    paymentStatus: z.enum([
        'pending',
        'paid',
        'refunded',
        'partially_refunded',
    ]),
    specialRequests: z.string().optional(),
    cancelledBy: z.enum(['customer', 'provider']).optional(),
    refundAmount: z.number().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
    // Optional fields when includeDetails=true
    providerDetails: z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        username: z.string(),
        email: z.string(),
        img: z.string().optional(),
    }).optional(),
    customerDetails: z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        username: z.string(),
        email: z.string(),
        img: z.string().optional(),
    }).optional(),
    hasReview: z.boolean().optional(),
    chatId: z.string().nullish(),
})

export const PaymentSchema = z.object({
    id: z.string(),
    bookingId: z.string(),
    customerId: z.string(),
    providerId: z.string(),
    amount: z.number(),
    paymentMethod: z.enum([
        'credit_card',
        'promptpay',
        'bank_transfer',
        'wallet',
    ]),
    status: z.enum([
        'pending',
        'completed',
        'failed',
        'refunded',
        'partially_refunded',
    ]),
    transactionId: z.string().nullish(),
    refundAmount: z.number().nullish(),
    refundReason: z.string().nullish(),
    createdAt: z.string(),
    completedAt: z.string().nullish(),
    refundedAt: z.string().nullish(),
})

export const TransactionSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.number(),
    currency: z.string().optional(),
    method: z.string(),
    type: z.enum(['payment', 'refund', 'topup', 'withdrawal']),
    status: z.enum(['pending', 'completed', 'failed']),
    note: z.string().optional(),
    description: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string().optional(),
})

export const WithdrawalSchema = z.object({
    id: z.string(),
    userId: z.string(),
    amount: z.number(),
    bankName: z.string(),
    accountNumber: z.string(),
    accountName: z.string(),
    status: z.enum(['pending', 'completed', 'failed']),
    requestedAt: z.string(),
    completedAt: z.string().nullish(),
    failureReason: z.string().nullish(),
})

export const UserBalanceSchema = z.object({
    userId: z.string(),
    balance: z.number(),
    pendingEarnings: z.number(),
    totalEarnings: z.number(),
    totalSpent: z.number(),
    lastUpdated: z.string(),
})

export const ChatMessageSchema = z.object({
    senderId: z.string(),
    senderType: z.enum(['customer', 'provider']),
    content: z.string(),
    sentAt: z.string(),
})

export const ChatSchema = z.object({
    id: z.string(),
    bookingId: z.string(),
    customerId: z.string(),
    providerId: z.string(),
    customerName: z.string().nullish(),
    providerName: z.string().nullish(),
    customerImg: z.string().nullish(),
    providerImg: z.string().nullish(),
    bookingDetails: z.object({
        bookingDate: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        serviceName: z.string().nullable(),
        status: z.string(),
        totalAmount: z.number(),
    }).optional(),
    messages: z.array(ChatMessageSchema),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
})

// API Response schemas
export const ApiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
    z.object({
        success: z.boolean(),
        data: dataSchema.optional(),
        message: z.string().optional(),
    })

export const PaginatedResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
    z.object({
        success: z.boolean(),
        data: z.array(dataSchema),
        meta: z.object({
            page: z.number(),
            limit: z.number(),
            total: z.number(),
        }),
        message: z.string().optional(),
    })

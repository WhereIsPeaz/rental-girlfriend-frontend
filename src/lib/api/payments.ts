// Payments API calls
import api from '../api';
import {
    type Payment,
    type PaginatedResponse,
    type ApiResponse,
    PaymentSchema,
    PaginatedResponseSchema,
    ApiResponseSchema,
} from '../types';

interface ListPaymentsParams {
    bookingId?: string;
    customerId?: string;
    providerId?: string;
    status?: 'pending' | 'completed' | 'failed' | 'refunded' | 'partially_refunded';
    page?: number;
    limit?: number;
}

interface CreatePaymentRequest {
    bookingId: string;
    customerId?: string;
    providerId?: string;
    amount: number;
    paymentMethod: 'credit_card' | 'promptpay' | 'bank_transfer';
    status?: 'pending' | 'completed' | 'failed';
    transactionId?: string;
}

interface UpdatePaymentRequest {
    status?: 'pending' | 'completed' | 'failed' | 'refunded' | 'partially_refunded';
    transactionId?: string;
    refundAmount?: number;
    refundReason?: string;
}

/**
 * List payments with optional filters
 */
export const listPayments = async (
    params?: ListPaymentsParams
): Promise<PaginatedResponse<Payment>> => {
    const response = await api.get<PaginatedResponse<Payment>>('/payments', {
        params,
    });
    
    // Validate response
    const validated = PaginatedResponseSchema(PaymentSchema).parse(response.data);

    return validated;
};

/**
 * Get a single payment by ID
 */
export const getPayment = async (id: string): Promise<Payment> => {
    const response = await api.get<ApiResponse<Payment>>(`/payments/${id}`);
    
    // Validate response
    const validated = ApiResponseSchema(PaymentSchema).parse(response.data);

    return validated.data!;
};

/**
 * Create a new payment
 */
export const createPayment = async (
    data: CreatePaymentRequest
): Promise<Payment> => {
    const response = await api.post<ApiResponse<Payment>>('/payments', data);
    
    // Validate response
    const validated = ApiResponseSchema(PaymentSchema).parse(response.data);

    return validated.data!;
};

/**
 * Update a payment
 */
export const updatePayment = async (
    id: string,
    data: UpdatePaymentRequest
): Promise<Payment> => {
    const response = await api.put<ApiResponse<Payment>>(`/payments/${id}`, data);
    
    // Validate response
    const validated = ApiResponseSchema(PaymentSchema).parse(response.data);

    return validated.data!;
};

/**
 * Delete a payment (admin only)
 */
export const deletePayment = async (id: string): Promise<void> => {
    await api.delete(`/payments/${id}`);
};


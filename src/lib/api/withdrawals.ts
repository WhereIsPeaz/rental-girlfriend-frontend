// Withdrawals API calls
import api from '../api';
import {
    type Withdrawal,
    type PaginatedResponse,
    type ApiResponse,
    WithdrawalSchema,
    PaginatedResponseSchema,
    ApiResponseSchema,
} from '../types';

interface ListWithdrawalsParams {
    userId?: string;
    status?: 'pending' | 'completed' | 'failed';
    page?: number;
    limit?: number;
}

interface CreateWithdrawalRequest {
    userId?: string;
    amount: number;
    bankName: string;
    accountNumber: string;
    accountName: string;
}

interface UpdateWithdrawalRequest {
    status?: 'pending' | 'completed' | 'failed';
    failureReason?: string;
}

/**
 * List withdrawals with optional filters
 */
export const listWithdrawals = async (
    params?: ListWithdrawalsParams
): Promise<PaginatedResponse<Withdrawal>> => {
    const response = await api.get<PaginatedResponse<Withdrawal>>('/withdrawals', {
        params,
    });
    
    // Validate response
    const validated = PaginatedResponseSchema(WithdrawalSchema).parse(response.data);

    return validated;
};

/**
 * Get a single withdrawal by ID
 */
export const getWithdrawal = async (id: string): Promise<Withdrawal> => {
    const response = await api.get<ApiResponse<Withdrawal>>(`/withdrawals/${id}`);
    
    // Validate response
    const validated = ApiResponseSchema(WithdrawalSchema).parse(response.data);

    return validated.data!;
};

/**
 * Create a new withdrawal request
 */
export const createWithdrawal = async (
    data: CreateWithdrawalRequest
): Promise<Withdrawal> => {
    const response = await api.post<ApiResponse<Withdrawal>>('/withdrawals', data);
    
    // Validate response
    const validated = ApiResponseSchema(WithdrawalSchema).parse(response.data);

    return validated.data!;
};

/**
 * Update a withdrawal
 */
export const updateWithdrawal = async (
    id: string,
    data: UpdateWithdrawalRequest
): Promise<Withdrawal> => {
    const response = await api.put<ApiResponse<Withdrawal>>(`/withdrawals/${id}`, data);
    
    // Validate response
    const validated = ApiResponseSchema(WithdrawalSchema).parse(response.data);

    return validated.data!;
};

/**
 * Delete a withdrawal (admin only)
 */
export const deleteWithdrawal = async (id: string): Promise<void> => {
    await api.delete(`/withdrawals/${id}`);
};


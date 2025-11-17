// Transactions API calls
import api from '../api';
import {
    type Transaction,
    type ApiResponse,
    TransactionSchema,
    ApiResponseSchema,
} from '../types';
import { z } from 'zod';

interface ListTransactionsParams {
    customerId?: string;
}

interface CreateTransactionRequest {
    customerId?: string;
    amount: number;
    currency?: string;
    method: string;
    type: 'payment' | 'refund' | 'topup' | 'withdrawal';
    status?: 'pending' | 'completed' | 'failed';
    note?: string;
}

/**
 * List transactions
 */
export const listTransactions = async (
    params?: ListTransactionsParams
): Promise<Transaction[]> => {
    const response = await api.get<ApiResponse<Transaction[]>>('/transactions', {
        params,
    });
    
    // Validate response
    const validated = ApiResponseSchema(z.array(TransactionSchema)).parse(response.data);

    return validated.data ?? [];
};

/**
 * Get a single transaction by ID
 */
export const getTransaction = async (id: string): Promise<Transaction> => {
    const response = await api.get<ApiResponse<Transaction>>(`/transactions/${id}`);
    
    // Validate response
    const validated = ApiResponseSchema(TransactionSchema).parse(response.data);

    return validated.data!;
};

/**
 * Create a new transaction (top-up)
 */
export const createTransaction = async (
    data: CreateTransactionRequest
): Promise<Transaction> => {
    const response = await api.post<ApiResponse<Transaction>>('/transactions', data);
    
    // Validate response
    const validated = ApiResponseSchema(TransactionSchema).parse(response.data);

    return validated.data!;
};


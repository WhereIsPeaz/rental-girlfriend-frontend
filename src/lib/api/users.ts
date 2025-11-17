/* eslint-disable @typescript-eslint/no-explicit-any */
// Users API calls
import api from '../api';
import {
    type User,
    type UserBalance,
    type PaginatedResponse,
    type ApiResponse,
    UserSchema,
    UserBalanceSchema,
    PaginatedResponseSchema,
    ApiResponseSchema,
} from '../types';

interface ListUsersParams {
    page?: number;
    limit?: number;
    q?: string;
}

interface UpdateUserRequest {
    email?: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    birthdate?: string;
    idCard?: string;
    phone?: string;
    gender?: string;
    interestedGender?: string;
    type?: 'customer' | 'provider' | 'admin';
    img?: string;
    joined?: string;
    verified?: boolean;
    generalTimeSetting?: any;
}

/**
 * List users with optional filters
 */
export const listUsers = async (
    params?: ListUsersParams
): Promise<PaginatedResponse<User>> => {
    const response = await api.get<PaginatedResponse<User>>('/users', {
        params,
    });
    
    // Validate response
    const validated = PaginatedResponseSchema(UserSchema).parse(response.data);

    return validated;
};

/**
 * Get a single user by ID
 */
export const getUser = async (id: string): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    
    // Validate response
    const validated = ApiResponseSchema(UserSchema).parse(response.data);

    return validated.data!;
};

/**
 * Update a user (self or admin)
 */
export const updateUser = async (
    id: string,
    data: UpdateUserRequest
): Promise<User> => {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, data);
    
    // Validate response
    const validated = ApiResponseSchema(UserSchema).parse(response.data);

    return validated.data!;
};

/**
 * Delete a user (self or admin)
 */
export const deleteUser = async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
};

/**
 * Update general time setting
 */
export const updateGeneralTimeSetting = async (
    id: string,
    setting: any
): Promise<User> => {
    const response = await api.put<ApiResponse<User>>(
        `/users/${id}/general-time-setting`,
        setting
    );
    
    // Validate response
    const validated = ApiResponseSchema(UserSchema).parse(response.data);

    return validated.data!;
};

/**
 * Get user balance (calculated from transactions)
 */
export const getUserBalance = async (id: string): Promise<UserBalance> => {
    const response = await api.get<ApiResponse<UserBalance>>(`/users/${id}/balance`);
    
    // Validate response
    const validated = ApiResponseSchema(UserBalanceSchema).parse(response.data);

    return validated.data!;
};


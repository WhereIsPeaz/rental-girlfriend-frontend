/* eslint-disable @typescript-eslint/no-unsafe-return */
// Authentication API calls
import api from '../api';
import { setToken, removeToken } from '../auth';
import {
    type User,
    type ApiResponse,
    UserSchema,
    ApiResponseSchema,
} from '../types';

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    birthdate: string;
    idCard?: string;
    phone?: string;
    gender: string;
    interestedGender: string;
    type: 'customer' | 'provider';
    img?: string;
}

interface AuthResponse {
    success: boolean;
    token: string;
    user: User;
}

/**
 * Register a new user
 */
export const register = async (data: RegisterRequest): Promise<User> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    
    // Validate response
    const validated = ApiResponseSchema(UserSchema).parse({
        success: response.data.success,
        data: response.data.user,
    });

    // Save token
    if (response.data.token) {
        setToken(response.data.token);
    }

    return validated.data!;
};

/**
 * Login user
 */
export const login = async (data: LoginRequest): Promise<User> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    
    // Validate response
    const validated = ApiResponseSchema(UserSchema).parse({
        success: response.data.success,
        data: response.data.user,
    });

    // Save token
    if (response.data.token) {
        setToken(response.data.token);
    }

    return validated.data!;
};

/**
 * Get current authenticated user
 */
export const getMe = async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    
    // Validate response
    const validated = ApiResponseSchema(UserSchema).parse(response.data);

    return validated.data!;
};

/**
 * Refresh token
 */
export const refreshToken = async (): Promise<User> => {
    const response = await api.post<AuthResponse>('/auth/refresh');
    
    // Validate response
    const validated = ApiResponseSchema(UserSchema).parse({
        success: response.data.success,
        data: response.data.user,
    });

    // Update token
    if (response.data.token) {
        setToken(response.data.token);
    }

    return validated.data!;
};

/**
 * Request OTP
 */
export const requestOtp = async (email: string): Promise<{ message: string; otp?: string }> => {
    const response = await api.post('/auth/otp', { email });
    return response.data;
};

/**
 * Verify OTP
 */
export const verifyOtp = async (email: string, otp: string): Promise<User> => {
    const response = await api.post<ApiResponse<User>>('/auth/verify-otp', {
        email,
        otp,
    });
    
    // Validate response
    const validated = ApiResponseSchema(UserSchema).parse(response.data);

    return validated.data!;
};

/**
 * Logout user (client-side only, removes token)
 */
export const logout = (): void => {
    removeToken();
};


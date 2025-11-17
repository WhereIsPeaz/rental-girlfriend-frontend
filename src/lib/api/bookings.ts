// Bookings API calls
import api from '../api';
import {
    type Booking,
    type PaginatedResponse,
    type ApiResponse,
    BookingSchema,
    PaginatedResponseSchema,
    ApiResponseSchema,
} from '../types';

interface ListBookingsParams {
    customerId?: string;
    providerId?: string;
    serviceId?: string;
    status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    paymentStatus?: 'pending' | 'paid' | 'refunded' | 'partially_refunded';
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
}

interface CreateBookingRequest {
    serviceId: string;
    date: string;
    startTime: string;
    endTime: string;
    totalHours: number;
    totalAmount: number;
    depositAmount: number;
    specialRequests?: string;
    status?: 'pending' | 'confirmed';
    paymentStatus?: 'pending' | 'paid';
}

interface UpdateBookingRequest {
    date?: string;
    startTime?: string;
    endTime?: string;
    totalHours?: number;
    totalAmount?: number;
    depositAmount?: number;
    status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    paymentStatus?: 'pending' | 'paid' | 'refunded' | 'partially_refunded';
    specialRequests?: string;
    refundAmount?: number;
}

/**
 * List bookings with optional filters
 */
export const listBookings = async (
    params?: ListBookingsParams
): Promise<PaginatedResponse<Booking>> => {
    const response = await api.get<PaginatedResponse<Booking>>('/bookings', {
        params,
    });
    
    // Validate response
    const validated = PaginatedResponseSchema(BookingSchema).parse(response.data);

    return validated;
};

/**
 * Get a single booking by ID
 */
export const getBooking = async (id: string): Promise<Booking> => {
    const response = await api.get<ApiResponse<Booking>>(`/bookings/${id}`);
    
    // Validate response
    const validated = ApiResponseSchema(BookingSchema).parse(response.data);

    return validated.data!;
};

/**
 * Create a new booking
 */
export const createBooking = async (
    data: CreateBookingRequest
): Promise<Booking> => {
    const response = await api.post<ApiResponse<Booking>>('/bookings', data);
    
    // Validate response
    const validated = ApiResponseSchema(BookingSchema).parse(response.data);

    return validated.data!;
};

/**
 * Update a booking
 */
export const updateBooking = async (
    id: string,
    data: UpdateBookingRequest
): Promise<Booking> => {
    const response = await api.put<ApiResponse<Booking>>(`/bookings/${id}`, data);
    
    // Validate response
    const validated = ApiResponseSchema(BookingSchema).parse(response.data);

    return validated.data!;
};

/**
 * Delete a booking (admin only)
 */
export const deleteBooking = async (id: string): Promise<void> => {
    await api.delete(`/bookings/${id}`);
};


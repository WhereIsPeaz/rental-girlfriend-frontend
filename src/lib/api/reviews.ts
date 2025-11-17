// Reviews API calls
import api from '../api';
import {
    type Review,
    type PaginatedResponse,
    type ApiResponse,
    ReviewSchema,
    PaginatedResponseSchema,
    ApiResponseSchema,
} from '../types';

interface ListReviewsParams {
    serviceId?: string;
    customerId?: string;
    bookingId?: string;
    page?: number;
    limit?: number;
}

interface CreateReviewRequest {
    serviceId: string;
    rating: number;
    comment: string;
    bookingId?: string;
}

interface UpdateReviewRequest {
    rating?: number;
    comment?: string;
}

/**
 * List reviews with optional filters
 */
export const listReviews = async (
    params?: ListReviewsParams
): Promise<PaginatedResponse<Review>> => {
    const response = await api.get<PaginatedResponse<Review>>('/reviews', {
        params,
    });
    
    // Validate response
    const validated = PaginatedResponseSchema(ReviewSchema).parse(response.data);

    return validated;
};

/**
 * Get a single review by ID
 */
export const getReview = async (id: string): Promise<Review> => {
    const response = await api.get<ApiResponse<Review>>(`/reviews/${id}`);
    
    // Validate response
    const validated = ApiResponseSchema(ReviewSchema).parse(response.data);

    return validated.data!;
};

/**
 * Create a new review
 */
export const createReview = async (
    data: CreateReviewRequest
): Promise<Review> => {
    const response = await api.post<ApiResponse<Review>>('/reviews', data);
    
    // Validate response
    const validated = ApiResponseSchema(ReviewSchema).parse(response.data);

    return validated.data!;
};

/**
 * Update a review
 */
export const updateReview = async (
    id: string,
    data: UpdateReviewRequest
): Promise<Review> => {
    const response = await api.put<ApiResponse<Review>>(`/reviews/${id}`, data);
    
    // Validate response
    const validated = ApiResponseSchema(ReviewSchema).parse(response.data);

    return validated.data!;
};

/**
 * Delete a review
 */
export const deleteReview = async (id: string): Promise<void> => {
    await api.delete(`/reviews/${id}`);
};


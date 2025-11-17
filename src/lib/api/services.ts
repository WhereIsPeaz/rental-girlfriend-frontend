// Services API calls
import api from '../api';
import {
    type Service,
    type PaginatedResponse,
    type ApiResponse,
    ServiceSchema,
    PaginatedResponseSchema,
    ApiResponseSchema,
} from '../types';

interface ListServicesParams {
    page?: number;
    limit?: number;
    q?: string;
    providerId?: string;
    category?: string;
    active?: boolean;
}

interface CreateServiceRequest {
    name: string;
    description?: string;
    categories?: string[];
    priceHour: number;
    priceDay: number;
    images?: string[];
    active?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UpdateServiceRequest extends Partial<CreateServiceRequest> {}

/**
 * List services with optional filters
 */
export const listServices = async (
    params?: ListServicesParams
): Promise<PaginatedResponse<Service>> => {
    const response = await api.get<PaginatedResponse<Service>>('/services', {
        params,
    });
    
    // Validate response
    const validated = PaginatedResponseSchema(ServiceSchema).parse(response.data);

    return validated;
};

/**
 * Get a single service by ID
 */
export const getService = async (id: string): Promise<Service> => {
    const response = await api.get<ApiResponse<Service>>(`/services/${id}`);
    
    // Validate response
    const validated = ApiResponseSchema(ServiceSchema).parse(response.data);

    return validated.data!;
};

/**
 * Create a new service (provider only)
 */
export const createService = async (
    data: CreateServiceRequest
): Promise<Service> => {
    const response = await api.post<ApiResponse<Service>>('/services', data);
    
    // Validate response
    const validated = ApiResponseSchema(ServiceSchema).parse(response.data);

    return validated.data!;
};

/**
 * Update a service
 */
export const updateService = async (
    id: string,
    data: UpdateServiceRequest
): Promise<Service> => {
    const response = await api.put<ApiResponse<Service>>(`/services/${id}`, data);
    
    // Validate response
    const validated = ApiResponseSchema(ServiceSchema).parse(response.data);

    return validated.data!;
};

/**
 * Delete a service
 */
export const deleteService = async (id: string): Promise<void> => {
    await api.delete(`/services/${id}`);
};


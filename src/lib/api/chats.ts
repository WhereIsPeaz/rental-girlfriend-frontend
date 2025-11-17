// Chats API calls
import api from '../api'
import {
    type Chat,
    type ChatMessage,
    type ApiResponse,
    ChatSchema,
    ChatMessageSchema,
    ApiResponseSchema,
} from '../types'
import { z } from 'zod'

/**
 * List all chats for the current user
 */
export const listChats = async (): Promise<Chat[]> => {
    const response = await api.get<ApiResponse<Chat[]>>('/chats')

    // Validate response
    const validated = ApiResponseSchema(z.array(ChatSchema)).parse(
        response.data
    )

    return validated.data ?? []
}

/**
 * Get a chat by ID (includes all messages)
 */
export const getChat = async (chatId: string): Promise<Chat> => {
    const response = await api.get<ApiResponse<Chat>>(`/chats/${chatId}`)

    // Validate response
    const validated = ApiResponseSchema(ChatSchema).parse(response.data)

    return validated.data!
}

/**
 * Create a chat for a booking
 */
export const createChat = async (bookingId: string): Promise<Chat> => {
    const response = await api.post<ApiResponse<Chat>>('/chats', {
        bookingId,
    })

    // Validate response
    const validated = ApiResponseSchema(ChatSchema).parse(response.data)

    return validated.data!
}

/**
 * Send a message to a chat
 */
export const sendMessage = async (
    chatId: string,
    message: string
): Promise<ChatMessage> => {
    const response = await api.post<ApiResponse<ChatMessage>>(
        `/chats/${chatId}/messages`,
        {
            message,
        }
    )

    // Validate response
    const validated = ApiResponseSchema(ChatMessageSchema).parse(response.data)

    return validated.data!
}

/**
 * Get or create a chat for a booking
 * If chat doesn't exist for the booking, it will be created
 */
export const getOrCreateChatForBooking = async (
    bookingId: string
): Promise<Chat> => {
    try {
        // Try to create chat (will return existing if already exists)
        return await createChat(bookingId)
    } catch (error) {
        // If chat already exists (error 400), we need to find it
        // This is a fallback - ideally backend should have a dedicated endpoint
        throw error
    }
}

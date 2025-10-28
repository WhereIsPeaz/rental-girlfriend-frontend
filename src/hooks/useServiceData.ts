'use client'

import { useState, useEffect, useCallback } from 'react'
import {
    getServices,
    getUsers,
    getReviews,
    initializeSampleData,
    type Service,
    type User,
    type Review,
} from '@/lib/localStorage'

interface UseServiceDataReturn {
    service: Service | null
    provider: User | null
    reviews: Review[]
    loading: boolean
    error: string | null
}

export function useServiceData(serviceId: string | null): UseServiceDataReturn {
    const [service, setService] = useState<Service | null>(null)
    const [provider, setProvider] = useState<User | null>(null)
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const loadServiceData = useCallback(async () => {
        if (!serviceId) {
            setError('Service ID is required')
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            // Initialize sample data if needed
            initializeSampleData()

            // Simulate API delay for service data loading
            await new Promise((resolve) => setTimeout(resolve, 600))

            // Load service data
            const services = getServices()
            const foundService = services.find((s) => s.id === serviceId)

            if (!foundService) {
                setError('Service not found')
                return
            }

            setService(foundService)

            // Load provider data
            const users = getUsers()
            const foundProvider = users.find(
                (u) => u.id === foundService.providerId
            )
            setProvider(foundProvider ?? null)

            // Load reviews for this service
            const allReviews = getReviews()
            const serviceReviews = allReviews.filter(
                (r) => r.serviceId === serviceId
            )
            setReviews(serviceReviews)
        } catch (err) {
            console.error('Error loading service data:', err)
            setError('Failed to load service data')
        } finally {
            setLoading(false)
        }
    }, [serviceId])

    useEffect(() => {
        void loadServiceData()
    }, [loadServiceData])

    return {
        service,
        provider,
        reviews,
        loading,
        error,
    }
}

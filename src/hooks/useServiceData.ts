'use client'

import { useState, useEffect, useCallback } from 'react'
import * as servicesApi from '@/lib/api/services'
import * as usersApi from '@/lib/api/users'
import * as reviewsApi from '@/lib/api/reviews'
import type { Service, User, Review } from '@/lib/types'

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
            // Load service data from API
            const foundService = await servicesApi.getService(serviceId)

            if (!foundService) {
                setError('Service not found')
                return
            }

            setService(foundService)

            // Load provider data and reviews in parallel
            const [foundProvider, reviewsResponse] = await Promise.all([
                usersApi.getUser(foundService.providerId).catch(() => null),
                reviewsApi.listReviews({ serviceId, limit: 100 }),
            ])

            setProvider(foundProvider)
            setReviews(reviewsResponse.data)
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

'use client'

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    type ReactNode,
} from 'react'
import {
    getServices,
    getUsers,
    type Service,
    type User,
} from '@/lib/localStorage'

interface FilterState {
    query: string
    activity: string
    gender: string
    priceMin: string
    priceMax: string
    minRating: string
}

type SortOption = 'rating' | 'price-low' | 'price-high' | 'popular' | 'newest'

interface ServicesState {
    allServices: Service[]
    allProviders: User[]
    filteredServices: Service[]
    filters: FilterState
    sortBy: SortOption
    loading: boolean
    filterLoading: boolean
    loadData: () => Promise<void>
    applyFiltersAndSort: () => Promise<void>
    updateFilters: (newFilters: Partial<FilterState>) => void
    updateSort: (newSort: SortOption) => void
    clearFilters: () => void
}

const ServicesContext = createContext<ServicesState | undefined>(undefined)

interface ServicesProviderProps {
    children: ReactNode
    initialFilters?: Partial<FilterState>
    initialSort?: SortOption
}

export function ServicesProvider({
    children,
    initialFilters = {},
    initialSort = 'rating',
}: ServicesProviderProps) {
    const [allServices, setAllServices] = useState<Service[]>([])
    const [allProviders, setAllProviders] = useState<User[]>([])
    const [filteredServices, setFilteredServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [filterLoading, setFilterLoading] = useState(false)

    const [filters, setFilters] = useState<FilterState>({
        query: '',
        activity: '',
        gender: '',
        priceMin: '',
        priceMax: '',
        minRating: '',
        ...initialFilters,
    })

    const [sortBy, setSortBy] = useState<SortOption>(initialSort)

    const loadData = useCallback(async () => {
        setLoading(true)

        try {
            // Simulate API delay for services data loading
            await new Promise((resolve) => setTimeout(resolve, 600))

            const services = getServices().filter((service) => service.active)
            const users = getUsers().filter((user) => user.type === 'provider')

            setAllServices(services)
            setAllProviders(users)
        } catch (error) {
            console.error('Error loading services data:', error)
        } finally {
            setLoading(false)
        }
    }, [])

    const applyFiltersAndSort = useCallback(async () => {
        if (allServices.length === 0 || allProviders.length === 0) return

        setFilterLoading(true)

        // Simulate API delay for filtering/sorting
        await new Promise((resolve) =>
            setTimeout(resolve, Math.random() * 400 + 800)
        )

        let filtered = [...allServices]

        // Apply search query
        if (filters.query.trim()) {
            const query = filters.query.toLowerCase().trim()
            filtered = filtered.filter((service) => {
                const provider = allProviders.find(
                    (p) => p.id === service.providerId
                )
                const providerName = provider
                    ? `${provider.firstName} ${provider.lastName}`
                    : ''

                return (
                    service.name.toLowerCase().includes(query) ||
                    service.description.toLowerCase().includes(query) ||
                    providerName.toLowerCase().includes(query) ||
                    service.categories.some((cat) =>
                        cat.toLowerCase().includes(query)
                    )
                )
            })
        }

        // Apply activity filter
        if (filters.activity) {
            filtered = filtered.filter((service) =>
                service.categories.includes(filters.activity)
            )
        }

        // Apply gender filter
        if (filters.gender) {
            filtered = filtered.filter((service) => {
                const provider = allProviders.find(
                    (p) => p.id === service.providerId
                )
                return provider?.gender === filters.gender
            })
        }

        // Apply price range filter
        if (filters.priceMin) {
            const minPrice = parseInt(filters.priceMin)
            if (!isNaN(minPrice)) {
                filtered = filtered.filter(
                    (service) => service.priceHour >= minPrice
                )
            }
        }

        if (filters.priceMax) {
            const maxPrice = parseInt(filters.priceMax)
            if (!isNaN(maxPrice)) {
                filtered = filtered.filter(
                    (service) => service.priceHour <= maxPrice
                )
            }
        }

        // Apply minimum rating filter
        if (filters.minRating) {
            const minRating = parseFloat(filters.minRating)
            if (!isNaN(minRating)) {
                filtered = filtered.filter(
                    (service) => service.rating >= minRating
                )
            }
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return b.rating - a.rating
                case 'price-low':
                    return a.priceHour - b.priceHour
                case 'price-high':
                    return b.priceHour - a.priceHour
                case 'popular':
                    return b.bookingCount - a.bookingCount
                case 'newest':
                    return (
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                default:
                    return b.rating - a.rating
            }
        })

        setFilteredServices(filtered)
        setFilterLoading(false)
    }, [allServices, allProviders, filters, sortBy])

    const updateFilters = useCallback((newFilters: Partial<FilterState>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }))
    }, [])

    const updateSort = useCallback((newSort: SortOption) => {
        setSortBy(newSort)
    }, [])

    const clearFilters = useCallback(() => {
        const clearedFilters: FilterState = {
            query: '',
            activity: '',
            gender: '',
            priceMin: '',
            priceMax: '',
            minRating: '',
        }
        setFilters(clearedFilters)
        setSortBy('rating')
    }, [])

    const value: ServicesState = {
        allServices,
        allProviders,
        filteredServices,
        filters,
        sortBy,
        loading,
        filterLoading,
        loadData,
        applyFiltersAndSort,
        updateFilters,
        updateSort,
        clearFilters,
    }

    return (
        <ServicesContext.Provider value={value}>
            {children}
        </ServicesContext.Provider>
    )
}

export function useServices() {
    const context = useContext(ServicesContext)
    if (context === undefined) {
        throw new Error('useServices must be used within a ServicesProvider')
    }
    return context
}

'use client'
import { Suspense, useEffect } from 'react'
import { Kanit } from 'next/font/google'
import { useRouter, useSearchParams } from 'next/navigation'
import { ServicesProvider, useServices } from '@/contexts/ServicesContext'
import ServicesHeader from '@/components/services/ServicesHeader'
import SearchSection from '@/components/services/SearchSection'
import FilterControls from '@/components/services/FilterControls'
import ServiceGrid from '@/components/services/ServiceGrid'
import EmptyState from '@/components/services/EmptyState'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

function ServicePageContent() {
    const router = useRouter()
    const {
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
    } = useServices()

    // Load initial data
    useEffect(() => {
        void loadData()
    }, [loadData])

    // Apply filters and sort when data or filters change
    useEffect(() => {
        if (allServices.length > 0 && allProviders.length > 0) {
            void applyFiltersAndSort()
        }
    }, [allServices, allProviders, filters, sortBy, applyFiltersAndSort])

    // Update URL parameters
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const params = new URLSearchParams()

            if (filters.query) params.set('q', filters.query)
            if (filters.activity) params.set('activity', filters.activity)
            if (filters.gender) params.set('gender', filters.gender)
            if (filters.priceMin) params.set('priceMin', filters.priceMin)
            if (filters.priceMax) params.set('priceMax', filters.priceMax)
            if (filters.minRating) params.set('minRating', filters.minRating)
            if (sortBy !== 'rating') params.set('sort', sortBy)

            const queryString = params.toString()
            const newURL = queryString
                ? `/services?${queryString}`
                : '/services'

            router.replace(newURL, { scroll: false })
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [filters, sortBy, router])

    return (
        <main className={`${kanit.className} bg-[#F4F6F8]`}>
            <div className="mx-auto w-full md:max-w-290">
                <ServicesHeader />

                <SearchSection
                    filters={filters}
                    onFilterChange={updateFilters}
                    onClearFilters={clearFilters}
                />

                <FilterControls
                    resultCount={filteredServices.length}
                    loading={loading}
                    filterLoading={filterLoading}
                    sortBy={sortBy}
                    onSortChange={updateSort}
                />

                <div>
                    {filteredServices.length === 0 &&
                    !loading &&
                    !filterLoading ? (
                        <EmptyState
                            filters={filters}
                            onClearFilters={clearFilters}
                        />
                    ) : (
                        <ServiceGrid
                            services={filteredServices}
                            providers={allProviders}
                            loading={loading}
                            filterLoading={filterLoading}
                        />
                    )}
                </div>
            </div>
        </main>
    )
}

function ServicePageWithParams() {
    const searchParams = useSearchParams()

    // Extract initial filters from URL
    const initialFilters = {
        query: searchParams.get('q') ?? '',
        activity: searchParams.get('activity') ?? '',
        gender: searchParams.get('gender') ?? '',
        priceMin: searchParams.get('priceMin') ?? '',
        priceMax: searchParams.get('priceMax') ?? '',
        minRating: searchParams.get('minRating') ?? '',
    }

    const initialSort =
        (searchParams.get('sort') as
            | 'rating'
            | 'price-low'
            | 'price-high'
            | 'popular'
            | 'newest') ?? 'rating'

    return (
        <ServicesProvider
            initialFilters={initialFilters}
            initialSort={initialSort}
        >
            <ServicePageContent />
        </ServicesProvider>
    )
}

export default function ServicePage() {
    return (
        <Suspense
            fallback={
                <main className={`${kanit.className} bg-[#F4F6F8]`}>
                    <div className="mx-auto w-full md:max-w-290">
                        <ServicesHeader />
                        <div className="flex items-center justify-center py-12">
                            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-pink-500"></div>
                            <div className="ml-3 text-gray-500">
                                กำลังโหลดข้อมูล...
                            </div>
                        </div>
                    </div>
                </main>
            }
        >
            <ServicePageWithParams />
        </Suspense>
    )
}

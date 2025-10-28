'use client'

import React from 'react'
import SearchBox from '../SearchBox'

interface FilterState {
    query: string
    activity: string
    gender: string
    priceMin: string
    priceMax: string
    minRating: string
}

interface SearchSectionProps {
    filters: FilterState
    onFilterChange: (newFilters: Partial<FilterState>) => void
    onClearFilters: () => void
}

export default function SearchSection({
    filters,
    onFilterChange,
    onClearFilters,
}: SearchSectionProps) {
    return (
        <section className="mt-6 rounded-[12px] border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 text-[19px] font-normal text-[#212B36]">
                การจองล่าสุด
            </div>
            <SearchBox
                filters={filters}
                onFilterChange={onFilterChange}
                onClearFilters={onClearFilters}
            />
        </section>
    )
}

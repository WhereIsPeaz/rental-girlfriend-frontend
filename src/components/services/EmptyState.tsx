'use client'

import React from 'react'
import ActionButton from '../shared/ActionButton'

interface FilterState {
    query: string
    activity: string
    gender: string
    priceMin: string
    priceMax: string
    minRating: string
}

interface EmptyStateProps {
    filters: FilterState
    onClearFilters: () => void
}

export default function EmptyState({
    filters,
    onClearFilters,
}: EmptyStateProps) {
    const hasActiveFilters =
        filters.query ||
        filters.activity ||
        filters.gender ||
        filters.priceMin ||
        filters.priceMax ||
        filters.minRating

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center text-gray-500">
                <div className="mb-2 text-lg font-medium">
                    ไม่พบผู้ให้บริการ
                </div>
                <div className="text-sm">
                    ลองเปลี่ยนคำค้นหาหรือตัวกรองดูนะคะ
                </div>
            </div>
            {hasActiveFilters && (
                <ActionButton
                    onClick={onClearFilters}
                    variant="primary"
                    size="sm"
                    className="mt-4"
                >
                    ล้างตัวกรองทั้งหมด
                </ActionButton>
            )}
        </div>
    )
}

'use client'

import React, { useState, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

type SortOption = 'rating' | 'price-low' | 'price-high' | 'popular' | 'newest'

const sortOptions = [
    { value: 'rating', label: 'คะแนนสูงสุด' },
    { value: 'price-low', label: 'ราคาต่ำสุด' },
    { value: 'price-high', label: 'ราคาสูงสุด' },
    { value: 'popular', label: 'ยอดนิยม' },
    { value: 'newest', label: 'ใหม่ล่าสุด' },
] as const

interface FilterControlsProps {
    resultCount: number
    loading: boolean
    filterLoading: boolean
    sortBy: SortOption
    onSortChange: (newSort: SortOption) => void
}

export default function FilterControls({
    resultCount,
    loading,
    filterLoading,
    sortBy,
    onSortChange,
}: FilterControlsProps) {
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false)

    const currentSortLabel =
        sortOptions.find((option) => option.value === sortBy)?.label ??
        'เรียงโดย'

    const handleSortChange = (newSort: SortOption) => {
        onSortChange(newSort)
        setSortDropdownOpen(false)
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sortDropdownOpen &&
                !(event.target as Element).closest('.sort-dropdown')
            ) {
                setSortDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [sortDropdownOpen])

    return (
        <div className="mt-6 flex items-center justify-between">
            <p className="text-[13px] font-normal text-[#6B7280]">
                {loading || filterLoading
                    ? 'กำลังโหลด...'
                    : `พบ ${resultCount} ผู้ให้บริการ`}
            </p>

            <div className="sort-dropdown relative">
                <button
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
                    type="button"
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                >
                    {currentSortLabel}
                    <ChevronDown
                        className={`h-4 w-4 transition-transform ${sortDropdownOpen ? 'rotate-180' : ''}`}
                    />
                </button>

                {sortDropdownOpen && (
                    <div className="absolute top-full right-0 z-10 mt-1 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                        {sortOptions.map((option) => (
                            <button
                                key={option.value}
                                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-gray-700 first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50"
                                onClick={() => handleSortChange(option.value)}
                            >
                                {option.label}
                                {sortBy === option.value && (
                                    <Check className="h-4 w-4 text-pink-500" />
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

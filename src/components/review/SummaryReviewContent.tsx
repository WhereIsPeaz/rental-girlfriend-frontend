'use client'

import React from 'react'
import type { Review, Booking } from '@/lib/localStorage'
import ReviewStars from './ReviewStars'
import { Trash } from 'lucide-react'

export default function SummaryReviewContent({
    review,
    booking,
    onOpenForm,
    onDelete,
}: {
    review: Review | null
    booking: Booking
    onOpenForm: () => void
    onDelete?: () => void
}) {
    return (
        <div>
            {/* ⭐ มีรีวิวแล้ว */}
            {review ? (
                <div>
                    <ReviewStars review={review} />

                    <p className="mt-4 text-gray-700">{review.comment}</p>
                    <div className="mt-4">
                        <button
                            onClick={onDelete}
                            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                        >
                            <Trash className="h-4 w-4" />
                            ลบรีวิว
                        </button>
                    </div>
                </div>
            ) : (
                /* ⭐ ยังไม่รีวิว */
                <div className="text-center py-12">
                    <svg
                        className="h-16 w-16 text-gray-300 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 17.25l-3.955 2.078.757-4.41L6 11.672l4.427-.644L12 7m0 0l1.573 3.985L18 11.672l-2.802 3.246.757 4.41z"
                        />
                    </svg>

                    <p className="mt-3 text-gray-500">
                        คุณยังไม่ได้รีวิวการจองนี้
                    </p>

                    <button
                        onClick={onOpenForm}
                        className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-2 rounded-xl"
                    >
                        เขียนรีวิว
                    </button>
                </div>
            )}
        </div>
    )
}
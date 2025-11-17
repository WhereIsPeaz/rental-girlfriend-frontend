'use client'

import { Star } from 'lucide-react'
import React from 'react'
import type { Review } from '@/lib/localStorage'

export default function ReviewStars({ review }: { review: Review }) {
    return (
        <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => {
                const starNum = i + 1
                const isFull = review.rating >= starNum
                const isHalf =
                    review.rating >= starNum - 0.5 &&
                    review.rating < starNum

                return (
                    <div key={i} className="relative">
                        <Star
                            className={`h-6 w-6 ${
                                isFull
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                            }`}
                        />

                        {isHalf && (
                            <div
                                className="absolute top-0 left-0 h-full overflow-hidden"
                                style={{ width: '50%' }}
                            >
                                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                            </div>
                        )}
                    </div>
                )
            })}

            <span className="ml-3 text-gray-500 text-sm">
                {new Date(review.createdAt).toLocaleDateString('th-TH')}
            </span>
        </div>
    )
}
'use client'

import React from 'react'
import { Star } from 'lucide-react'
import { type Service, type Review } from '@/lib/localStorage'

interface ServiceReviewsProps {
    service: Service
    reviews: Review[]
}

export default function ServiceReviews({
    service,
    reviews,
}: ServiceReviewsProps) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                    รีวิวจากลูกค้า ({reviews.length})
                </h2>
                <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-current text-yellow-400" />
                    <span className="text-lg font-semibold">
                        {service.rating}
                    </span>
                    <span className="text-gray-500">
                        จาก {service.reviewCount} รีวิว
                    </span>
                </div>
            </div>

            {reviews.length > 0 ? (
                <div className="space-y-4">
                    {reviews.slice(0, 5).map((review) => (
                        <div
                            key={review.id}
                            className="border-b border-gray-100 pb-4 last:border-b-0"
                        >
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${
                                                i < review.rating
                                                    ? 'fill-current text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {new Date(
                                        review.createdAt
                                    ).toLocaleDateString('th-TH')}
                                </span>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-8 text-center text-gray-500">
                    ยังไม่มีรีวิว
                </div>
            )}
        </div>
    )
}

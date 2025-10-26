'use client'

import React from 'react'

interface CardFooterProps {
    reviewCount: number
    review?: string
}

export default function CardFooter({ reviewCount, review }: CardFooterProps) {
    return (
        <div className="px-5">
            <hr className="border-0 border-t border-t-[#E1E7F4]/60" />
            
            {/* รีวิว/การจอง */}
            <div className="mt-3 mb-5 flex flex-wrap items-center gap-3 text-[11px] font-normal text-gray-500">
                <span>{reviewCount} รีวิว</span>
                {review && <span className="text-gray-400">|</span>}
                {review && <span>{review}</span>}
            </div>
        </div>
    )
}

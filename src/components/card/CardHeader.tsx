'use client'

import React from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { isBase64Image } from '@/lib/imageUtils'

interface CardHeaderProps {
    imgSrc: string
    name: string
    type?: string
    rating: number
}

export default function CardHeader({ imgSrc, name, type, rating }: CardHeaderProps) {
    return (
        <div className="relative h-60 w-full">
            {isBase64Image(imgSrc) ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                    src={imgSrc}
                    alt={name}
                    className="h-full w-full object-cover object-[50%_35%]"
                />
            ) : (
                <Image
                    src={imgSrc}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover object-[50%_35%]"
                    priority
                />
            )}
            {type && (
                <span className="absolute bottom-4 left-4 rounded-full bg-[#EAB308] px-3 py-1 text-xs font-semibold text-white shadow">
                    {type}
                </span>
            )}
            <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-sm text-yellow-500 shadow-sm backdrop-blur">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-gray-800">
                    {rating.toFixed(1)}
                </span>
            </div>
        </div>
    )
}
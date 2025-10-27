'use client'

import React from 'react'
import { MapPin } from 'lucide-react'
import ActivityBox from '../ActivityBox'

interface CardContentProps {
    name: string
    age: number
    location: string
    description: string
    categories?: string[]
}

export default function CardContent({
    name,
    age,
    location,
    description,
    categories = [],
}: CardContentProps) {
    return (
        <div className="pt-3 pr-5 pl-5">
            {/* ชื่อ */}
            <div className="flex items-start justify-between gap-4">
                <h3 className="text-4 leading-snug font-normal">{name}</h3>
            </div>

            {/* อายุ + โลเคชัน */}
            <div className="mt-3 mb-3 flex flex-wrap items-center gap-4 text-[11px] font-normal text-gray-500">
                <span>{age} ปี</span>
                <span className="flex items-center gap-1 text-[11px] font-normal">
                    <MapPin className="h-4 w-4" />
                    {location}
                </span>
            </div>

            {/* คำอธิบาย */}
            <p className="mt-3 line-clamp-2 text-sm text-[11px] font-normal text-gray-500">
                {description}
            </p>

            {/* แท็กกิจกรรม */}
            <ActivityBox activities={categories} />
        </div>
    )
}

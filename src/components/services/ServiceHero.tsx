'use client'

import React from 'react'
import Image from 'next/image'
import { Clock, MapPin, Star } from 'lucide-react'
import { type Service, type User } from '@/lib/localStorage'

interface ServiceHeroProps {
    service: Service
    provider: User
}

export default function ServiceHero({ service, provider }: ServiceHeroProps) {
    const age =
        new Date().getFullYear() - new Date(provider.birthdate).getFullYear()

    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="relative h-64">
                <Image
                    src={service.images[0] ?? provider.img ?? '/img/p1.jpg'}
                    alt={provider.firstName}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                    <h1 className="mb-2 text-3xl font-bold">
                        {provider.firstName} {provider.lastName}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{age} ปี</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>กรุงเทพมหานคร</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-current text-yellow-400" />
                            <span>
                                {service.rating} ({service.reviewCount} รีวิว)
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

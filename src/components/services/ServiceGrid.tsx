'use client'

import React from 'react'
import Card from '../Card'
import LoadingSpinner from '../shared/LoadingSpinner'
import { type Service, type User } from '@/lib/localStorage'

interface ServiceGridProps {
    services: Service[]
    providers: User[]
    loading: boolean
    filterLoading: boolean
}

export default function ServiceGrid({
    services,
    providers,
    loading,
    filterLoading,
}: ServiceGridProps) {
    if (loading) {
        return (
            <LoadingSpinner
                size="lg"
                text="กำลังโหลดข้อมูล..."
                className="py-12"
            />
        )
    }

    if (filterLoading) {
        return (
            <LoadingSpinner size="lg" text="กำลังค้นหา..." className="py-12" />
        )
    }

    return (
        <div className="grid grid-cols-1 gap-4 pb-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
                const provider = providers.find(
                    (p) => p.id === service.providerId
                )
                if (!provider) return null

                // คำนวณอายุจากวันเกิด
                const birthYear = new Date(provider.birthdate).getFullYear()
                const currentYear = new Date().getFullYear()
                const age = currentYear - birthYear

                return (
                    <Card
                        key={service.id}
                        id={service.id}
                        Name={service.name}
                        Age={age}
                        Rating={service.rating}
                        Location="กรุงเทพมหานคร"
                        Description={service.description}
                        Type={service.rating >= 4.8 ? 'แนะนำ' : ''}
                        PriceHr={service.priceHour}
                        PriceD={service.priceDay}
                        Review={`จองแล้ว ${service.bookingCount} ครั้ง`}
                        ReviewCount={service.reviewCount}
                        imgSrc={service.images[0] ?? provider.img}
                        buttonTitle="ดูโปรไฟล์"
                        Categories={service.categories}
                    />
                )
            })}
        </div>
    )
}

'use client'

import React from 'react'
import { Calendar } from 'lucide-react'
import ActionButton from '../shared/ActionButton'
import { type Service } from '@/lib/localStorage'

interface ServicePricingProps {
    service: Service
    onBooking: () => void
}

export default function ServicePricing({
    service,
    onBooking,
}: ServicePricingProps) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                ราคาบริการ
            </h3>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">ต่อชั่วโมง</span>
                    <span className="text-2xl font-bold text-gray-900">
                        ฿{service.priceHour.toLocaleString()}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">ต่อวัน (8 ชั่วโมง)</span>
                    <span className="text-xl font-semibold text-gray-900">
                        ฿{service.priceDay.toLocaleString()}
                    </span>
                </div>
            </div>

            <div className="mt-6">
                <ActionButton
                    onClick={onBooking}
                    variant="primary"
                    size="lg"
                    fullWidth
                    icon={Calendar}
                    iconPosition="left"
                >
                    จองเลย
                </ActionButton>
            </div>
        </div>
    )
}

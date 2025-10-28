'use client'

import React from 'react'
import { Award, Star } from 'lucide-react'
import { type Service } from '@/lib/localStorage'

interface ServiceStatsProps {
    service: Service
}

export default function ServiceStats({ service }: ServiceStatsProps) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">สถิติ</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-pink-500" />
                        <span className="text-gray-600">การจองทั้งหมด</span>
                    </div>
                    <span className="font-semibold">
                        {service.bookingCount}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span className="text-gray-600">คะแนนเฉลี่ย</span>
                    </div>
                    <span className="font-semibold">{service.rating}</span>
                </div>
            </div>
        </div>
    )
}

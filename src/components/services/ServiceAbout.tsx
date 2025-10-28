'use client'

import React from 'react'
import { type Service } from '@/lib/localStorage'

interface ServiceAboutProps {
    service: Service
}

export default function ServiceAbout({ service }: ServiceAboutProps) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
                {service.name}
            </h2>
            <p className="mb-6 leading-relaxed text-gray-600">
                {service.description}
            </p>

            {/* Interests */}
            <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-gray-900">
                    ประเภทบริการ
                </h3>
                <div className="flex flex-wrap gap-2">
                    {service.categories.map((category, index) => (
                        <span
                            key={index}
                            className="rounded-lg bg-pink-50 px-3 py-1 text-sm text-pink-600"
                        >
                            {category}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

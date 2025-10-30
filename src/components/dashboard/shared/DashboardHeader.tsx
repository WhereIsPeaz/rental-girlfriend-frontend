'use client'

import React from 'react'

interface DashboardHeaderProps {
    title: string
    subtitle: string
}

export default function DashboardHeader({
    title,
    subtitle,
}: DashboardHeaderProps) {
    return (
        <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600">{subtitle}</p>
        </div>
    )
}

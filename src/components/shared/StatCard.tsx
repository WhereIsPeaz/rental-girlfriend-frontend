'use client'

import React from 'react'
import { type LucideIcon } from 'lucide-react'

interface StatCardProps {
    title: string
    value: string | number
    icon?: LucideIcon
    iconColor?: string
    bgColor?: string
    textColor?: string
    subtitle?: string
    trend?: {
        value: number
        isPositive: boolean
    }
    className?: string
}

export default function StatCard({
    title,
    value,
    icon: Icon,
    iconColor = 'text-gray-500',
    bgColor = 'bg-white',
    textColor = 'text-gray-900',
    subtitle,
    trend,
    className = '',
}: StatCardProps) {
    return (
        <div className={`rounded-2xl p-6 shadow-sm ${bgColor} ${className}`}>
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className={`text-2xl font-bold ${textColor}`}>
                        {typeof value === 'number'
                            ? value.toLocaleString()
                            : value}
                    </p>
                    {subtitle && (
                        <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
                    )}
                    {trend && (
                        <div
                            className={`mt-2 flex items-center text-sm ${
                                trend.isPositive
                                    ? 'text-green-600'
                                    : 'text-red-600'
                            }`}
                        >
                            <span>
                                {trend.isPositive ? '+' : ''}
                                {trend.value}%
                            </span>
                            <span className="ml-1 text-gray-500">
                                vs last month
                            </span>
                        </div>
                    )}
                </div>
                {Icon && <Icon className={`h-8 w-8 ${iconColor}`} />}
            </div>
        </div>
    )
}

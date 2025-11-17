'use client'

import React from 'react'

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl'
    color?: 'pink' | 'blue' | 'gray' | 'green'
    text?: string
    className?: string
}

const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
}

const colorClasses = {
    pink: 'border-pink-500',
    blue: 'border-blue-500',
    gray: 'border-gray-500',
    green: 'border-green-500',
}

export default function LoadingSpinner({
    size = 'md',
    color = 'pink',
    text,
    className = '',
}: LoadingSpinnerProps) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div
                className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]}`}
            />
            {text && <div className="ml-3 text-gray-500">{text}</div>}
        </div>
    )
}

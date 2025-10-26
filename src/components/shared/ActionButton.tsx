'use client'

import React, { type ReactNode } from 'react'
import { type LucideIcon } from 'lucide-react'

interface ActionButtonProps {
    children: ReactNode
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    loading?: boolean
    icon?: LucideIcon
    iconPosition?: 'left' | 'right'
    className?: string
    fullWidth?: boolean
}

const variantClasses = {
    primary:
        'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
}

const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
}

export default function ActionButton({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    icon: Icon,
    iconPosition = 'left',
    className = '',
    fullWidth = false,
}: ActionButtonProps) {
    const isDisabled = disabled || loading

    const buttonContent = (
        <>
            {loading && (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-current" />
            )}
            {Icon && !loading && iconPosition === 'left' && (
                <Icon className="mr-2 h-5 w-5" />
            )}
            {children}
            {Icon && !loading && iconPosition === 'right' && (
                <Icon className="ml-2 h-5 w-5" />
            )}
        </>
    )

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={`inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className} `}
        >
            {buttonContent}
        </button>
    )
}

'use client'

import React, { type ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: ReactNode
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
    showCloseButton?: boolean
}

const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
}

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = 'md',
    showCloseButton = true,
}: ModalProps) {
    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div
                className={`mx-4 w-full ${maxWidthClasses[maxWidth]} rounded-2xl bg-white p-6 shadow-xl`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
                {(title || showCloseButton) && (
                    <div className="mb-4 flex items-center justify-between">
                        {title && (
                            <h3 className="text-xl font-semibold text-gray-900">
                                {title}
                            </h3>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                                aria-label="Close modal"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                )}
                {children}
            </div>
        </div>
    )
}

'use client'

import React, { forwardRef } from 'react'

interface FormFieldProps {
    label?: string
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
    placeholder?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    error?: string
    required?: boolean
    disabled?: boolean
    className?: string
    inputClassName?: string
    min?: number
    max?: number
    step?: number
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
    (
        {
            label,
            type = 'text',
            placeholder,
            value,
            onChange,
            error,
            required = false,
            disabled = false,
            className = '',
            inputClassName = '',
            min,
            max,
            step,
        },
        ref
    ) => {
        return (
            <div className={`mb-4 ${className}`}>
                {label && (
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        {label}
                        {required && (
                            <span className="ml-1 text-red-500">*</span>
                        )}
                    </label>
                )}
                <input
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    min={min}
                    max={max}
                    step={step}
                    className={`w-full rounded-xl border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-pink-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 ${error ? 'border-red-300' : 'border-gray-300'} ${inputClassName} `}
                />
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
        )
    }
)

FormField.displayName = 'FormField'

export default FormField

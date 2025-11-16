'use client'

import React, { useState, useCallback } from 'react'
import renderStarIcon from './renderStar'
import { X } from 'lucide-react'

interface ReviewFormProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: { rating: number; comment: string }) => void
    bookingId: string
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
}) => {
    const MIN_CHAR_LENGTH = 10
    const [rating, setRating] = useState<number>(0)
    const [hoverRating, setHoverRating] = useState<number>(0)
    const [comment, setComment] = useState<string>('')

    const isValid = rating > 0 && comment.length >= MIN_CHAR_LENGTH

    const handleSubmit = () => {
        if (isValid) {
            onSubmit({ rating, comment })
            setRating(0)
            setComment('')
            onClose()
        }
    }

    const displayRating = hoverRating || rating

    if (!isOpen) return null

    return (
        <div className="font-inter fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-all">
            <div className="animate-in fade-in zoom-in w-full max-w-[500px] transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all duration-200">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">
                        เขียนรีวิว
                    </h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="mb-6 space-y-2">
                    <label className="text-base font-medium text-slate-700">
                        ให้คะแนนด้วยดาว{' '}
                        <span className="text-pink-500">*</span>{' '}
                    </label>

                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((index) => (
                            <div
                                key={index}
                                className="relative flex items-center transition-transform hover:scale-105"
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                {renderStarIcon(index, displayRating)}

                                <div
                                    className="absolute top-0 left-0 z-10 h-full w-1/2 cursor-pointer"
                                    onMouseEnter={() =>
                                        setHoverRating(index - 0.5)
                                    }
                                    onClick={() => setRating(index - 0.5)}
                                ></div>

                                <div
                                    className="absolute top-0 right-0 z-10 h-full w-1/2 cursor-pointer"
                                    onMouseEnter={() => setHoverRating(index)}
                                    onClick={() => setRating(index)}
                                ></div>
                            </div>
                        ))}

                        {rating > 0 && (
                            <p className="text-l ml-4 text-slate-700">
                                {rating.toFixed(1).replace('.0', '')} ดาว
                            </p>
                        )}
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                        คลิกที่ครึ่งซ้ายของดาวเพื่อให้คะแนนครึ่งดาว
                        คลิกที่ครึ่งขวาเพื่อให้คะแนนเต็มดาว
                    </p>
                </div>

                <div className="mb-2 space-y-2">
                    <label className="text-base font-medium text-slate-700">
                        เขียนความคิดเห็น{' '}
                        <span className="text-pink-500">*</span>
                    </label>
                    <div className="relative">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="แบ่งปันประสบการณ์ของคุณกับบริการนี้..."
                            className="min-h-[150px] w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="mb-8 flex items-center justify-between">
                    <p
                        className={`text-sm transition-colors ${
                            comment.length >= MIN_CHAR_LENGTH
                                ? 'text-green-600'
                                : 'text-slate-500'
                        }`}
                    >
                        {comment.length}/{MIN_CHAR_LENGTH} ตัวอักษรขั้นต่ำ
                    </p>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="cursor-pointer rounded-xl border border-slate-200 px-6 py-2.5 text-base font-bold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                    >
                        ยกเลิก
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!isValid}
                        className={`rounded-xl px-8 py-2.5 text-base font-bold text-white shadow-sm transition-all duration-300 ${
                            isValid
                                ? 'transform cursor-pointer bg-gradient-to-r from-pink-500 to-rose-500 hover:-translate-y-0.5 hover:from-pink-600 hover:to-rose-600 hover:shadow-lg'
                                : 'cursor-not-allowed bg-pink-200'
                        }`}
                    >
                        ส่งรีวิว
                    </button>
                </div>
            </div>
        </div>
    )
}

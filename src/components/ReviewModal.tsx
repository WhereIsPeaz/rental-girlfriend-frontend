'use client'

import React, { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import Modal from './shared/Modal'
import toast from 'react-hot-toast'

interface ReviewModalProps {
    open: boolean
    onClose: () => void
    bookingId: string
    serviceId: string
    customerId: string
    onSubmit?: () => void
}

export default function ReviewModal({
    open,
    onClose,
    bookingId,
    serviceId,
    customerId,
    onSubmit,
}: ReviewModalProps) {
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Reset form when modal opens/closes
    useEffect(() => {
        if (!open) {
            setRating(0)
            setHoveredRating(0)
            setComment('')
        }
    }, [open])

    const handleStarClick = (value: number) => {
        setRating(value)
    }

    const handleStarHover = (value: number) => {
        setHoveredRating(value)
    }

    const handleStarLeave = () => {
        setHoveredRating(0)
    }

    const formatRating = (value: number): string => {
        if (value % 1 === 0) {
            return `${value} ดาว`
        } else {
            return `${value} ดาว (${Math.floor(value)}.5)`
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validation
        if (rating === 0) {
            toast.error('กรุณาให้คะแนนด้วยดาว')
            return
        }

        if (!comment.trim()) {
            toast.error('กรุณาเขียนความคิดเห็น')
            return
        }

        if (comment.trim().length < 10) {
            toast.error('ความคิดเห็นต้องมีอย่างน้อย 10 ตัวอักษร')
            return
        }

        setIsSubmitting(true)

        try {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 800))

            // Import addReview dynamically to avoid circular dependencies
            const { addReview } = await import('@/lib/localStorage')

            addReview({
                serviceId,
                customerId,
                rating,
                comment: comment.trim(),
                bookingId,
            })

            toast.success('รีวิวสำเร็จ! ขอบคุณสำหรับความคิดเห็นของคุณ', {
                duration: 3000,
            })

            // Reset form
            setRating(0)
            setHoveredRating(0)
            setComment('')

            // Call onSubmit callback if provided
            if (onSubmit) {
                onSubmit()
            }

            // Close modal
            onClose()
        } catch (error) {
            console.error('Error submitting review:', error)
            toast.error('เกิดข้อผิดพลาดในการส่งรีวิว กรุณาลองใหม่อีกครั้ง')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            title="เขียนรีวิว"
            maxWidth="lg"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating Section */}
                <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">
                        ให้คะแนนด้วยดาว * (คลิกที่ดาวเพื่อให้คะแนนครึ่งดาว)
                    </label>
                    <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => {
                            const fullStarValue = star
                            const halfStarValue = star - 0.5
                            const displayRating = hoveredRating || rating

                            return (
                                <div
                                    key={star}
                                    className="relative inline-block"
                                >
                                    {/* Half star button (left half) */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleStarClick(halfStarValue)
                                        }
                                        onMouseEnter={() =>
                                            handleStarHover(halfStarValue)
                                        }
                                        onMouseLeave={handleStarLeave}
                                        className="absolute left-0 top-0 z-10 h-8 w-4 cursor-pointer"
                                        aria-label={`ให้ ${halfStarValue} ดาว`}
                                    />
                                    {/* Full star button (right half) */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleStarClick(fullStarValue)
                                        }
                                        onMouseEnter={() =>
                                            handleStarHover(fullStarValue)
                                        }
                                        onMouseLeave={handleStarLeave}
                                        className="absolute right-0 top-0 z-10 h-8 w-4 cursor-pointer"
                                        aria-label={`ให้ ${fullStarValue} ดาว`}
                                    />
                                    {/* Star display */}
                                    <div className="relative">
                                        {/* Background star (always gray) */}
                                        <Star className="h-8 w-8 text-gray-300" />
                                        {/* Foreground star (filled based on rating) */}
                                        <div
                                            className="absolute left-0 top-0 overflow-hidden"
                                            style={{
                                                width:
                                                    displayRating >= fullStarValue
                                                        ? '100%'
                                                        : displayRating >=
                                                          halfStarValue
                                                          ? '50%'
                                                          : '0%',
                                            }}
                                        >
                                            <Star className="h-8 w-8 fill-current text-yellow-400" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        {rating > 0 && (
                            <span className="ml-3 text-sm font-medium text-gray-700">
                                {formatRating(rating)}
                            </span>
                        )}
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                        คลิกที่ครึ่งซ้ายของดาวเพื่อให้คะแนนครึ่งดาว
                        คลิกที่ครึ่งขวาเพื่อให้คะแนนเต็มดาว
                    </p>
                </div>

                {/* Comment Section */}
                <div>
                    <label
                        htmlFor="comment"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        เขียนความคิดเห็น *
                    </label>
                    <textarea
                        id="comment"
                        rows={6}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="แบ่งปันประสบการณ์ของคุณกับบริการนี้..."
                        className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                        minLength={10}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        {comment.length}/10 ตัวอักษรขั้นต่ำ
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="rounded-xl border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                    >
                        ยกเลิก
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting || rating === 0 || !comment.trim()}
                        className="rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-2 font-semibold text-white transition-all hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'กำลังส่ง...' : 'ส่งรีวิว'}
                    </button>
                </div>
            </form>
        </Modal>
    )
}


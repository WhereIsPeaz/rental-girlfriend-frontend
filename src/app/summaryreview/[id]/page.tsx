'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Star } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

import {
    getBookingById,
    getUsers,
    getServices,
    getReviews,
    addReview,
    type Booking,
    type User,
    type Review,
    type Service,
    initializeSampleData
} from '@/lib/localStorage'

import { ReviewForm } from '@/components/review/implementForm'
import { useAuthContext } from '@/contexts/AuthContext'

export default function SummaryReviewPage() {
    const params = useParams()
    const router = useRouter()
    const { user, isAuthenticated } = useAuthContext()

    const bookingId = typeof params.id === 'string' ? params.id : null

    const [booking, setBooking] = useState<Booking | null>(null)
    const [provider, setProvider] = useState<User | null>(null)
    const [service, setService] = useState<Service | null>(null)
    const [review, setReview] = useState<Review | null>(null)

    const [loading, setLoading] = useState(true)
    const [openForm, setOpenForm] = useState(false)

    useEffect(() => {
        initializeSampleData()

        if (!isAuthenticated || !user) {
            router.push('/login')
            return
        }

        if (!bookingId) {
            router.push('/bookings')
            return
        }

        const foundBooking = getBookingById(bookingId)
        if (!foundBooking) {
            toast.error('ไม่พบข้อมูลการจอง')
            router.push('/bookings')
            return
        }

        // ผู้ใช้ต้องเป็นเจ้าของ booking
        if (foundBooking.customerId !== user.id) {
            toast.error('คุณไม่มีสิทธิ์เข้าถึงรายการจองนี้')
            router.push('/bookings')
            return
        }

        setBooking(foundBooking)

        const users = getUsers()
        const providerData = users.find(u => u.id === foundBooking.providerId)
        setProvider(providerData ?? null)

        const services = getServices()
        const serviceData = services.find(s => s.id === foundBooking.serviceId)
        setService(serviceData ?? null)

        // ❗ ดึงรีวิวโดยไม่ต้องแก้ localStorage
        const allReviews = getReviews()
        const userReview = allReviews.find(
            r => r.customerId === user.id &&
                 r.serviceId === foundBooking.serviceId
        )
        setReview(userReview ?? null)

        setLoading(false)
    }, [bookingId, user, isAuthenticated, router])

    // เมื่อกดส่งรีวิว
    const handleSubmitReview = (data: { bookingId: string; rating: number; comment: string }) => {
        if (!booking || !user) return

        addReview({
            customerId: user.id,
            serviceId: booking.serviceId,
            rating: data.rating,
            comment: data.comment
        })

        const allReviews = getReviews()
        const updatedReview = allReviews.find(
            r => r.customerId === user.id && r.serviceId === booking.serviceId
        )

        setReview(updatedReview ?? null)
        setOpenForm(false)
        toast.success('ส่งรีวิวเรียบร้อยแล้ว')
    }

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="animate-spin h-10 w-10 border-2 border-pink-500 border-t-transparent rounded-full"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">

                <Link
                    href={`/bookings/${bookingId}`}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft size={18} />
                    กลับไปหน้ารายละเอียดการจอง
                </Link>

                <h1 className="text-3xl font-bold text-gray-900 mt-6">รีวิวของคุณ</h1>

                <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">

                    {/* ⭐ มีรีวิวแล้ว */}
                    {review ? (
                        <div>
                            <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => {
                                    const starNum = i + 1
                                    const isFull = review.rating >= starNum
                                    const isHalf =
                                        review.rating >= starNum - 0.5 &&
                                        review.rating < starNum

                                    return (
                                        <div key={i} className="relative">
                                            <Star
                                                className={`h-6 w-6 ${
                                                    isFull
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-300'
                                                }`}
                                            />

                                            {isHalf && (
                                                <div
                                                    className="absolute top-0 left-0 h-full overflow-hidden"
                                                    style={{ width: '50%' }}
                                                >
                                                    <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                                <span className="ml-3 text-gray-500 text-sm">
                                    {new Date(review.createdAt).toLocaleDateString('th-TH')}
                                </span>
                            </div>

                            <p className="mt-4 text-gray-700">{review.comment}</p>
                        </div>
                    ) : (
                        // ⭐ ยังไม่รีวิว
                        <div className="text-center py-12">
                            <Star className="h-16 w-16 text-gray-300 mx-auto" />
                            <p className="mt-3 text-gray-500">คุณยังไม่ได้รีวิวการจองนี้</p>

                            <button
                                onClick={() => setOpenForm(true)}
                                className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-2 rounded-xl"
                            >
                                เขียนรีวิว
                            </button>
                        </div>
                    )}
                </div>

                {/* ⭐ Modal ฟอร์มรีวิว */}
                {booking && user && (
                    <ReviewForm
                        isOpen={openForm}
                        onClose={() => setOpenForm(false)}
                        bookingId={booking.id}
                        onSubmit={handleSubmitReview}
                    />
                )}

            </div>
        </div>
    )
}

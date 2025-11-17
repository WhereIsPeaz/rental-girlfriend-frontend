'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import {
    Calendar,
    Clock,
    User,
    MessageCircle,
    Star,
    ArrowLeft,
} from 'lucide-react'
import { useAuthContext } from '@/contexts/AuthContext'
import {
    getBookingById,
    getUsers,
    getServices,
    getReviewByBooking,
    initializeSampleData,
    type User as UserType,
    type Booking,
    type Review,
    type Service,
} from '@/lib/localStorage'
import Link from 'next/link'
import toast from 'react-hot-toast'
import ReviewModal from '@/components/ReviewModal'

export default function BookingDetailPage() {
    const params = useParams()
    const id = typeof params.id === 'string' ? params.id : null
    const router = useRouter()
    const { user, isAuthenticated } = useAuthContext()

    const [booking, setBooking] = useState<Booking | null>(null)
    const [provider, setProvider] = useState<UserType | null>(null)
    const [service, setService] = useState<Service | null>(null)
    const [review, setReview] = useState<Review | null>(null)
    const [loading, setLoading] = useState(true)
    const [reviewModalOpen, setReviewModalOpen] = useState(false)

    useEffect(() => {
        // Initialize sample data if needed
        initializeSampleData()

        // Check authentication
        if (!isAuthenticated || !user) {
            router.push('/login')
            return
        }

        if (user.type !== 'customer') {
            toast.error('เฉพาะลูกค้าเท่านั้นที่สามารถดูรายละเอียดการจองได้')
            router.push('/bookings')
            return
        }

        if (!id) {
            router.push('/bookings')
            return
        }

        // Load booking data
        const bookingData = getBookingById(id)

        if (!bookingData) {
            toast.error('ไม่พบการจองที่ต้องการ')
            router.push('/bookings')
            return
        }

        // Check if booking belongs to current user
        if (bookingData.customerId !== user.id) {
            toast.error('คุณไม่มีสิทธิ์เข้าถึงการจองนี้')
            router.push('/bookings')
            return
        }

        setBooking(bookingData)

        // Load provider data
        const users = getUsers()
        const providerData = users.find((u) => u.id === bookingData.providerId)
        setProvider(providerData ?? null)

        // Load service data
        const services = getServices()
        const serviceData = services.find(
            (s) => s.id === bookingData.serviceId
        )
        setService(serviceData ?? null)

        // Load review data
        const reviewData = getReviewByBooking(id)
        setReview(reviewData)

        setLoading(false)
    }, [id, router, isAuthenticated, user])

    const handleReviewClick = () => {
        if (!user || !booking) return

        if (review) {
            toast.error('คุณได้รีวิวการจองนี้แล้ว', {
                duration: 3000,
            })
            return
        }

        if (booking.status !== 'completed') {
            toast.error('สามารถรีวิวได้เฉพาะการจองที่เสร็จสิ้นแล้ว', {
                duration: 3000,
            })
            return
        }

        setReviewModalOpen(true)
    }

    const handleReviewSubmit = () => {
        // Reload review data
        if (id) {
            const reviewData = getReviewByBooking(id)
            setReview(reviewData)
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-pink-500"></div>
            </div>
        )
    }

    if (!booking || !provider || !service) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">
                        ไม่พบการจองที่ต้องการ
                    </h2>
                    <Link
                        href="/bookings"
                        className="rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 font-semibold text-white transition-all hover:from-pink-600 hover:to-rose-600"
                    >
                        กลับไปหน้าการจอง
                    </Link>
                </div>
            </div>
        )
    }

    const getStatusColor = (status: Booking['status']) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            case 'confirmed':
                return 'bg-green-100 text-green-800'
            case 'completed':
                return 'bg-blue-100 text-blue-800'
            case 'cancelled':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusText = (status: Booking['status']) => {
        switch (status) {
            case 'pending':
                return 'รอยืนยัน'
            case 'confirmed':
                return 'ยืนยันแล้ว'
            case 'completed':
                return 'เสร็จสิ้น'
            case 'cancelled':
                return 'ยกเลิก'
            default:
                return status
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    href="/bookings"
                    className="mb-6 inline-flex items-center space-x-2 text-gray-600 transition-colors hover:text-gray-900"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>กลับไปหน้าการจอง</span>
                </Link>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        รายละเอียดการจอง
                    </h1>
                    <p className="text-gray-600">
                        ข้อมูลการจองและรีวิวของคุณ
                    </p>
                </div>

                {/* Booking Card */}
                <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                            <Image
                                src={provider.img || '/img/p1.jpg'}
                                alt={provider.firstName}
                                width={80}
                                height={80}
                                className="h-20 w-20 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-900">
                                    {provider.firstName} {provider.lastName}
                                </h3>
                                <p className="text-gray-600">ผู้ให้บริการ</p>
                                <p className="text-sm text-gray-500">
                                    บริการ: {booking.serviceName}
                                </p>
                            </div>
                        </div>
                        <span
                            className={`rounded-full px-4 py-2 text-sm font-medium ${getStatusColor(booking.status)}`}
                        >
                            {getStatusText(booking.status)}
                        </span>
                    </div>

                    {/* Booking Details */}
                    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Calendar className="h-5 w-5" />
                            <div>
                                <p className="text-xs text-gray-500">วันที่</p>
                                <p className="font-medium">
                                    {new Date(
                                        booking.date
                                    ).toLocaleDateString('th-TH', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Clock className="h-5 w-5" />
                            <div>
                                <p className="text-xs text-gray-500">เวลา</p>
                                <p className="font-medium">
                                    {booking.startTime} - {booking.endTime}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <User className="h-5 w-5" />
                            <div>
                                <p className="text-xs text-gray-500">
                                    ระยะเวลา
                                </p>
                                <p className="font-medium">
                                    {booking.totalHours} ชั่วโมง
                                </p>
                            </div>
                        </div>
                    </div>

                    {booking.specialRequests && (
                        <div className="mb-6 rounded-lg bg-gray-50 p-4">
                            <h4 className="mb-2 font-medium text-gray-900">
                                คำขอพิเศษ:
                            </h4>
                            <p className="text-sm text-gray-600">
                                {booking.specialRequests}
                            </p>
                        </div>
                    )}

                    <div className="flex items-center justify-between border-t pt-4">
                        <div className="text-lg font-semibold text-gray-900">
                            ฿{booking.totalAmount.toLocaleString()}
                            <span className="ml-2 text-sm font-normal text-gray-500">
                                (ชำระแล้ว 100%)
                            </span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() =>
                                    toast.success('เปิดหน้าแชท', {
                                        duration: 2000,
                                    })
                                }
                                className="flex items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                <MessageCircle className="h-4 w-4" />
                                <span>ส่งข้อความ</span>
                            </button>

                            {booking.status === 'completed' && (
                                <>
                                    {review ? (
                                        <button
                                            disabled
                                            className="flex items-center space-x-2 rounded-lg bg-gray-300 px-4 py-2 text-gray-600 cursor-not-allowed"
                                        >
                                            <Star className="h-4 w-4" />
                                            <span>รีวิวแล้ว</span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleReviewClick}
                                            className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-2 text-white transition-all hover:from-pink-600 hover:to-rose-600"
                                        >
                                            <Star className="h-4 w-4" />
                                            <span>ให้รีวิว</span>
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Review Section */}
                {booking.status === 'completed' && (
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-semibold text-gray-900">
                            รีวิวของคุณ
                        </h2>
                        {review ? (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    {Array.from({ length: 5 }, (_, i) => {
                                        const starValue = i + 1
                                        const isFullStar = review.rating >= starValue
                                        const isHalfStar =
                                            review.rating >= starValue - 0.5 &&
                                            review.rating < starValue

                                        return (
                                            <div key={i} className="relative">
                                                <Star
                                                    className={`h-5 w-5 ${
                                                        isFullStar
                                                            ? 'fill-current text-yellow-400'
                                                            : 'text-gray-300'
                                                    }`}
                                                />
                                                {isHalfStar && (
                                                    <div
                                                        className="absolute left-0 top-0 overflow-hidden"
                                                        style={{ width: '50%' }}
                                                    >
                                                        <Star className="h-5 w-5 fill-current text-yellow-400" />
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                    <span className="ml-2 text-sm text-gray-500">
                                        {new Date(
                                            review.createdAt
                                        ).toLocaleDateString('th-TH')}
                                    </span>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        ) : (
                            <div className="py-8 text-center text-gray-500">
                                <Star className="mx-auto mb-2 h-12 w-12 text-gray-300" />
                                <p className="mb-4">
                                    คุณยังไม่ได้รีวิวการจองนี้
                                </p>
                                <button
                                    onClick={handleReviewClick}
                                    className="rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-2 font-semibold text-white transition-all hover:from-pink-600 hover:to-rose-600"
                                >
                                    เขียนรีวิว
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Review Modal */}
                {user && booking && (
                    <ReviewModal
                        open={reviewModalOpen}
                        onClose={() => setReviewModalOpen(false)}
                        bookingId={booking.id}
                        serviceId={booking.serviceId}
                        customerId={user.id}
                        onSubmit={handleReviewSubmit}
                    />
                )}
            </div>
        </div>
    )
}


'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Image from 'next/image'

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
import SummaryReviewContent from '@/components/review/SummaryReviewContent'
import { deleteReview } from '@/lib/localStorage'
import { MessageCircle, Star,ArrowLeft, Calendar, Clock, User as UserIcon } from 'lucide-react'
import { useAuthContext } from '@/contexts/AuthContext'
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

export default function SummaryReviewPage() {
    const params = useParams()
    const router = useRouter()
    const { user, isAuthenticated } = useAuthContext()

    const bookingId = typeof params.id === 'string' ? params.id : null

    const [booking, setBooking] = useState<Booking | null>(null)
    const [provider, setProvider] = useState<User | null>(null)
    const [service, setService] = useState<Service | null>(null)
    const [review, setReview] = useState<Review | null>(null)
    const [openForm, setOpenForm] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        initializeSampleData()

        if (!isAuthenticated || !user) {
            router.push('/login')
            return
        }

        if (!bookingId) {
            router.push('/booking')
            return
        }

        const foundBooking = getBookingById(bookingId)
        if (!foundBooking) {
            toast.error('ไม่พบข้อมูลการจอง')
            router.push('/booking')
            return
        }

        if (foundBooking.customerId !== user.id) {
            toast.error('คุณไม่มีสิทธิ์เข้าถึงรายการจองนี้')
            router.push('/booking')
            return
        }

        setBooking(foundBooking)

        setProvider(
            getUsers().find(u => u.id === foundBooking.providerId) ?? null
        )

        setService(
            getServices().find(s => s.id === foundBooking.serviceId) ?? null
        )

        setReview(
            getReviews().find(
                r => r.customerId === user.id && r.serviceId === foundBooking.serviceId
            ) ?? null
        )

        setLoading(false)
    }, [bookingId, user, isAuthenticated, router])

    const handleSubmitReview = (data: { bookingId: string; rating: number; comment: string }) => {
        if (!booking || !user) return

        addReview({
            customerId: user.id,
            serviceId: booking.serviceId,
            rating: data.rating,
            comment: data.comment
        })

        setReview(
            getReviews().find(
                r => r.customerId === user.id && r.serviceId === booking.serviceId
            ) ?? null
        )

        setOpenForm(false)
        toast.success('ส่งรีวิวเรียบร้อยแล้ว')
    }

    const handleDeleteReview = (reviewId: string | null) => {
        if (!reviewId) return

        if (!confirm('คุณต้องการลบรีวิวนี้หรือไม่? บทวิจารณ์จะหายไปอย่างถาวร')) return

        deleteReview(reviewId)

        setReview(null)
        toast.success('ลบรีวิวเรียบร้อยแล้ว')
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

                {/* ปุ่มกลับ */}
                <Link
                    href={`/booking`}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-1000"
                >
                    <ArrowLeft size={18} />
                    กลับไปหน้าการจอง
                </Link>
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        รายละเอียดการจอง
                    </h1>
                    <p className="text-gray-600">
                        ข้อมูลการจอง และรีวิวของคุณ
                    </p>
                </div>

               {/* -------------------------------
                    กล่อง #1 : รายละเอียดการจอง
                -------------------------------- */}
                <div className="rounded-2xl bg-white p-6 shadow-sm mt-6">
                    <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                            <Image
                                src={provider?.img || '/img/p1.jpg'}
                                alt={provider?.firstName || 'provider'}
                                width={64}
                                height={64}
                                className="h-16 w-16 rounded-full object-cover"
                            />
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                            {provider?.firstName} {provider?.lastName}
                        </h3>
                        <p className="text-gray-600">ผู้ให้บริการ</p>
                        <p className="text-sm text-gray-500">
                            บริการ: {booking?.serviceName}
                        </p>
                    </div>
                </div>

        <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                booking!.status
            )}`}
        >
            {getStatusText(booking!.status)}
        </span>
    </div>

    {/* วันที่ เวลา ชั่วโมง */}
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="h-5 w-5" />
            <span>
                {new Date(booking!.date).toLocaleDateString('th-TH')}
            </span>
        </div>

        <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="h-5 w-5" />
            <span>
                {booking!.startTime} - {booking!.endTime}
            </span>
        </div>

        <div className="flex items-center space-x-2 text-gray-600">
            <UserIcon className="h-5 w-5" />
            <span>{booking!.totalHours} ชั่วโมง</span>
        </div>
    </div>

    {/* คำขอพิเศษ */}
    {booking?.specialRequests && (
        <div className="mb-4 rounded-lg bg-gray-50 p-3">
            <h4 className="mb-1 font-medium text-gray-900">
                คำขอพิเศษ:
            </h4>
            <p className="text-sm text-gray-600">
                {booking.specialRequests}
            </p>
        </div>
    )}

    {/* ราคา */}
    {/* แถวล่างสุด: ราคา + ปุ่ม */}
<div className="mt-4 flex items-center justify-between">
  {/* ราคา */}
  <div className="text-lg font-semibold text-gray-900">
    ฿{booking?.totalAmount.toLocaleString()}
    <span className="ml-2 text-sm font-normal text-gray-500">
      (ชำระแล้ว 100%)
    </span>
  </div>

  {/* ปุ่มทั้งหมด ฝั่งขวา */}
  <div className="flex items-center gap-3">

    {/* ปุ่มส่งข้อความ */}
    <button
      onClick={() => toast.success('เปิดหน้าแชท')}
      className="flex items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 
      text-gray-700 transition-colors hover:bg-gray-50"
    >
      <MessageCircle className="h-4 w-4" />
      <span>ส่งข้อความ</span>
    </button>

    {/* ปุ่มรีวิว (โชว์ตลอด แต่เปลี่ยนสีตามสถานะ) */}
    {review ? (
      // ⭐ มีรีวิวแล้ว = ปุ่มสีเทา
      <button
        disabled
        className="flex cursor-not-allowed items-center space-x-2 rounded-lg 
        border border-gray-300 bg-gray-200 px-4 py-2 text-gray-600"
      >
        <Star className="h-4 w-4" />
        <span>รีวิวแล้ว</span>
      </button>
    ) : (
      // ⭐ ยังไม่มีรีวิว = ให้รีวิว
      <button
        onClick={() => setOpenForm(true)}
        className="flex transform cursor-pointer items-center space-x-2 rounded-lg 
        bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-2 text-white shadow-md 
        transition-all hover:-translate-y-0.5 hover:from-pink-600 hover:to-rose-600"
      >
        <Star className="h-4 w-4" />
        <span>เขียนรีวิว</span>
      </button>
    )}

  </div>
</div>
</div>

                {/* -------------------------------
                    กล่อง #2 : รีวิวของคุณ
                -------------------------------- */}
                <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        รีวิวของคุณ
                    </h2>

                    <SummaryReviewContent
                        review={review}
                        booking={booking!}
                        onOpenForm={() => setOpenForm(true)}
                        onDelete={() => handleDeleteReview(review?.id ?? null)}
                    />
                </div>

                {/* ฟอร์มรีวิว */}
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
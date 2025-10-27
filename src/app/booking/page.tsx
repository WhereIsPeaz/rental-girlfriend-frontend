'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Calendar, Clock, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuthContext } from '@/contexts/AuthContext'
import {
    getServices,
    getUsers,
    initializeSampleData,
    type Service,
    type User,
} from '@/lib/localStorage'

export default function BookingPage() {
    const { id } = useParams()
    const router = useRouter()
    const { user, isAuthenticated } = useAuthContext()

    const [service, setService] = useState<Service | null>(null)
    const [provider, setProvider] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const [bookingData, setBookingData] = useState({
        date: '',
        startTime: '',
        endTime: '',
        duration: 1,
        serviceType: 'hourly',
        specialRequests: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        // Initialize sample data if needed
        initializeSampleData()

        // Check authentication
        if (!isAuthenticated) {
            router.push('/login')
            return
        }

        if (!user || user.type !== 'customer') {
            toast.error('เฉพาะลูกค้าเท่านั้นที่สามารถจองบริการได้')
            router.push('/services')
            return
        }

        if (!id) {
            router.push('/services')
            return
        }

        // Load service data
        const services = getServices()
        const foundService = services.find((s) => s.id === String(id))

        if (!foundService) {
            toast.error('ไม่พบบริการที่ต้องการ')
            router.push('/services')
            return
        }

        setService(foundService)

        // Load provider data
        const users = getUsers()
        const foundProvider = users.find(
            (u) => u.id === foundService.providerId
        )

        if (!foundProvider) {
            toast.error('ไม่พบผู้ให้บริการ')
            router.push('/services')
            return
        }

        setProvider(foundProvider)
        setLoading(false)
    }, [id, router, isAuthenticated, user])

    const calculateTotal = () => {
        if (!service) return 0

        if (bookingData.serviceType === 'daily') {
            return service.priceDay
        } else {
            return service.priceHour * bookingData.duration
        }
    }

    const calculateDeposit = () => {
        return calculateTotal() // 100% payment instead of 50% deposit
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!bookingData.date) {
            newErrors.date = 'กรุณาเลือกวันที่'
        } else {
            const selectedDate = new Date(bookingData.date)
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            if (selectedDate < today) {
                newErrors.date = 'ไม่สามารถจองย้อนหลังได้'
            }
        }

        if (!bookingData.startTime) {
            newErrors.startTime = 'กรุณาเลือกเวลาเริ่มต้น'
        }

        if (bookingData.serviceType === 'hourly' && !bookingData.endTime) {
            newErrors.endTime = 'กรุณาเลือกเวลาสิ้นสุด'
        }

        if (
            bookingData.serviceType === 'hourly' &&
            bookingData.startTime &&
            bookingData.endTime
        ) {
            const start = new Date(`2000-01-01 ${bookingData.startTime}`)
            const end = new Date(`2000-01-01 ${bookingData.endTime}`)

            if (end <= start) {
                newErrors.endTime = 'เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น'
            } else {
                const duration =
                    (end.getTime() - start.getTime()) / (1000 * 60 * 60)
                setBookingData((prev) => ({ ...prev, duration }))
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm() || !service || !provider || !user) return

        setIsLoading(true)

        // Show loading toast
        const processingToast = toast.loading('กำลังเตรียมข้อมูลการจอง...', {
            duration: Infinity,
        })

        try {
            // Simulate form processing delay
            await new Promise((resolve) => setTimeout(resolve, 1200))

            const totalAmount = calculateTotal()
            const depositAmount = calculateDeposit()

            // Store booking data in sessionStorage for payment page
            const bookingDataForPayment = {
                ...bookingData,
                totalAmount,
                depositAmount,
                serviceName: service.name,
            }

            sessionStorage.setItem(
                `bookingData_${service.id}`,
                JSON.stringify(bookingDataForPayment)
            )

            toast.dismiss(processingToast)
            toast.success('ข้อมูลการจองพร้อมแล้ว!')

            // Navigate to payment page
            setTimeout(() => {
                router.push(`/payments/${service.id}`)
            }, 1000)
        } catch (error) {
            console.error('Booking error:', error)
            toast.dismiss(processingToast)
            setErrors({
                general: 'เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่อีกครั้ง',
            })
            toast.error('เกิดข้อผิดพลาดในการจอง')
        } finally {
            setIsLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-pink-500"></div>
            </div>
        )
    }

    if (!service || !provider) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">
                        ไม่พบบริการที่ต้องการ
                    </h2>
                    <button
                        onClick={() => router.push('/services')}
                        className="rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 font-semibold text-white transition-all hover:from-pink-600 hover:to-rose-600"
                    >
                        กลับไปหน้าบริการ
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        จองบริการ
                    </h1>
                    <p className="text-gray-600">กรอกข้อมูลการจองของคุณ</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Booking Form */}
                    <div className="lg:col-span-2">
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-2xl bg-white p-6 shadow-sm"
                        >
                            {errors.general && (
                                <div className="mb-6 flex items-center space-x-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                                    <AlertCircle className="h-5 w-5" />
                                    <span>{errors.general}</span>
                                </div>
                            )}

                            {/* Service Type */}
                            <div className="mb-6">
                                <label className="mb-3 block text-sm font-medium text-gray-700">
                                    ประเภทการจอง
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setBookingData((prev) => ({
                                                ...prev,
                                                serviceType: 'hourly',
                                            }))
                                        }
                                        className={`rounded-xl border-2 p-4 transition-all hover:cursor-pointer ${
                                            bookingData.serviceType === 'hourly'
                                                ? 'border-pink-500 bg-pink-50 text-pink-700'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <Clock className="mx-auto mb-2 h-6 w-6" />
                                        <div className="font-medium">
                                            รายชั่วโมง
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            ฿
                                            {service.priceHour.toLocaleString()}
                                            /ชั่วโมง
                                        </div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setBookingData((prev) => ({
                                                ...prev,
                                                serviceType: 'daily',
                                            }))
                                        }
                                        className={`rounded-xl border-2 p-4 transition-all hover:cursor-pointer ${
                                            bookingData.serviceType === 'daily'
                                                ? 'border-pink-500 bg-pink-50 text-pink-700'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <Calendar className="mx-auto mb-2 h-6 w-6" />
                                        <div className="font-medium">
                                            รายวัน
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            ฿{service.priceDay.toLocaleString()}
                                            /วัน
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="mb-6">
                                <label
                                    htmlFor="date"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    วันที่ *
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    value={bookingData.date}
                                    onChange={(e) =>
                                        setBookingData((prev) => ({
                                            ...prev,
                                            date: e.target.value,
                                        }))
                                    }
                                    min={new Date().toISOString().split('T')[0]}
                                    className={`w-full rounded-xl border px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-pink-500 ${
                                        errors.date
                                            ? 'border-red-300'
                                            : 'border-gray-300'
                                    }`}
                                />
                                {errors.date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.date}
                                    </p>
                                )}
                            </div>

                            {/* Time */}
                            <div className="mb-6 grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="startTime"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        เวลาเริ่มต้น *
                                    </label>
                                    <input
                                        type="time"
                                        id="startTime"
                                        value={bookingData.startTime}
                                        onChange={(e) => {
                                            const newStartTime = e.target.value
                                            setBookingData((prev) => ({
                                                ...prev,
                                                startTime: newStartTime,
                                            }))

                                            // Calculate duration immediately when start time changes
                                            if (
                                                newStartTime &&
                                                bookingData.endTime
                                            ) {
                                                const start = new Date(
                                                    `2000-01-01 ${newStartTime}`
                                                )
                                                const end = new Date(
                                                    `2000-01-01 ${bookingData.endTime}`
                                                )

                                                if (end > start) {
                                                    const duration =
                                                        (end.getTime() -
                                                            start.getTime()) /
                                                        (1000 * 60 * 60)
                                                    setBookingData((prev) => ({
                                                        ...prev,
                                                        duration,
                                                    }))
                                                }
                                            }
                                        }}
                                        className={`w-full rounded-xl border px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-pink-500 ${
                                            errors.startTime
                                                ? 'border-red-300'
                                                : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.startTime && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.startTime}
                                        </p>
                                    )}
                                </div>

                                {bookingData.serviceType === 'hourly' && (
                                    <div>
                                        <label
                                            htmlFor="endTime"
                                            className="mb-2 block text-sm font-medium text-gray-700"
                                        >
                                            เวลาสิ้นสุด *
                                        </label>
                                        <input
                                            type="time"
                                            id="endTime"
                                            value={bookingData.endTime}
                                            onChange={(e) => {
                                                const newEndTime =
                                                    e.target.value
                                                setBookingData((prev) => ({
                                                    ...prev,
                                                    endTime: newEndTime,
                                                }))

                                                // Calculate duration immediately when end time changes
                                                if (
                                                    bookingData.startTime &&
                                                    newEndTime
                                                ) {
                                                    const start = new Date(
                                                        `2000-01-01 ${bookingData.startTime}`
                                                    )
                                                    const end = new Date(
                                                        `2000-01-01 ${newEndTime}`
                                                    )

                                                    if (end > start) {
                                                        const duration =
                                                            (end.getTime() -
                                                                start.getTime()) /
                                                            (1000 * 60 * 60)
                                                        setBookingData(
                                                            (prev) => ({
                                                                ...prev,
                                                                duration,
                                                            })
                                                        )
                                                    }
                                                }
                                            }}
                                            className={`w-full rounded-xl border px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-pink-500 ${
                                                errors.endTime
                                                    ? 'border-red-300'
                                                    : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.endTime && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.endTime}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Special Requests */}
                            <div className="mb-6">
                                <label
                                    htmlFor="specialRequests"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    ฝากถึงผู้ให้บริการ
                                </label>
                                <textarea
                                    id="specialRequests"
                                    rows={4}
                                    value={bookingData.specialRequests}
                                    onChange={(e) =>
                                        setBookingData((prev) => ({
                                            ...prev,
                                            specialRequests: e.target.value,
                                        }))
                                    }
                                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-pink-500"
                                    placeholder="เช่น สถานที่ที่ต้องการไป, กิจกรรมที่ต้องการทำ, หรือข้อกำหนดพิเศษอื่นๆ"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 font-semibold text-white transition-all duration-200 hover:cursor-pointer hover:from-pink-600 hover:to-rose-600 disabled:opacity-50"
                            >
                                {isLoading
                                    ? 'กำลังดำเนินการ...'
                                    : 'ดำเนินการจอง'}
                            </button>
                        </form>
                    </div>

                    {/* Booking Summary */}
                    <div className="space-y-6">
                        {/* Provider Info */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                ผู้ให้บริการ
                            </h3>
                            <div className="flex items-center space-x-4">
                                <Image
                                    src={provider.img || '/img/p1.jpg'}
                                    alt={provider.firstName}
                                    width={64}
                                    height={64}
                                    className="h-16 w-16 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-medium text-gray-900">
                                        {provider.firstName} {provider.lastName}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {new Date().getFullYear() -
                                            new Date(
                                                provider.birthdate
                                            ).getFullYear()}{' '}
                                        ปี
                                    </div>
                                    <div className="flex items-center space-x-1 text-yellow-500">
                                        <span className="text-sm">
                                            ⭐ {service.rating}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            ({service.reviewCount} รีวิว)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Price Summary */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                สรุปค่าใช้จ่าย
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        {bookingData.serviceType === 'daily'
                                            ? 'ค่าบริการรายวัน'
                                            : `ค่าบริการ ${bookingData.duration} ชั่วโมง`}
                                    </span>
                                    <span className="font-medium">
                                        ฿{calculateTotal().toLocaleString()}
                                    </span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>รวมทั้งหมด</span>
                                        <span>
                                            ฿{calculateTotal().toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="mt-1 flex justify-between text-sm text-gray-600">
                                        <span>มัดจำ (50%)</span>
                                        <span>
                                            ฿
                                            {(
                                                calculateDeposit() * 0.5
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

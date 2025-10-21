'use client'

import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import { Clock, MapPin, Star, Calendar, Award } from 'lucide-react'
import { useState, useEffect } from 'react'
import {
    getServices,
    getUsers,
    getReviews,
    initializeSampleData,
    type Service,
    type User,
    type Review,
} from '@/lib/localStorage'

export default function ServiceDetailPage() {
    const router = useRouter()
    const { id } = useParams()
    const [service, setService] = useState<Service | null>(null)
    const [provider, setProvider] = useState<User | null>(null)
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadServiceData = async () => {
            // Initialize sample data if needed
            initializeSampleData()

            if (!id) {
                router.push('/services')
                return
            }

            setLoading(true)

            try {
                // Simulate API delay for service data loading
                await new Promise((resolve) => setTimeout(resolve, 600))

                // Load service data
                const services = getServices()
                const foundService = services.find((s) => s.id === String(id))

                if (!foundService) {
                    router.push('/services')
                    return
                }

                setService(foundService)

                // Load provider data
                const users = getUsers()
                const foundProvider = users.find(
                    (u) => u.id === foundService.providerId
                )
                setProvider(foundProvider ?? null)

                // Load reviews for this service
                const allReviews = getReviews()
                const serviceReviews = allReviews.filter(
                    (r) => r.serviceId === String(id)
                )
                setReviews(serviceReviews)
            } catch (error) {
                console.error('Error loading service data:', error)
            } finally {
                setLoading(false)
            }
        }

        void loadServiceData()
    }, [id, router])

    const handleBooking = () => {
        // Navigate to booking page
        router.push(`/booking/${String(id)}`)
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
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Profile */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Header */}
                        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                            <div className="relative h-64">
                                <Image
                                    src={
                                        service.images[0] ??
                                        provider.img ??
                                        '/img/p1.jpg'
                                    }
                                    alt={provider.firstName}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h1 className="mb-2 text-3xl font-bold">
                                        {provider.firstName} {provider.lastName}
                                    </h1>
                                    <div className="flex items-center space-x-4 text-sm">
                                        <div className="flex items-center space-x-1">
                                            <Clock className="h-4 w-4" />
                                            <span>
                                                {new Date().getFullYear() -
                                                    new Date(
                                                        provider.birthdate
                                                    ).getFullYear()}{' '}
                                                ปี
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>กรุงเทพมหานคร</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-4 w-4 fill-current text-yellow-400" />
                                            <span>
                                                {service.rating} (
                                                {service.reviewCount} รีวิว)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-semibold text-gray-900">
                                {service.name}
                            </h2>
                            <p className="mb-6 leading-relaxed text-gray-600">
                                {service.description}
                            </p>

                            {/* Interests */}
                            <div className="mb-6">
                                <h3 className="mb-3 text-lg font-medium text-gray-900">
                                    ประเภทบริการ
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {service.categories.map(
                                        (category, index) => (
                                            <span
                                                key={index}
                                                className="rounded-lg bg-pink-50 px-3 py-1 text-sm text-pink-600"
                                            >
                                                {category}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    รีวิวจากลูกค้า ({reviews.length})
                                </h2>
                                <div className="flex items-center space-x-2">
                                    <Star className="h-5 w-5 fill-current text-yellow-400" />
                                    <span className="text-lg font-semibold">
                                        {service.rating}
                                    </span>
                                    <span className="text-gray-500">
                                        จาก {service.reviewCount} รีวิว
                                    </span>
                                </div>
                            </div>

                            {reviews.length > 0 ? (
                                <div className="space-y-4">
                                    {reviews.slice(0, 5).map((review) => (
                                        <div
                                            key={review.id}
                                            className="border-b border-gray-100 pb-4 last:border-b-0"
                                        >
                                            <div className="mb-2 flex items-center justify-between">
                                                <div className="flex items-center space-x-1">
                                                    {Array.from(
                                                        { length: 5 },
                                                        (_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${i < review.rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(
                                                        review.createdAt
                                                    ).toLocaleDateString(
                                                        'th-TH'
                                                    )}
                                                </span>
                                            </div>
                                            <p className="text-gray-600">
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-8 text-center text-gray-500">
                                    ยังไม่มีรีวิว
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Pricing */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                ราคาบริการ
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">
                                        ต่อชั่วโมง
                                    </span>
                                    <span className="text-2xl font-bold text-gray-900">
                                        ฿{service.priceHour.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">
                                        ต่อวัน (8 ชั่วโมง)
                                    </span>
                                    <span className="text-xl font-semibold text-gray-900">
                                        ฿{service.priceDay.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <button
                                    onClick={handleBooking}
                                    className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 font-semibold text-white transition-all duration-200 hover:cursor-pointer hover:from-pink-600 hover:to-rose-600"
                                >
                                    <Calendar className="mr-2 inline h-5 w-5" />
                                    จองเลย
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                สถิติ
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Award className="h-5 w-5 text-pink-500" />
                                        <span className="text-gray-600">
                                            การจองทั้งหมด
                                        </span>
                                    </div>
                                    <span className="font-semibold">
                                        {service.bookingCount}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Star className="h-5 w-5 text-yellow-500" />
                                        <span className="text-gray-600">
                                            คะแนนเฉลี่ย
                                        </span>
                                    </div>
                                    <span className="font-semibold">
                                        {service.rating}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
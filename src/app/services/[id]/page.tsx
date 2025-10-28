'use client'

import { useRouter, useParams } from 'next/navigation'
import LoadingSpinner from '@/components/shared/LoadingSpinner'
import ActionButton from '@/components/shared/ActionButton'
import ServiceHero from '@/components/services/ServiceHero'
import ServiceAbout from '@/components/services/ServiceAbout'
import ServiceReviews from '@/components/services/ServiceReviews'
import ServicePricing from '@/components/services/ServicePricing'
import ServiceStats from '@/components/services/ServiceStats'
import { useServiceData } from '@/hooks/useServiceData'

export default function ServiceDetailPage() {
    const router = useRouter()
    const { id } = useParams()
    const idString = Array.isArray(id) ? (id[0] ?? null) : (id ?? null)

    const { service, provider, reviews, loading, error } =
        useServiceData(idString)

    const handleBooking = () => {
        if (idString) {
            router.push(`/booking/${idString}`)
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <LoadingSpinner size="xl" />
            </div>
        )
    }

    if (error || !service || !provider) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">
                        {error ?? 'ไม่พบบริการที่ต้องการ'}
                    </h2>
                    <ActionButton
                        onClick={() => router.push('/services')}
                        variant="primary"
                    >
                        กลับไปหน้าบริการ
                    </ActionButton>
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
                        <ServiceHero service={service} provider={provider} />
                        <ServiceAbout service={service} />
                        <ServiceReviews service={service} reviews={reviews} />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <ServicePricing
                            service={service}
                            onBooking={handleBooking}
                        />
                        <ServiceStats service={service} />
                    </div>
                </div>
            </div>
        </div>
    )
}

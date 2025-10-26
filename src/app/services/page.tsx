'use client'
import { useState, useEffect } from 'react'
import { Kanit } from 'next/font/google'
import Card from '@/components/Card'
import { ChevronDown } from 'lucide-react'
import SearchBox from '@/components/SearchBox'
import {
    getServices,
    getUsers,
    type Service,
    type User,
} from '@/lib/localStorage'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

export default function ServicePage() {
    const [services, setServices] = useState<Service[]>([])
    const [providers, setProviders] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = () => {
            const allServices = getServices().filter(
                (service) => service.active
            )
            const allUsers = getUsers().filter(
                (user) => user.type === 'provider'
            )
            setServices(allServices)
            setProviders(allUsers)
            setLoading(false)
        }

        loadData()
    }, [])
    return (
        <main className={`${kanit.className} bg-[#F4F6F8]`}>
            <div className="mx-auto w-full md:max-w-290">
                <div className="w-full pt-8">
                    {/* หัวข้อใหญ่ */}
                    <h1 className="text-[33px] font-normal text-black">
                        ค้นหาแฟนเช่า
                    </h1>
                    <p className="text-[13px] font-normal text-[#6B7280]">
                        พบกับผู้ให้บริการมากกว่า 1,200 คน ที่รอให้บริการคุณ
                    </p>
                </div>

                {/* กล่อง “การจองล่าสุด” + แถบค้นหา */}
                <section className="mt-6 rounded-[12px] border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 text-[19px] font-normal text-[#212B36]">
                        การจองล่าสุด
                    </div>
                    <SearchBox />
                </section>

                {/* แถบจำนวนผลลัพธ์ + ปุ่มเรียงลำดับ */}
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-[13px] font-normal text-[#6B7280]">
                        {loading
                            ? 'กำลังโหลด...'
                            : `พบ ${services.length} ผู้ให้บริการ`}
                    </p>

                    <button
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
                        type="button"
                    >
                        เรียงโดย
                        <ChevronDown className="h-4 w-4" />
                    </button>
                </div>
                <div>
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-gray-500">
                                กำลังโหลดข้อมูล...
                            </div>
                        </div>
                    ) : services.length === 0 ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-gray-500">
                                ไม่พบผู้ให้บริการ
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 pb-5 md:grid-cols-2 lg:grid-cols-3">
                            {services.map((service) => {
                                const provider = providers.find(
                                    (p) => p.id === service.providerId
                                )
                                if (!provider) return null

                                // คำนวณอายุจากวันเกิด
                                const birthYear = new Date(
                                    provider.birthdate
                                ).getFullYear()
                                const currentYear = new Date().getFullYear()
                                const age = currentYear - birthYear

                                return (
                                    <Card
                                        key={service.id}
                                        Name={`${service.name}`}
                                        Age={age}
                                        Rating={service.rating}
                                        Location="กรุงเทพมหานคร"
                                        Description={service.description}
                                        Type={
                                            service.rating >= 4.8 ? 'แนะนำ' : ''
                                        }
                                        PriceHr={service.priceHour}
                                        PriceD={service.priceDay}
                                        Review={`จองแล้ว ${service.bookingCount} ครั้ง`}
                                        ReviewCount={service.reviewCount}
                                        imgSrc={
                                            service.images[0] ?? provider.img
                                        }
                                        buttonTitle="ดูโปรไฟล์"
                                        Categories={service.categories}
                                    />
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

'use client'

import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Kanit } from 'next/font/google'
import { useAuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import {
    createService,
    getServicesByProvider,
    updateService,
    deleteService,
    type Service,
} from '@/lib/localStorage'
import AddServiceCard from '@/components/AddServiceCard'
import ServiceModal from '@/components/ServiceModal'
import Card from '@/components/Card'
import toast from 'react-hot-toast'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

export default function ServiceMangePage() {
    const [open, setOpen] = useState(false)
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [editingService, setEditingService] = useState<Service | null>(null)
    const { user, isProvider } = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login')
            return
        }

        if (!isProvider) {
            router.push('/')
            return
        }

        // โหลดบริการของผู้ให้บริการ
        const userServices = getServicesByProvider(user.id)
        setServices(userServices)
        setLoading(false)
    }, [user, isProvider, router])

    // ฟังก์ชันเปิด modal สำหรับสร้างบริการใหม่
    const openCreateModal = () => {
        setEditingService(null)
        setOpen(true)
    }

    // ฟังก์ชันเปิด modal สำหรับแก้ไขบริการ
    const openEditModal = (service: Service) => {
        setEditingService(service)
        setOpen(true)
    }

    // ฟังก์ชันลบบริการ
    const handleDeleteService = async () => {
        if (!editingService) return

        try {
            deleteService(editingService.id)
            setServices((prev) =>
                prev.filter((s) => s.id !== editingService.id)
            )
            setOpen(false)
            setEditingService(null)
            toast.success('ลบบริการสำเร็จ!')
        } catch {
            toast.error('เกิดข้อผิดพลาดในการลบบริการ')
        }
    }

    return (
        <>
            <main
                className={`${kanit.className} min-h-screen bg-[#F4F6F8] py-8`}
            >
                <div className="mx-auto max-w-7xl px-6">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-[30px] text-black">
                                จัดการบริการ
                            </h1>
                            <p className="mt-1 text-[13px] text-gray-500">
                                สร้างและจัดการบริการของคุณ
                            </p>
                        </div>

                        <button
                            onClick={openCreateModal}
                            className="mr-1 inline-flex cursor-pointer items-center gap-2 rounded-md bg-gradient-to-r from-pink-600 to-rose-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                        >
                            <Plus className="h-4 w-4 stroke-[3]" />
                            เพิ่มบริการใหม่
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-gray-500">กำลังโหลด...</div>
                        </div>
                    ) : services.length === 0 ? (
                        <AddServiceCard onCreate={openCreateModal} />
                    ) : (
                        <section className="mt-6 h-auto w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="text-[19px] font-medium text-gray-900">
                                บริการของฉัน
                            </div>

                            <div className="flex flex-wrap content-center justify-start gap-4">
                                {services.map((service) => {
                                    // คำนวณอายุจากวันเกิด
                                    const birthYear = new Date(
                                        user?.birthdate ?? '1990-01-01'
                                    ).getFullYear()
                                    const currentYear = new Date().getFullYear()
                                    const age = currentYear - birthYear

                                    return (
                                        <div
                                            key={service.id}
                                            onClick={() =>
                                                openEditModal(service)
                                            }
                                            className="w-full cursor-pointer"
                                        >
                                            <Card
                                                Name={`${service.name}`}
                                                Age={age}
                                                Rating={service.rating}
                                                Location="กรุงเทพมหานคร"
                                                Description={
                                                    service.description
                                                }
                                                Type={
                                                    service.rating >= 4.8
                                                        ? 'แนะนำ'
                                                        : ''
                                                }
                                                PriceHr={service.priceHour}
                                                PriceD={service.priceDay}
                                                Review={`จองแล้ว ${service.bookingCount} ครั้ง`}
                                                ReviewCount={
                                                    service.reviewCount
                                                }
                                                imgSrc={
                                                    service.images[0] ??
                                                    user?.img ??
                                                    '/img/provider1.png'
                                                }
                                                buttonTitle="แก้ไข"
                                                Categories={service.categories}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                    )}
                </div>
            </main>

            <ServiceModal
                open={open}
                onClose={() => {
                    setOpen(false)
                    setEditingService(null)
                }}
                editingService={editingService}
                onDelete={editingService ? handleDeleteService : undefined}
                onSave={async (formData) => {
                    try {
                        if (!user) return

                        // รับรูปภาพที่เป็น base64 แล้ว
                        const imagesStr = formData.get('images') as
                            | string
                            | null
                        const allImages: string[] = imagesStr
                            ? (JSON.parse(imagesStr) as string[])
                            : []

                        const serviceData = {
                            providerId: user.id,
                            name: formData.get('name') as string,
                            description: formData.get('desc') as string,
                            categories: JSON.parse(
                                formData.get('categories') as string
                            ) as string[],
                            priceHour: parseInt(
                                formData.get('priceHour') as string
                            ),
                            priceDay: parseInt(
                                formData.get('priceDay') as string
                            ),
                            images: allImages,
                            active: true,
                        }

                        if (editingService) {
                            // แก้ไขบริการ
                            const updatedService = updateService(
                                editingService.id,
                                serviceData
                            )
                            setServices((prev) =>
                                prev.map((s) =>
                                    s.id === editingService.id
                                        ? updatedService
                                        : s
                                )
                            )
                            toast.success('อัปเดตบริการสำเร็จ!')
                        } else {
                            // สร้างบริการใหม่
                            const newService = createService(serviceData)
                            setServices((prev) => [...prev, newService])
                            toast.success('สร้างบริการสำเร็จ!')
                        }

                        setOpen(false)
                        setEditingService(null)
                    } catch {
                        toast.error('เกิดข้อผิดพลาดในการบันทึกบริการ')
                    }
                }}
            />
        </>
    )
}

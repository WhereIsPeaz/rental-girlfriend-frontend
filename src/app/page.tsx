'use client'

import Image from 'next/image'
import { Kanit } from 'next/font/google'
import { Heart, Search, ShieldCheck, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

export default function HomePage() {
    const router = useRouter()

    return (
        <main
            className={`${kanit.className} -mt-[64px] flex min-h-screen items-center justify-center bg-[#FEEDF633]`}
        >
            <div className="flex w-full max-w-[1200px] flex-col items-center justify-center gap-8 px-6 md:flex-row">
                <section className="flex w-full flex-col gap-8 md:min-h-[392px] md:max-w-[464px]">
                    <header>
                        <h1 className="text-4xl leading-tight font-bold text-slate-900 md:text-5xl">
                            พบกับแฟนเช่า
                            <br />
                            ที่ใช่สำหรับคุณ
                        </h1>
                        <p className="mt-4 text-base text-slate-600">
                            Platform
                            ที่คู่เดตและเพื่อนทำกิจกรรมที่ปลอดภัยและเชื่อถือได้
                            เติมสีสันให้ชีวิตด้วยประสบการณ์ใหม่ ๆ ที่น่าจดจำ
                        </p>
                    </header>

                    <div className="flex items-center gap-3">
                        <button
                            className="h-11 rounded-md bg-gradient-to-r from-pink-600 to-rose-500 px-4 text-sm font-semibold text-white shadow"
                            onClick={() => {
                                router.push('/services')
                            }}
                        >
                            <div className="flex cursor-pointer flex-row items-center justify-center gap-2 transition-all duration-300 hover:scale-105">
                                <Search size={16} />
                                <span>เริ่มค้นหาเลย</span>
                            </div>
                        </button>
                        <button
                            className="h-11 rounded-md border border-pink-600 bg-white px-4 text-sm font-semibold text-pink-600"
                            onClick={() => {
                                router.push('/register')
                            }}
                        >
                            <div className="flex cursor-pointer flex-row items-center justify-center gap-2 transition-all duration-300 hover:scale-105">
                                <Heart size={16} />
                                <span>สมัครเป็นผู้ให้บริการ</span>
                            </div>
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <div className="mb-2 flex justify-center text-[28px] font-bold text-pink-600">
                                1,200+
                            </div>
                            <p className="text-center text-sm text-slate-500">
                                ผู้ให้บริการที่ผ่านการตรวจสอบ
                            </p>
                        </div>
                        <div>
                            <div className="mb-2 flex justify-center text-[28px] font-bold text-pink-600">
                                15,000+
                            </div>
                            <div className="text-center text-sm text-slate-500">
                                การจองที่สำเร็จ
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 flex justify-center text-[28px] font-bold text-pink-600">
                                4.9
                            </div>
                            <div className="text-center text-sm text-slate-500">
                                คะแนนความพึงพอใจ
                            </div>
                        </div>
                    </div>
                </section>

                <aside className="relative w-full rounded-2xl md:h-[360px] md:w-[512px]">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                            src="/img/party.jpg"
                            alt="กิจกรรมสังสรรค์"
                            width={468}
                            height={312}
                            className="rounded-3xl object-cover"
                            priority
                        />
                    </div>

                    <div className="absolute top-4 left-4 flex h-[56px] w-[176px] items-center gap-3 rounded-xl border border-slate-200 bg-white/95 px-4 py-2 shadow-sm backdrop-blur">
                        <ShieldCheck className="h-5 w-5 text-emerald-600" />
                        <div className="leading-tight">
                            <div className="text-sm font-bold text-slate-800">
                                ปลอดภัย 100%
                            </div>
                            <div className="text-xs text-slate-500">
                                ตรวจสอบตัวตนแล้ว
                            </div>
                        </div>
                    </div>

                    <div className="absolute right-4 bottom-4 h-[56px] w-[144px] rounded-xl border border-slate-200 bg-white/95 px-4 py-2 shadow-sm backdrop-blur">
                        <div className="flex flex-row items-center gap-3">
                            <div className="flex -space-x-2">
                                <Image
                                    src="/img/p1.jpg"
                                    alt="ผู้ใช้ 1"
                                    width={24}
                                    height={24}
                                    className="rounded-full object-cover ring-2 ring-white"
                                />
                                <Image
                                    src="/img/p2.jpg"
                                    alt="ผู้ใช้ 2"
                                    width={24}
                                    height={24}
                                    className="rounded-full object-cover ring-2 ring-white"
                                />
                            </div>
                            <div className="flex flex-col leading-tight">
                                <div className="flex items-center gap-1">
                                    <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                                    <span className="text-lg font-bold text-slate-800">
                                        4.9
                                    </span>
                                </div>
                                <div className="-mt-0.5 text-xs text-slate-500">
                                    รีวิวจากผู้ใช้
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    )
}

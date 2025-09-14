'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import PrimaryButton from './ฺPrimaryButton'

export default function SearchBox({
    placeholder = 'ค้นหาชื่อ, ความสนใจ, หรือประเภทบริการ...',
    defaultQuery = '',
}: {
    placeholder?: string
    defaultQuery?: string
}) {
    const [q, setQ] = useState(defaultQuery)
    const [open, setOpen] = useState(false)

    const [activity, setActivity] = useState('')
    const [gender, setGender] = useState('')

    const router = useRouter()

    function submit(e: React.FormEvent) {
        e.preventDefault()
        const query = q.trim()
        router.push(
            query ? `/services?q=${encodeURIComponent(query)}` : '/services'
        )
    }

    return (
        <form onSubmit={submit} className="relative w-full">
            {/* แถวค้นหา */}
            <div className="relative">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder={placeholder}
                    className="focus:black h-12 w-full rounded-md border border-gray-300/40 bg-white pr-40 pl-12 text-[13px] text-gray-500 placeholder:text-[#BFC7D8] focus:ring-1 focus:ring-black focus:outline-none md:h-14"
                />

                <Search className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-2">
                    <button
                        type="button"
                        aria-expanded={open}
                        aria-controls="filters"
                        onClick={() => setOpen((v) => !v)}
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${open ? 'border-[#FBC7E4] bg-[#FEECF1] text-[#F24472]' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        <SlidersHorizontal className={'h-4 w-4'} />
                    </button>
                    <PrimaryButton title="ค้นหา" />
                </div>
            </div>

            {/* แถวตัวกรอง (เปิด/ปิดจะดันด้านล่างลงเอง) */}
            <div id="filters" className={open ? 'mt-3 block' : 'mt-3 hidden'}>
                <hr className="mb-3 border-0 border-t border-t-[#E1E7F4]/60" />
                <hr className="mb-3 border-0 border-t border-t-[#E1E7F4]/60" />

                {/* === ฟิลด์ตัวกรอง พร้อม label ด้านบน === */}
                <div className="flex-between flex">
                    {/* กิจกรรมที่สนใจ */}
                    <div>
                        <div className="mb-2 text-sm font-medium text-gray-700">
                            กิจกรรมที่สนใจ
                        </div>
                        <select
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                            className={`h-10 w-140 rounded-md border border-gray-300/40 bg-white pr-3 pl-3 text-sm ${
                                activity ? 'text-gray-700' : 'text-[#BFC7D8]'
                            }`}
                        >
                            <option value="" disabled hidden>
                                เลือกกิจกรรมที่สนใจ
                            </option>
                            <option value="เดท/คู่เดท">เดท/คู่เดท</option>
                            <option value="ดูหนัง">ดูหนัง</option>
                            <option value="เพื่อนร่วมกิจกรรม">
                                เพื่อนร่วมกิจกรรม
                            </option>
                            <option value="ช้อปปิ้ง">ช้อปปิ้ง</option>
                            <option value="ทานอาหาร">ทานอาหาร</option>
                            <option value="เดินเล่น">เดินเล่น</option>
                            <option value="งานสังคม">งานสังคม</option>
                            <option value="ถ่ายรูป">ถ่ายรูป</option>
                            <option value="ท่องเที่ยว">ท่องเที่ยว</option>
                            <option value="คอนเสิร์ต">คอนเสิร์ต</option>
                            <option value="กีฬา">กีฬา</option>
                            <option value="อื่น ๆ">อื่น ๆ</option>
                        </select>
                    </div>

                    {/* เพศ */}
                    <div>
                        <div className="mb-2 ml-7 text-sm font-medium text-gray-700">
                            เพศ
                        </div>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className={`mr-5 ml-5 h-10 w-25 rounded-md border border-gray-300/40 bg-white px-3 text-sm ${
                                gender ? 'text-gray-700' : 'text-[#BFC7D8]'
                            }`}
                        >
                            <option value="" disabled hidden>
                                เลือกเพศ
                            </option>
                            <option value="ชาย">ชาย</option>
                            <option value="หญิง">หญิง</option>
                            <option value="ไม่ระบุ">ไม่ระบุ</option>
                        </select>
                    </div>

                    {/* ราคาต่อชั่วโมง */}
                    <div>
                        <div className="mb-2 text-sm font-medium text-gray-700">
                            ราคาต่อชั่วโมง
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                placeholder="ขั้นต่ำ"
                                className="h-10 w-25.5 rounded-md border border-gray-300/40 bg-white px-3 text-center text-sm placeholder:text-[#BFC7D8]"
                            />
                            <span className="text-gray-400">-</span>
                            <input
                                placeholder="สูงสุด"
                                className="h-10 w-25.5 rounded-md border border-gray-300/40 bg-white px-3 text-center text-sm placeholder:text-[#BFC7D8]"
                            />
                        </div>
                    </div>

                    {/* คะแนนขั้นต่ำ */}
                    <div>
                        <div className="mb-2 ml-7.5 text-sm font-medium text-gray-700">
                            คะแนนขั้นต่ำ
                        </div>
                        <select className="ml-5 h-10 w-40 rounded-md border border-gray-300/40 bg-white px-3 text-sm placeholder:text-[#BFC7D8]">
                            <option disabled hidden>
                                เลือกคะแนนขั้นต่ำ
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        className="h-10 cursor-pointer rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-600 transition-all duration-300 hover:scale-105"
                    >
                        ล้างตัวกรอง
                    </button>
                    <PrimaryButton title="ใช้ตัวกรอง" />
                </div>
            </div>
        </form>
    )
}

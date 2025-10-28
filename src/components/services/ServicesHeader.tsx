'use client'

import React from 'react'
import { Kanit } from 'next/font/google'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

export default function ServicesHeader() {
    return (
        <div className={`${kanit.className} w-full pt-8`}>
            <h1 className="text-[33px] font-normal text-black">ค้นหาแฟนเช่า</h1>
            <p className="text-[13px] font-normal text-[#6B7280]">
                พบกับผู้ให้บริการมากกว่า 1,200 คน ที่รอให้บริการคุณ
            </p>
        </div>
    )
}

import { Kanit } from 'next/font/google'
import Card from '@/components/Card'
import { ChevronDown, Search } from 'lucide-react'
import SearchBox from '@/components/SearchBox'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

export default function ServicePage() {
    return (
        <main className={`${kanit.className} mt-16 bg-[#F4F6F8]`}>
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
                        พบ 7 ผู้ให้บริการ
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
                    <div className="flex content-center justify-between">
                        <Card
                            Name="สมหญิง ว้อนชาย"
                            Age={25}
                            Rating={4.8}
                            Location="กรุงเทพมหานคร"
                            Description="เจนค่ะ เจนค่ะ หนูชื่อเจนมากับบูมแล้วก็มากับโบว์ โบว์ค่ะ โบว์ค่ะ หนูชื่อโบว์มากับบูม แล้วก็มากับเจน นุ่มค่ะ นุ่มค่ะ..."
                            Type="แนะนำ"
                            PriceHr={500}
                            PriceD={3000}
                            Review="จองแล้ว 145 ครั้ง"
                            ReviewCount={127}
                            imgSrc="/img/provider1.png"
                        />
                        <Card
                            Name="สมหญิง ว้อนชาย"
                            Age={25}
                            Rating={4.8}
                            Location="กรุงเทพมหานคร"
                            Description="เจนค่ะ เจนค่ะ หนูชื่อเจนมากับบูมแล้วก็มากับโบว์ โบว์ค่ะ โบว์ค่ะ หนูชื่อโบว์มากับบูม แล้วก็มากับเจน นุ่มค่ะ นุ่มค่ะ..."
                            Type="แนะนำ"
                            PriceHr={500}
                            PriceD={3000}
                            Review="จองแล้ว 145 ครั้ง"
                            ReviewCount={127}
                            imgSrc="/img/provider2.png"
                        />
                        <Card
                            Name="สมหญิง ว้อนชาย"
                            Age={25}
                            Rating={4.8}
                            Location="กรุงเทพมหานคร"
                            Description="เจนค่ะ เจนค่ะ หนูชื่อเจนมากับบูมแล้วก็มากับโบว์ โบว์ค่ะ โบว์ค่ะ หนูชื่อโบว์มากับบูม แล้วก็มากับเจน นุ่มค่ะ นุ่มค่ะ..."
                            Type="แนะนำ"
                            PriceHr={500}
                            PriceD={3000}
                            Review="จองแล้ว 145 ครั้ง"
                            ReviewCount={127}
                            imgSrc="/img/provider3.png"
                        />
                    </div>
                    <div className="flex content-center justify-between pb-5">
                        <Card
                            Name="สมหญิง ว้อนชาย"
                            Age={25}
                            Rating={4.8}
                            Location="กรุงเทพมหานคร"
                            Description="เจนค่ะ เจนค่ะ หนูชื่อเจนมากับบูมแล้วก็มากับโบว์ โบว์ค่ะ โบว์ค่ะ หนูชื่อโบว์มากับบูม แล้วก็มากับเจน นุ่มค่ะ นุ่มค่ะ..."
                            Type="แนะนำ"
                            PriceHr={500}
                            PriceD={3000}
                            Review="จองแล้ว 145 ครั้ง"
                            ReviewCount={127}
                            imgSrc="/img/provider4.png"
                        />
                        <Card
                            Name="สมหญิง ว้อนชาย"
                            Age={25}
                            Rating={4.8}
                            Location="กรุงเทพมหานคร"
                            Description="เจนค่ะ เจนค่ะ หนูชื่อเจนมากับบูมแล้วก็มากับโบว์ โบว์ค่ะ โบว์ค่ะ หนูชื่อโบว์มากับบูม แล้วก็มากับเจน นุ่มค่ะ นุ่มค่ะ..."
                            Type="แนะนำ"
                            PriceHr={500}
                            PriceD={3000}
                            Review="จองแล้ว 145 ครั้ง"
                            ReviewCount={127}
                            imgSrc="/img/provider5.png"
                        />
                        <Card
                            Name="สมหญิง ว้อนชาย"
                            Age={25}
                            Rating={4.8}
                            Location="กรุงเทพมหานคร"
                            Description="เจนค่ะ เจนค่ะ หนูชื่อเจนมากับบูมแล้วก็มากับโบว์ โบว์ค่ะ โบว์ค่ะ หนูชื่อโบว์มากับบูม แล้วก็มากับเจน นุ่มค่ะ นุ่มค่ะ..."
                            Type="แนะนำ"
                            PriceHr={500}
                            PriceD={3000}
                            Review="จองแล้ว 145 ครั้ง"
                            ReviewCount={127}
                            imgSrc="/img/provider6.png"
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}

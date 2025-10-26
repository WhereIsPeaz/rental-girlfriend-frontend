import Image from 'next/image'
import { MapPin, Star } from 'lucide-react'
import { Kanit } from 'next/font/google'
import ActivityBox from './ActivityBox'
import PrimaryButton from './PrimaryButton'
import { isBase64Image } from '@/lib/imageUtils'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

type Props = {
    Name: string
    Age: number
    Rating: number
    Location: string
    Description: string
    Type: string
    PriceHr: number
    PriceD: number
    Review: string
    ReviewCount: number
    imgSrc: string
    buttonTitle: string
    Categories?: string[] // เพิ่ม categories prop
}

export default function Card({
    Name,
    Age,
    Rating,
    Location,
    Description,
    Type,
    PriceHr,
    PriceD,
    Review,
    ReviewCount,
    imgSrc,
    buttonTitle,
    Categories = [], // เพิ่ม Categories prop พร้อม default value
}: Props) {
    const priceHr = PriceHr.toLocaleString('th-TH')
    const priceD = PriceD.toLocaleString('th-TH')

    return (
        <div
            className={`${kanit.className} m-4 h-121 w-full max-w-90 overflow-hidden rounded-[12px] border border-gray-100 bg-white shadow-sm`}
        >
            <div className="relative h-60 w-full">
                {isBase64Image(imgSrc) ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={imgSrc}
                        alt={Name}
                        className="h-full w-full object-cover object-[50%_35%]"
                    />
                ) : (
                    <Image
                        src={imgSrc}
                        alt={Name}
                        fill
                        sizes="(max-width: 768px) 100vw, 480px"
                        className="object-cover object-[50%_35%]"
                        priority
                    />
                )}
                {Type && (
                    <span className="absolute bottom-4 left-4 rounded-full bg-[#EAB308] px-3 py-1 text-xs font-semibold text-white shadow">
                        {Type}
                    </span>
                )}
            </div>

            <div className="pt-3 pr-5 pl-5">
                {/* ชื่อ + เรตติ้ง */}
                <div className="flex items-start justify-between gap-4">
                    <h3 className="text-4 leading-snug font-normal">{Name}</h3>
                    <div className="flex items-center gap-1 text-sm text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-gray-800">
                            {Rating.toFixed(1)}
                        </span>
                    </div>
                </div>

                {/* อายุ + โลเคชัน */}
                <div className="mt-3 mb-3 flex flex-wrap items-center gap-4 text-[11px] font-normal text-gray-500">
                    <span>{Age} ปี</span>
                    <span className="flex items-center gap-1 text-[11px] font-normal">
                        <MapPin className="h-4 w-4" />
                        {Location}
                    </span>
                </div>

                {/* คำอธิบาย */}
                <p className="mt-3 line-clamp-2 text-sm text-[11px] font-normal text-gray-500">
                    {Description}
                </p>

                {/* แท็กกิจกรรม */}
                <ActivityBox activities={Categories} />

                {/* ราคา + ปุ่มโปรไฟล์ */}
                <div className="mt-3 mb-3 flex items-center justify-between">
                    <div className="flex flex-col">
                        <div className="text-[16px] font-normal">
                            ฿ {priceHr}{' '}
                            <span className="ftext-[16px] font-normal">
                                / ชั่วโมง
                            </span>
                        </div>
                        <div className="text-[11px] font-normal text-gray-500">
                            ฿ {priceD} / วัน
                        </div>
                    </div>
                    <PrimaryButton title={buttonTitle} />
                </div>

                <hr className="border-0 border-t border-t-[#E1E7F4]/60" />

                {/* รีวิว/การจอง */}
                <div className="mt-3 mb-5 flex flex-wrap items-center gap-3 text-[11px] font-normal text-gray-500">
                    <span>{ReviewCount} รีวิว</span>
                    {Review && <span className="text-gray-400">|</span>}
                    {Review && <span>{Review}</span>}
                </div>
            </div>
        </div>
    )
}

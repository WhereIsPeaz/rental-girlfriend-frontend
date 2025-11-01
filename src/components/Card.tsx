import { Kanit } from 'next/font/google'
import PrimaryButton from './PrimaryButton'
import CardHeader from './card/CardHeader'
import CardFooter from './card/CardFooter'
import CardContent from './card/CardContent'
import React from 'react' // Import React for React.ReactNode

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

type Props = {
    id: string | number
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
    customButton?: React.ReactNode
}

export default function Card({
    id,
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
    customButton,
}: Props) {
    const priceHr = PriceHr.toLocaleString('th-TH')
    const priceD = PriceD.toLocaleString('th-TH')

    return (
        <div
            className={`${kanit.className} m-4 h-121 w-full max-w-90 overflow-hidden rounded-[12px] border border-gray-100 bg-white shadow-sm`}
        >
            <CardHeader
                imgSrc={imgSrc}
                name={Name}
                type={Type}
                rating={Rating}
            />

            <CardContent
                name={Name}
                age={Age}
                location={Location}
                description={Description}
                categories={Categories}
            />
            <div className="pr-5 pl-5">
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

                    {customButton ? (
                        customButton
                    ) : (
                        <PrimaryButton
                            title={buttonTitle}
                            onClick={() => {
                                // TODO: implement search logic
                            }}
                        />
                    )}
                </div>
            </div>
            <hr className="border-0 border-t border-t-[#E1E7F4]/60" />

            <CardFooter review={Review} reviewCount={ReviewCount} />
        </div>
    )
}

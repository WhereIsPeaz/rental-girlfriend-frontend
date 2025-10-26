'use client'

import React from 'react'
import PrimaryButton from '../PrimaryButton'

interface CardPricingProps {
    priceHr: number
    priceD: number
    buttonTitle: string
    onButtonClick: () => void
    customButton?: React.ReactNode
}

export default function CardPricing({
    priceHr,
    priceD,
    buttonTitle,
    onButtonClick,
    customButton,
}: CardPricingProps) {
    const formattedPriceHr = priceHr.toLocaleString('th-TH')
    const formattedPriceD = priceD.toLocaleString('th-TH')

    return (
        <div className="mt-3 mb-3 flex items-center justify-between px-5">
            <div className="flex flex-col">
                <div className="text-[16px] font-normal">
                    ฿ {formattedPriceHr}{' '}
                    <span className="ftext-[16px] font-normal">
                        / ชั่วโมง
                    </span>
                </div>
                <div className="text-[11px] font-normal text-gray-500">
                    ฿ {formattedPriceD} / วัน
                </div>
            </div>
            {customButton ?? (
                <PrimaryButton
                    title={buttonTitle}
                    onClick={onButtonClick}
                />
            )}
        </div>
    )
}
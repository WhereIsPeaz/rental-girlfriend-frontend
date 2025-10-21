'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function Alreadylogin() {
    const [messageCnt, setMessageCnt] = useState(7)
    const [notifyCnt, setNotifyCnt] = useState(5)
    const [name, setName] = useState('สมชาย โดว')
    const [pathimg, setPathImg] = useState('/img/p2.jpg')

    const notifyDisplay = notifyCnt > 9 ? '9+' : notifyCnt
    const messageCntDisplay = messageCnt > 9 ? '9+' : messageCnt

    return (
        <div className="flex items-center gap-[16px]">
            <div className="relative">
                <Image
                    src="/img/message.svg"
                    alt="message"
                    width={28}
                    height={28}
                />
                {messageCnt > 0 && (
                    <div className="absolute -top-0 -right-1 flex h-[15px] w-[14px] items-center justify-center rounded-[100px] bg-[#ef4444] text-[10px] text-white">
                        {messageCntDisplay}
                    </div>
                )}
            </div>

            <div className="relative">
                <Image
                    src="/img/notify.svg"
                    alt="notice"
                    width={28}
                    height={28}
                />
                {notifyCnt > 0 && (
                    <div className="absolute -top-0 -right-1 flex h-[15px] w-[14px] items-center justify-center rounded-[100px] bg-[#ef4444] text-[10px] text-white">
                        {notifyDisplay}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-[10px]">
                <div className="h-10 w-10">
                    <Image
                        src={pathimg}
                        alt="smallprofile"
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                    />
                </div>
                <div className="text-[16px] text-[#212b36]">{name}</div>
            </div>
        </div>
    )
}

'use client'
import Image from 'next/image'
import Link from 'next/link'
import Forlogin from './forlogin'
import Alreadylogin from './alreadylogin'
import { useAuthContext } from '@/contexts/AuthContext'

export default function Nav() {
    const { isAuthenticated } = useAuthContext()
    return (
        <nav className="sticky top-0 z-50 flex h-[64px] w-full items-center justify-between bg-white pr-[71px] pl-[71px] shadow-xl">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
                <div className="flex gap-[422px]">
                    <Link href="/" className="flex items-center justify-center">
                        <Image
                            src="/img/logo.svg"
                            alt="logo"
                            width={24}
                            height={24}
                        />
                        <div className="ml-[4px] text-[16px] font-black text-[#F24472]">
                            แฟนเช่า
                        </div>
                    </Link>
                </div>

                <div className="flex items-center gap-8 pl-[125px]">
                    <Link
                        href="/services"
                        className="text-[16px] text-[#212B36] transition-all hover:text-pink-500"
                    >
                        ค้นหาบริการ
                    </Link>
                    <Link
                        href="/how-to-use"
                        className="text-[16px] text-[#212B36] transition-all hover:text-pink-500"
                    >
                        วิธีใช้งาน
                    </Link>
                    <Link
                        href="/security"
                        className="text-[16px] text-[#212B36] transition-all hover:text-pink-500"
                    >
                        ความปลอดภัย
                    </Link>
                </div>

                {!isAuthenticated ? <Forlogin /> : <Alreadylogin />}
            </div>
        </nav>
    )
}

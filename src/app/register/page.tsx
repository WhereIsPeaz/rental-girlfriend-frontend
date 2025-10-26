'use client'
import Image from 'next/image'
import Link from 'next/link'
import UserForm from '@/components/register/userform'
import ProviderForm from '@/components/register/providerform'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/contexts/AuthContext'

export default function Register() {
    const [activeTab, setActiveTab] = useState('user')
    const { isAuthenticated, user } = useAuthContext()
    const router = useRouter()

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.type === 'provider') {
                router.push('/servicemanage')
            } else {
                router.push('/')
            }
        }
    }, [isAuthenticated, user, router])

    return (
        <main
            style={{
                background:
                    'linear-gradient(112.9deg, #FEEDF6 0%, #FFFFFF 50%, #FEEDF6 100%)',
            }}
            className="min-h-screen pt-12 sm:pt-16"
        >
            <div className="mx-auto mt-[40px] max-w-2xl px-4">
                <div className="flex flex-col items-center text-center">
                    <Image
                        src="/img/heartcycle.svg"
                        alt="heart icon"
                        width={44}
                        height={44}
                    />

                    <h1 className="mt-4 text-[28px] font-bold tracking-tight text-[#212B36]">
                        สมัครสมาชิก
                    </h1>
                    <p className="mt-2 text-[16px] text-[#6b7280]">
                        {activeTab === 'provider'
                            ? 'เริ่มต้นการให้บริการและสร้างรายได้'
                            : 'เข้าร่วมชุมชนแฟนเช่า วันนี้'}
                    </p>
                </div>
                <div className="mt-6 mb-3 grid w-[631px] grid-cols-2 gap-4 rounded-md bg-[#f4f6f8] p-[5px]">
                    <button
                        onClick={() => setActiveTab('user')}
                        className={`flex cursor-pointer items-center justify-center gap-2 rounded-sm text-center font-medium transition-all ${
                            activeTab === 'user'
                                ? 'bg-white shadow-sm'
                                : 'hover:text-pink-600'
                        }`}
                    >
                        <Image
                            src={
                                activeTab === 'user'
                                    ? '/img/user.svg'
                                    : '/img/userwithgray.svg'
                            }
                            alt="user icon"
                            width={20}
                            height={20}
                        />
                        <span
                            className={`${
                                activeTab === 'user'
                                    ? 'text-[#F24472]'
                                    : 'text-[#6b7280]'
                            }`}
                        >
                            ลูกค้า
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('provider')}
                        className={`flex cursor-pointer items-center justify-center gap-2 rounded-sm py-2.5 text-center text-sm font-medium transition-all ${
                            activeTab === 'provider'
                                ? 'bg-white shadow-sm'
                                : 'hover:text-pink-600'
                        }`}
                    >
                        <Image
                            src={
                                activeTab === 'provider'
                                    ? '/img/providerwithpink.svg'
                                    : '/img/provider.svg'
                            }
                            alt="provider icon"
                            width={20}
                            height={20}
                        />
                        <span
                            className={`${
                                activeTab === 'provider'
                                    ? 'text-[#F24472]'
                                    : 'text-[#6b7280]'
                            }`}
                        >
                            ผู้ให้บริการ
                        </span>
                    </button>
                </div>

                {activeTab === 'user' ? <UserForm /> : <ProviderForm />}
                <div className="pt-3 text-center">
                    <span className="text-[#000000]">มีบัญชีอยู่แล้ว? </span>
                    <Link
                        href="/"
                        className="text-[#f24472] transition-all hover:text-pink-700 hover:underline"
                    >
                        เข้าสู่ระบบ
                    </Link>
                </div>

                {/* Demo Auto Fill Buttons - ไว้ข้างล่างสุด */}
                <div className="mt-4 flex justify-center gap-3 pb-[64px]">
                    <button
                        type="button"
                        className="cursor-pointer rounded-md bg-pink-500 px-4 py-2 text-sm text-white transition-colors hover:bg-pink-600"
                        onClick={() => {
                            if (activeTab === 'user') {
                                // Trigger auto fill for user
                                window.dispatchEvent(
                                    new CustomEvent('fillUserDemo')
                                )
                            } else {
                                // Trigger auto fill for provider
                                window.dispatchEvent(
                                    new CustomEvent('fillProviderDemo')
                                )
                            }
                        }}
                    >
                        🎯 Auto Fill Demo (
                        {activeTab === 'user' ? 'ลูกค้า' : 'ผู้ให้บริการ'})
                    </button>
                </div>
            </div>
        </main>
    )
}

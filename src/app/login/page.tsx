'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
export default function Home() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    return (
        <div
            style={{
                background:
                    'linear-gradient(112.9deg, #FEEDF6 0%, #FFFFFF 50%, #FEEDF6 100%)',
            }}
            className="flex min-h-[91vh] flex-col items-center pt-12 sm:pt-16"
        >
            <div className="mt-[40px] flex w-full items-center justify-center">
                <div className="flex h-[44px] w-[44px] -scale-x-100 items-center justify-center rounded-[99px] bg-[linear-gradient(133.15deg,#F24BA7_2.02%,#EF4444_98.99%)]">
                    <Image
                        src="/img/heartcycle.svg"
                        alt="heart icon"
                        width={64}
                        height={64}
                    />
                </div>
            </div>
            <h4 className="mt-2 text-center text-[28px] leading-[140%] font-bold tracking-[0] text-[#212B36]">
                เข้าสู่ระบบ
            </h4>
            <p className="mt-3 text-[16px] text-[#6B7280]">
                ยินดีต้อนรับสู่แฟนเช่า
            </p>
            <form
                style={{
                    borderRadius: '16px',
                    boxShadow: '1px 4px 16px rgba(0, 0, 0, 0.1)',
                }}
                className="m-4 mb-0 w-[384px] bg-white p-6 pb-0 shadow-xl"
            >
                <div className="mb-4 flex justify-center gap-4">
                    <div className="w-full">
                        <label className="text-left text-[#212B36]">
                            อีเมล *
                        </label>
                        <div className="relative mt-2 w-full">
                            <div className="pointer-events-none absolute inset-y-0 left-0 ml-3 flex items-center">
                                <Image
                                    src="/img/email.svg"
                                    alt="user icon"
                                    width={20}
                                    height={20}
                                    className="text-gray-400"
                                />
                            </div>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="กรุณาใส่อีเมล"
                                style={{ border: '1px solid #E1E7F4' }}
                                className="mt-[8px] block !h-9 w-full rounded-md border-gray-300 pl-10 text-[#212B36] placeholder:text-[13px] placeholder:text-gray-500/50 focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <div className="w-full">
                        <div className="mb-2 text-left text-[#212B36]">
                            รหัสผ่าน *
                        </div>
                        <div className="relative mt-2 w-full">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Image
                                    src="/img/lock.svg"
                                    alt="security icon"
                                    width={20}
                                    height={20}
                                    className="text-gray-400"
                                />
                            </div>

                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="กรุณาใส่รหัสผ่าน"
                                style={{ border: '1px solid #E1E7F4' }}
                                className="block !h-9 w-full rounded-md border-gray-300 pl-10 text-[#212B36] placeholder:text-[13px] placeholder:text-gray-500/50 focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="!mt-2 text-right font-light text-[#F24472]">
                    <Link href="#">ลืมรหัสผ่าน ? </Link>
                </div>
                <button
                    type="submit"
                    style={{
                        background:
                            'linear-gradient(133.15deg, #F24BA7 2.02%, #EF4444 98.99%)',
                        borderRadius: '6px',
                    }}
                    className="mt-6 mb-6 w-full cursor-pointer px-5 py-3 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:outline-none"
                >
                    เข้าสู่ระบบ
                </button>
            </form>
            <div className="!mt-3 text-center">
                <span className="text-[#000000]">ยังไม่มีบัญชี? </span>
                <Link
                    href="/register"
                    className="text-[#f24472] transition-all hover:text-pink-700 hover:underline"
                >
                    สมัครสมาชิก
                </Link>
            </div>
            <div className="flex flex-col gap-[7px]">
                <div className="flex items-center justify-center">
                    <Link
                        href="/user-account"
                        className="mt-4 ml-[2px] flex h-[34px] w-[336px] items-center justify-center rounded-md border border-gray-200 bg-white p-4 text-base font-medium text-[#f6339a] transition-all hover:border-pink-300 hover:shadow-lg"
                    >
                        <Image
                            src="/img/user.svg"
                            alt="User Account Icon"
                            className="mr-[2px] mb-[2px]"
                            width={20}
                            height={20}
                        />
                        <span className="text-[#f24472]">User Account</span>
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <Link
                        href="/provider-account"
                        className="flex h-[34px] w-[336px] items-center justify-center rounded-md border border-gray-200 bg-white p-4 text-base font-medium text-[#f6339a] transition-all hover:border-pink-300 hover:shadow-lg"
                    >
                        <Image
                            src="/img/handshake.svg"
                            alt="Provider Account Icon"
                            className="mr-[2px]"
                            width={20}
                            height={20}
                        />
                        <span className="text-[#f24472]">Provider Account</span>
                    </Link>
                </div>
                <div className="flex items-center justify-center">
                    <Link
                        href="#"
                        className="mb-[56px] ml-[2px] flex h-[34px] w-[336px] items-center justify-center rounded-md border border-gray-200 bg-white p-4 text-base font-medium text-[#f6339a] transition-all hover:border-pink-300 hover:shadow-lg"
                    >
                        <Image
                            src="/img/protect.svg"
                            alt="Admin Account Icon"
                            className="mr-[2px]"
                            width={20}
                            height={20}
                        />
                        <span className="text-[#f24472]">Admin Account</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

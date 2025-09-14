import Image from 'next/image'
type AccountFieldsProps = {
    formData: any
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AccountFields({
    formData,
    handleChange,
}: AccountFieldsProps) {
    return (
        <div>
            <div className="mb-4 flex justify-center gap-4">
                <div className="w-full">
                    <label className="mb-2 text-left text-[#020617]">
                        อีเมล *
                    </label>
                    <div className="relative mt-2 w-full">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
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
                            className="block !h-9 w-full rounded-md pl-10 text-black placeholder:text-[13px] placeholder:text-[#b4b8bf] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                            required
                        />
                    </div>
                </div>
                <div className="w-full">
                    <label className="mb-2 text-left text-[#020617]">
                        ชื่อผู้ใช้ (Username) *
                    </label>
                    <div className="relative mt-2 w-full">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Image
                                src="/img/userinput.svg"
                                alt="user icon"
                                width={20}
                                height={20}
                                className="text-gray-400"
                            />
                        </div>

                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="กรุณาใส่ชื่อผู้ใช้"
                            style={{ border: '1px solid #E1E7F4' }}
                            className="block !h-9 w-full rounded-md pl-10 text-black placeholder:text-[13px] placeholder:text-[#b4b8bf] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-4">
                <div className="w-full">
                    <label className="mb-2 text-left text-[#020617]">
                        รหัสผ่าน *
                    </label>
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
                            className="block !h-9 w-full rounded-md pl-10 text-black placeholder:text-[13px] placeholder:text-[#b4b8bf] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                            required
                        />
                    </div>
                </div>
                <div className="w-full">
                    <label className="mb-2 text-left text-[#020617]">
                        ยืนยันรหัสผ่าน *
                    </label>
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
                            id="comfirmpassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            placeholder="ยืนยันรหัสผ่าน"
                            onChange={handleChange}
                            className={`block !h-9 w-full rounded-md border pl-10 text-black placeholder:text-[13px] placeholder:text-[#b4b8bf] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500 ${
                                formData.confirmPassword.length > 0 &&
                                formData.password != formData.confirmPassword
                                    ? '!border-red-500'
                                    : '!border-[#E1E7F4]'
                            }`}
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

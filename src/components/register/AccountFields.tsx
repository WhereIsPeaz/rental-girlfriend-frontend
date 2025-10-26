import Image from 'next/image'
interface FormData {
    email: string
    username: string
    password: string
    confirmPassword: string
}

type AccountFieldsProps = {
    formData: FormData
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    getFieldError?: (fieldName: string) => string | undefined
}

export default function AccountFields({
    formData,
    handleChange,
    getFieldError,
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
                            style={{
                                border: getFieldError?.('email')
                                    ? '1px solid #ef4444'
                                    : '1px solid #E1E7F4',
                            }}
                            className={`block !h-9 w-full rounded-md pl-10 text-black placeholder:text-[13px] placeholder:text-[#b4b8bf] focus:outline-2 focus:outline-offset-2 ${
                                getFieldError?.('email')
                                    ? 'focus:outline-red-500'
                                    : 'focus:outline-pink-500'
                            }`}
                            required
                        />
                    </div>
                    {getFieldError?.('email') && (
                        <p className="mt-1 text-sm text-red-500">
                            {getFieldError('email')}
                        </p>
                    )}
                </div>
                <div className="w-full">
                    <label className="mb-2 text-left text-[#020617]">
                        ชื่อผู้ใช้ (Username) *
                    </label>
                    <div className="relative mt-2 w-full">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Image
                                src="/img/userInput.svg"
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
                            style={{
                                border: getFieldError?.('username')
                                    ? '1px solid #ef4444'
                                    : '1px solid #E1E7F4',
                            }}
                            className={`block !h-9 w-full rounded-md pl-10 text-black placeholder:text-[13px] placeholder:text-[#b4b8bf] focus:outline-2 focus:outline-offset-2 ${
                                getFieldError?.('username')
                                    ? 'focus:outline-red-500'
                                    : 'focus:outline-pink-500'
                            }`}
                            required
                        />
                    </div>
                    {getFieldError?.('username') && (
                        <p className="mt-1 text-sm text-red-500">
                            {getFieldError('username')}
                        </p>
                    )}
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
                            style={{
                                border: getFieldError?.('password')
                                    ? '1px solid #ef4444'
                                    : '1px solid #E1E7F4',
                            }}
                            className={`block !h-9 w-full rounded-md pl-10 text-black placeholder:text-[13px] placeholder:text-[#b4b8bf] focus:outline-2 focus:outline-offset-2 ${
                                getFieldError?.('password')
                                    ? 'focus:outline-red-500'
                                    : 'focus:outline-pink-500'
                            }`}
                            required
                        />
                    </div>
                    {getFieldError?.('password') && (
                        <p className="mt-1 text-sm text-red-500">
                            {getFieldError('password')}
                        </p>
                    )}
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
                            style={{
                                border: getFieldError?.('confirmPassword')
                                    ? '1px solid #ef4444'
                                    : '1px solid #E1E7F4',
                            }}
                            className={`block !h-9 w-full rounded-md pl-10 text-black placeholder:text-[13px] placeholder:text-[#b4b8bf] focus:outline-2 focus:outline-offset-2 ${
                                getFieldError?.('confirmPassword')
                                    ? 'focus:outline-red-500'
                                    : 'focus:outline-pink-500'
                            }`}
                            required
                        />
                    </div>
                    {getFieldError?.('confirmPassword') && (
                        <p className="mt-1 text-sm text-red-500">
                            {getFieldError('confirmPassword')}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

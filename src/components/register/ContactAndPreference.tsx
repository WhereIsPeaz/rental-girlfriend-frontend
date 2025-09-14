'use client'
import Image from 'next/image'
type AccountFieldsProps = {
    formData: any
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
}

export default function ContactAndPreference({
    formData,
    handleChange,
}: AccountFieldsProps) {
    return (
        <div>
            <div className="flex justify-center gap-4">
                <div className="w-full">
                    <label className="mb-2 text-left text-[#020617]">
                        เบอร์โทรศัพท์ *
                    </label>
                    <div className="relative mt-2 w-full">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Image
                                src="/img/tel.svg"
                                alt="user icon"
                                width={20}
                                height={20}
                                className="text-gray-400"
                            />
                        </div>

                        <input
                            type="tel"
                            id="tel"
                            name="tel"
                            value={formData.tel}
                            onChange={handleChange}
                            placeholder="กรุณาใส่เบอร์โทรศัพท์"
                            style={{ border: '1px solid #E1E7F4' }}
                            className="block !h-9 w-full !rounded-md pl-10 text-black placeholder:text-[13px] placeholder:text-[#b4b8bf] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                            required
                        />
                    </div>
                </div>
                <div className="w-full">
                    <label className="mb-2 text-left text-[#020617]">
                        เพศ *
                    </label>
                    <div className="relative mt-2 w-full">
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            style={{ border: '1px solid #E1E7F4' }}
                            className={`block !h-9 w-full rounded-md pl-3 placeholder:text-[13px] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500 ${
                                formData.gender
                                    ? 'text-[13px] text-black'
                                    : 'text-[13px] text-[#b4b8bf]'
                            }`}
                            required
                        >
                            <option value="" disabled hidden>
                                กรุณาเลือกเพศ
                            </option>
                            <option className="text-black">ชาย</option>
                            <option className="text-black">หญิง</option>
                            <option className="text-black">LGBTQ+</option>
                        </select>
                    </div>
                </div>
                <div className="w-full">
                    <label className="mb-2 text-left text-[#020617]">
                        เพศที่สนใจ *
                    </label>
                    <div className="relative mt-2 w-full">
                        <select
                            id="interestedGender"
                            name="interestedGender"
                            value={formData.interestedGender}
                            onChange={handleChange}
                            style={{ border: '1px solid #E1E7F4' }}
                            className={`block !h-9 w-full rounded-md pl-3 focus:outline-2 focus:outline-offset-2 focus:outline-pink-500 ${
                                formData.interestedGender
                                    ? 'text-[13px] text-black'
                                    : 'text-[13px] text-[#b4b8bf]'
                            }`}
                            required
                        >
                            <option value="" disabled hidden>
                                กรุณาเลือกเพศ
                            </option>
                            <option className="text-black">ชาย</option>
                            <option className="text-black">หญิง</option>
                            <option className="text-black">LGBTQ+</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

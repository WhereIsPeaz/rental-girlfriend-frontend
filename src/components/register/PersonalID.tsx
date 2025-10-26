import Image from 'next/image'
interface FormData {
    id: string
}

type PersonalIDProps = {
    formData: FormData
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    getFieldError?: (fieldName: string) => string | undefined
}
export default function PersonalID({
    formData,
    handleChange,
}: PersonalIDProps) {
    return (
        <div>
            <div className="w-full">
                <label className="mb-2 text-left text-[#020617]">
                    รหัสบัตรประจำตัวประชาชน *
                </label>
                <div className="relative mt-2 w-full">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Image
                            src="/img/userinput.svg"
                            alt="email icon"
                            width={20}
                            height={20}
                            className="text-gray-400"
                        />
                    </div>

                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        placeholder="กรุณาใส่รหัสบัตรประจำตัวประชาชน 13 หลัก"
                        style={{ border: '1px solid #E1E7F4' }}
                        className="block !h-9 w-full rounded-md pl-10 text-black placeholder:text-[13px] placeholder:text-[#b4b8bf] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                        required
                    />
                </div>
            </div>
        </div>
    )
}

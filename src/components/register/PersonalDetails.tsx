type AccountFieldsProps = {
    formData: any
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export default function PersonalDetails({
    formData,
    handleChange,
}: AccountFieldsProps) {
    return (
        <div>
            <div className="flex justify-center gap-4">
                <div className="w-full">
                    <label className="mb-2 text-left text-[#020617]">
                        ชื่อ *
                    </label>
                    <div className="relative mt-2 w-full">
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="กรุณาใส่ชื่อ"
                            style={{ border: '1px solid #E1E7F4' }}
                            className="block !h-9 w-full !rounded-md pl-4 text-black placeholder:text-[13px] placeholder:text-[#b4b8bf] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                            required
                        />
                    </div>
                </div>
                <div className="w-full">
                    <label className="mb-2 text-left text-[#020617]">
                        นามสกุล *
                    </label>
                    <div className="relative mt-2 w-full">
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            style={{ border: '1px solid #E1E7F4' }}
                            placeholder="กรุณาใส่นามสกุล"
                            className="block !h-9 w-full rounded-md pl-4 text-black placeholder:text-[13px] placeholder:text-[#b4b8bf] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                        />
                    </div>
                </div>
                <div className="w-full">
                    <label className="mb-2 text-left text-[#020617]">
                        วันเกิด *
                    </label>

                    <input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        style={{ border: '1px solid #E1E7F4' }}
                        placeholder="กรุณาใส่วันเกิด"
                        className="mt-2 block !h-9 w-full rounded-md pl-4 text-black placeholder:text-[13px] placeholder:text-[#b4b8bf] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                    />
                </div>
            </div>
        </div>
    )
}

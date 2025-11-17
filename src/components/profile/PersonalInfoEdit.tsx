'use client'

import { useState } from 'react'
import { Mail, User, Phone, Calendar, CreditCard, Save } from 'lucide-react'

interface User {
    type: string
    id: string
    username: string
    name: string
    email: string
    phone: string
    birth: string
    gender: string
    interest: string
}

export default function PersonalInfoEdit({
    user,
    draft,
    handleDraftChange,
    handleSave,
}: {
    user: User
    draft: User
    handleDraftChange: (key: string, value: string) => void
    handleSave: (e: React.FormEvent) => void
}) {
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    const [phoneError, setPhoneError] = useState('')

    const [birthError, setBirthError] = useState('')

    const validateRequired = () => {
        const errors: Record<string, string> = {}

        if (!draft.id && user.type === 'provider') errors.id = 'กรุณากรอกข้อมูล'
        if (!draft.username) errors.username = 'กรุณากรอกข้อมูล'
        if (!draft.name) errors.name = 'กรุณากรอกข้อมูล'
        if (!draft.email) errors.email = 'กรุณากรอกข้อมูล'
        if (!draft.phone) errors.phone = 'กรุณากรอกข้อมูล'
        if (!draft.birth) errors.birth = 'กรุณากรอกข้อมูล'
        if (!draft.gender) errors.gender = 'กรุณากรอกข้อมูล'
        if (!draft.interest) errors.interest = 'กรุณากรอกข้อมูล'

        setFieldErrors(errors)
        return Object.keys(errors).length === 0
    }

    // ฟอร์แมต xxx-xxx-xxxx
    const formatPhone = (value: string) => {
        // เอาเฉพาะตัวเลข
        const digits = value.replace(/\D/g, '')

        let formatted = digits
        if (digits.length > 3 && digits.length <= 6) {
            formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`
        } else if (digits.length > 6) {
            formatted = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`
        }

        return formatted
    }

    // ฟอร์แมต yyyy-mm-dd
    const formatBirth = (value: string) => {
        const digits = value.replace(/\D/g, '') // keep only numbers

        let formatted = digits
        if (digits.length > 4 && digits.length <= 6) {
            formatted = `${digits.slice(0, 4)}-${digits.slice(4)}`
        } else if (digits.length > 6) {
            formatted = `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`
        }

        return formatted
    }

    const isValidPhone = (value: string) => {
        return /^\d{3}-\d{3}-\d{4}$/.test(value)
    }

    const isValidBirth = (value: string) => {
        // yyyy-mm-dd
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false

        // เช็คว่าเป็นวันที่จริง เช่น 2023-02-31 ไม่ผ่าน
        const date = new Date(value)
        const parts = value.split('-')
        return (
            date.getFullYear() === Number(parts[0]) &&
            date.getMonth() + 1 === Number(parts[1]) &&
            date.getDate() === Number(parts[2])
        )
    }

    const isValidName = (value: string) => {
        return /^[A-Za-zก-ฮะ-์\s]+$/.test(value)
    }

    const handlePhoneChange = (value: string) => {
        const formatted = formatPhone(value)
        handleDraftChange('phone', formatted)

        if (!isValidPhone(formatted)) {
            setPhoneError('กรุณากรอกตามรูปแบบ xxx-xxx-xxxx')
        } else {
            setPhoneError('')
        }
    }

    const handleBirthChange = (value: string) => {
        const formatted = formatBirth(value)
        handleDraftChange('birth', formatted)

        if (!isValidBirth(formatted)) {
            setBirthError('กรุณากรอกตามรูปแบบ yyyy-mm-dd')
        } else {
            setBirthError('')
        }
    }

    const handleNameChange = (value: string) => {
        // ลบทุกอย่างที่ไม่ใช่ตัวอักษรหรือช่องว่าง
        const cleaned = value.replace(/[^A-Za-zก-ฮะ-์\s]/g, '')

        handleDraftChange('name', cleaned)

        if (!isValidName(cleaned)) {
            setFieldErrors((prev) => ({
                ...prev,
                name: 'กรุณากรอกเฉพาะตัวอักษร',
            }))
        } else {
            setFieldErrors((prev) => ({ ...prev, name: '' }))
        }
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        let hasError = false

        if (!validateRequired()) hasError = true

        if (!isValidPhone(draft.phone)) {
            setPhoneError('กรุณากรอกตามรูปแบบ xxx-xxx-xxxx')
            hasError = true
        }

        if (!isValidBirth(draft.birth)) {
            setBirthError('กรุณากรอกตามรูปแบบ yyyy-mm-dd')
            hasError = true
        }

        if (hasError) return

        handleSave(e)
    }

    return (
        <form
            onSubmit={onSubmit}
            className="grid w-[469px] gap-4 rounded-[16px] bg-white p-6 shadow-[1px_4px_16px_rgba(0,0,0,0.1)]"
        >
            <h2 className="h-[27px] w-[100px] text-[19px] leading-[140%] font-normal text-black">
                ข้อมูลส่วนตัว
            </h2>
            <div className="grid-cols grid gap-4">
                {/* Row 1 */}
                <div className="flex h-[58px] gap-4">
                    {user.type === 'provider' && (
                        <div className="relative flex h-[58px] w-[202.5px] flex-col items-start gap-1">
                            <p className="h-[18px] w-[93px] text-[13px] leading-[140%] font-normal text-[#020617]">
                                รหัสบัตรประชาชน
                            </p>
                            <input
                                type="text"
                                value={draft.id}
                                onChange={(e) =>
                                    handleDraftChange('id', e.target.value)
                                }
                                className="box-border flex h-[36px] w-[202.5px] flex-row items-center gap-2 rounded-md border border-[#E1E7F4] px-3 py-2 pl-9 text-[13px] leading-[140%] font-normal text-[#212B36] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                            ></input>
                            <div className="absolute top-8 left-3">
                                <CreditCard className="h-4 w-4 opacity-50" />
                            </div>
                            {fieldErrors.id && (
                                <p className="text-[11px] text-red-500 mt-1">{fieldErrors.id}</p>
                            )}
                        </div>
                    )}

                    <div className="relative flex h-[58px] w-[202.5px] flex-col items-start gap-1">
                        <p className="h-[18px] w-[105px] text-[13px] leading-[140%] font-normal text-[#020617]">
                            ชื่อผู้ใช้ (Username)
                        </p>
                        <input
                            type="text"
                            value={draft.username}
                            onChange={(e) =>
                                handleDraftChange('username', e.target.value)
                            }
                            className="box-border flex h-[36px] w-[202.5px] flex-row items-center gap-2 rounded-md border border-[#E1E7F4] px-3 py-2 pl-9 text-[13px] leading-[140%] font-normal text-[#212B36] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                        ></input>
                        <div className="absolute top-8 left-3">
                            <User className="h-4 w-4 opacity-50" />
                        </div>
                        {fieldErrors.username && (
                            <p className="text-[11px] text-red-500 mt-1">{fieldErrors.username}</p>
                        )}
                    </div>
                </div>

                {/* Row 2 */}
                <div className="flex h-[58px] gap-4">
                    <div className="relative flex h-[58px] w-[202.5px] flex-col items-start gap-1">
                        <p className="h-[18px] w-[73px] text-[13px] leading-[140%] font-normal text-[#020617]">
                            ชื่อ - นามสกุล
                        </p>
                        <input
                            type="text"
                            value={draft.name}
                            onChange={(e) =>
                                handleNameChange(e.target.value)
                            }
                            className="box-border flex h-[36px] w-[202.5px] flex-row items-center gap-2 rounded-md border border-[#E1E7F4] px-3 py-2 pl-9 text-[13px] leading-[140%] font-normal text-[#212B36] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                        ></input>
                        <div className="absolute top-8 left-3">
                            <User className="h-4 w-4 opacity-50" />
                        </div>
                        {fieldErrors.name && (
                            <p className="text-[11px] text-red-500 mt-1">{fieldErrors.name}</p>
                        )}
                    </div>

                    <div className="relative flex h-[58px] w-[202.5px] flex-col items-start gap-1">
                        <p className="h-[18px] w-[28px] text-[13px] leading-[140%] font-normal text-[#020617]">
                            อีเมล
                        </p>
                        <input
                            type="text"
                            value={draft.email}
                            onChange={(e) =>
                                handleDraftChange('email', e.target.value)
                            }
                            className="box-border flex h-[36px] w-[202.5px] flex-row items-center gap-2 rounded-md border border-[#E1E7F4] px-3 py-2 pl-9 text-[13px] leading-[140%] font-normal text-[#212B36] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                        ></input>
                        <div className="absolute top-8 left-3">
                            <Mail className="h-4 w-4 opacity-50" />
                        </div>
                        {fieldErrors.email && (
                            <p className="text-[11px] text-red-500 mt-1">{fieldErrors.email}</p>
                        )}
                    </div>
                </div>

                {/* Row 3 */}
                <div className="flex h-[58px] gap-4">
                    <div className="relative flex h-[58px] w-[202.5px] flex-col items-start gap-1">
                        <p className="h-[18px] w-[71px] text-[13px] leading-[140%] font-normal text-[#020617]">
                            เบอร์โทรศัพท์
                        </p>
                        <input
                            type="text"
                            value={draft.phone}
                            onChange={(e) =>
                                handlePhoneChange(e.target.value)
                            }
                            className="box-border flex h-[36px] w-[202.5px] flex-row items-center gap-2 rounded-md border border-[#E1E7F4] px-3 py-2 pl-9 text-[13px] leading-[140%] font-normal text-[#212B36] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                        ></input>
                        <div className="absolute top-8 left-3">
                            <Phone className="h-4 w-4 opacity-50" />
                        </div>
                        {phoneError && (
                            <p className="text-[11px] text-red-500 mt-1">
                                {phoneError}
                            </p>
                        )}
                    </div>

                    <div className="relative flex h-[58px] w-[202.5px] flex-col items-start gap-1">
                        <p className="h-[18px] w-[35px] text-[13px] leading-[140%] font-normal text-[#020617]">
                            วันเกิด
                        </p>
                        <input
                            type="text"
                            value={draft.birth}
                            onChange={(e) =>
                                handleBirthChange(e.target.value)
                            }
                            className="box-border flex h-[36px] w-[202.5px] flex-row items-center gap-2 rounded-md border border-[#E1E7F4] px-3 py-2 pl-9 text-[13px] leading-[140%] font-normal text-[#212B36] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                        ></input>
                        <div className="absolute top-8 left-3">
                            <Calendar className="h-4 w-4 opacity-50" />
                        </div>
                        {birthError && (
                            <p className="text-[11px] text-red-500 mt-1">{birthError}</p>
                        )}
                    </div>
                </div>

                {/* Row 4 */}
                <div className="flex h-[40px] gap-4">
                    <div className="flex h-[40px] w-[202.5px] items-center gap-2">
                        <p className="h-[18px] w-[22px] text-[13px] leading-[140%] font-normal text-[#212B36]">
                            เพศ
                        </p>
                        <select
                            value={draft.gender}
                            onChange={(e) =>
                                handleDraftChange('gender', e.target.value)
                            }
                            className="box-border flex h-10 w-20 flex-row items-center justify-center rounded-md border border-[#E1E7F4] px-3 py-2 text-[13px] leading-[140%] text-[#212B36] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                        >
                            <option value="ชาย">ชาย</option>
                            <option value="หญิง">หญิง</option>
                            <option value="อื่นๆ">อื่นๆ</option>
                        </select>
                    </div>

                    <div className="flex h-[40px] w-[202.5px] items-center gap-2">
                        <p className="h-[18px] w-[57px] text-[13px] leading-[140%] font-normal text-[#212B36]">
                            เพศที่สนใจ
                        </p>
                        <select
                            value={draft.interest}
                            onChange={(e) =>
                                handleDraftChange('interest', e.target.value)
                            }
                            className="box-border flex h-10 w-20 flex-row items-center justify-center gap-2 rounded-md border border-[#E1E7F4] px-3 py-2 text-[13px] leading-[140%] text-[#0212B36] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                        >
                            <option value="ชาย">ชาย</option>
                            <option value="หญิง">หญิง</option>
                            <option value="อื่นๆ">อื่นๆ</option>
                        </select>
                    </div>
                </div>

                {/* Row 5 */}
                <div className="flex h-[34px] w-[421px] flex-col items-end justify-center">
                    <button
                        type="submit"
                        className="flex h-[34px] w-[179px] cursor-pointer flex-row items-center justify-center gap-2 rounded-md bg-[linear-gradient(133.15deg,#F24BA7_2.02%,#EF4444_98.99%)] px-4 py-2"
                    >
                        <Save className="h-4 w-4 text-white" />
                        <p className="h-[18px] w-[123px] text-[13px] leading-[140%] font-bold text-[#F8FAFC]">
                            บันทึกการเปลี่ยนแปลง
                        </p>
                    </button>
                </div>
            </div>
        </form>
    )
}

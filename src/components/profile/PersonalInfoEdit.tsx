'use client'

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
    return (
        <form
            onSubmit={handleSave}
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
                                handleDraftChange('name', e.target.value)
                            }
                            className="box-border flex h-[36px] w-[202.5px] flex-row items-center gap-2 rounded-md border border-[#E1E7F4] px-3 py-2 pl-9 text-[13px] leading-[140%] font-normal text-[#212B36] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                        ></input>
                        <div className="absolute top-8 left-3">
                            <User className="h-4 w-4 opacity-50" />
                        </div>
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
                                handleDraftChange('phone', e.target.value)
                            }
                            className="box-border flex h-[36px] w-[202.5px] flex-row items-center gap-2 rounded-md border border-[#E1E7F4] px-3 py-2 pl-9 text-[13px] leading-[140%] font-normal text-[#212B36] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                        ></input>
                        <div className="absolute top-8 left-3">
                            <Phone className="h-4 w-4 opacity-50" />
                        </div>
                    </div>

                    <div className="relative flex h-[58px] w-[202.5px] flex-col items-start gap-1">
                        <p className="h-[18px] w-[35px] text-[13px] leading-[140%] font-normal text-[#020617]">
                            วันเกิด
                        </p>
                        <input
                            type="text"
                            value={draft.birth}
                            onChange={(e) =>
                                handleDraftChange('birth', e.target.value)
                            }
                            className="box-border flex h-[36px] w-[202.5px] flex-row items-center gap-2 rounded-md border border-[#E1E7F4] px-3 py-2 pl-9 text-[13px] leading-[140%] font-normal text-[#212B36] focus:outline-2 focus:outline-offset-2 focus:outline-pink-500"
                        ></input>
                        <div className="absolute top-8 left-3">
                            <Calendar className="h-4 w-4 opacity-50" />
                        </div>
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

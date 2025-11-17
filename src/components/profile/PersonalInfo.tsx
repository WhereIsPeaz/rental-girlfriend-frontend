import { Mail, User, Phone, Calendar, CreditCard } from 'lucide-react'

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

export default function PersonalInfo({ user }: { user: User }) {
    return (
        <div className="grid w-[469px] gap-4 rounded-[16px] bg-white p-6 shadow-[1px_4px_16px_rgba(0,0,0,0.1)]">
            <h2 className="h-[27px] w-[100px] text-[19px] leading-[140%] font-normal text-black">
                ข้อมูลส่วนตัว
            </h2>

            <div className="grid-cols grid gap-4">
                {/* Row 1 */}
                <div className="flex gap-4">
                    {user.type === 'provider' && (
                        <div className="flex h-[58px] w-[202.5px] flex-col items-start gap-1">
                            <p className="h-[18px] w-[93px] text-[13px] leading-[140%] font-normal text-[#020617]">
                                รหัสบัตรประชาชน
                            </p>
                            <div className="ml-3 flex gap-[9px]">
                                <CreditCard className="mt-[10px] h-4 w-4 opacity-50" />
                                <p className="mt-[10px] h-[18px] text-[13px] leading-[140%] font-normal text-[#212B36]">
                                    {user.id}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="flex h-[58px] w-[202.5px] flex-col items-start gap-1">
                        <p className="h-[18px] w-[105px] text-[13px] leading-[140%] font-normal text-[#020617]">
                            ชื่อผู้ใช้ (Username)
                        </p>
                        <div className="ml-3 flex gap-[9px]">
                            <User className="mt-[10px] h-4 w-4 opacity-50" />
                            <p className="mt-[10px] h-[18px] text-[13px] leading-[140%] font-normal text-[#212B36]">
                                {user.username}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Row 2 */}
                <div className="flex gap-4">
                    <div className="flex h-[58px] w-[202.5px] flex-col items-start gap-1">
                        <p className="h-[18px] w-[73px] text-[13px] leading-[140%] font-normal text-[#020617]">
                            ชื่อ - นามสกุล
                        </p>
                        <div className="ml-3 flex gap-[9px]">
                            <User className="mt-[10px] h-4 w-4 opacity-50" />
                            <p className="mt-[10px] h-[18px] text-[13px] leading-[140%] font-normal text-[#212B36]">
                                {user.name}
                            </p>
                        </div>
                    </div>
                    <div className="flex h-[58px] w-[202.5px] flex-col items-start gap-1">
                        <p className="h-[18px] w-[28px] text-[13px] leading-[140%] font-normal text-[#020617]">
                            อีเมล
                        </p>
                        <div className="ml-3 flex gap-[9px]">
                            <Mail className="mt-[10px] h-4 w-4 opacity-50" />
                            <p className="mt-[10px] h-[18px] text-[13px] leading-[140%] font-normal text-[#212B36]">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Row 3 */}
                <div className="flex gap-4">
                    <div className="flex h-[58px] w-[202.5px] flex-col items-start gap-1">
                        <p className="h-[18px] w-[71px] text-[13px] leading-[140%] font-normal text-[#020617]">
                            เบอร์โทรศัพท์
                        </p>
                        <div className="ml-3 flex gap-[9px]">
                            <Phone className="mt-[10px] h-4 w-4 opacity-50" />
                            <p className="mt-[10px] h-[18px] text-[13px] leading-[140%] font-normal text-[#212B36]">
                                {user.phone}
                            </p>
                        </div>
                    </div>
                    <div className="flex h-[58px] w-[202.5px] flex-col items-start gap-1">
                        <p className="h-[18px] w-[35px] text-[13px] leading-[140%] font-normal text-[#020617]">
                            วันเกิด
                        </p>
                        <div className="ml-3 flex gap-[9px]">
                            <Calendar className="mt-[10px] h-4 w-4 opacity-50" />
                            <p className="mt-[10px] h-[18px] text-[13px] leading-[140%] font-normal text-[#212B36]">
                                {user.birth}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Row 4 */}
                <div className="flex gap-4">
                    <div className="flex h-[40px] w-[202.5px] items-center gap-[9px]">
                        <p className="h-[18px] w-[22px] text-[13px] leading-[140%] font-normal text-[#020617]">
                            เพศ
                        </p>
                        <p className="ml-4 h-[18px] w-[22px] text-[13px] leading-[140%] font-normal text-[#020617]">
                            {user.gender}
                        </p>
                    </div>
                    <div className="flex h-[40px] w-[202.5px] items-center gap-[9px]">
                        <p className="h-[18px] w-[57px] text-[13px] leading-[140%] font-normal text-[#020617]">
                            เพศที่สนใจ
                        </p>
                        <p className="ml-4 h-[18px] w-[28px] text-[13px] leading-[140%] font-normal text-[#020617]">
                            {user.interest}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

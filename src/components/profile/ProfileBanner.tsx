import { Camera } from 'lucide-react'
import Image from 'next/image'

interface User {
    img: string
    username: string
    joined: string
}

interface ProfileBannerProps {
    user: User
    setChangeProfile: (value: boolean) => void
    setEditProfile: (value: boolean) => void
    editProfile: boolean
}

export default function ProfileBanner({
    user,
    setChangeProfile,
    setEditProfile,
    editProfile,
}: ProfileBannerProps) {
    return (
        <section className="flex h-[160px] w-[762px] justify-between gap-3 rounded-xl bg-[linear-gradient(133.15deg,#F24BA7_2.02%,#EF4444_98.99%)] p-7">
            <div className="flex h-20 w-65.25 items-end gap-3 pt-26">
                <div className="relative h-20 w-20">
                    <Image
                        src={user.img}
                        alt="profile"
                        width={80}
                        height={80}
                        className="box-border h-20 w-20 rounded-full border-[3px] border-white object-cover"
                    />
                    <button
                        onClick={() => setChangeProfile(true)}
                        className="absolute right-0 bottom-0 flex h-7 w-7 cursor-pointer flex-col items-center justify-center gap-[10px] rounded-full border border-gray-300 bg-white"
                    >
                        <Camera className="h-4 w-4" />
                    </button>
                </div>

                <div className="flex h-[62px] w-[169px] flex-col items-start gap-3">
                    <h1 className="h-[32px] w-[109px] text-[23px] leading-[140%] font-bold text-white">
                        {user.username}
                    </h1>
                    <p className="h-[18px] w-[169px] text-[13px] leading-[140%] font-bold text-white">
                        ผู้ให้บริการ | เข้าร่วมตั้งแต่ {user.joined}
                    </p>
                </div>
            </div>

            <div className="flex h-[34px] w-[102px] items-start justify-end">
                {editProfile ? (
                    <button
                        onClick={() => setEditProfile(false)}
                        className="flex h-[34px] w-[69px] flex-row items-center justify-center gap-[10px] rounded-md bg-[rgba(244,246,248,0.5)] px-4 py-2"
                    >
                        <p className="h-[18px] w-[70px] text-[13px] leading-[140%] font-bold text-white">
                            ยกเลิก
                        </p>
                    </button>
                ) : (
                    <button
                        onClick={() => setEditProfile(true)}
                        className="flex h-[34px] w-[102px] cursor-pointer flex-row items-center justify-center gap-[10px] rounded-md bg-[rgba(244,246,248,0.5)] px-4 py-2"
                    >
                        <p className="h-[18px] w-[70px] text-[13px] leading-[140%] font-bold text-white">
                            แก้ไขโปรไฟล์
                        </p>
                    </button>
                )}
            </div>
        </section>
    )
}

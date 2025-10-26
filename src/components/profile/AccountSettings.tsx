'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { useAuthContext } from '@/contexts/AuthContext'
import { deleteUserAccount } from '@/lib/localStorage'
import DeleteAccountModal from './DeleteAccountModal'
import toast from 'react-hot-toast'

export default function AccountSettings() {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { user, logout } = useAuthContext()
    const router = useRouter()

    const handleDeleteAccount = async (password: string) => {
        if (!user) return

        try {
            deleteUserAccount(user.id, password)
            toast.success('ลบบัญชีสำเร็จ')
            logout()
            router.push('/')
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'เกิดข้อผิดพลาดในการลบบัญชี'
            )
            throw error // Re-throw to keep modal open
        }
    }

    return (
        <>
            <div className="flex h-54.75 w-68.25 flex-col gap-4 rounded-[16px] bg-white p-6 shadow-[1px_4px_16px_rgba(0,0,0,0.1)]">
                <h2 className="h-[27px] w-[114px] text-[19px] leading-[140%] font-normal text-black">
                    การตั้งค่าบัญชี
                </h2>
                <div className="flex flex-col gap-1">
                    <button className="flex h-[40px] w-[225px] cursor-pointer flex-row items-center gap-[10px] rounded-md px-4 py-2 hover:underline">
                        <p className="font-inter h-[24px] text-[14px] leading-[24px] font-medium text-[#020617] not-italic">
                            เปลี่ยนรหัสผ่าน
                        </p>
                    </button>
                    <button className="flex h-[40px] w-[225px] cursor-pointer flex-row items-center gap-[10px] rounded-md px-4 py-2 hover:underline">
                        <p className="font-inter h-[24px] text-[14px] leading-[24px] font-medium text-[#020617] not-italic">
                            ความเป็นส่วนตัว
                        </p>
                    </button>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="flex h-[40px] w-[225px] cursor-pointer flex-row items-center gap-[10px] rounded-md px-4 py-2 decoration-red-500 hover:bg-red-50 hover:underline"
                    >
                        <Trash2 className="h-4 w-4 text-[#F24472]" />
                        <p className="font-inter h-[24px] text-[14px] leading-[24px] font-medium text-[#F24472] not-italic">
                            ลบบัญชี
                        </p>
                    </button>
                </div>
            </div>

            <DeleteAccountModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteAccount}
                userType={user?.type ?? 'customer'}
            />
        </>
    )
}

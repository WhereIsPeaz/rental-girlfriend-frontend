'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Kanit } from 'next/font/google'
import { useAuthContext } from '@/contexts/AuthContext'
import * as usersApi from '@/lib/api/users'
import toast from 'react-hot-toast'

import ProfileBanner from '@/components/profile/ProfileBanner'
import PersonalInfo from '@/components/profile/PersonalInfo'
import PersonalInfoEdit from '@/components/profile/PersonalInfoEdit'
import AccountSettings from '@/components/profile/AccountSettings'
import ChangeProfile from '@/components/profile/ChangeProfile'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

export default function ProfilePage() {
    const { user: authUser, updateUser, isAuthenticated } = useAuthContext()
    const router = useRouter()

    const getInitialUserData = () => ({
        type: authUser?.type ?? 'customer',
        img: authUser?.img ?? '/img/p2.jpg',
        id: authUser?.idCard ?? '',
        username: authUser?.username ?? '',
        name: `${authUser?.firstName ?? ''} ${authUser?.lastName ?? ''}`.trim(),
        email: authUser?.email ?? '',
        phone: authUser?.phone ?? '',
        birth: authUser?.birthdate ?? '',
        gender: authUser?.gender ?? '',
        interest: authUser?.interestedGender ?? '',
        joined: authUser?.joined ?? '',
    })

    const [user, setUser] = useState(getInitialUserData)

    // Track if we're currently updating to prevent useEffect from overriding
    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
            return
        }

        // Don't update state if we're currently in the middle of an update
        if (isUpdating) {
            return
        }

        if (authUser) {
            const newUserData = {
                type: authUser.type,
                img: authUser.img ?? '/img/p2.jpg',
                id: authUser.idCard ?? '',
                username: authUser.username,
                name: `${authUser.firstName || ''} ${authUser.lastName || ''}`.trim(),
                email: authUser.email,
                phone: authUser.phone ?? '',
                birth: authUser.birthdate,
                gender: authUser.gender,
                interest: authUser.interestedGender,
                joined: authUser.joined,
            }
            setUser(newUserData)
            setDraft(newUserData) // sync draft ด้วย
        }
    }, [authUser, isAuthenticated, router, isUpdating])

    const [changeProfile, setChangeProfile] = useState(false)

    const [tempImg, setTempImg] = useState<string | null>(null)

    const [editProfile, setEditProfile] = useState(false)

    const [draft, setDraft] = useState(getInitialUserData)

    const handleDraftChange = (key: string, value: string) => {
        setDraft({ ...draft, [key]: value })
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!authUser) {
            return
        }

        // แปลงข้อมูลกลับเป็นรูปแบบ User
        const [firstName, ...lastNameParts] = draft.name.split(' ')
        const lastName = lastNameParts.join(' ') ?? ''

        // Show loading toast
        const processingToast = toast.loading('กำลังอัปเดตข้อมูลโปรไฟล์...', {
            duration: Infinity,
        })

        try {
            setIsUpdating(true) // Set flag to prevent useEffect from overriding

            // อัปเดตผ่าน API
            const updatedUserData = await usersApi.updateUser(authUser.id, {
                firstName: firstName ?? '',
                lastName,
                username: draft.username,
                email: draft.email,
                phone: draft.phone,
                birthdate: draft.birth,
                gender: draft.gender,
                interestedGender: draft.interest,
                img: draft.img,
            })

            // อัปเดต context
            updateUser(updatedUserData)

            // อัปเดต state ให้สอดคล้องกัน (ใช้ข้อมูลจาก updatedUserData)
            const newUserData = {
                type: updatedUserData.type,
                img: updatedUserData.img ?? '/img/p2.jpg',
                id: updatedUserData.idCard ?? '',
                username: updatedUserData.username,
                name: `${updatedUserData.firstName || ''} ${updatedUserData.lastName || ''}`.trim(),
                email: updatedUserData.email,
                phone: updatedUserData.phone ?? '',
                birth: updatedUserData.birthdate,
                gender: updatedUserData.gender,
                interest: updatedUserData.interestedGender,
                joined: updatedUserData.joined,
            }
            setUser(newUserData)
            setDraft(newUserData)
            setEditProfile(false) // ปิด edit mode หลังบันทึกสำเร็จ

            // Show success toast
            toast.dismiss(processingToast)
            toast.success('อัปเดตข้อมูลโปรไฟล์สำเร็จ! ✅', {
                duration: 3000,
            })

            // Reset the updating flag after a short delay to allow state to settle
            setTimeout(() => {
                setIsUpdating(false)
            }, 100)
        } catch (error) {
            setIsUpdating(false) // Reset flag on error
            toast.dismiss(processingToast)
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล',
                {
                    duration: 4000,
                }
            )
        }
    }

    const avatars = [
        '/img/p1.jpg',
        '/img/p2.jpg',
        '/img/p3.jpg',
        '/img/p4.jpg',
        '/img/p5.jpg',
        '/img/p6.jpg',
        '/img/p7.jpg',
        '/img/p8.jpg',
        '/img/p9.jpg',
        '/img/p10.jpg',
        '/img/p11.jpg',
        '/img/p12.jpg',
        '/img/p13.jpg',
        '/img/p14.jpg',
        '/img/p15.jpg',
        '/img/p16.jpg',
    ]

    return (
        <main
            className={`${kanit.className} flex min-h-screen flex-col items-center gap-12 bg-[#F4F6F8] pt-[129px]`}
        >
            <div className="bg-light-blue flex w-190.5 flex-col items-center justify-center gap-8">
                <ProfileBanner
                    user={user}
                    setChangeProfile={setChangeProfile}
                    setEditProfile={setEditProfile}
                    editProfile={editProfile}
                />

                {editProfile ? (
                    <div className="flex h-[403px] w-[100%] gap-5">
                        <PersonalInfoEdit
                            user={user}
                            draft={draft}
                            handleDraftChange={handleDraftChange}
                            handleSave={handleSave}
                        />
                        <AccountSettings />
                    </div>
                ) : (
                    <div className="flex h-auto w-[100%] gap-5">
                        <PersonalInfo user={user} />
                        <AccountSettings />
                    </div>
                )}
            </div>

            {changeProfile && (
                <ChangeProfile
                    user={user}
                    avatars={avatars}
                    tempImg={tempImg}
                    setChangeProfile={() => setChangeProfile(false)}
                    setTempImg={(url) => setTempImg(url)}
                saveProfile={async () => {
                        if (tempImg && authUser) {
                            try {
                            // อัปเดตผ่าน API
                            const updatedUserData = await usersApi.updateUser(
                                    authUser.id,
                                    {
                                        img: tempImg,
                                    }
                                )

                                // อัปเดต context
                                updateUser(updatedUserData)

                                // อัปเดต state ทั้งหมดให้สอดคล้องกัน (ใช้ข้อมูลจาก updatedUserData)
                                const newUserData = {
                                    type: updatedUserData.type,
                                    img: updatedUserData.img ?? '/img/p2.jpg',
                                    id: updatedUserData.idCard ?? '',
                                    username: updatedUserData.username,
                                    name: `${updatedUserData.firstName || ''} ${updatedUserData.lastName || ''}`.trim(),
                                    email: updatedUserData.email,
                                    phone: updatedUserData.phone ?? '',
                                    birth: updatedUserData.birthdate,
                                    gender: updatedUserData.gender,
                                    interest: updatedUserData.interestedGender,
                                    joined: updatedUserData.joined,
                                }
                                setUser(newUserData)
                                setDraft(newUserData)
                                setChangeProfile(false)
                                setTempImg(null)

                                // Show success toast
                                toast.success('อัปเดตรูปโปรไฟล์สำเร็จ! 📸', {
                                    duration: 3000,
                                })
                            } catch (error) {
                                toast.error(
                                    error instanceof Error
                                        ? error.message
                                        : 'เกิดข้อผิดพลาดในการอัปเดตรูปโปรไฟล์',
                                    {
                                        duration: 4000,
                                    }
                                )
                            }
                        }
                    }}
                />
            )}
        </main>
    )
}

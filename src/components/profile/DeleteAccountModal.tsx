'use client'

import { useState } from 'react'
import { X, AlertTriangle, Trash2 } from 'lucide-react'
import { Kanit } from 'next/font/google'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

type Props = {
    open: boolean
    onClose: () => void
    onConfirm: (password: string) => void
    userType: 'customer' | 'provider'
}

export default function DeleteAccountModal({
    open,
    onClose,
    onConfirm,
    userType,
}: Props) {
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    if (!open) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!password.trim()) return

        setIsLoading(true)
        try {
            onConfirm(password)
        } catch {
            // Error handling will be done in parent component
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        if (!isLoading) {
            setPassword('')
            onClose()
        }
    }

    return (
        <div className={`${kanit.className} fixed inset-0 z-50`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="absolute inset-0 overflow-y-auto p-6">
                <div className="mx-auto w-full max-w-md rounded-xl bg-white shadow-lg">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b px-6 py-4">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            <h3 className="text-lg font-bold text-gray-900">
                                ลบบัญชีผู้ใช้งาน
                            </h3>
                        </div>
                        <button
                            onClick={handleClose}
                            disabled={isLoading}
                            className="rounded-full p-1 hover:bg-gray-100 disabled:opacity-50"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-4">
                        <div className="mb-4">
                            <div className="mb-3 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                                <span className="text-sm font-medium text-red-600">
                                    การดำเนินการนี้ไม่สามารถย้อนกลับได้
                                </span>
                            </div>

                            <p className="mb-4 text-sm text-gray-600">
                                ข้อมูลทั้งหมดจะถูกลบถาวร รวมถึง
                            </p>

                            <ul className="mb-4 space-y-1 text-sm text-gray-600">
                                <li>• ข้อมูลส่วนตัวทั้งหมด</li>
                                {userType === 'provider' && (
                                    <li>• บริการทั้งหมดที่สร้างไว้</li>
                                )}
                                <li>• รีวิวและคะแนนที่เขียนไว้</li>
                                <li>• ประวัติการใช้งานทั้งหมด</li>
                            </ul>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    ยืนยันด้วยรหัสผ่านปัจจุบัน *
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="กรุณาใส่รหัสผ่านของคุณ"
                                    disabled={isLoading}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none disabled:bg-gray-50 disabled:opacity-50"
                                    required
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    disabled={isLoading}
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="submit"
                                    disabled={!password.trim() || isLoading}
                                    className="inline-flex items-center gap-2 rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    {isLoading ? 'กำลังลบ...' : 'ลบบัญชี'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

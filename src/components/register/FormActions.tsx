import Link from 'next/link'
import { useState } from 'react'
import TermsOfServiceModal from './TermsOfServiceModal'

interface FormData {
    acception: boolean
}

type FormActionsProps = {
    formData: FormData
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    isLoading?: boolean
}
export default function FormActions({
    formData,
    handleChange,
    isLoading = false,
}: FormActionsProps) {
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)

    const handleTermsClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsTermsModalOpen(true)
    }

    const handleAcceptTerms = () => {
        // Automatically check the acceptance checkbox
        const event = {
            target: {
                name: 'acception',
                type: 'checkbox',
                checked: true,
            },
        } as React.ChangeEvent<HTMLInputElement>
        handleChange(event)
    }

    return (
        <div>
            <div className="flex items-center">
                <input
                    id="terms"
                    type="checkbox"
                    name="acception"
                    checked={formData.acception}
                    onChange={handleChange}
                    className="h-4 w-4 rounded text-pink-600 focus:ring-pink-500"
                    required
                />
                <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-[#212b36]"
                >
                    ฉันยอมรับ{' '}
                    <button
                        type="button"
                        onClick={handleTermsClick}
                        className="cursor-pointer font-medium text-[#f24472] hover:underline focus:outline-none"
                    >
                        ข้อกำหนดการใช้งาน
                    </button>{' '}
                    และ{' '}
                    <Link
                        href="/privacy"
                        className="font-medium text-[#f24472] hover:underline"
                    >
                        นโยบายความเป็นส่วนตัว
                    </Link>
                </label>
            </div>

            <button
                type="submit"
                disabled={isLoading || !formData.acception}
                style={{
                    background:
                        'linear-gradient(133.15deg, #F24BA7 2.02%, #EF4444 98.99%)',
                    borderRadius: '6px',
                }}
                className="mt-6 w-full cursor-pointer px-5 py-3 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
                {isLoading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
            </button>

            <TermsOfServiceModal
                isOpen={isTermsModalOpen}
                onClose={() => setIsTermsModalOpen(false)}
                onAccept={handleAcceptTerms}
            />
        </div>
    )
}

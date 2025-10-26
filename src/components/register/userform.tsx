'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/contexts/AuthContext'
import {
    validateRegistrationForm,
    type ValidationError,
} from '@/lib/validation'
import AccountFields from './AccountFields'
import PersonalDetails from './PersonalDetails'
import ContactAndPreference from './ContactAndPreference'
import FormActions from './FormActions'
import toast from 'react-hot-toast'

export default function UserForm() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        birthdate: '',
        id: '',
        tel: '',
        gender: '',
        interestedGender: '',
        acception: false,
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<ValidationError[]>([])
    const { register } = useAuthContext()
    const router = useRouter()

    // Auto fill demo data
    useEffect(() => {
        const handleFillDemo = () => {
            setFormData({
                email: 'demo.customer@example.com',
                username: 'demo_customer',
                password: '123456',
                confirmPassword: '123456',
                firstName: 'สมชาย',
                lastName: 'ใจดี',
                birthdate: '1995-05-15',
                id: '1234567890123',
                tel: '0812345678',
                gender: 'ชาย',
                interestedGender: 'หญิง',
                acception: true,
            })
        }

        window.addEventListener('fillUserDemo', handleFillDemo)
        return () => window.removeEventListener('fillUserDemo', handleFillDemo)
    }, [])
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]:
                type === 'checkbox'
                    ? (e.target as HTMLInputElement).checked
                    : value,
        }))

        // Clear error for this field when user starts typing
        if (errors.length > 0) {
            setErrors((prev) => prev.filter((error) => error.field !== name))
        }
    }

    // Get error message for a specific field
    const getFieldError = (fieldName: string): string | undefined => {
        const error = errors.find((err) => err.field === fieldName)
        return error?.message
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate form data
        const validationResult = validateRegistrationForm(formData, false)

        if (!validationResult.isValid) {
            setErrors(validationResult.errors)

            // Show first error as toast
            if (validationResult.errors.length > 0) {
                toast.error(
                    validationResult.errors[0]?.message ??
                        'เกิดข้อผิดพลาดในการตรวจสอบข้อมูล'
                )
            }
            return
        }

        setIsLoading(true)
        setErrors([]) // Clear any previous errors

        try {
            const userData = {
                email: formData.email,
                username: formData.username,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                birthdate: formData.birthdate,
                idCard: formData.id,
                phone: formData.tel,
                gender: formData.gender,
                interestedGender: formData.interestedGender,
                type: 'customer' as const,
                img: '/img/p2.jpg', // default avatar
            }

            const success = await register(userData)

            if (success) {
                router.push('/')
            }
        } catch {
            toast.error('เกิดข้อผิดพลาดในการสมัครสมาชิก')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                style={{ border: '1px solid #e1e7f4' }}
                className="flex flex-col gap-6 rounded-[16px] bg-white p-6 shadow-[1px_4px_16px_rgba(0,0,0,0.1)]"
            >
                <AccountFields
                    formData={formData}
                    handleChange={handleChange}
                    getFieldError={getFieldError}
                />
                <PersonalDetails
                    formData={formData}
                    handleChange={handleChange}
                    getFieldError={getFieldError}
                />
                <ContactAndPreference
                    formData={formData}
                    handleChange={handleChange}
                    getFieldError={getFieldError}
                />
                <FormActions
                    formData={formData}
                    handleChange={handleChange}
                    isLoading={isLoading}
                />
            </form>
        </div>
    )
}

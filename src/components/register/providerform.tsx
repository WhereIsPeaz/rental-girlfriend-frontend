import { useState } from 'react'
import AccountFields from './AccountFields'
import PersonalID from './PersonalID'
import PersonalDetails from './PersonalDetails'
import ContactAndPreference from './ContactAndPreference'
import FormActions from './FormActions'
export default function ProviderForm() {
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
    }
    const handleSubmit = (e: any) => {
        if (
            formData.confirmPassword.length > 0 &&
            formData.password != formData.confirmPassword
        ) {
            e.preventDefault()
        }
    }
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                style={{ border: '1px solid #e1e7f4' }}
                className="flex flex-col gap-4 rounded-[16px] bg-white p-6 shadow-[1px_4px_16px_rgba(0,0,0,0.1)]"
            >
                <AccountFields
                    formData={formData}
                    handleChange={handleChange}
                />
                <PersonalID formData={formData} handleChange={handleChange} />
                <PersonalDetails
                    formData={formData}
                    handleChange={handleChange}
                />
                <ContactAndPreference
                    formData={formData}
                    handleChange={handleChange}
                />
                <FormActions formData={formData} handleChange={handleChange} />
            </form>
        </div>
    )
}

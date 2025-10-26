// Validation utilities for registration forms

export interface ValidationError {
    field: string
    message: string
}

export interface ValidationResult {
    isValid: boolean
    errors: ValidationError[]
}

// Email validation
export const validateEmail = (email: string): string | null => {
    if (!email.trim()) {
        return 'กรุณากรอกอีเมล'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return 'รูปแบบอีเมลไม่ถูกต้อง'
    }

    return null
}

// Username validation
export const validateUsername = (username: string): string | null => {
    if (!username.trim()) {
        return 'กรุณากรอกชื่อผู้ใช้'
    }

    if (username.length < 3) {
        return 'ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร'
    }

    if (username.length > 20) {
        return 'ชื่อผู้ใช้ต้องไม่เกิน 20 ตัวอักษร'
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/
    if (!usernameRegex.test(username)) {
        return 'ชื่อผู้ใช้ใช้ได้เฉพาะตัวอักษร ตัวเลข และ _'
    }

    return null
}

// Password validation
export const validatePassword = (password: string): string | null => {
    if (!password) {
        return 'กรุณากรอกรหัสผ่าน'
    }

    if (password.length < 6) {
        return 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
    }

    if (password.length > 50) {
        return 'รหัsผ่านต้องไม่เกิน 50 ตัวอักษร'
    }

    return null
}

// Confirm password validation
export const validateConfirmPassword = (
    password: string,
    confirmPassword: string
): string | null => {
    if (!confirmPassword) {
        return 'กรุณายืนยันรหัสผ่าน'
    }

    if (password !== confirmPassword) {
        return 'รหัสผ่านไม่ตรงกัน'
    }

    return null
}

// Name validation (Thai and English)
export const validateName = (
    name: string,
    fieldName: string
): string | null => {
    if (!name.trim()) {
        return `กรุณากรอก${fieldName}`
    }

    if (name.length < 2) {
        return `${fieldName}ต้องมีอย่างน้อย 2 ตัวอักษร`
    }

    if (name.length > 50) {
        return `${fieldName}ต้องไม่เกิน 50 ตัวอักษร`
    }

    // Allow Thai, English, and spaces
    const nameRegex = /^[a-zA-Zก-๙\s]+$/
    if (!nameRegex.test(name)) {
        return `${fieldName}ใช้ได้เฉพาะตัวอักษรไทยและอังกฤษ`
    }

    return null
}

// Thai ID Card validation
export const validateIdCard = (_idCard: string): string | null => {
    return null
}

// Phone number validation
export const validatePhone = (phone: string): string | null => {
    if (!phone.trim()) {
        return 'กรุณากรอกเบอร์โทรศัพท์'
    }

    // Remove spaces and dashes
    const cleanPhone = phone.replace(/[\s-]/g, '')

    // Thai mobile number format: 08x-xxx-xxxx or 09x-xxx-xxxx
    const phoneRegex = /^0[689]\d{8}$/

    if (!phoneRegex.test(cleanPhone)) {
        return 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง (ตัวอย่าง: 081-234-5678)'
    }

    return null
}

// Birthdate validation
export const validateBirthdate = (birthdate: string): string | null => {
    if (!birthdate) {
        return 'กรุณาเลือกวันเกิด'
    }

    const birth = new Date(birthdate)
    const today = new Date()
    const age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
        // age--
    }

    if (birth > today) {
        return 'วันเกิดต้องไม่เกินวันปัจจุบัน'
    }

    if (age < 18) {
        return 'อายุต้องไม่น้อยกว่า 18 ปี'
    }

    if (age > 100) {
        return 'อายุต้องไม่เกิน 100 ปี'
    }

    return null
}

// Gender validation
export const validateGender = (gender: string): string | null => {
    if (!gender) {
        return 'กรุณาเลือกเพศ'
    }

    const validGenders = ['ชาย', 'หญิง', 'อื่นๆ']
    if (!validGenders.includes(gender)) {
        return 'เพศที่เลือกไม่ถูกต้อง'
    }

    return null
}

// Interested gender validation
export const validateInterestedGender = (
    interestedGender: string
): string | null => {
    if (!interestedGender) {
        return 'กรุณาเลือกเพศที่สนใจ'
    }

    const validGenders = ['ชาย', 'หญิง', 'อื่นๆ']
    if (!validGenders.includes(interestedGender)) {
        return 'เพศที่สนใจไม่ถูกต้อง'
    }

    return null
}

// Terms acceptance validation
export const validateAcceptance = (accepted: boolean): string | null => {
    if (!accepted) {
        return 'กรุณายอมรับข้อกำหนดและเงื่อนไข'
    }

    return null
}

// Define the form data interface
interface RegistrationFormData {
    email: string
    username: string
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
    id: string
    tel: string
    birthdate: string
    gender: string
    interestedGender: string
    acception: boolean
}

// Comprehensive form validation
export const validateRegistrationForm = (
    formData: RegistrationFormData,
    isProvider = false
): ValidationResult => {
    const errors: ValidationError[] = []

    // Email validation
    const emailError = validateEmail(formData.email)
    if (emailError) {
        errors.push({ field: 'email', message: emailError })
    }

    // Username validation
    const usernameError = validateUsername(formData.username)
    if (usernameError) {
        errors.push({ field: 'username', message: usernameError })
    }

    // Password validation
    const passwordError = validatePassword(formData.password)
    if (passwordError) {
        errors.push({ field: 'password', message: passwordError })
    }

    // Confirm password validation
    const confirmPasswordError = validateConfirmPassword(
        formData.password,
        formData.confirmPassword
    )
    if (confirmPasswordError) {
        errors.push({ field: 'confirmPassword', message: confirmPasswordError })
    }

    // First name validation
    const firstNameError = validateName(formData.firstName, 'ชื่อ')
    if (firstNameError) {
        errors.push({ field: 'firstName', message: firstNameError })
    }

    // Last name validation
    const lastNameError = validateName(formData.lastName, 'นามสกุล')
    if (lastNameError) {
        errors.push({ field: 'lastName', message: lastNameError })
    }

    // ID card validation (required for providers)
    if (isProvider) {
        const idError = validateIdCard(formData.id)
        if (idError) {
            errors.push({ field: 'id', message: idError })
        }
    }

    // Phone validation
    const phoneError = validatePhone(formData.tel)
    if (phoneError) {
        errors.push({ field: 'tel', message: phoneError })
    }

    // Birthdate validation
    const birthdateError = validateBirthdate(formData.birthdate)
    if (birthdateError) {
        errors.push({ field: 'birthdate', message: birthdateError })
    }

    // Gender validation
    const genderError = validateGender(formData.gender)
    if (genderError) {
        errors.push({ field: 'gender', message: genderError })
    }

    // Interested gender validation
    const interestedGenderError = validateInterestedGender(
        formData.interestedGender
    )
    if (interestedGenderError) {
        errors.push({
            field: 'interestedGender',
            message: interestedGenderError,
        })
    }

    // Terms acceptance validation
    const acceptanceError = validateAcceptance(formData.acception)
    if (acceptanceError) {
        errors.push({ field: 'acception', message: acceptanceError })
    }

    return {
        isValid: errors.length === 0,
        errors,
    }
}

'use client'

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    type ReactNode,
} from 'react'

interface WithdrawalFormData {
    amount: string
    bankName: string
    accountNumber: string
    accountName: string
}

interface WithdrawalState {
    withdrawalForm: WithdrawalFormData
    isProcessingWithdrawal: boolean
    showWithdrawModal: boolean
    setWithdrawalForm: React.Dispatch<React.SetStateAction<WithdrawalFormData>>
    setIsProcessingWithdrawal: (processing: boolean) => void
    setShowWithdrawModal: (show: boolean) => void
    resetWithdrawalForm: () => void
    validateWithdrawalForm: () => string | null
}

const WithdrawalContext = createContext<WithdrawalState | undefined>(undefined)

interface WithdrawalProviderProps {
    children: ReactNode
}

const initialWithdrawalForm: WithdrawalFormData = {
    amount: '',
    bankName: '',
    accountNumber: '',
    accountName: '',
}

export function WithdrawalProvider({ children }: WithdrawalProviderProps) {
    const [withdrawalForm, setWithdrawalForm] = useState<WithdrawalFormData>(
        initialWithdrawalForm
    )
    const [isProcessingWithdrawal, setIsProcessingWithdrawal] = useState(false)
    const [showWithdrawModal, setShowWithdrawModal] = useState(false)

    const resetWithdrawalForm = useCallback(() => {
        setWithdrawalForm(initialWithdrawalForm)
    }, [])

    const validateWithdrawalForm = useCallback(() => {
        const amount = parseFloat(withdrawalForm.amount)

        if (isNaN(amount) || amount <= 0) {
            return 'กรุณากรอกจำนวนเงินที่ถูกต้อง'
        }

        if (
            !withdrawalForm.bankName ||
            !withdrawalForm.accountNumber ||
            !withdrawalForm.accountName
        ) {
            return 'กรุณากรอกข้อมูลธนาคารให้ครบถ้วน'
        }

        return null
    }, [withdrawalForm])

    const value: WithdrawalState = {
        withdrawalForm,
        isProcessingWithdrawal,
        showWithdrawModal,
        setWithdrawalForm,
        setIsProcessingWithdrawal,
        setShowWithdrawModal,
        resetWithdrawalForm,
        validateWithdrawalForm,
    }

    return (
        <WithdrawalContext.Provider value={value}>
            {children}
        </WithdrawalContext.Provider>
    )
}

export function useWithdrawal() {
    const context = useContext(WithdrawalContext)
    if (context === undefined) {
        throw new Error(
            'useWithdrawal must be used within a WithdrawalProvider'
        )
    }
    return context
}

'use client'

import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'
import type { User } from '@/lib/localStorage'

interface AuthContextType {
    user: User | null
    loading: boolean
    login: (
        email: string,
        password: string
    ) => Promise<{ success: boolean; user?: User }>
    register: (
        userData: Omit<User, 'id' | 'joined' | 'verified'>
    ) => Promise<boolean>
    logout: () => void
    updateUser: (user: User) => void
    isAuthenticated: boolean
    isProvider: boolean
    isCustomer: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const auth = useAuth()

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider')
    }
    return context
}

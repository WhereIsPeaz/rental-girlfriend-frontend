'use client'

import React from 'react'
import { Wallet, TrendingUp, Calendar } from 'lucide-react'
import StatCard from '../../shared/StatCard'
import { type UserBalance, type Transaction } from '@/lib/localStorage'

interface BalanceCardsProps {
    balance: UserBalance | null
    transactions: Transaction[]
}

export default function BalanceCards({
    balance,
    transactions,
}: BalanceCardsProps) {
    return (
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <StatCard
                title="ยอดเงินคงเหลือ"
                value={`฿${balance?.balance.toLocaleString() ?? '0'}`}
                icon={Wallet}
                iconColor="text-pink-200"
                bgColor="bg-gradient-to-r from-pink-500 to-rose-500"
                textColor="text-white"
                className="text-white"
            />

            <StatCard
                title="ยอดใช้จ่ายทั้งหมด"
                value={`฿${balance?.totalSpent.toLocaleString() ?? '0'}`}
                icon={TrendingUp}
                iconColor="text-red-500"
            />

            <StatCard
                title="ธุรกรรมทั้งหมด"
                value={transactions.length}
                icon={Calendar}
                iconColor="text-blue-500"
            />
        </div>
    )
}

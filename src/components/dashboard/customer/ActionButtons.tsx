'use client'

import React from 'react'
import { Plus, Minus } from 'lucide-react'
import ActionButton from '../../shared/ActionButton'

interface ActionButtonsProps {
    onTopUp: () => void
    onWithdraw: () => void
}

export default function ActionButtons({
    onTopUp,
    onWithdraw,
}: ActionButtonsProps) {
    return (
        <div className="mb-8 flex gap-4">
            <ActionButton
                onClick={onTopUp}
                variant="success"
                icon={Plus}
                iconPosition="left"
            >
                เติมเงิน
            </ActionButton>
            <ActionButton
                onClick={onWithdraw}
                variant="danger"
                icon={Minus}
                iconPosition="left"
            >
                ถอนเงิน
            </ActionButton>
        </div>
    )
}

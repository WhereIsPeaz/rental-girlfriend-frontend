'use client'

import { useMemo, useState, useEffect, useCallback } from 'react'
import { Kanit } from 'next/font/google'
import { Search, Send, Phone, Video, MoreVertical, Clock } from 'lucide-react'
import { useAuthContext } from '@/contexts/AuthContext'
import * as chatsApi from '@/lib/api/chats'
import type { Chat, ChatMessage } from '@/lib/types'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

// Helper to get display name for a chat
const getChatDisplayName = (chat: Chat, currentUserId: string): string => {
    if (chat.customerId === currentUserId) {
        // Current user is customer, show provider username
        return chat.providerName || 'ผู้ใช้ที่ถูกลบ'
    } else {
        // Current user is provider, show customer username
        return chat.customerName || 'ผู้ใช้ที่ถูกลบ'
    }
}

// Helper to get profile image for a chat
const getChatProfileImage = (
    chat: Chat,
    currentUserId: string
): string | null => {
    if (chat.customerId === currentUserId) {
        // Current user is customer, show provider image
        return chat.providerImg || null
    } else {
        // Current user is provider, show customer image
        return chat.customerImg || null
    }
}

// Helper to get last message timestamp for sorting
const getLastMessageTimestamp = (chat: Chat): number => {
    if (chat.messages && chat.messages.length > 0) {
        const lastMessage = chat.messages[chat.messages.length - 1]
        if (lastMessage) {
            return new Date(lastMessage.sentAt).getTime()
        }
    }
    // Fallback to chat updatedAt or createdAt
    if (chat.updatedAt) {
        return new Date(chat.updatedAt).getTime()
    }
    if (chat.createdAt) {
        return new Date(chat.createdAt).getTime()
    }
    return 0
}

// Helper to format date
const formatBookingDate = (dateString: string): string => {
    try {
        const date = new Date(dateString)
        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    } catch {
        return dateString
    }
}

// Helper to get booking status color
const getBookingStatusColor = (status: string): string => {
    switch (status) {
        case 'confirmed':
            return 'text-green-600'
        case 'completed':
            return 'text-blue-600'
        case 'pending':
            return 'text-yellow-600'
        case 'cancelled':
            return 'text-red-600'
        default:
            return 'text-gray-600'
    }
}

// Helper to get booking status text
const getBookingStatusText = (status: string): string => {
    switch (status) {
        case 'confirmed':
            return 'ยืนยันแล้ว'
        case 'completed':
            return 'เสร็จสิ้น'
        case 'pending':
            return 'รอการยืนยัน'
        case 'cancelled':
            return 'ยกเลิกแล้ว'
        default:
            return status
    }
}

// Helper to get last message text
const getLastMessageText = (messages: ChatMessage[]): string => {
    if (!messages || messages.length === 0) return ''
    return messages[messages.length - 1]?.content || ''
}

// Helper to get last message time
const getLastMessageTime = (messages: ChatMessage[]): string => {
    if (!messages || messages.length === 0) return ''
    const lastMsg = messages[messages.length - 1]
    if (!lastMsg) return ''
    return new Date(lastMsg.sentAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    })
}

// Helper to get chat subtitle (booking info or last message preview)
const getChatSubtitle = (chat: Chat): string => {
    if (chat.bookingDetails) {
        return `${chat.bookingDetails.serviceName || 'บริการ'} - ${formatBookingDate(chat.bookingDetails.bookingDate)}`
    }
    return getLastMessageText(chat.messages)
}

export default function ChatPage() {
    const { user, isAuthenticated } = useAuthContext()
    const [chats, setChats] = useState<Chat[]>([])
    const [search, setSearch] = useState('')
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [messageText, setMessageText] = useState('')
    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)

    const selected = useMemo(
        () => chats.find((c) => c.id === selectedId) ?? null,
        [chats, selectedId]
    )

    const filtered = useMemo(() => {
        let result = chats

        // Filter by search
        if (search.trim()) {
            const s = search.toLowerCase()
            result = result.filter((c) => {
                const displayName = user ? getChatDisplayName(c, user.id) : ''
                return displayName.toLowerCase().includes(s)
            })
        }

        // Sort by last message time (most recent first)
        return [...result].sort((a, b) => {
            return getLastMessageTimestamp(b) - getLastMessageTimestamp(a)
        })
    }, [chats, search, user])

    const loadChats = useCallback(async () => {
        if (!isAuthenticated || !user) return

        try {
            setLoading(true)
            const loadedChats = await chatsApi.listChats()
            setChats(loadedChats)

            // Auto-select first chat if none selected
            setSelectedId((currentSelected) => {
                if (!currentSelected && loadedChats.length > 0) {
                    return loadedChats[0]!.id
                }
                return currentSelected
            })
        } catch (error) {
            console.error('Error loading chats:', error)
            toast.error('ไม่สามารถโหลดการสนทนาได้')
        } finally {
            setLoading(false)
        }
    }, [isAuthenticated, user])

    useEffect(() => {
        void loadChats()
    }, [loadChats]) // Load when auth is ready

    const handleSendMessage = async () => {
        if (!selectedId || !messageText.trim() || !user) return

        const messageContent = messageText.trim()
        setMessageText('')
        setSending(true)

        try {
            const newMessage = await chatsApi.sendMessage(
                selectedId,
                messageContent
            )

            // Update local state with the new message
            setChats((prev) =>
                prev.map((c) =>
                    c.id === selectedId
                        ? { ...c, messages: [...c.messages, newMessage] }
                        : c
                )
            )
        } catch (error) {
            console.error('Error sending message:', error)
            toast.error('ไม่สามารถส่งข้อความได้')
            // Restore message text on error
            setMessageText(messageContent)
        } finally {
            setSending(false)
        }
    }

    if (!isAuthenticated || !user) {
        return (
            <main
                className={`${kanit.className} flex min-h-screen items-center justify-center bg-white`}
            >
                <div className="text-center">
                    <p className="text-gray-500">
                        กรุณาเข้าสู่ระบบเพื่อใช้งานแชท
                    </p>
                </div>
            </main>
        )
    }

    if (loading) {
        return (
            <main
                className={`${kanit.className} flex min-h-screen items-center justify-center bg-white`}
            >
                <LoadingSpinner
                    size="xl"
                    text="กำลังโหลดแชท..."
                    className="py-12"
                />
            </main>
        )
    }

    return (
        <main className={`${kanit.className} flex h-full bg-white`}>
            {/* Left: people list */}
            <aside className="w-1/3 max-w-[380px] border-r border-gray-200 bg-white">
                <div className="px-4 py-4">
                    <h1 className="text-lg font-medium text-black">ข้อความ</h1>
                    <div className="relative mt-3">
                        <Search
                            className="absolute top-2.5 left-3 text-gray-400"
                            size={18}
                        />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="ค้นหาการสนทนา..."
                            className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pr-3 pl-12 text-sm text-gray-700 focus:ring-1 focus:ring-pink-400 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="h-px bg-gray-100" />

                <div
                    className="overflow-auto"
                    style={{ maxHeight: 'calc(100vh - 140px)' }}
                >
                    <>
                        {filtered.map((chat) => {
                            const isActive = chat.id === selectedId
                            const displayName = getChatDisplayName(
                                chat,
                                user.id
                            )
                            const profileImg = getChatProfileImage(
                                chat,
                                user.id
                            )
                            const subtitle = getChatSubtitle(chat)
                            const lastTime = getLastMessageTime(chat.messages)

                            return (
                                <div key={chat.id} className={`relative`}>
                                    <button
                                        onClick={() => setSelectedId(chat.id)}
                                        className={`flex w-full items-center gap-3 px-4 py-3 text-left ${isActive ? 'bg-pink-50' : 'hover:bg-gray-50'}`}
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-pink-400 to-pink-500 text-sm font-bold text-white shadow-md">
                                            {profileImg ? (
                                                <img
                                                    src={profileImg}
                                                    alt={displayName}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <span>
                                                    {displayName
                                                        .split(' ')
                                                        .map((s) => s[0])
                                                        .join('')
                                                        .slice(0, 2)
                                                        .toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="mb-1 flex items-center justify-between">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {displayName}
                                                </div>
                                                {lastTime && (
                                                    <div className="text-xs text-gray-400">
                                                        {lastTime}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="truncate text-xs text-gray-500">
                                                {subtitle}
                                            </div>
                                            {chat.bookingDetails && (
                                                <div
                                                    className={`mt-1 text-xs font-medium ${getBookingStatusColor(chat.bookingDetails.status)}`}
                                                >
                                                    {getBookingStatusText(
                                                        chat.bookingDetails
                                                            .status
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                </div>
                            )
                        })}
                        {filtered.length === 0 && (
                            <div className="p-4 text-center text-sm text-gray-400">
                                {search
                                    ? 'ไม่พบการสนทนาที่ค้นหา'
                                    : 'ยังไม่มีการสนทนา'}
                            </div>
                        )}
                    </>
                </div>
            </aside>

            {/* Right: chat view */}
            <section className="flex flex-1 flex-col bg-gray-50">
                {!selected ? (
                    <div className="flex h-full items-center justify-center text-gray-400">
                        เลือกการสนทนาจากด้านซ้าย
                    </div>
                ) : (
                    <div
                        className="flex flex-col"
                        style={{
                            height: '100vh',
                            maxHeight: 'calc(100vh - 64px)',
                        }}
                    >
                        <header className="border-b border-gray-200 bg-white px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-pink-400 to-pink-500 text-sm font-bold text-white shadow-md">
                                        {getChatProfileImage(
                                            selected,
                                            user.id
                                        ) ? (
                                            <img
                                                src={
                                                    getChatProfileImage(
                                                        selected,
                                                        user.id
                                                    )!
                                                }
                                                alt={getChatDisplayName(
                                                    selected,
                                                    user.id
                                                )}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span>
                                                {getChatDisplayName(
                                                    selected,
                                                    user.id
                                                )
                                                    .split(' ')
                                                    .map((s) => s[0])
                                                    .join('')
                                                    .slice(0, 2)
                                                    .toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">
                                            {getChatDisplayName(
                                                selected,
                                                user.id
                                            )}
                                        </div>
                                        {selected.bookingDetails ? (
                                            <div className="mt-1 flex items-center gap-2">
                                                <span className="text-xs text-gray-600">
                                                    {
                                                        selected.bookingDetails
                                                            .serviceName
                                                    }
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    •
                                                </span>
                                                <span className="text-xs text-gray-600">
                                                    {formatBookingDate(
                                                        selected.bookingDetails
                                                            .bookingDate
                                                    )}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    •
                                                </span>
                                                <span
                                                    className={`text-xs font-medium ${getBookingStatusColor(selected.bookingDetails.status)}`}
                                                >
                                                    {getBookingStatusText(
                                                        selected.bookingDetails
                                                            .status
                                                    )}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="mt-1 text-xs text-gray-400">
                                                Booking ID: {selected.bookingId}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-500">
                                    <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
                                        <Phone size={18} />
                                    </button>
                                    <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
                                        <Video size={18} />
                                    </button>
                                    <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            </div>

                            {selected.bookingDetails && (
                                <div className="mt-3 flex items-center gap-4 rounded-lg bg-gray-50 px-4 py-2 text-xs text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        <span>
                                            {selected.bookingDetails.startTime}{' '}
                                            - {selected.bookingDetails.endTime}
                                        </span>
                                    </div>
                                    <span className="text-gray-300">|</span>
                                    <div className="flex items-center gap-1">
                                        <span className="font-medium">
                                            ฿
                                            {selected.bookingDetails.totalAmount.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </header>

                        <div className="flex-1 overflow-auto bg-white p-6">
                            {(selected?.messages ?? []).map((m, index) => {
                                const isFromMe = m.senderId === user.id
                                return (
                                    <div
                                        key={`${m.senderId}-${m.sentAt}-${index}`}
                                        className={`mb-4 flex ${isFromMe ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`${isFromMe ? 'bg-gradient-to-r from-pink-500 to-pink-400 text-white' : 'bg-gray-100 text-gray-800'} inline-block max-w-[60%] rounded-2xl px-4 py-3`}
                                        >
                                            {m.content}
                                            <div
                                                className={`mt-1 text-right text-[10px] ${isFromMe ? 'text-white/90' : 'text-gray-400'}`}
                                            >
                                                {new Date(
                                                    m.sentAt
                                                ).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            {/* empty state in conversation */}
                            {(selected?.messages ?? []).length === 0 && (
                                <div className="mt-6 text-center text-gray-400">
                                    ไม่มีข้อความในขณะนี้ เริ่มต้นการสนทนาได้เลย
                                </div>
                            )}
                        </div>

                        <div className="border-t border-gray-200 bg-white px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-2">
                                    <input
                                        value={messageText}
                                        onChange={(e) =>
                                            setMessageText(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === 'Enter' &&
                                                !e.shiftKey
                                            ) {
                                                e.preventDefault()
                                                void handleSendMessage()
                                            }
                                        }}
                                        placeholder="พิมพ์ข้อความ..."
                                        className="w-full text-sm outline-none"
                                        disabled={sending}
                                    />
                                </div>
                                <button
                                    onClick={() => void handleSendMessage()}
                                    disabled={sending || !messageText.trim()}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-white shadow transition-colors hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    )
}

"use client"

import { useMemo, useState, useEffect } from 'react'
import { Kanit } from 'next/font/google'
import { Search, Send, Phone, Video, MoreVertical } from 'lucide-react'
import { getChats, postMessage, initializeSampleData } from '@/lib/localStorage'
import type { Chat as ChatType, Message as MessageType } from '@/lib/localStorage'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

export default function ChatPage() {
    const [chats, setChats] = useState<ChatType[]>([])
    const [search, setSearch] = useState('')
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const selected = useMemo(() => chats.find((p) => p.id === selectedId) ?? null, [chats, selectedId])
    const [messageText, setMessageText] = useState('')

    const filtered = useMemo(() => {
        if (!search.trim()) return chats
        const s = search.toLowerCase()
        return chats.filter((p) => p.name.toLowerCase().includes(s))
    }, [chats, search])
    
    useEffect(() => {
        // Initialize sample data first
        initializeSampleData()
        // Load chats from localStorage on mount
        const loadedChats = getChats()
        setChats(loadedChats)
        if (loadedChats.length > 0 && !selectedId) {
            setSelectedId(loadedChats[0]!.id)
        }
    }, [])

    async function sendMessage() {
        if (!selectedId || !messageText.trim()) return
        // persist the message to localStorage (mock POST)
        const newMsg = postMessage(selectedId, { text: messageText.trim(), fromMe: true })

        // update local state
        setChats((prev) => prev.map((c) => (c.id === selectedId ? { ...c, messages: [...(c.messages ?? []), newMsg], lastMessage: newMsg.text } : c)))
        setMessageText('')
    }

        return (
            <main className={`${kanit.className} min-h-screen flex bg-white`}> 
                {/* Left: people list */}
                <aside className="w-1/3 max-w-[380px] border-r border-gray-200 bg-white">
                    <div className="px-4 py-4">
                        <h1 className="text-lg font-medium text-black">ข้อความ</h1>
                        <div className="mt-3 relative">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="ค้นหาการสนทนา..."
                                className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-pink-400"
                            />
                        </div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
                        {filtered.map((p) => {
                            const isActive = p.id === selectedId
                            return (
                                <div key={p.id} className={`relative`}> 
                                    <button
                                        onClick={() => setSelectedId(p.id)}
                                        className={`w-full text-left px-4 py-3 flex items-center gap-3 ${isActive ? 'bg-pink-50' : 'hover:bg-gray-50'}`}
                                    >
                                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700 overflow-hidden">
                                            {/* avatar placeholder */}
                                            <span>{p.name.split(' ').map((s) => s[0]).join('').slice(0,2)}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <div className="font-medium text-sm text-gray-900">{p.name}</div>
                                                                <div className="text-xs text-gray-400">{p.messages && p.messages.length > 0 ? new Date(p.messages[p.messages.length - 1]!.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</div>
                                            </div>
                                            <div className="text-xs text-gray-500 truncate">{(p.messages?.slice(-1)[0]?.text) ?? p.lastMessage ?? ''}</div>
                                        </div>
                                    </button>

                                                    {/* unread badge removed per request */}
                                </div>
                            )
                        })}
                        {filtered.length === 0 && (
                            <div className="text-center p-4 text-sm text-gray-400">ยังไม่มีการสนทนา</div>
                        )}
                    </div>
                </aside>

                {/* Right: chat view */}
                <section className="flex-1 bg-gray-50 flex flex-col">
                    {!selected ? (
                        <div className="h-full flex items-center justify-center text-gray-400">เลือกการสนทนาจากด้านซ้าย</div>
                    ) : (
                        <div className="h-full flex flex-col" style={{ minHeight: '100vh' }}>
                            <header className="px-6 py-4 border-b border-gray-200 bg-white flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">{selected.name.split(' ').map(s => s[0]).join('').slice(0,2)}</div>
                                    <div>
                                        <div className="font-medium">{selected.name}</div>
                                        <div className="text-xs text-green-500">ออนไลน์</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-500">
                                    <button className="p-2 rounded-full hover:bg-gray-100"><Phone size={18} /></button>
                                    <button className="p-2 rounded-full hover:bg-gray-100"><Video size={18} /></button>
                                    <button className="p-2 rounded-full hover:bg-gray-100"><MoreVertical size={18} /></button>
                                </div>
                            </header>

                            <div className="flex-1 overflow-auto p-6 bg-white">
                                {(selected?.messages ?? []).map((m: MessageType) => (
                                    <div key={m.id} className={`mb-4 flex ${m.fromMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`${m.fromMe ? 'bg-gradient-to-r from-pink-500 to-pink-400 text-white' : 'bg-gray-100 text-gray-800'} inline-block px-4 py-3 rounded-2xl max-w-[60%]`}>
                                            {m.text}
                                            <div className={`text-[10px] mt-1 text-right ${m.fromMe ? 'text-white/90' : 'text-gray-400'}`}>{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        </div>
                                    </div>
                                ))}

                                {/* empty state in conversation */}
                                {(selected?.messages ?? []).length === 0 && (
                                    <div className="text-center text-gray-400 mt-6">ไม่มีข้อความในขณะนี้ เริ่มต้นการสนทนาได้เลย</div>
                                )}
                            </div>

                            <div className="px-6 py-4 bg-white">
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2">
                                        <input
                                            value={messageText}
                                            onChange={(e) => setMessageText(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
                                            placeholder="พิมพ์ข้อความ..."
                                            className="w-full outline-none text-sm"
                                        />
                                    </div>
                                    <button onClick={sendMessage} className="h-10 w-10 rounded-full bg-pink-500 text-white flex items-center justify-center shadow">
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
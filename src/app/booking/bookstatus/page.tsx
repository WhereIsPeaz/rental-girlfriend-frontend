import BookingFooter from "@/components/BookingFooter"
import { CheckCircle } from "lucide-react"
import { Kanit } from 'next/font/google'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

export default function BookingStatusPage() {
    return (
        <main className={`${kanit.className}`}>
            <div className="flex flex-col items-center justify-center h-[90vh] bg-[#F4F6F8]">
                    <div className="bg-white rounded-2xl shadow-md p-6 w-[25vw] text-center">
                       
                        <div className="flex justify-center mb-4">
                        <CheckCircle className="w-12 h-12 text-green-600 bg-green-100 rounded-full p-2" strokeWidth={1.5} />
                        </div>
        
                        <h1 className="text-xl font-semibold text-gray-800 pb-1">ชำระเงินสำเร็จ!</h1>
                        <p className="text-gray-700 mt-2 text-sm leading-relaxed">
                        การจองของคุณได้รับการยืนยันแล้ว ผู้ให้บริการจะติดต่อ
                        <br />
                        กลับในเร็ว ๆ นี้
                        </p>

                        <div className="mt-6 space-y-3">
                        <button
                            className="w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-pink-500 to-red-500 transition transition-all duration-300 hover:scale-102"
                        >
                            ดูการจองของฉัน
                        </button>
                        <button
                            className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                        >
                            ส่งข้อความถึงผู้ให้บริการ
                        </button>
                        </div>
                    </div>
            </div>
            <BookingFooter />
        </main>
    )
}
import { Plus } from 'lucide-react'

export default function AddServiceCard({ onCreate }: { onCreate: () => void }) {
    return (
        <section className="mt-6 h-110 w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-[19px] font-medium text-gray-900">
                บริการของฉัน
            </div>

            <div className="flex h-90 flex-col items-center justify-center p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-100 bg-gray-100">
                    <Plus className="h-8 w-8 text-black" />
                </div>

                <p className="mt-6 text-[19px] font-medium text-[#000]">
                    ยังไม่มีบริการ
                </p>
                <p className="mt-1 mb-4 text-[13px] text-[#000]">
                    เริ่มสร้างบริการแรกของคุณ
                </p>

                <button
                    onClick={onCreate}
                    className="mr-1 cursor-pointer rounded-md bg-gradient-to-r from-pink-600 to-rose-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                >
                    สร้างบริการแรก
                </button>
            </div>
        </section>
    )
}

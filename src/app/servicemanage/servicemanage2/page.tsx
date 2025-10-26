import { Plus } from 'lucide-react'
import { Kanit } from 'next/font/google'
import AddServiceCard2 from '@/components/AddServiceCard2'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

export default function serviceMangePage2() {
    return (
        <main className={`${kanit.className} min-h-screen bg-[#F4F6F8] py-8`}>
            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl text-[30px] text-black">
                            จัดการบริการ
                        </h1>
                        <p className="mt-1 text-[13px] text-gray-500">
                            สร้างและจัดการบริการของคุณ
                        </p>
                    </div>

                    {/* <PrimaryButton title="เพิ่มบริการใหม่" /> */}
                    <button className="mr-1 inline-flex w-35 cursor-pointer items-center gap-2 rounded-md bg-gradient-to-r from-pink-600 to-rose-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105">
                        <Plus className="h-4 w-4 stroke-[3]" />
                        เพิ่มบริการใหม่
                    </button>
                </div>

                <AddServiceCard2 />
            </div>
        </main>
    )
}

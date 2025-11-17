'use client'

interface TermsOfServiceModalProps {
    isOpen: boolean
    onClose: () => void
    onAccept?: () => void
}

export default function TermsOfServiceModal({
    isOpen,
    onClose,
    onAccept,
}: TermsOfServiceModalProps) {
    if (!isOpen) return null

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative mx-4 max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h2 className="text-xl font-bold text-gray-900">
                        ข้อกำหนดการใช้งาน
                    </h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
                    <div className="space-y-6 text-sm text-gray-700">
                        <section>
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">
                                1. การยอมรับข้อกำหนด
                            </h3>
                            <p>
                                การใช้งานแพลตฟอร์ม &quot;แฟนเช่า&quot;
                                ถือว่าท่านได้ยอมรับและตกลงที่จะปฏิบัติตามข้อกำหนดและเงื่อนไขการใช้งานที่ระบุไว้ในเอกสารนี้
                            </p>
                        </section>

                        <section>
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">
                                2. คุณสมบัติของผู้ใช้
                            </h3>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>ต้องมีอายุ 18 ปีบริบูรณ์</li>
                                <li>
                                    มีสัญชาติไทยหรือมีใบอนุญาตทำงานในประเทศไทย
                                </li>
                                <li>
                                    ไม่มีประวัติการกระทำผิดกฎหมายที่เกี่ยวข้องกับความรุนแรง
                                </li>
                                <li>ให้ข้อมูลที่ถูกต้องและเป็นจริงเท่านั้น</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">
                                3. การใช้บริการ
                            </h3>
                            <p>
                                บริการของเราเป็นแพลตฟอร์มสำหรับจับคู่และเพื่อการคบหาดูใจเท่านั้น
                                ไม่รองรับกิจกรรมที่ผิดกฎหมาย
                            </p>
                            <ul className="mt-2 list-disc space-y-1 pl-5">
                                <li>
                                    ไม่รองรับการกระทำที่ผิดกฎหมายหรือขัดต่อศีลธรรม
                                </li>
                                <li>การใช้บริการต้องอยู่ในกรอบที่เหมาะสม</li>
                                <li>ต้องให้ความเคารพซึ่งกันและกัน</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">
                                4. การชำระเงิน
                            </h3>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>ชำระเงินตรง 50% เมื่องจอง</li>
                                <li>
                                    ชำระส่วนที่เหลือหลังจากการใช้บริการสิ้นสุด
                                </li>
                                <li>การยกเลิกนัดหมายจะมีนโยบายแยกต่างหาก</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">
                                5. พฤติกรรมที่ห้าม
                            </h3>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>ใช้ภาษาหยาบคายหรือคำพูดที่ไม่เหมาะสม</li>
                                <li>ขอข้อมูลส่วนตัวที่ละเอียดอ่อน</li>
                                <li>หลอกลวงหรือใช้ข้อมูลเท็จ</li>
                                <li>สร้างความเดือดร้อนแก่ผู้ใช้คนอื่น</li>
                                <li>ใช้บริการเพื่อกิจกรรมที่ผิดกฎหมาย</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">
                                6. ความรับผิดชอบ
                            </h3>
                            <p>
                                แพลตฟอร์มไม่รับผิดชอบต่อพฤติกรรมของผู้ใช้งานแต่ละคน
                                ความปลอดภัยส่วนบุคคลเป็นหน้าที่ของผู้ใช้เอง
                                หรือความเสียหายที่อาจเกิดขึ้นจากการใช้บริการ
                                ผู้ใช้ต้องใช้วิจารณญาณในการตัดสินใจ
                            </p>
                        </section>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 px-6 py-4">
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="cursor-pointer rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                        >
                            ปิด
                        </button>
                        <button
                            onClick={() => {
                                onAccept?.()
                                onClose()
                            }}
                            className="cursor-pointer rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                        >
                            ยอมรับข้อกำหนด
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

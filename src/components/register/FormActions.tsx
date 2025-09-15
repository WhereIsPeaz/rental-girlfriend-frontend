'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// ยาวและครอบคลุม ใช้เป็น “ตัวอย่างทั่วไป” ไม่ใช่คำแนะนำทางกฎหมาย
export const TERMS_HTML = /* html */ `
<section>
  <h3 style="font-weight:700;margin:0 0 8px;">ข้อกำหนดการใช้งาน</h3>
  <p style="margin:0 0 12px;">
    เอกสารฉบับนี้เป็นเงื่อนไขการใช้บริการแพลตฟอร์ม (“แพลตฟอร์ม”) ของ <strong>บริษัท/ผู้ให้บริการ</strong> (“เรา”)
    โปรดอ่านอย่างละเอียดก่อนใช้งาน การใช้งานแพลตฟอร์มหมายถึงว่าคุณ (“ผู้ใช้”) ยอมรับข้อกำหนดทั้งหมดนี้
    เอกสารนี้เป็นตัวอย่างทั่วไปและไม่ใช่คำแนะนำทางกฎหมาย คุณควรปรึกษาที่ปรึกษากฎหมายหากต้องการใช้จริง
  </p>

  <h4 style="font-weight:700;margin:12px 0 6px;">1) คำจำกัดความ</h4>
  <ul>
    <li><strong>บัญชีผู้ใช้</strong>: บัญชีที่สร้างขึ้นเพื่อเข้าถึงฟังก์ชันของแพลตฟอร์ม</li>
    <li><strong>เนื้อหาผู้ใช้</strong>: ข้อความ รูปภาพ วิดีโอ รีวิว หรือข้อมูลใด ๆ ที่ผู้ใช้ส่ง/อัปโหลด</li>
    <li><strong>บริการ</strong>: ฟังก์ชัน ผลิตภัณฑ์ เนื้อหา และข้อเสนอต่าง ๆ ที่แพลตฟอร์มให้ไว้</li>
  </ul>

  <h4 style="font-weight:700;margin:12px 0 6px;">2) การยอมรับและการแก้ไข</h4>
  <ol>
    <li>เมื่อกดสมัคร ใช้งาน เข้าสู่ระบบ หรือใช้บริการใด ๆ ถือว่ายอมรับข้อกำหนดนี้ทั้งหมด</li>
    <li>เราอาจปรับปรุง/แก้ไขข้อกำหนดได้เป็นครั้งคราวและจะประกาศให้ทราบ การใช้งานต่อไปหลังประกาศถือว่ายอมรับ</li>
  </ol>

  <h4 style="font-weight:700;margin:12px 0 6px;">3) คุณสมบัติและความเหมาะสม</h4>
  <ol>
    <li>อายุตามกฎหมาย (เช่น 18 ปีขึ้นไป) หรือได้รับความยินยอมจากผู้ปกครอง</li>
    <li>ให้ข้อมูลที่ถูกต้อง ครบถ้วน และเป็นปัจจุบันตลอดเวลา</li>
  </ol>

  <h4 style="font-weight:700;margin:12px 0 6px;">4) บัญชีและความปลอดภัย</h4>
  <ol>
    <li>คุณต้องรับผิดชอบต่อการรักษาความลับของข้อมูลเข้าสู่ระบบ</li>
    <li>ห้ามใช้บัญชีผู้อื่นหรืออนุญาตให้ผู้อื่นใช้บัญชีของคุณโดยไม่ได้รับอนุญาต</li>
    <li>แจ้งเราโดยทันทีหากสงสัยการเข้าถึงโดยมิชอบ</li>
  </ol>

  <h4 style="font-weight:700;margin:12px 0 6px;">5) การยืนยันตัวตน (ถ้ามี)</h4>
  <p>เราอาจขอเอกสารยืนยันตัวตนหรือข้อมูลเพิ่มเติมเพื่อประเมินความเสี่ยงและปฏิบัติตามกฎหมายที่เกี่ยวข้อง</p>

  <h4 style="font-weight:700;margin:12px 0 6px;">6) เนื้อหาผู้ใช้</h4>
  <ol>
    <li>คุณรับรองว่ามีสิทธิ์ตามกฎหมายในเนื้อหาที่อัปโหลดและไม่ละเมิดทรัพย์สินทางปัญญาของบุคคลที่สาม</li>
    <li>คุณให้สิทธิ์แก่เราแบบไม่ผูกขาดในการใช้ ทำซ้ำ แก้ไข และแสดงผลเนื้อหาดังกล่าวเพื่อการให้บริการ</li>
    <li>เราสงวนสิทธิ์ลบหรือปิดกั้นเนื้อหาที่ฝ่าฝืนกฎหมาย/ข้อกำหนดนี้</li>
  </ol>

  <h4 style="font-weight:700;margin:12px 0 6px;">7) พฤติกรรมต้องห้าม</h4>
  <ol>
    <li>ใช้บริการเพื่อการทุจริต หลอกลวง คุกคาม ละเมิด หรือฝ่าฝืนกฎหมายใด ๆ</li>
    <li>เผยแพร่เนื้อหาที่เป็นอันตราย อนาจาร หมิ่นประมาท เกลียดชัง หรือรุนแรง</li>
    <li>เจตนารบกวนระบบ เช่น สแปม โจมตี DDoS เจาะระบบ ดัดแปลงโค้ด</li>
    <li>ทำวิศวกรรมย้อนกลับ คัดลอก หรือสร้างงานต่อยอดจากซอร์สโค้ด/ส่วนประกอบที่ไม่ได้เปิดเผย</li>
    <li>แอบอ้างบุคคลอื่นหรือให้ข้อมูลเท็จ</li>
    <li>เก็บ/ประมวลผลข้อมูลส่วนบุคคลของผู้อื่นโดยไม่ได้รับอนุญาต</li>
    <li>ทำกิจกรรมที่เสี่ยงต่อความปลอดภัย สาธารณสุข หรือศีลธรรมอันดี</li>
  </ol>

  <h4 style="font-weight:700;margin:12px 0 6px;">8) การทำรายการ ชำระเงิน และภาษี (หากมี)</h4>
  <ol>
    <li>ราคาค่าบริการอาจรวม/ไม่รวมภาษี คุณตกลงชำระค่าบริการ ค่าธรรมเนียม และภาษีที่เกี่ยวข้อง</li>
    <li>ธุรกรรมจะสมบูรณ์เมื่อระบบยืนยันการชำระเงิน</li>
    <li>การคืนเงิน/ยกเลิกให้เป็นไปตามนโยบายที่ประกาศไว้ (ดูหัวข้อ 9)</li>
  </ol>

  <h4 style="font-weight:700;margin:12px 0 6px;">9) การยกเลิกและการคืนเงิน</h4>
  <ol>
    <li>กติกาการยกเลิก ขอบเขตการคืนเงิน และระยะเวลาในการดำเนินการจะระบุไว้ในหน้าบริการที่เกี่ยวข้อง</li>
    <li>เราสงวนสิทธิ์ปฏิเสธการคืนเงินในกรณีผิดเงื่อนไข/พฤติกรรมต้องห้าม/ใช้บริการไปแล้วโดยสาระสำคัญ</li>
  </ol>

  <h4 style="font-weight:700;margin:12px 0 6px;">10) รีวิวและเรตติ้ง</h4>
  <p>รีวิวต้องมีความสุจริต ไม่บิดเบือน ไม่แลกเปลี่ยนผลประโยชน์เพื่อสร้างความเข้าใจผิด เราอาจลบรีวิวที่ผิดนโยบาย</p>

  <h4 style="font-weight:700;margin:12px 0 6px;">11) ทรัพย์สินทางปัญญา</h4>
  <p>สัญลักษณ์ โลโก้ เครื่องหมายการค้า ซอฟต์แวร์ และเนื้อหาของแพลตฟอร์มเป็นทรัพย์สินของเรา/ผู้อนุญาต ห้ามใช้โดยไม่ได้รับอนุญาต</p>

  <h4 style="font-weight:700;margin:12px 0 6px;">12) การอนุญาตให้ใช้บริการ</h4>
  <p>ให้สิทธิ์ใช้งานแบบจำกัด ไม่ผูกขาด ไม่สามารถโอนไปยังบุคคลอื่น เพื่อใช้งานตามข้อกำหนดนี้เท่านั้น</p>

  <h4 style="font-weight:700;margin:12px 0 6px;">13) ความเป็นส่วนตัว</h4>
  <p>การเก็บ ใช้ และเปิดเผยข้อมูลส่วนบุคคลเป็นไปตามนโยบายความเป็นส่วนตัวของเรา
  โปรดอ่านเพิ่มเติมที่หน้า “นโยบายความเป็นส่วนตัว”</p>

  <h4 style="font-weight:700;margin:12px 0 6px;">14) การสื่อสารทางอิเล็กทรอนิกส์</h4>
  <p>คุณยินยอมรับการสื่อสารผ่านอีเมล การแจ้งเตือนในแอป หรือข้อความ เพื่อวัตถุประสงค์ในการให้บริการ/ธุรการ</p>

  <h4 style="font-weight:700;margin:12px 0 6px;">15) การบำรุงรักษาระบบและการหยุดให้บริการ</h4>
  <p>อาจมีการหยุดปรับปรุง/ซ่อมบำรุงชั่วคราว เราจะพยายามแจ้งให้ทราบล่วงหน้าเมื่อสามารถทำได้</p>

  <h4 style="font-weight:700;margin:12px 0 6px;">16) ข้อสงวนสิทธิ์ (ไม่มีการรับประกัน)</h4>
  <p>บริการให้ “ตามสภาพ” (“as is”) และ “ตามที่มี” เราไม่รับประกันความพร้อมใช้งาน ความถูกต้อง ความครบถ้วน หรือการไร้ข้อผิดพลาด</p>

  <h4 style="font-weight:700;margin:12px 0 6px;">17) การจำกัดความรับผิด</h4>
  <p>ภายใต้กฎหมายที่บังคับใช้ ความรับผิดทั้งหมดของเราจะจำกัดเท่ากับจำนวนเงินที่คุณชำระให้เราในช่วงระยะเวลาอันสมเหตุสมผลก่อนเกิดเหตุ
  เราไม่รับผิดชอบต่อความเสียหายทางอ้อม พิเศษ สูญเสียกำไร หรือความเสียหายที่ตามมา</p>

  <h4 style="font-weight:700;margin:12px 0 6px;">18) การชดใช้ค่าเสียหาย</h4>
  <p>คุณตกลงชดใช้และคุ้มครองเรา จากการเรียกร้อง/ค่าเสียหายที่เกิดจากการละเมิดข้อกำหนดนี้หรือการฝ่าฝืนกฎหมายโดยคุณ</p>

  <h4 style="font-weight:700;margin:12px 0 6px;">19) เหตุสุดวิสัย</h4>
  <p>เราไม่ต้องรับผิดในกรณีเกิดเหตุสุดวิสัย เช่น ภัยธรรมชาติ สงคราม เหตุขัดข้องของระบบสารสนเทศของบุคคลที่สาม ฯลฯ</p>

  <h4 style="font-weight:700;margin:12px 0 6px;">20) ลิงก์/บริการของบุคคลที่สาม</h4>
  <p>แพลตฟอร์มอาจมีลิงก์ไปยังเว็บไซต์/บริการภายนอก เราไม่รับผิดชอบต่อเนื้อหา หรือนโยบายของบริการเหล่านั้น</p>

  <h4 style="font-weight:700;margin:12px 0 6px;">21) การโอนสิทธิ</h4>
  <p>เราสามารถโอนสิทธิ/หน้าที่ตามข้อกำหนดนี้ได้โดยไม่ต้องแจ้งให้ทราบล่วงหน้า ในขณะที่คุณไม่สามารถโอนได้หากไม่มีความยินยอมเป็นลายลักษณ์อักษร</p>

  <h4 style="font-weight:700;margin:12px 0 6px;">22) กฎหมายที่ใช้บังคับและข้อพิพาท</h4>
  <p>ข้อกำหนดนี้อยู่ภายใต้กฎหมายไทย ข้อพิพาทให้พิจารณาโดยศาลไทยที่มีเขตอำนาจ เว้นแต่จะกำหนดวิธีระงับข้อพิพาทไว้เป็นอย่างอื่น</p>

  <h4 style="font-weight:700;margin:12px 0 6px;">23) การระงับข้อพิพาททางเลือก (ถ้ามี)</h4>
  <p>คู่สัญญาอาจตกลงใช้การเจรจาไกล่เกลี่ย หรืออนุญาโตตุลาการตามที่เราแจ้งและยอมรับร่วมกัน</p>

  <h4 style="font-weight:700;margin:12px 0 6px;">24) การยกเลิก/ระงับบัญชี</h4>
  <p>เราสามารถระงับหรือยกเลิกบัญชีของคุณได้ หากพบการละเมิดข้อกำหนด การทุจริต หรือความเสี่ยงต่อความปลอดภัย</p>

  <h4 style="font-weight:700;margin:12px 0 6px;">25) การติดต่อเรา</h4>
  <p>อีเมลฝ่ายสนับสนุน: support@example.com | เวลาทำการ: 09:00–18:00 น. (จันทร์–ศุกร์)</p>

  <h4 style="font-weight:700;margin:12px 0 6px;">26) วันที่มีผลบังคับใช้</h4>
  <p>มีผลตั้งแต่: 1 มกราคม 2025 เป็นต้นไป เวอร์ชัน 1.0</p>

  <div style="height:32px"></div>
  <p style="text-align:center;color:#6B7280;font-size:12px;">— ถึงท้ายเอกสารแล้ว —</p>
</section>
`

type AccountFieldsProps = {
    formData: any
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function FormActions({
    formData,
    handleChange,
}: AccountFieldsProps) {
    const [open, setOpen] = useState(false)
    const [scrolledEnd, setScrolledEnd] = useState(false)
    const boxRef = useRef<HTMLDivElement>(null)

    // เมื่อเปิดโมดัล: ถ้าเนื้อหาไม่ต้องเลื่อน => ถือว่าอ่านครบ, มิฉะนั้นรอเลื่อนถึงท้าย
    useEffect(() => {
        if (!open) return
        const el = boxRef.current
        if (!el) return

        const update = () => {
            const atEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 8
            setScrolledEnd(atEnd)
        }

        // เช็กทันที (กรณีเนื้อหาเตี้ยกว่ากล่อง -> กดได้เลย)
        update()
        el.addEventListener('scroll', update)
        return () => el.removeEventListener('scroll', update)
    }, [open])

    // helper: สร้างอีเวนต์ปลอมเพื่อส่งให้ handleChange
    const makeCheckboxEvent = (name: string, checked: boolean) =>
        ({
            target: { name, type: 'checkbox', checked },
        }) as unknown as React.ChangeEvent<HTMLInputElement>

    // ดักที่ onChange (ไม่ใช้ onClick แล้ว):
    // - ถ้าผู้ใช้ "กำลังจะติ๊กเข้า" (ค่าใหม่ = true) และยังไม่ได้ยอมรับ -> เปิดโมดัลแทน
    // - ถ้าเป็น "ติ๊กออก" (ค่าใหม่ = false) ให้ผ่านต่อไปตามปกติ
    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = e.target.checked
        if (!formData?.acception && next) {
            // กันการติ๊กเข้า
            e.preventDefault()
            // รีเซ็ตค่า checkbox กลับ (เผื่อเบราว์เซอร์ติ๊กให้ชั่วขณะ)
            handleChange(makeCheckboxEvent('acception', false))
            setOpen(true)
            return
        }
        // ติ๊กออก: ให้ทำงานปกติ
        handleChange(e)
    }

    const acceptFromModal = () => {
        handleChange(makeCheckboxEvent('acception', true)) // ยอมรับจริง
        setOpen(false)
    }

    return (
        <div>
            <div className="flex items-start gap-2">
                <input
                    id="terms"
                    type="checkbox"
                    name="acception"
                    checked={!!formData?.acception}
                    onChange={onCheckboxChange}
                    className="mt-0.5 h-4 w-4 rounded border border-[#E5E7EB] text-pink-600 focus:ring-pink-500"
                    required
                />
                <label
                    htmlFor="terms"
                    className="block text-sm leading-6 text-[#212b36]"
                >
                    ฉันยอมรับ{' '}
                    <Link
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            setOpen(true)
                        }}
                        className="font-medium text-[#f24472] hover:underline"
                    >
                        ข้อกำหนดการใช้งาน
                    </Link>{' '}
                    และ{' '}
                    <Link
                        href="/privacy"
                        className="font-medium text-[#f24472] hover:underline"
                    >
                        นโยบายความเป็นส่วนตัว
                    </Link>
                </label>
            </div>

            <button
                type="submit"
                style={{
                    background:
                        'linear-gradient(133.15deg, #F24BA7 2.02%, #EF4444 98.99%)',
                    borderRadius: 6,
                }}
                className="mt-6 w-full cursor-pointer px-5 py-3 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:outline-none"
            >
                สมัครสมาชิก
            </button>

            {/* Modal Terms */}
            {open && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-2xl overflow-hidden rounded-[16px] bg-white shadow-[0_12px_32px_rgba(0,0,0,.08)]">
                        <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-3">
                            <div className="text-base font-semibold text-[#111827]">
                                ข้อกำหนดการใช้งาน
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="inline-flex items-center justify-center rounded-[10px] border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm hover:bg-[#F3F4F6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4E95] focus-visible:ring-offset-1"
                            >
                                ปิด
                            </button>
                        </div>

                        <div
                            ref={boxRef}
                            className="max-h-[60vh] space-y-3 overflow-auto p-5 text-sm leading-6 text-[#111827]"
                        >
                            <div
                                dangerouslySetInnerHTML={{ __html: TERMS_HTML }}
                            />
                            <div className="h-8" />
                            <p className="text-center text-xs text-[#6B7280]">
                                — ถึงท้ายเอกสารแล้ว —
                            </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-[#E5E7EB] px-5 py-3">
                            <span className="text-xs text-[#6B7280]">
                                สถานะการอ่าน:{' '}
                                {scrolledEnd
                                    ? 'อ่านครบแล้ว ✅'
                                    : 'ยังอ่านไม่ครบ'}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="inline-flex items-center justify-center rounded-[12px] border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#111827] hover:bg-[#F3F4F6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4E95] focus-visible:ring-offset-1"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    onClick={acceptFromModal}
                                    disabled={!scrolledEnd}
                                    className="inline-flex items-center justify-center rounded-[12px] bg-gradient-to-r from-[#FF4E95] to-[#FF7EB3] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4E95] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    ยอมรับ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* /Modal */}
        </div>
    )
}

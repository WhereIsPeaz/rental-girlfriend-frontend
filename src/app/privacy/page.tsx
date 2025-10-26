'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function PrivacyPolicy() {
    return (
        <main
            style={{
                background:
                    'linear-gradient(112.9deg, #FEEDF6 0%, #FFFFFF 50%, #FEEDF6 100%)',
            }}
            className="min-h-screen pt-12 sm:pt-16"
        >
            <div className="mx-auto max-w-4xl px-6 pb-12">
                {/* Header */}
                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
                        <Image
                            src="/img/protect.svg"
                            alt="privacy icon"
                            width={32}
                            height={32}
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        นโยบายความเป็นส่วนตัว
                    </h1>
                    <p className="mt-2 text-gray-600">
                        เราให้ความสำคัญกับความเป็นส่วนตัวและการคุ้มครองข้อมูลของคุณ
                    </p>
                </div>

                {/* Content Card */}
                <div className="rounded-2xl bg-white p-8 shadow-lg">
                    {/* Privacy Notice */}
                    <div className="mb-8 rounded-lg border border-pink-200 bg-pink-50 p-4">
                        <div className="flex items-start">
                            <div className="mt-1 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-pink-200">
                                <svg
                                    className="h-4 w-4 text-pink-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-pink-800">
                                    นโยบายความเป็นส่วนตัวฉบับใหม่
                                    &quot;แฟนเช่า&quot;
                                </h3>
                                <p className="mt-1 text-sm text-pink-700">
                                    ปรับปรุง &quot;แฟนเช่า&quot;
                                    ขอแจ้งให้ทราบถึงการเปลี่ยนแปลงนโยบายความเป็นส่วนตัวเพื่อให้สอดคล้องกับระบบใหม่
                                    โดยเราจะดำเนินการปรับปรุงข้อมูลให้ทันสมัยและปลอดภัยกว่าเดิม
                                    เริ่มตั้งแต่วันที่ปรับปรุงฉบับใหม่
                                    การลงทะเบียนใช้ระบบถือว่ายอมรับ
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-8">
                        {/* Section 1 */}
                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">
                                คำนิยาม
                            </h2>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                                    <span>
                                        &quot;เรา&quot; หมายถึง
                                        ทีมงานที่พัฒนาแอปพลิเคชัน
                                        &quot;แฟนเช่า&quot;
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                                    <span>
                                        &quot;คุณ&quot; หรือ &quot;ท่าน&quot;
                                        หมายถึง
                                        บุคคลที่เข้ามาใช้บริการในแอปพลิเคชัน
                                        &quot;แฟนเช่า&quot;
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                                    <span>
                                        &quot;ข้อมูลส่วนบุคคล&quot; หมายถึง
                                        ข้อมูลเกี่ยวกับบุคคลที่ทำให้สามารถระบุตัวตนของบุคคลนั้นได้
                                        เช่น ชื่อ นามสกุล เพศ อายุ ที่อยู่
                                        เบอร์โทรศัพท์ อีเมล เป็นต้น
                                    </span>
                                </li>
                            </ul>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">
                                ข้อมูลที่เราเก็บรวบรวม
                            </h2>
                            <p className="mb-4 text-gray-700">
                                เราจะเก็บรวบรวมข้อมูลส่วนบุคคลของคุณเมื่อคุณใช้บริการของเราเท่านั้น
                                ดังนี้
                            </p>
                            <div className="space-y-3">
                                <h3 className="text-gray-900">
                                    1. ข้อมูลส่วนบุคคล เช่น ชื่อ, นามสกุล,
                                    อีเมล, แบรนด์โทรศัพท์,
                                    หมายเลขโทรศัพท์มือถือ, ข้อมูลที่อยู่
                                </h3>

                                <h3 className="text-gray-900">
                                    2. ข้อมูลการใช้งาน เช่น
                                    วิธีการใช้งานแอปพลิเคชัน
                                    การเข้าถึงข้อมูลต่างๆ
                                </h3>

                                <h3 className="text-gray-900">
                                    3.
                                    ประวัติการทำธุรกรรมและข้อมูลการทำธุรกรรมต่างๆ
                                </h3>

                                <h3 className="text-gray-900">
                                    4. ข้อมูลที่เกี่ยวข้องกับการใช้บริการ
                                    ประโยชน์ของการใช้บริการ
                                </h3>
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">
                                การใช้ข้อมูลส่วนบุคคล
                            </h2>
                            <p className="mb-4 text-gray-700">
                                ข้อมูลส่วน &quot;แฟนเช่า&quot;
                                จะใช้ข้อมูลส่วนบุคคลของคุณเพื่อการดำเนินงานดังต่อไปนี้
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                                    <span>
                                        การให้บริการต่างๆ ของแพลตฟอร์มแฟนเช่า
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                                    <span>
                                        การตรวจสอบตัวตนและการยืนยันบัญชี
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                                    <span>
                                        การจัดการบัญชีผู้ใช้และการให้บริการลูกค้า
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                                    <span>
                                        การปรับปรุงและพัฒนาบริการให้ดีขึ้น
                                    </span>
                                </li>
                            </ul>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">
                                การจัดเก็บและความปลอดภัยของข้อมูล
                            </h2>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                                    <span>
                                        เราจะเก็บข้อมูลส่วนบุคคลของคุณไว้เฉพาะระยะเวลาที่จำเป็นเท่านั้นหรือตามที่กฎหมายกำหนด
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                                    <span>
                                        ข้อมูลจะถูกเก็บรักษาไว้อย่างปลอดภัยด้วยมาตรการรักษาความปลอดภัยที่เหมาะสม
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                                    <span>
                                        เจ้าหน้าที่ได้รับการฝึกอบรมเกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคลอย่างเหมาะสม
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                                    <span>
                                        เราจะใช้ข้อมูลของคุณเพื่อวัตถุประสงค์ที่ชัดเจนและโปร่งใสเท่านั้น
                                    </span>
                                </li>
                            </ul>
                        </section>

                        {/* Section 5 */}
                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">
                                สิทธิของผู้ใช้บริการ
                            </h2>
                            <p className="mb-4 text-gray-700">
                                ผู้ใช้บริการมีสิทธิในการ
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                                    <span>
                                        เข้าถึงและขอสำเนาข้อมูลส่วนบุคคลที่เราเก็บรวบรวม
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                                    <span>
                                        แก้ไขข้อมูล
                                        ผู้ใช้บริการสามารถขอแก้ไขข้อมูลส่วนบุคคลที่ไม่ถูกต้องได้
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                                    <span>
                                        ลบข้อมูล
                                        ผู้ใช้บริการสามารถขอให้ลบข้อมูลส่วนบุคคลได้ในกรณีที่เหมาะสม
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mt-2 mr-2 h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                                    <span>
                                        ขอให้ระงับการใช้ข้อมูลส่วนบุคคลชั่วคราวหรือถาวร
                                        ในกรณีที่มีเหตุผลอันสมควร
                                    </span>
                                </li>
                            </ul>
                        </section>

                        {/* Section 6 */}
                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">
                                การใช้คุกกี้และเทคโนโลยีอื่นๆ
                            </h2>
                            <p className="text-gray-700">
                                เพื่อให้การใช้งานเว็บไซต์ของเรามีประสิทธิภาพและเพื่อให้เราสามารถวิเคราะห์การใช้งานได้
                                เราอาจใช้คุกกี้และเทคโนโลยีที่คล้ายคลึงกัน
                                การใช้งานเว็บไซต์ของเราถือว่าท่านยินยอมให้เราใช้คุกกี้
                            </p>
                        </section>

                        {/* Section 7 */}
                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">
                                การใช้ข้อมูลเพิ่มเติม
                            </h2>
                            <p className="text-gray-700">
                                เมื่อมีการเปลี่ยนแปลงนโยบายความเป็นส่วนตัวนี้
                                เราจะแจ้งให้ท่านทราบผ่านช่องทางการติดต่อที่ท่านให้ไว้กับเรา
                                หรือผ่านการประกาศบนเว็บไซต์ของเรา
                                การใช้บริการของเราต่อไปหลังจากการเปลิ่ยนแปลงถือว่าท่านยอมรับการเปลี่ยนแปลงดังกล่าว
                            </p>
                        </section>

                        {/* Section 8 */}
                        <section>
                            <h2 className="mb-4 text-xl font-bold text-gray-900">
                                การติดต่อและแจ้งปัญหาเพิ่มเติม
                            </h2>
                            <p className="mb-4 text-gray-700">
                                หากท่านมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้หรือต้องการใช้สิทธิของท่านเกี่ยวกับข้อมูลส่วนบุคคล
                                ท่านสามารถติดต่อเราได้ที่ประจำ
                                หรือผ่านช่องทางการติดต่อที่ระบุไว้ในแอปพลิเคชัน
                            </p>
                            <div className="rounded-lg bg-pink-50 p-4">
                                <p className="text-pink-800">
                                    <strong>อีเมล:</strong>{' '}
                                    phongit.ton@gmail.com
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Back Button */}
                    <div className="mt-12 text-center">
                        <Link
                            href="/register"
                            className="inline-flex items-center rounded-lg bg-pink-600 px-6 py-3 text-white transition-colors hover:bg-pink-700"
                        >
                            <svg
                                className="mr-2 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            กลับไปหน้าสมัครสมาชิก
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

import Link from 'next/link'
export default function Forlogin() {
    return (
        <div className="flex items-center gap-4">
            <Link
                href="/login"
                className="text-[#212B36] transition-all hover:text-pink-500"
            >
                เข้าสู่ระบบ
            </Link>
            <Link
                href="/register"
                style={{
                    background:
                        'linear-gradient(133.15deg, #F24BA7 2.02%, #EF4444 98.99%)',
                    borderRadius: '6px',
                }}
                className="cursor-pointer px-5 py-2 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-pink-600"
            >
                สมัครสมาชิก
            </Link>
        </div>
    )
}

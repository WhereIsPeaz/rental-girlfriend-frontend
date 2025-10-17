"use client";

import { Heart, Shield, Phone, Mail, MapPin } from "lucide-react";
import { Kanit } from 'next/font/google'
import Image from 'next/image'

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['400', '700'] })

export default function BookingFooter() {
  return (
    <footer className={`${kanit.className} bg-[#0D1021] text-gray-300 py-8 px-8`}>
      <div className="max-w-[70vw] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2">
            <Image
                src="/img/logo.svg"
                alt="logo"
                width={24}
                height={24}
            />
            <h2 className="text-lg font-semibold text-white">แฟนเช่า</h2>
          </div>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            แพลตฟอร์มหาคู่เดตและเพื่อนทำกิจกรรมที่ปลอดภัยและเชื่อถือได้
          </p>
          <div className="flex items-center mt-3 space-x-2">
            <Shield className="text-green-500 w-4 h-4" />
            <span className="text-green-500 text-sm">ปลอดภัย 100%</span>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">บริการ</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>ค้นหาแฟนเช่า</li>
            <li>สมัครเป็นผู้ให้บริการ</li>
            <li>การจองและชำระเงิน</li>
            <li>ระบบรีวิวและคะแนน</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">ช่วยเหลือ</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>วิธีใช้งาน</li>
            <li>คำถามที่พบบ่อย</li>
            <li>ความปลอดภัย</li>
            <li>นโยบายการใช้งาน</li>
            <li>นโยบายความเป็นส่วนตัว</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">ติดต่อเรา</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4 " />
              <span>02-123-4567</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>support@fancha.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>กรุงเทพมหานคร ประเทศไทย</span>
            </li>
          </ul>

          <div className="bg-red-950/60 border border-red-800 rounded-md px-3 py-2 mt-4 text-left">
            <p className="text-red-400 font-sm text-sm">เหตุฉุกเฉิน 24/7</p>
            <p className="text-red-200 text-sm">หมายเลข: 1669</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-500">
        © 2025 แฟนเช่า. สงวนลิขสิทธิ์ทุกประการ
      </div>
    </footer>
  );
}

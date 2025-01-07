// app/layout.tsx
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { Noto_Sans_Thai } from 'next/font/google'

// ประกาศและเลือก subset, weight ที่ต้องการ
const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],   // สำคัญ: ระบุ 'thai' เพื่อโหลดชุดตัวอักษรไทย
  weight: ['400', '700'], // ตัวอย่าง: โหลดเฉพาะน้ำหนัก 400, 700
})

export const metadata = {
  title: 'My Next App',
  description: 'Sample Next.js App with daisyUI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="bumblebee" >
      <body className={notoSansThai.className}>
        <Header />
        <main className="p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

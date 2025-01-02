// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en" data-theme="cupcake">
      <body >
        <Header />
        <main className="p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

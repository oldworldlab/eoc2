'use client'

import { Inter } from 'next/font/google'
import Header from '@/components/Header'  // Note the uppercase 'H'
import Footer from '@/components/Footer'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white min-h-screen`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
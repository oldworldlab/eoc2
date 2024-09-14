'use client'

import '@/styles/globals.css'
import { ReactNode } from 'react'
import HeaderComponent from '@/components/components-header'
import Footer from '@/components/Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-purple-900 text-gray-100">
        <HeaderComponent />
        {children}
        <Footer />
      </body>
    </html>
  )
}

'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1f2e] p-4 mt-8 bg-gray-900">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <span className="text-gray-500 mb-4 md:mb-0">&copy; 2023 Abyss MMORPG. All rights reserved.</span>
        <div className="flex space-x-6">
          <Link href="https://twitter.com/abyssmmorpg" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-6 w-6 text-gray-500 hover:text-blue-400" />
          </Link>
          <Link href="https://www.facebook.com/gaming/AbyssMMORPG" target="_blank" rel="noopener noreferrer">
            <Facebook className="h-6 w-6 text-gray-500 hover:text-blue-600" />
          </Link>
          <Link href="https://www.instagram.com/abyssmmorpg/" target="_blank" rel="noopener noreferrer">
            <Instagram className="h-6 w-6 text-gray-500 hover:text-pink-500" />
          </Link>
          <Link href="https://www.youtube.com/@AbyssMMORPG" target="_blank" rel="noopener noreferrer">
            <Youtube className="h-6 w-6 text-gray-500 hover:text-red-600" />
          </Link>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/about" className="text-gray-500 hover:text-[#ffd700]">About Us</Link>
          <Link href="/terms" className="text-gray-500 hover:text-[#ffd700]">Terms of Service</Link>
          <Link href="/privacy" className="text-gray-500 hover:text-[#ffd700]">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
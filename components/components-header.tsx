'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { WalletIcon } from 'lucide-react'
import Image from 'next/image'

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
    };
  }
}

export default function HeaderComponent() {
  const [isConnected, setIsConnected] = useState(false)

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        setIsConnected(true)
      } catch (error) {
        console.error('Failed to connect wallet:', error)
      }
    } else {
      alert('Please install MetaMask to connect your wallet')
    }
  }

  return (
    <header className="p-4 flex justify-between items-center bg-gray-900">
      <div className="flex items-center">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/parallelao_secret_shop_logo_with_transparent_background_for_web_7a100720-0f57-43e0-99fb-19005bc2f0f7-removebg-preview-ra5HtqZGEFU2MOJwZGdUF9ocEosI5c.png"
          alt="Secret Shop Logo"
          width={100}
          height={100}
          className="mr-2"
        />
      </div>
      <nav className="space-x-4">
        {[
          { name: "Home", emoji: "🏠", href: "/" },
          { name: "Marketplace", emoji: "🛒", href: "/marketplace" }, // Added Marketplace
          { name: "Gather", emoji: "🌿", href: "/gathering" },
          { name: "Crafting", emoji: "⚒️", href: "/crafting" },
          { name: "Relic Hunter", emoji: "🏺", href: "/relic-hunter" },
          { name: "Quests", emoji: "📜", href: "/quests" },
          { name: "Profile", emoji: "👤", href: "/profile" },
        ].map((item) => (
          <Link key={item.name} href={item.href}>
            <Button variant="ghost" className="text-gray-300 hover:text-pink-400 hover:bg-gray-800">
              <span>{item.emoji} {item.name}</span>
            </Button>
          </Link>
        ))}
      </nav>
      <Button onClick={connectWallet} variant="outline" className="text-pink-500 border-pink-500 hover:bg-pink-500 hover:text-gray-900">
        <WalletIcon className="mr-2 h-4 w-4" />
        {isConnected ? 'Connected' : 'Connect Wallet'}
      </Button>
    </header>
  )
}
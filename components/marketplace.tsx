'use client'

import { Search, Diamond, Hammer, Scroll, Swords, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Image from 'next/image'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from 'react'

export function Marketplace() {
  const [selectedValue, setSelectedValue] = useState<string>('')

  return (
    <div className="min-h-screen bg-[#0a0e17] text-gray-100 font-sans">
      <header className="border-b border-[#1a1f2e] p-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/parallelao_secret_shop_logo_with_transparent_background_for_web_7a100720-0f57-43e0-99fb-19005bc2f0f7-removebg-preview-ra5HtqZGEFU2MOJwZGdUF9ocEosI5c.png"
              alt="Secret Shop Logo"
              width={100}
              height={100}
              className="mr-2"
            />
            <Button variant="ghost" className="text-gray-300 hover:text-[#ffd700] hover:bg-[#1a1f2e]">
              <Diamond className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-[#ffd700] hover:bg-[#1a1f2e]">
              <Search className="mr-2 h-4 w-4" />
              Marketplace
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-[#ffd700] hover:bg-[#1a1f2e]">
              <Hammer className="mr-2 h-4 w-4" />
              Gather
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-[#ffd700] hover:bg-[#1a1f2e]">
              <Scroll className="mr-2 h-4 w-4" />
              Crafting
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-[#ffd700] hover:bg-[#1a1f2e]">
              <Swords className="mr-2 h-4 w-4" />
              Quests
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-300 hover:text-[#ffd700]">
              <User className="h-5 w-5" />
            </Button>
            <Button className="bg-[#ffd700] text-[#0a0e17] hover:bg-[#ffea00]">
              Connect Wallet
            </Button>
          </div>
        </nav>
      </header>
      <main className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Secret Shop Marketplace</h1>
        <div className="flex justify-between mb-6">
          <div className="relative w-1/3">
            <Input 
              type="search" 
              placeholder="Search marketplace" 
              className="pl-10 bg-[#1a1f2e] border-[#2a2f3e] text-gray-100 placeholder-gray-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <div className="bg-[#1a1f2e] border-[#2a2f3e] text-gray-100 w-full">
            <Select value={selectedValue} onValueChange={setSelectedValue}>
              <SelectTrigger className="w-full bg-[#1a1f2e] border-[#2a2f3e]">
                <SelectValue placeholder="Select item" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended for you</SelectItem>
                <SelectItem value="low-to-high">Price: Low to High</SelectItem>
                <SelectItem value="high-to-low">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex mb-6">
          <div className="w-1/4 pr-6 border-r border-[#1a1f2e]">
            <h2 className="text-xl font-bold mb-4 text-[#ffd700]">Filters</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Price Range</h3>
                <div className="flex items-center space-x-4">
                  <Input type="number" placeholder="Min" className="w-1/2 bg-[#1a1f2e] border-[#2a2f3e]" />
                  <Input type="number" placeholder="Max" className="w-1/2 bg-[#1a1f2e] border-[#2a2f3e]" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Item Condition</h3>
                <div className="space-y-2">
                  {['Pristine', 'Slightly Used', 'Well-Worn', 'Battle-Scarred'].map((condition) => (
                    <div key={condition} className="flex items-center">
                      <Checkbox id={condition} className="border-[#2a2f3e]" />
                      <label htmlFor={condition} className="ml-2 text-sm font-medium text-gray-300">{condition}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Rarity</h3>
                <div className="space-y-2">
                  {['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'].map((rarity) => (
                    <div key={rarity} className="flex items-center">
                      <Checkbox id={rarity} className="border-[#2a2f3e]" />
                      <label htmlFor={rarity} className="ml-2 text-sm font-medium text-gray-300">{rarity}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Item Type</h3>
                <select className="w-full bg-[#1a1f2e] border-[#2a2f3e]">
                  <option>All Types</option>
                  <option>Weapons</option>
                  <option>Armor</option>
                  <option>Accessories</option>
                  <option>Consumables</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-3/4 pl-6">
            <div className="grid grid-cols-4 gap-4">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="bg-[#1a1f2e] p-4 rounded-lg border border-[#2a2f3e] hover:border-[#ffd700] transition-colors">
                  <Image src={`/placeholder.svg?height=100&width=100`} alt="Item" className="w-full h-40 object-cover mb-4 rounded" width={100} height={100} />
                  <h3 className="text-lg font-semibold mb-2">Mystic Artifact</h3>
                  <p className="text-gray-400 mb-2">Rare | Accessory</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#ffd700] font-bold">299 Gold</span>
                    <span className="text-green-500">-15%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-[#1a1f2e] p-4 mt-8">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <span className="text-gray-500">&copy; 2023 Secret Shop. All rights reserved.</span>
          <div className="flex space-x-4">
            <Button variant="ghost" className="text-gray-500 hover:text-[#ffd700]">About Us</Button>
            <Button variant="ghost" className="text-gray-500 hover:text-[#ffd700]">Terms of Service</Button>
            <Button variant="ghost" className="text-gray-500 hover:text-[#ffd700]">Privacy Policy</Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
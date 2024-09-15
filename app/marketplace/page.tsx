'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('')
  const [listings, setListings] = useState([])

  useEffect(() => {
    async function fetchListings() {
      const response = await fetch('/api/marketplace')
      const data = await response.json()
      setListings(data.listings)
    }
    fetchListings()
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0e17] text-gray-100 font-sans">
      <main className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between mb-6">
          <div className="relative w-1/3">
            <Input 
              type="search" 
              placeholder="Search marketplace" 
              className="pl-10 bg-[#1a1f2e] border-[#2a2f3e] text-gray-100 placeholder-gray-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <Select>
            <option>Recommended for you</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </Select>
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
                <Select>
                  <option>All Types</option>
                  <option>Weapons</option>
                  <option>Armor</option>
                  <option>Accessories</option>
                  <option>Consumables</option>
                </Select>
              </div>
            </div>
          </div>
          <div className="w-3/4 pl-6">
            <div className="grid grid-cols-4 gap-4">
              {listings.map((listing) => (
                <div key={listing.id} className="bg-[#1a1f2e] p-4 rounded-lg border border-[#2a2f3e] hover:border-[#ffd700] transition-colors">
                  <Image src="/placeholder.svg" alt={listing.itemName} width={100} height={100} className="w-full h-40 object-cover mb-4 rounded" />
                  <h3 className="text-lg font-semibold mb-2">{listing.itemName}</h3>
                  <p className="text-gray-400 mb-2">Quantity: {listing.quantity}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#ffd700] font-bold">{listing.price} Gold</span>
                    <Button onClick={() => handlePurchase(listing.id)}>Buy</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
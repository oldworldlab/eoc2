'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { 
  Download, Play, Info, Sword, Shield, 
  Heart, Zap, Brain, Feather
} from 'lucide-react'

// Mock data for the character
const characterData = {
  name: "Aethoris Stormweaver",
  class: "Arcane Blacksmith",
  level: 42,
  experience: 7500,
  maxExperience: 10000,
  email: "aethoris@example.com",
  walletAddress: "0x1234...5678",
  balance: 1000,
  portfolioValue: 25000,
  inventoryItems: 87,
  relicsDiscovered: 15,
  buyVolume: 15000,
  sellVolume: 12000
}

// Mock data for inventory items
const inventoryItems = [
  { id: 1, name: "Enchanted Hammer", type: "tool", rarity: "rare" },
  { id: 2, name: "Mithril Ingot", type: "material", rarity: "uncommon" },
  { id: 3, name: "Philosopher's Stone", type: "artifact", rarity: "legendary" },
  // ... add more items as needed
]

// Mock data for equipped items
const equippedItems = {
  head: { id: 101, name: "Crown of the Wise", rarity: "epic" },
  chest: { id: 102, name: "Robe of the Arcane", rarity: "legendary" },
  hands: { id: 103, name: "Gloves of Precision", rarity: "rare" },
  legs: { id: 104, name: "Pants of Comfort", rarity: "uncommon" },
  feet: { id: 105, name: "Boots of Swift Travel", rarity: "rare" },
  weapon: { id: 106, name: "Staff of Unbounded Creativity", rarity: "legendary" },
  offhand: { id: 107, name: "Tome of Forgotten Lore", rarity: "epic" }
}

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("character")
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [isDownloaded, setIsDownloaded] = useState(false)
  const [isLaunching, setIsLaunching] = useState(false)

  const handleDownload = () => {
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsDownloaded(true)
          return 100
        }
        return prev + 1
      })
    }, 50)
  }

  const handleLaunch = () => {
    setIsLaunching(true)
    setTimeout(() => {
      window.open('about:blank', '_blank', 'width=1280,height=720')
      setIsLaunching(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#0a0e17] text-gray-100 font-sans">
      <main className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#ffd700]">Adventurer Profile</h1>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="character">Character</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="character">
                <div className="bg-[#1a1f2e] p-6 rounded-lg border border-[#2a2f3e]">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Character Information</h2>
                      <div className="space-y-2">
                        <div>
                          <label className="text-sm text-gray-400">Name</label>
                          <Input value={characterData.name} readOnly className="bg-[#2a2f3e] border-[#3a3f4e]" />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Class</label>
                          <Input value={characterData.class} readOnly className="bg-[#2a2f3e] border-[#3a3f4e]" />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Level</label>
                          <Input value={characterData.level} readOnly className="bg-[#2a2f3e] border-[#3a3f4e]" />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Experience</label>
                          <Progress value={(characterData.experience / characterData.maxExperience) * 100} className="h-2" />
                          <div className="text-xs text-right mt-1">{characterData.experience} / {characterData.maxExperience}</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Stats</h2>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Sword className="h-5 w-5 mr-2" />
                          <span>Attack Power: 1,481</span>
                        </div>
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 mr-2" />
                          <span>Armor: 4,216</span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-5 w-5 mr-2" />
                          <span>Life: 1,627</span>
                        </div>
                        <div className="flex items-center">
                          <Zap className="h-5 w-5 mr-2" />
                          <span>Strength: 113</span>
                        </div>
                        <div className="flex items-center">
                          <Brain className="h-5 w-5 mr-2" />
                          <span>Intelligence: 228</span>
                        </div>
                        <div className="flex items-center">
                          <Feather className="h-5 w-5 mr-2" />
                          <span>Dexterity: 199</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="inventory">
                <div className="bg-[#1a1f2e] p-6 rounded-lg border border-[#2a2f3e]">
                  <h2 className="text-xl font-semibold mb-4">Inventory</h2>
                  <div className="grid grid-cols-10 gap-2">
                    {inventoryItems.map(item => (
                      <div key={item.id} className={`bg-[#2a2f3e] p-2 rounded border ${
                        item.rarity === 'legendary' ? 'border-yellow-500' :
                        item.rarity === 'epic' ? 'border-purple-500' :
                        item.rarity === 'rare' ? 'border-blue-500' :
                        'border-gray-500'
                      }`}>
                        <div className="w-10 h-10 bg-gray-700 rounded"></div>
                        <div className="text-xs mt-1 text-center">{item.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="transactions">
                <div className="bg-[#1a1f2e] p-6 rounded-lg border border-[#2a2f3e]">
                  <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Buy Volume</span>
                      <span className="text-[#ffd700]">{characterData.buyVolume} EOC</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sell Volume</span>
                      <span className="text-[#ffd700]">{characterData.sellVolume} EOC</span>
                    </div>
                    {/* Add more transaction details here */}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="achievements">
                <div className="bg-[#1a1f2e] p-6 rounded-lg border border-[#2a2f3e]">
                  <h2 className="text-xl font-semibold mb-4">Achievements</h2>
                  {/* Add achievements content here */}
                </div>
              </TabsContent>
              <TabsContent value="settings">
                <div className="bg-[#1a1f2e] p-6 rounded-lg border border-[#2a2f3e]">
                  <h2 className="text-xl font-semibold mb-4">Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400">Email</label>
                      <Input value={characterData.email} className="bg-[#2a2f3e] border-[#3a3f4e]" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Wallet Address</label>
                      <Input value={characterData.walletAddress} readOnly className="bg-[#2a2f3e] border-[#3a3f4e]" />
                    </div>
                    {/* Add more settings options here */}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <div className="bg-[#1a1f2e] p-6 rounded-lg border border-[#2a2f3e]">
              <h2 className="text-xl font-semibold mb-4">Character Paper Doll</h2>
              <div className="relative w-full h-80 bg-[#2a2f3e] rounded-lg">
                {/* Add character image here */}
                <div className="absolute top-0 left-0 w-10 h-10 bg-[#3a3f4e] rounded-full"></div>
                <div className="absolute top-0 right-0 w-10 h-10 bg-[#3a3f4e] rounded-full"></div>
                <div className="absolute top-1/4 left-0 w-10 h-10 bg-[#3a3f4e] rounded-full"></div>
                <div className="absolute top-1/4 right-0 w-10 h-10 bg-[#3a3f4e] rounded-full"></div>
                <div className="absolute bottom-1/4 left-0 w-10 h-10 bg-[#3a3f4e] rounded-full"></div>
                <div className="absolute bottom-1/4 right-0 w-10 h-10 bg-[#3a3f4e] rounded-full"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-[#3a3f4e] rounded-full"></div>
              </div>
              <div className="mt-4 space-y-2">
                {Object.entries(equippedItems).map(([slot, item]) => (
                  <div key={slot} className="flex justify-between">
                    <span className="capitalize">{slot}</span>
                    <span className={
                      item.rarity === 'legendary' ? 'text-yellow-500' :
                      item.rarity === 'epic' ? 'text-purple-500' :
                      item.rarity === 'rare' ? 'text-blue-500' :
                      'text-gray-500'
                    }>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1a1f2e] p-6 rounded-lg border border-[#2a2f3e]">
              <h2 className="text-xl font-semibold mb-4">Wallet</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Balance</span>
                  <span className="text-[#ffd700]">{characterData.balance} EOC</span>
                </div>
                <div className="flex justify-between">
                  <span>Portfolio Value</span>
                  <span className="text-[#ffd700]">{characterData.portfolioValue} EOC</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1f2e] p-6 rounded-lg border border-[#2a2f3e]">
              <h2 className="text-xl font-semibold mb-4">Game Launcher</h2>
              {!isDownloaded ? (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Downloading game files...</span>
                    <span className="text-sm font-medium">{downloadProgress}%</span>
                  </div>
                  <Progress value={downloadProgress} className="w-full h-4" />
                </div>
              ) : (
                <div className="mb-4 text-green-500 flex items-center">
                  <Info className="mr-2 h-5 w-5" />
                  <span>Game is ready to launch!</span>
                </div>
              )}
              <div className="flex space-x-4">
                {!isDownloaded ? (
                  <Button
                    className="flex-1 bg-[#ffd700] text-[#0a0e17] hover:bg-[#ffea00] flex items-center justify-center"
                    onClick={handleDownload}
                    disabled={downloadProgress > 0}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    {downloadProgress === 0 ? 'Download Game' : 'Downloading...'}
                  </Button>
                ) : (
                  <Button
                    className="flex-1 bg-[#ffd700] text-[#0a0e17] hover:bg-[#ffea00] flex items-center justify-center"
                    onClick={handleLaunch}
                    disabled={isLaunching}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    {isLaunching ? 'Launching...' : 'Launch Game'}
                  </Button>
                )}
              </div>
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
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Hammer, Scissors, Beaker, Axe, Flame, Gem, Feather, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const TIERS = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Divine', 'Transcendent']

const CRAFTING_TABLES = [
  { name: 'Blacksmithing', icon: <Hammer className="w-6 h-6" /> },
  { name: 'Tailoring', icon: <Scissors className="w-6 h-6" /> },
  { name: 'Alchemy', icon: <Beaker className="w-6 h-6" /> },
  { name: 'Woodworking', icon: <Axe className="w-6 h-6" /> },
  { name: 'Jewelcrafting', icon: <Gem className="w-6 h-6" /> },
  { name: 'Cooking', icon: <Flame className="w-6 h-6" /> },
  { name: 'Inscription', icon: <Feather className="w-6 h-6" /> },
]

const ITEMS = [
  { name: 'Sword of the Cosmos', category: 'Blacksmithing', tier: 7, resources: ['Stardust Steel', 'Cosmic Essence', 'Void Crystal'] },
  { name: 'Robe of the Archmage', category: 'Tailoring', tier: 6, resources: ['Ethereal Silk', 'Arcane Thread', 'Mana Crystal'] },
  { name: 'Elixir of Immortality', category: 'Alchemy', tier: 8, resources: ['Phoenix Ash', 'Moonlight Dew', 'Dragon\'s Breath'] },
  { name: 'Bow of the Wind Spirits', category: 'Woodworking', tier: 5, resources: ['Whisperwood', 'Zephyr Feather', 'Storm Essence'] },
  { name: 'Amulet of the Ancients', category: 'Jewelcrafting', tier: 7, resources: ['Timeless Gem', 'Eternity Chain', 'Soul Fragment'] },
  { name: 'Feast of the Gods', category: 'Cooking', tier: 6, resources: ['Ambrosia Fruit', 'Celestial Spice', 'Nectar of Life'] },
  { name: 'Tome of Forbidden Knowledge', category: 'Inscription', tier: 8, resources: ['Shadowink', 'Astral Parchment', 'Eldritch Rune'] },
  { name: 'Plate of the Titan', category: 'Blacksmithing', tier: 6, resources: ['Adamantite Ore', 'Giant\'s Blood', 'Mountain Heart'] },
  { name: 'Cloak of Shadows', category: 'Tailoring', tier: 5, resources: ['Nightweave Cloth', 'Shadow Essence', 'Void Thread'] },
  { name: 'Staff of the Elements', category: 'Woodworking', tier: 7, resources: ['World Tree Wood', 'Elemental Core', 'Philosopher\'s Stone'] },
]

const RELICS = [
  'Ancient Starmap', 'Cosmic Keystone', 'Ethereal Hourglass', 'Phoenix Feather', 'Dragon Scale',
  'Mermaid\'s Tear', 'Titan\'s Fingerbone', 'Unicorn Horn', 'Fairy Dust', 'Demon\'s Heart'
]

const getTierColor = (tier: number) => {
  switch(tier) {
    case 0: return 'bg-gray-500 text-white'
    case 1: return 'bg-green-500 text-white'
    case 2: return 'bg-blue-500 text-white'
    case 3: return 'bg-purple-500 text-white'
    case 4: return 'bg-orange-500 text-white'
    case 5: return 'bg-red-500 text-white'
    case 6: return 'bg-pink-500 text-white'
    case 7: return 'bg-yellow-500 text-black'
    default: return 'bg-gray-500 text-white'
  }
}

export function CraftingPageComponent() {
  const [activeTable, setActiveTable] = useState(CRAFTING_TABLES[0].name)
  const [craftingProgress, setCraftingProgress] = useState(0)
  const [craftingItem, setCraftingItem] = useState(null)
  const [inventory, setInventory] = useState({})
  const [relics, setRelics] = useState({})

  useEffect(() => {
    // Initialize inventory and relics
    const initInventory = {}
    ITEMS.forEach(item => {
      item.resources.forEach(resource => {
        initInventory[resource] = Math.floor(Math.random() * 10)
      })
    })
    setInventory(initInventory)

    const initRelics = {}
    RELICS.forEach(relic => {
      initRelics[relic] = Math.floor(Math.random() * 3)
    })
    setRelics(initRelics)
  }, [])

  const handleCraft = (item) => {
    if (canCraft(item)) {
      setCraftingItem(item)
      setCraftingProgress(0)
      const interval = setInterval(() => {
        setCraftingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            completeCrafting(item)
            return 100
          }
          return prev + 10
        })
      }, 500)
    } else {
      alert('Not enough resources to craft this item!')
    }
  }

  const canCraft = (item) => {
    return item.resources.every(resource => inventory[resource] > 0) && Object.values(relics).some(count => count > 0)
  }

  const completeCrafting = (item) => {
    const newInventory = { ...inventory }
    item.resources.forEach(resource => {
      newInventory[resource]--
    })
    const usedRelic = Object.keys(relics).find(relic => relics[relic] > 0)
    const newRelics = { ...relics }
    newRelics[usedRelic]--
    setInventory(newInventory)
    setRelics(newRelics)
    setCraftingItem(null)
    alert(`You have crafted: ${item.name}!`)
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Master Crafting Workshop
      </h1>
      <Tabs value={activeTable} onValueChange={setActiveTable} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 bg-gray-800">
          {CRAFTING_TABLES.map((table) => (
            <TabsTrigger key={table.name} value={table.name} className="flex items-center justify-center">
              {table.icon}
              <span className="ml-2 hidden md:inline">{table.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {CRAFTING_TABLES.map((table) => (
          <TabsContent key={table.name} value={table.name}>
            <Card className="bg-gray-800 border-purple-700">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  {table.icon}
                  <span className="ml-2">{table.name}</span>
                </CardTitle>
                <CardDescription className="text-gray-400">Craft legendary items and equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Available Recipes</h3>
                    <ScrollArea className="h-[300px] rounded-md border border-purple-700 p-4">
                      {ITEMS.filter(item => item.category === table.name).map((item) => (
                        <div key={item.name} className="mb-4 p-2 bg-gray-700 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold">{item.name}</span>
                            <Badge className={getTierColor(item.tier)}>
                              {TIERS[item.tier]}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-400 mb-2">
                            Resources: {item.resources.join(', ')}
                          </div>
                          <Button
                            onClick={() => handleCraft(item)}
                            className="w-full bg-purple-600 hover:bg-purple-700"
                            disabled={!canCraft(item)}
                          >
                            Craft
                          </Button>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Crafting Progress</h3>
                    {craftingItem && (
                      <div className="space-y-2">
                        <p>Crafting: {craftingItem.name}</p>
                        <Progress value={craftingProgress} className="w-full" />
                        <p className="text-sm text-gray-400">{craftingProgress}% Complete</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <Card className="bg-gray-800 border-purple-700">
          <CardHeader>
            <CardTitle className="text-purple-400">Resources</CardTitle>
            <CardDescription className="text-gray-400">Your crafting materials</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(inventory).map(([resource, count]) => (
                  <div key={resource} className="bg-gray-700 p-2 rounded-lg">
                    <h4 className="font-semibold">{resource}</h4>
                    <p className="text-xl font-bold">{count}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-purple-700">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center">
              <Star className="w-6 h-6 mr-2" />
              Relics
            </CardTitle>
            <CardDescription className="text-gray-400">Rare items to enhance your crafting</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(relics).map(([relic, count]) => (
                  <div key={relic} className="bg-gray-700 p-2 rounded-lg">
                    <h4 className="font-semibold">{relic}</h4>
                    <p className="text-xl font-bold">{count}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
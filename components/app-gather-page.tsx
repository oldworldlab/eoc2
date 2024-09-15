'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Axe, Pickaxe, Fish, Beaker, Trees, Mountain, Leaf } from 'lucide-react'

const GATHERING_TYPES = [
  { name: 'Woodcutting', icon: <Trees className="w-6 h-6" />, materials: ['Oak Log', 'Pine Log', 'Maple Log', 'Yew Log'] },
  { name: 'Mining', icon: <Mountain className="w-6 h-6" />, materials: ['Copper Ore', 'Iron Ore', 'Silver Ore', 'Gold Ore'] },
  { name: 'Fishing', icon: <Fish className="w-6 h-6" />, materials: ['Trout', 'Salmon', 'Tuna', 'Swordfish'] },
  { name: 'Herbalism', icon: <Leaf className="w-6 h-6" />, materials: ['Lavender', 'Sage', 'Thyme', 'Mandrake'] },
  { name: 'Alchemy', icon: <Beaker className="w-6 h-6" />, materials: ['Herbs', 'Magical Essence'] },
]

export function Page() {
  const [activeGathering, setActiveGathering] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [inventory, setInventory] = useState<Record<string, number>>({})

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (activeGathering) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval)
            gatherMaterial(activeGathering)
            return 0
          }
          return prevProgress + 10
        })
      }, 500)
    }
    return () => clearInterval(interval)
  }, [activeGathering])

  useEffect(() => {
    const initInventory: { [key: string]: number } = {}
    GATHERING_TYPES.forEach((type) => {
      type.materials.forEach((material) => {
        initInventory[material] = Math.floor(Math.random() * 10)
      })
    })
    setInventory(initInventory)
  }, [])

  const startGathering = (type: string) => {
    setActiveGathering(type)
    setProgress(0)
  }

  const gatherMaterial = (type: string) => {
    const materials = GATHERING_TYPES.find(t => t.name === type)?.materials || []
    const gatheredMaterial = materials[Math.floor(Math.random() * materials.length)]
    setInventory(prev => ({
      ...prev,
      [gatheredMaterial]: (prev[gatheredMaterial] || 0) + 1
    }))
    // In a real application, you would send a transaction to the blockchain here
    console.log(`Gathered ${gatheredMaterial}. This would be recorded on the blockchain.`)
  }

  const getGatheringIcon = (type: string) => {
    switch (type) {
      case 'Woodcutting': return <Axe className="w-6 h-6" />
      case 'Mining': return <Pickaxe className="w-6 h-6" />
      case 'Fishing': return <Fish className="w-6 h-6" />
      case 'Herbalism': return <Leaf className="w-6 h-6" />
      case 'Alchemy': return <Beaker className="w-6 h-6" />
      default: return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Gathering Grounds</h1>
      <Tabs defaultValue={GATHERING_TYPES[0].name} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          {GATHERING_TYPES.map((type) => (
            <TabsTrigger key={type.name} value={type.name} className="text-gray-300 data-[state=active]:bg-purple-700 data-[state=active]:text-white">
              {type.icon}
              <span className="ml-2 hidden sm:inline">{type.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {GATHERING_TYPES.map((type) => (
          <TabsContent key={type.name} value={type.name}>
            <Card className="bg-gray-800 border-purple-700">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  {getGatheringIcon(type.name)}
                  <span className="ml-2">{type.name}</span>
                </CardTitle>
                <CardDescription className="text-gray-400">Gather valuable resources from the land</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Available Materials:</span>
                    <div className="flex flex-wrap gap-2">
                      {type.materials.map((material) => (
                        <Badge key={material} variant="secondary" className="bg-purple-700 text-white">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {activeGathering === type.name && (
                    <div>
                      <Progress value={progress} className="w-full" />
                      <p className="text-sm text-gray-400 mt-2 text-center">{progress}% Complete</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => startGathering(type.name)}
                  disabled={!!activeGathering && activeGathering !== type.name}
                  className="w-full bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-600"
                >
                  {activeGathering === type.name ? 'Gathering...' : 'Start Gathering'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      <Card className="mt-8 bg-gray-800 border-purple-700">
        <CardHeader>
          <CardTitle className="text-purple-400">Your Inventory</CardTitle>
          <CardDescription className="text-gray-400">Resources you&apos;ve gathered</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(inventory).map(([item, count]) => (
              <div key={item} className="text-center">
                <p className="text-lg font-semibold text-purple-400">{item}</p>
                <p className="text-2xl font-bold text-white">{count}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
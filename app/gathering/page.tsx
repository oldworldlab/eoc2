'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Axe, Pickaxe, Scissors, Beaker, Trees, Mountain, Droplet, Leaf } from 'lucide-react'

import { DataService, GatheringResource } from '@/services/data-service'

type GatheringMethod = 'Mining' | 'Woodcutting' | 'Harvesting' | 'Skinning' | 'Alchemy'

const GATHERING_TYPES: { name: GatheringMethod; icon: React.ReactNode }[] = [
  { name: 'Mining', icon: <Pickaxe className="w-6 h-6" /> },
  { name: 'Woodcutting', icon: <Trees className="w-6 h-6" /> },
  { name: 'Harvesting', icon: <Leaf className="w-6 h-6" /> },
  { name: 'Skinning', icon: <Scissors className="w-6 h-6" /> },
  { name: 'Alchemy', icon: <Beaker className="w-6 h-6" /> },
]

export default function Gather() {
  const [activeGathering, setActiveGathering] = useState<GatheringMethod | null>(null)
  const [progress, setProgress] = useState(0)
  const [inventory, setInventory] = useState<Record<string, number>>({})
  const [gatheringResources, setGatheringResources] = useState<GatheringResource[]>([])

  useEffect(() => {
    // Fetch gathering resources from the DataService
    const resources = DataService.getGatheringResources()
    setGatheringResources(resources)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (activeGathering) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            if (interval) clearInterval(interval)
            gatherMaterial(activeGathering)
            return 0
          }
          return prevProgress + 10
        })
      }, 500)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [activeGathering])

  const startGathering = (type: GatheringMethod) => {
    setActiveGathering(type)
    setProgress(0)
  }

  const gatherMaterial = (type: GatheringMethod) => {
    const availableResources = gatheringResources.filter(r => r.gatheringMethod === type)
    if (availableResources.length > 0) {
      const gatheredResource = availableResources[Math.floor(Math.random() * availableResources.length)]
      setInventory(prev => ({
        ...prev,
        [gatheredResource.resourceName]: (prev[gatheredResource.resourceName] || 0) + 1
      }))
      console.log(`Gathered ${gatheredResource.resourceName}. This would be recorded on the blockchain.`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Gathering Grounds</h1>
      <Tabs defaultValue={GATHERING_TYPES[0].name} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800">
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
                  {type.icon}
                  <span className="ml-2">{type.name}</span>
                </CardTitle>
                <CardDescription className="text-gray-400">Gather valuable resources from the land</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Available Resources:</span>
                    <div className="flex flex-wrap gap-2">
                      {gatheringResources
                        .filter(resource => resource.gatheringMethod === type.name)
                        .map((resource) => (
                          <Badge key={resource.resourceName} variant="secondary" className="bg-purple-700 text-white">
                            {resource.resourceName}
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
          <CardDescription className="text-gray-400">Resources you've gathered</CardDescription>
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
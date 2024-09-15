'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Axe, Pickaxe, Scissors, Beaker, Trees, Mountain, Droplet, Leaf } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

import { ItemTier } from '@/constants/item-tiers'
import { GatheringMethod } from '@/types/gathering-methods'

const darkFantasyStyles = {
  background: "bg-gray-900",
  text: "text-gray-300",
  heading: "text-gray-100",
  accent: "text-yellow-500",
  accentHover: "hover:text-yellow-400",
  button: "bg-gray-800 hover:bg-gray-700 text-yellow-500 border border-yellow-500",
  card: "bg-gray-800 border border-gray-700",
  glowBorder: "border border-yellow-500 shadow-lg shadow-yellow-500/50",
}

interface GatheringResource {
  id: number;
  resourceName: string;
  gatheringMethod: GatheringMethod;
  locations: string[];
  tier: ItemTier;
  baseGatherRate: number;
}

const GATHERING_TYPES: { name: GatheringMethod; icon: React.ReactNode }[] = [
  { name: GatheringMethod.Mining, icon: <Pickaxe className="w-6 h-6" /> },
  { name: GatheringMethod.Woodcutting, icon: <Trees className="w-6 h-6" /> },
  { name: GatheringMethod.Harvesting, icon: <Leaf className="w-6 h-6" /> },
  { name: GatheringMethod.Skinning, icon: <Scissors className="w-6 h-6" /> },
  { name: GatheringMethod.Alchemy, icon: <Beaker className="w-6 h-6" /> },
]

const TIERS = Object.values(ItemTier).filter((value): value is ItemTier => typeof value === 'string')

export default function Gather() {
  const [activeGathering, setActiveGathering] = useState<GatheringMethod | null>(null)
  const [progress, setProgress] = useState(0)
  const [inventory, setInventory] = useState<Record<string, number>>({})
  const [gatheringResources, setGatheringResources] = useState<GatheringResource[]>([])
  const [activeTab, setActiveTab] = useState<GatheringMethod>(GATHERING_TYPES[0].name)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await fetch('/api/gathering');
        const data = await response.json();
        if (Array.isArray(data.resources)) {
          setGatheringResources(data.resources);
        } else {
          console.error('Unexpected data format:', data);
          setGatheringResources([]);
        }
      } catch (error) {
        console.error('Error fetching gathering resources:', error);
        setGatheringResources([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchResources();
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

  useEffect(() => {
    setActiveGathering(null)
    setProgress(0)
  }, [activeTab])

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
    setActiveGathering(null)
  }

  const getTierColor = (tier: ItemTier) => {
    switch (tier) {
      case ItemTier.Tier1: return 'bg-gray-700 text-gray-300'
      case ItemTier.Tier2: return 'bg-gray-600 text-teal-300'
      case ItemTier.Tier3: return 'bg-gray-500 text-blue-300'
      case ItemTier.Tier4: return 'bg-gray-400 text-purple-300'
      case ItemTier.Tier5: return 'bg-gray-300 text-yellow-500'
      case ItemTier.Tier6: return 'bg-gray-200 text-pink-500'
      case ItemTier.Tier7: return 'bg-gray-100 text-indigo-500'
      case ItemTier.Tier8: return 'bg-white text-cyan-500'
      default: return 'bg-gray-700 text-gray-300'
    }
  }

  if (isLoading) {
    return <div className={`text-center ${darkFantasyStyles.text}`}>Loading gathering resources...</div>
  }

  return (
    <div className={`space-y-8 ${darkFantasyStyles.background} ${darkFantasyStyles.text}`}>
      <div className="text-center">
        <h1 className={`text-4xl font-bold mb-4 ${darkFantasyStyles.heading}`}>
          Gathering Grounds
        </h1>
        <p className="text-xl mb-8">Harvest resources from the mystical lands of our realm</p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as GatheringMethod)} className="w-full">
        <TabsList className={`grid w-full grid-cols-5 ${darkFantasyStyles.card} ${darkFantasyStyles.glowBorder}`}>
          {GATHERING_TYPES.map((type) => (
            <TabsTrigger 
              key={type.name} 
              value={type.name} 
              className={`${darkFantasyStyles.text} ${darkFantasyStyles.accentHover} transition-colors`}
            >
              {type.icon}
              <span className="ml-2 hidden sm:inline">{type.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {GATHERING_TYPES.map((type) => (
          <TabsContent key={type.name} value={type.name}>
            <Card className={`${darkFantasyStyles.card} ${darkFantasyStyles.glowBorder}`}>
              <CardHeader>
                <CardTitle className={`flex items-center ${darkFantasyStyles.accent}`}>
                  {type.icon}
                  <span className="ml-2">{type.name}</span>
                </CardTitle>
                <CardDescription className={darkFantasyStyles.text}>Gather valuable resources from the land</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={darkFantasyStyles.text}>Available Resources:</span>
                    <ScrollArea className={`h-[300px] w-full rounded-md ${darkFantasyStyles.card} p-4`}>
                      {TIERS.map((tier) => {
                        const resources = gatheringResources.filter(
                          resource => resource.gatheringMethod === type.name && resource.tier === tier
                        )
                        if (resources.length === 0) return null
                        return (
                          <div key={tier} className="mb-4">
                            <h3 className={`text-lg font-semibold mb-2 ${darkFantasyStyles.accent}`}>{tier} Resources</h3>
                            <div className="flex flex-wrap gap-2">
                              {resources.map((resource) => (
                                <Badge key={resource.resourceName} variant="secondary" className={`${getTierColor(resource.tier)} text-xs`}>
                                  {resource.resourceName}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </ScrollArea>
                  </div>
                  {activeGathering === type.name && (
                    <div>
                      <Progress value={progress} className={`w-full ${darkFantasyStyles.card}`} />
                      <p className={`text-sm mt-2 text-center ${darkFantasyStyles.text}`}>{progress}% Complete</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => startGathering(type.name)}
                  disabled={!!activeGathering}
                  className={darkFantasyStyles.button}
                >
                  {activeGathering === type.name ? 'Gathering...' : 'Start Gathering'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card className={`${darkFantasyStyles.card} ${darkFantasyStyles.glowBorder}`}>
        <CardHeader>
          <CardTitle className={darkFantasyStyles.accent}>Your Inventory</CardTitle>
          <CardDescription className={darkFantasyStyles.text}>Resources you've gathered</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(inventory).map(([item, count]) => (
              <div key={item} className="text-center">
                <p className={`text-lg font-semibold ${darkFantasyStyles.accent}`}>{item}</p>
                <p className={`text-2xl font-bold ${darkFantasyStyles.heading}`}>{count}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
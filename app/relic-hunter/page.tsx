'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { MapPin, Compass, Key, Star } from 'lucide-react'

const RELIC_TYPES = ['Ancient', 'Elemental', 'Celestial', 'Abyssal', 'Divine']

const RELICS = [
  { name: 'Ancient Starmap', type: 'Ancient' },
  { name: 'Cosmic Keystone', type: 'Elemental' },
  { name: 'Ethereal Hourglass', type: 'Celestial' },
  { name: 'Phoenix Feather', type: 'Abyssal' },
  { name: 'Dragon Scale', type: 'Divine' },
  // Add more relics as needed
]

const getRelicIcon = (type: string) => {
  switch (type) {
    case 'Ancient': return <MapPin className="w-6 h-6" />
    case 'Elemental': return <Compass className="w-6 h-6" />
    case 'Celestial': return <Star className="w-6 h-6" />
    case 'Abyssal': return <Key className="w-6 h-6" />
    case 'Divine': return <Star className="w-6 h-6" />
    default: return null
  }
}

export default function RelicHunterPage() {
  const [activeTab, setActiveTab] = useState(RELIC_TYPES[0])
  const [progress, setProgress] = useState(0)
  const [relics, setRelics] = useState<Record<string, number>>({})
  const [currentRelic, setCurrentRelic] = useState<string | null>(null)

  useEffect(() => {
    // Initialize relics
    const initRelics: Record<string, number> = {}
    RELICS.forEach(relic => {
      initRelics[relic.name] = Math.floor(Math.random() * 3)
    })
    setRelics(initRelics)
  }, [])

  const startHunting = (type: string) => {
    setCurrentRelic(type)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          completeHunting(type)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const completeHunting = (type: string) => {
    const newRelics = { ...relics }
    newRelics[type] = (newRelics[type] || 0) + 1
    setRelics(newRelics)
    setCurrentRelic(null)
    alert(`You have discovered a new relic: ${type}!`)
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Relic Hunter
      </h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800">
          {RELIC_TYPES.map((type) => (
            <TabsTrigger key={type} value={type} className="text-gray-300 data-[state=active]:bg-purple-700 data-[state=active]:text-white">
              {getRelicIcon(type)}
              <span className="ml-2 hidden sm:inline">{type}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {RELIC_TYPES.map((type) => (
          <TabsContent key={type} value={type}>
            <Card className="bg-gray-800 border-purple-700">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  {getRelicIcon(type)}
                  <span className="ml-2">{type} Relics</span>
                </CardTitle>
                <CardDescription className="text-gray-400">Hunt for {type} relics and uncover their secrets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Available Relics:</span>
                    <div className="flex flex-wrap gap-2">
                      {RELICS.filter(relic => relic.type === type).map((relic) => (
                        <Badge key={relic.name} variant="secondary" className="bg-purple-700 text-white">
                          {relic.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {currentRelic === type && (
                    <div>
                      <Progress value={progress} className="w-full" />
                      <p className="text-sm text-gray-400 mt-2 text-center">{progress}% Complete</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => startHunting(type)}
                  disabled={!!currentRelic && currentRelic !== type}
                  className="w-full bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-600"
                >
                  {currentRelic === type ? 'Hunting...' : 'Start Hunting'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      <Card className="mt-8 bg-gray-800 border-purple-700">
        <CardHeader>
          <CardTitle className="text-purple-400">Your Relics</CardTitle>
          <CardDescription className="text-gray-400">Relics you have discovered</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(relics).map(([relic, count]) => (
              <div key={relic} className="text-center">
                <p className="text-lg font-semibold text-purple-400">{relic}</p>
                <p className="text-2xl font-bold text-white">{count}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
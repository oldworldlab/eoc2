'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'

const RELIC_TYPES = ['Ancient', 'Elemental', 'Celestial', 'Abyssal', 'Divine'] as const

type RelicType = typeof RELIC_TYPES[number]

type RelicsInventory = {
  [key in RelicType]: number
}

// This would typically come from a database or API
const mockUserData = {
  energy: 80,
  relics: {
    Ancient: 3,
    Elemental: 2,
    Celestial: 1,
    Abyssal: 0,
    Divine: 1,
  } as RelicsInventory,
}

export function RelicHunterPage() {
  const { energy, relics } = mockUserData

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Relic Hunter</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-gray-800 border-purple-700">
          <CardHeader>
            <CardTitle className="text-purple-400">Hunting Grounds</CardTitle>
            <CardDescription className="text-gray-400">Explore ancient ruins to discover powerful relics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Progress value={energy} className="w-full" />
                <p className="text-sm text-gray-400 mt-2">Energy: {energy}/100</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/relic-hunter/hunt" passHref>
              <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                Start Hunt
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card className="bg-gray-800 border-purple-700">
          <CardHeader>
            <CardTitle className="text-purple-400">Relic Collection</CardTitle>
            <CardDescription className="text-gray-400">Your discovered relics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {RELIC_TYPES.map((type) => (
                <div key={type} className="text-center">
                  <p className="text-lg font-semibold text-purple-400">{type}</p>
                  <p className="text-2xl font-bold text-white">{relics[type]}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8 bg-gray-800 border-purple-700">
        <CardHeader>
          <CardTitle className="text-purple-400">Relic Lore</CardTitle>
          <CardDescription className="text-gray-400">Learn about the mystical relics you can discover</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li><span className="font-semibold text-purple-400">Ancient Relics:</span> Artifacts from long-lost civilizations, imbued with forgotten magic.</li>
            <li><span className="font-semibold text-purple-400">Elemental Relics:</span> Powerful items that harness the forces of nature: fire, water, earth, and air.</li>
            <li><span className="font-semibold text-purple-400">Celestial Relics:</span> Objects blessed by the heavens, carrying the essence of stars and cosmic energy.</li>
            <li><span className="font-semibold text-purple-400">Abyssal Relics:</span> Dark artifacts from the depths of the underworld, holding forbidden knowledge.</li>
            <li><span className="font-semibold text-purple-400">Divine Relics:</span> Sacred items touched by the gods themselves, radiating pure divine energy.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const RELIC_TYPES = ['Ancient Artifact', 'Mystical Gem', 'Legendary Weapon', 'Forgotten Tome', 'Divine Relic']

export function Page() {
  const [isHunting, setIsHunting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [discoveredRelic, setDiscoveredRelic] = useState<string | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isHunting) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval!)
            const randomType = RELIC_TYPES[Math.floor(Math.random() * RELIC_TYPES.length)]
            setDiscoveredRelic(randomType)
            return 100
          }
          return prev + 10
        })
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isHunting])

  const startHunt = () => {
    setIsHunting(true)
    setProgress(0)
    setDiscoveredRelic(null)
  }

  const claimRelic = () => {
    alert(`You've claimed the ${discoveredRelic}!`)
    setIsHunting(false)
    setProgress(0)
    setDiscoveredRelic(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Relic Hunter</h1>
      <Card className="w-full max-w-md mx-auto bg-gray-800 border-purple-700">
        <CardHeader>
          <CardTitle className="text-2xl text-purple-400">Hunt for Relics</CardTitle>
          <CardDescription className="text-gray-400">Discover rare and powerful artifacts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={progress} className="w-full" />
          {discoveredRelic ? (
            <div className="text-center">
              <p className="text-xl font-bold text-purple-400 mb-2">You discovered a {discoveredRelic}!</p>
              <p className="text-gray-300">This relic holds immense power. Will you claim it?</p>
            </div>
          ) : (
            <p className="text-center text-gray-300">
              {isHunting ? 'Searching for relics...' : 'Start a hunt to discover relics'}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {!isHunting && !discoveredRelic && (
            <Button onClick={startHunt} className="bg-purple-600 text-white hover:bg-purple-700">
              Start Hunt
            </Button>
          )}
          {discoveredRelic && (
            <Button onClick={claimRelic} className="bg-green-600 text-white hover:bg-green-700">
              Claim Relic
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
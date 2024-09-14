'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sword, Shield, Beaker, Coins } from 'lucide-react'
import Image from 'next/image'

export function Page() {
  const featuredItems = [
    { id: 1, name: 'Excalibur', type: 'Weapon', price: 1000, image: '/placeholder.svg?height=100&width=100' },
    { id: 2, name: 'Dragon Scale Armor', type: 'Armor', price: 1500, image: '/placeholder.svg?height=100&width=100' },
    { id: 3, name: 'Elixir of Life', type: 'Potion', price: 500, image: '/placeholder.svg?height=100&width=100' },
  ]

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Welcome to Secret Shop</h1>
        <p className="text-xl mb-6 text-gray-300">Discover, trade, and craft unique in-game items in our Web3-powered marketplace.</p>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          Explore Marketplace
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Featured Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredItems.map((item) => (
            <Card key={item.id} className="bg-gray-800 border-purple-700 overflow-hidden rounded-lg transform transition-all hover:scale-105">
              <CardHeader>
                <CardTitle className="text-purple-400">{item.name}</CardTitle>
                <CardDescription className="text-gray-400">{item.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src={item.image} alt={item.name} width={200} height={200} className="mx-auto mb-4" />
                <Badge variant="secondary" className="bg-purple-700 text-white">
                  <Coins className="mr-1 h-4 w-4" />
                  {item.price} EOC
                </Badge>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-700 hover:text-white">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gray-800 border-purple-700 overflow-hidden rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-400">
                <Sword className="mr-2" /> Marketplace
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Browse and purchase unique in-game items from other players.</p>
            </CardContent>
            <CardFooter>
              <Link href="/marketplace" passHref>
                <Button variant="link" className="text-purple-400 hover:text-purple-300">
                  Explore Marketplace <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card className="bg-gray-800 border-purple-700 overflow-hidden rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-400">
                <Shield className="mr-2" /> Gather Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Play mini-games to gather valuable resources for crafting.</p>
            </CardContent>
            <CardFooter>
              <Link href="/gather" passHref>
                <Button variant="link" className="text-purple-400 hover:text-purple-300">
                  Start Gathering <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card className="bg-gray-800 border-purple-700 overflow-hidden rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-400">
                <Beaker className="mr-2" /> Craft Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Use gathered resources to craft powerful items for sale or use.</p>
            </CardContent>
            <CardFooter>
              <Link href="/crafting" passHref>
                <Button variant="link" className="text-purple-400 hover:text-purple-300">
                  Start Crafting <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  )
}
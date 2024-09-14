'use client'

import React, { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

export function ProfilePage() {
  const [user, setUser] = useState({
    name: 'Aethoria Stormweaver',
    level: 42,
    experience: 7500,
    nextLevelExperience: 10000,
    class: 'Arcane Blacksmith',
    email: 'aethoria@example.com',
    walletAddress: '0x1234...5678',
    balance: 1000,
    buyVolume: 15000,
    sellVolume: 12000,
    portfolioValue: 25000,
    inventoryCount: 87,
    offersMade: 53,
    offersReceived: 41,
    craftingSuccess: 92,
    relicsDiscovered: 15,
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsEditing(false)
  }

  const handleSaveClick = () => {
    setIsEditing(false)
    // Add any save logic here
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Adventurer Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 bg-gray-800 border-purple-700">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-400">Character Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    disabled={!isEditing}
                    className="bg-gray-700 text-white"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="class">Class</Label>
                  <Input id="class" value={user.class} disabled className="bg-gray-700 text-white" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="level">Level</Label>
                  <Input id="level" value={user.level} disabled className="bg-gray-700 text-white" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="experience">Experience</Label>
                  <Progress value={(user.experience / user.nextLevelExperience) * 100} className="w-full" />
                  <p className="text-sm text-gray-400">{user.experience} / {user.nextLevelExperience}</p>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    disabled={!isEditing}
                    className="bg-gray-700 text-white"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="walletAddress">Wallet Address</Label>
                  <Input id="walletAddress" value={user.walletAddress} disabled className="bg-gray-700 text-white" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {isEditing ? (
              <>
                <Button onClick={handleSaveClick} className="bg-purple-600 text-white hover:bg-purple-700">Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="border-purple-500 text-purple-400 hover:bg-purple-700 hover:text-white">Cancel</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-purple-600 text-white hover:bg-purple-700">Edit Profile</Button>
            )}
          </CardFooter>
        </Card>
        <Card className="bg-gray-800 border-purple-700">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-400">Adventurer Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Balance</Label>
                <p className="text-2xl font-bold text-purple-400">{user.balance} EOC</p>
              </div>
              <div>
                <Label>Portfolio Value</Label>
                <p className="text-2xl font-bold text-purple-400">{user.portfolioValue} EOC</p>
              </div>
              <div>
                <Label>Inventory Items</Label>
                <p className="text-2xl font-bold text-purple-400">{user.inventoryCount}</p>
              </div>
              <div>
                <Label>Relics Discovered</Label>
                <p className="text-2xl font-bold text-purple-400">{user.relicsDiscovered}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <Tabs defaultValue="market" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="market" className="text-gray-300 data-[state=active]:bg-purple-700 data-[state=active]:text-white">Market Activity</TabsTrigger>
            <TabsTrigger value="crafting" className="text-gray-300 data-[state=active]:bg-purple-700 data-[state=active]:text-white">Crafting</TabsTrigger>
            <TabsTrigger value="offers" className="text-gray-300 data-[state=active]:bg-purple-700 data-[state=active]:text-white">Offers</TabsTrigger>
            <TabsTrigger value="achievements" className="text-gray-300 data-[state=active]:bg-purple-700 data-[state=active]:text-white">Achievements</TabsTrigger>
          </TabsList>
          <TabsContent value="market">
            <Card className="bg-gray-800 border-purple-700">
              <CardHeader>
                <CardTitle className="text-purple-400">Market Activity</CardTitle>
                <CardDescription>Your trading history and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Buy Volume</Label>
                    <p className="text-xl font-bold text-purple-400">{user.buyVolume} EOC</p>
                  </div>
                  <div>
                    <Label>Sell Volume</Label>
                    <p className="text-xl font-bold text-purple-400">{user.sellVolume} EOC</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="crafting">
            <Card className="bg-gray-800 border-purple-700">
              <CardHeader>
                <CardTitle className="text-purple-400">Crafting Statistics</CardTitle>
                <CardDescription>Your crafting prowess</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <Label>Crafting Success Rate</Label>
                  <p className="text-xl font-bold text-purple-400">{user.craftingSuccess}%</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="offers">
            <Card className="bg-gray-800 border-purple-700">
              <CardHeader>
                <CardTitle className="text-purple-400">Offer Activity</CardTitle>
                <CardDescription>Your marketplace interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Offers Made</Label>
                    <p className="text-xl font-bold text-purple-400">{user.offersMade}</p>
                  </div>
                  <div>
                    <Label>Offers Received</Label>
                    <p className="text-xl font-bold text-purple-400">{user.offersReceived}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="achievements">
            <Card className="bg-gray-800 border-purple-700">
              <CardHeader>
                <CardTitle className="text-purple-400">Achievements</CardTitle>
                <CardDescription>Your heroic deeds and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Master Crafter (Crafted 100 items)</li>
                  <li>Relic Hunter (Discovered 10 rare relics)</li>
                  <li>Market Mogul (Completed 50 trades)</li>
                  <li>Legendary Blacksmith (Crafted a Mythic weapon)</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

const TIERS = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic', 'Divine', 'Transcendent']

export default function CraftingPage() {
  const [selectedTier, setSelectedTier] = useState<number>(1)

  return (
    <div className={`min-h-screen ${darkFantasyStyles.background} ${darkFantasyStyles.text} p-8`}>
      <h1 className={`text-4xl font-bold mb-8 ${darkFantasyStyles.heading}`}>Mystic Forge</h1>
      
      <Card className={`${darkFantasyStyles.card} ${darkFantasyStyles.glowBorder}`}>
        <CardHeader>
          <CardTitle className={darkFantasyStyles.heading}>Crafting</CardTitle>
          <CardDescription>Forge mystical items with your crafting prowess</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="tier-select">Select Tier</Label>
            <Select value={selectedTier.toString()} onValueChange={(value) => setSelectedTier(parseInt(value))}>
              <SelectTrigger id="tier-select" className={darkFantasyStyles.button}>
                <SelectValue placeholder="Select Tier" />
              </SelectTrigger>
              <SelectContent>
                {TIERS.map((tier, index) => (
                  <SelectItem key={tier} value={(index + 1).toString()}>Tier {index + 1}: {tier}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Add more crafting UI elements here */}

        </CardContent>
        <CardFooter>
          <Button className={`w-full ${darkFantasyStyles.button}`}>
            Forge Item
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
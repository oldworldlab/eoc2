'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Hammer, Feather, Beaker, Scissors, Trees, ShieldQuestion, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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

const craftingDisciplines = [
  { name: "Blacksmithing", icon: Hammer },
  { name: "Leatherworking", icon: Scissors },
  { name: "Tailoring", icon: Feather },
  { name: "Woodworking", icon: Trees },
  { name: "Alchemy", icon: Beaker },
  { name: "Enchanting", icon: ShieldQuestion },
]

const tiers = [1, 2, 3, 4, 5, 6, 7, 8]

const mockResources = [
  "Iron Ore", "Leather Scraps", "Silk Thread", "Oak Wood", "Herbs", "Magical Essence",
  "Steel Ingot", "Cured Leather", "Enchanted Fabric", "Elven Wood", "Alchemical Solution", "Arcane Dust"
]

const qualityTiers = [
  { name: "Poor", color: "text-gray-500" },
  { name: "Common", color: "text-white" },
  { name: "Uncommon", color: "text-green-500" },
  { name: "Rare", color: "text-blue-500" },
  { name: "Epic", color: "text-purple-500" },
  { name: "Legendary", color: "text-orange-500" },
  { name: "Masterpiece", color: "text-yellow-500" },
]

interface CraftedItem {
  name: string;
  quality: { name: string; color: string };
  tier: number;
}

export function AdvancedCraftingUi() {
  const [selectedDiscipline, setSelectedDiscipline] = useState(craftingDisciplines[0].name)
  const [selectedTier, setSelectedTier] = useState(1)
  const [selectedResources, setSelectedResources] = useState(["", "", ""])
  const [craftingProgress, setCraftingProgress] = useState(0)
  const [isCrafting, setIsCrafting] = useState(false)
  const [craftedItem, setCraftedItem] = useState<CraftedItem | null>(null)

  const handleResourceChange = (index: number, value: string) => {
    const newResources = [...selectedResources]
    newResources[index] = value
    setSelectedResources(newResources)
  }

  const canCraft = selectedResources.every(resource => resource !== "")

  const craftItem = () => {
    setIsCrafting(true)
    setCraftingProgress(0)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isCrafting) {
      interval = setInterval(() => {
        setCraftingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsCrafting(false)
            const qualityRoll = Math.random()
            let quality
            if (qualityRoll < 0.4) quality = qualityTiers[1] // Common
            else if (qualityRoll < 0.7) quality = qualityTiers[2] // Uncommon
            else if (qualityRoll < 0.85) quality = qualityTiers[3] // Rare
            else if (qualityRoll < 0.95) quality = qualityTiers[4] // Epic
            else if (qualityRoll < 0.99) quality = qualityTiers[5] // Legendary
            else quality = qualityTiers[6] // Masterpiece

            setCraftedItem({
              name: `${quality.name} ${selectedDiscipline} Item`,
              quality: quality,
              tier: selectedTier,
            })
            return 100
          }
          return prev + 2
        })
      }, 50)
    }
    return () => clearInterval(interval)
  }, [isCrafting, selectedDiscipline, selectedTier])

  return (
    <div className={`min-h-screen ${darkFantasyStyles.background} ${darkFantasyStyles.text} p-8`}>
      <h1 className={`text-4xl font-bold mb-8 ${darkFantasyStyles.heading}`}>Mystic Forge</h1>
      
      <Tabs defaultValue={selectedDiscipline} onValueChange={setSelectedDiscipline} className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {craftingDisciplines.map((discipline) => (
            <TabsTrigger
              key={discipline.name}
              value={discipline.name}
              className={`${darkFantasyStyles.card} ${darkFantasyStyles.glowBorder} flex flex-col items-center p-4 space-y-2`}
            >
              <discipline.icon className={`w-8 h-8 ${darkFantasyStyles.accent}`} />
              <span>{discipline.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {craftingDisciplines.map((discipline) => (
          <TabsContent key={discipline.name} value={discipline.name}>
            <Card className={`${darkFantasyStyles.card} ${darkFantasyStyles.glowBorder}`}>
              <CardHeader>
                <CardTitle className={darkFantasyStyles.heading}>{discipline.name} Crafting</CardTitle>
                <CardDescription>Forge mystical items with your {discipline.name.toLowerCase()} prowess</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="tier-select">Select Tier</Label>
                  <Select value={selectedTier.toString()} onValueChange={(value) => setSelectedTier(parseInt(value))}>
                    <SelectTrigger id="tier-select" className={darkFantasyStyles.button}>
                      <SelectValue placeholder="Select Tier" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiers.map((tier) => (
                        <SelectItem key={tier} value={tier.toString()}>Tier {tier}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>Combine Mystical Resources (Select 3)</Label>
                  {[0, 1, 2].map((index) => (
                    <Select
                      key={index}
                      value={selectedResources[index]}
                      onValueChange={(value) => handleResourceChange(index, value)}
                    >
                      <SelectTrigger className={darkFantasyStyles.button}>
                        <SelectValue placeholder={`Select Resource ${index + 1}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {mockResources.map((resource) => (
                          <SelectItem key={resource} value={resource}>{resource}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ))}
                </div>

                <div>
                  <h3 className={`text-xl font-bold mb-2 ${darkFantasyStyles.heading}`}>Crafting Preview</h3>
                  <div className={`${darkFantasyStyles.card} p-4 rounded-lg`}>
                    <p>Discipline: {selectedDiscipline}</p>
                    <p>Tier: {selectedTier}</p>
                    <p>Resources: {selectedResources.filter(r => r).join(", ") || "None selected"}</p>
                  </div>
                </div>

                {isCrafting && (
                  <div className="space-y-2">
                    <Label>Crafting Progress</Label>
                    <Progress value={craftingProgress} className="w-full" />
                  </div>
                )}

                <AnimatePresence>
                  {craftedItem && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`${darkFantasyStyles.card} p-4 rounded-lg text-center`}
                    >
                      <h3 className={`text-xl font-bold mb-2 ${craftedItem.quality.color}`}>
                        {craftedItem.name}
                      </h3>
                      <p>Tier: {craftedItem.tier}</p>
                      <div className="flex justify-center mt-2">
                        {Array.from({ length: qualityTiers.findIndex(q => q.name === craftedItem.quality.name) + 1 }).map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${craftedItem.quality.color}`} fill="currentColor" />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${darkFantasyStyles.button}`} 
                  disabled={!canCraft || isCrafting}
                  onClick={craftItem}
                >
                  {isCrafting ? "Crafting..." : "Forge Item"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-8">
        <h2 className={`text-2xl font-bold mb-4 ${darkFantasyStyles.heading}`}>Arcane Inventory</h2>
        <ScrollArea className={`h-64 ${darkFantasyStyles.card} ${darkFantasyStyles.glowBorder} p-4 rounded-lg`}>
          <div className="space-y-2">
            {mockResources.map((resource) => (
              <div key={resource} className="flex justify-between items-center">
                <span>{resource}</span>
                <span className={darkFantasyStyles.accent}>x{Math.floor(Math.random() * 50) + 1}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
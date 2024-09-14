'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Define a type for the inventory
type Inventory = {
  [key: string]: number;
};

// Define a type for the recipe
interface Recipe {
  tier: string;
  resources: {
    [key: string]: number;
  };
}

// Define a type for the RECIPES object
const RECIPES: { [key: string]: Recipe } = {
  'Iron Sword': { tier: 'Common', resources: { ore: 3, leather: 1 } },
  'Steel Greatsword': { tier: 'Uncommon', resources: { ore: 5, leather: 2, wood: 1 } },
  'Mithril Rapier': { tier: 'Rare', resources: { ore: 7, leather: 3, gem: 1 } },
  'Dragonbone Warhammer': { tier: 'Epic', resources: { bone: 5, leather: 3, gem: 2 } },
  'Stormbreaker Axe': { tier: 'Legendary', resources: { ore: 10, wood: 5, gem: 3, crystal: 1 } },
  'Excalibur': { tier: 'Mythic', resources: { ore: 15, gem: 5, crystal: 3, essence: 1 } },
}

// Add this line to define TIERS
const TIERS = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'];

export function CraftingPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<string | undefined>(undefined);
  const [selectedTier, setSelectedTier] = useState('Common')
  const [inventory, setInventory] = useState<Inventory>({
    ore: 50,
    leather: 30,
    wood: 20,
    gemstone: 5,
    dragonbone: 2,
    stormcrystal: 1,
    holywater: 3,
    ancientrelic: 0,
  })

  const handleRecipeChange = (value: string | undefined) => {
    setSelectedRecipe(value);
  };

  const craftItem = () => {
    if (selectedRecipe && selectedRecipe in RECIPES) {
      const recipe = RECIPES[selectedRecipe as keyof typeof RECIPES];
      setInventory((prev) => {
        const newInventory: Inventory = { ...prev }
        Object.entries(recipe.resources).forEach(([resource, amount]) => {
          if (resource in newInventory) {
            newInventory[resource] -= amount
          }
        })
        return newInventory
      })
      alert(`Successfully crafted ${selectedRecipe}!`)
    } else {
      alert('Please select a valid recipe to craft!')
    }
  }

  const canCraft = (recipe: string): boolean => {
    if (recipe in RECIPES) {
      return Object.entries(RECIPES[recipe as keyof typeof RECIPES].resources).every(
        ([resource, amount]) => resource in inventory && inventory[resource] >= amount
      );
    }
    return false;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Crafting Workshop</h1>
      <Tabs defaultValue="craft" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800">
          <TabsTrigger value="craft" className="text-gray-300 data-[state=active]:bg-purple-700 data-[state=active]:text-white">Craft</TabsTrigger>
          <TabsTrigger value="inventory" className="text-gray-300 data-[state=active]:bg-purple-700 data-[state=active]:text-white">Inventory</TabsTrigger>
        </TabsList>
        <TabsContent value="craft">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gray-800 border-purple-700">
              <CardHeader>
                <CardTitle className="text-purple-400">Crafting Table</CardTitle>
                <CardDescription className="text-gray-400">Select a recipe and craft items</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="tier">Tier</Label>
                  <Select value={selectedTier} onValueChange={setSelectedTier}>
                    <SelectTrigger id="tier" className="w-full bg-gray-700 text-white border-purple-500">
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIERS.map((tier) => (
                        <SelectItem key={tier} value={tier}>{tier}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="recipe">Recipe</Label>
                  <Select value={selectedRecipe} onValueChange={handleRecipeChange}>
                    <SelectTrigger id="recipe" className="w-full bg-gray-700 text-white border-purple-500">
                      <SelectValue placeholder="Select a recipe" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(RECIPES)
                        .filter(([, recipe]) => recipe.tier === selectedTier)
                        .map(([name]) => (
                          <SelectItem key={name} value={name}>{name}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedRecipe && (
                  <div>
                    <h3 className="font-semibold mb-2 text-purple-400">Required Resources:</h3>
                    <ul className="space-y-2 text-gray-300">
                      {Object.entries(RECIPES[selectedRecipe as keyof typeof RECIPES].resources).map(([resource, amount]) => (
                        <li key={resource} className="flex justify-between">
                          <span>{resource}:</span>
                          <span>{amount} (You have: {inventory[resource] || 0})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={craftItem} disabled={!selectedRecipe || !canCraft(selectedRecipe)} className="w-full bg-purple-600 text-white hover:bg-purple-700">
                  Craft Item
                </Button>
              </CardFooter>
            </Card>
            <Card className="bg-gray-800 border-purple-700">
              <CardHeader>
                <CardTitle className="text-purple-400">Crafting Preview</CardTitle>
                <CardDescription className="text-gray-400">See what you&apos;re about to create</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedRecipe ? (
                  <div className="text-center">
                    <Image src="/placeholder.svg" alt={selectedRecipe} width={200} height={200} className="mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-purple-400">{selectedRecipe}</h3>
                    <p className="text-gray-300">{RECIPES[selectedRecipe as keyof typeof RECIPES].tier} Tier</p>
                  </div>
                ) : (
                  <p className="text-gray-400 text-center">Select a recipe to see a preview</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="inventory">
          <Card className="bg-gray-800 border-purple-700">
            <CardHeader>
              <CardTitle className="text-purple-400">Resource Inventory</CardTitle>
              <CardDescription className="text-gray-400">Your available crafting materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(inventory).map(([resource, amount]) => (
                  <div key={resource} className="text-center">
                    <Label className="text-purple-400">{resource}</Label>
                    <Input value={amount} readOnly className="bg-gray-700 text-white text-center" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sword, Shield, Droplet, Gem, Map, User, Scroll } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-purple-900 text-gray-100 flex flex-col">
      <main className="container mx-auto p-8 flex-grow">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-pink-400">
            Welcome to Secret Shop
          </h2>
          <p className="text-xl mb-8 text-gray-300">Discover, trade, and craft unique in-game items in our Web3-powered marketplace.</p>
          <Button className="bg-pink-500 text-gray-900 hover:bg-pink-400">
            Explore Marketplace
          </Button>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-pink-400">Featured Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Excalibur", type: "Weapon", price: 1000, icon: Sword },
              { name: "Dragon Scale Armor", type: "Armor", price: 1500, icon: Shield },
              { name: "Elixir of Life", type: "Potion", price: 500, icon: Droplet },
            ].map((item) => (
              <div key={item.name} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="bg-gray-700 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <item.icon className="w-12 h-12 text-pink-400" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-pink-400">{item.name}</h4>
                <p className="mb-2 text-gray-400">{item.type}</p>
                <p className="text-pink-500 font-bold mb-4">{item.price} EOC</p>
                <Button className="w-full bg-gray-700 hover:bg-gray-600 text-pink-400">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-pink-400">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Marketplace", description: "Browse and purchase unique in-game items from other players.", action: "Explore Marketplace", icon: Sword },
              { title: "Gather Resources", description: "Play mini-games to gather valuable resources for crafting.", action: "Start Gathering", icon: Gem },
              { title: "Craft Items", description: "Use gathered resources to craft powerful items for sale or use.", action: "Start Crafting", icon: Shield },
            ].map((step) => (
              <div key={step.title} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <step.icon className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-4 text-pink-400">{step.title}</h4>
                <p className="mb-6 text-gray-400">{step.description}</p>
                <Button className="w-full bg-gray-700 hover:bg-gray-600 text-pink-400">
                  {step.action}
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-pink-400">Available Quests</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "The Lost Relic", difficulty: "Hard", reward: "5000 Gold", description: "Embark on a perilous journey to recover an ancient artifact from the depths of the Forgotten Caverns." },
              { title: "Dragon's Hoard", difficulty: "Extreme", reward: "10000 Gold", description: "Face the fearsome dragon Ignatius and claim a portion of his legendary treasure." },
              { title: "Enchanted Forest Cleanup", difficulty: "Easy", reward: "1000 Gold", description: "Help the local druids clear the Enchanted Forest of corrupted wildlife and restore balance to nature." },
              { title: "The Alchemist's Request", difficulty: "Medium", reward: "3000 Gold", description: "Gather rare ingredients from across the realm to help the Royal Alchemist create a powerful elixir." },
            ].map((quest) => (
              <div key={quest.title} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-bold mb-2 text-pink-400">{quest.title}</h4>
                <p className="mb-2 text-gray-400">Difficulty: <span className="text-pink-500">{quest.difficulty}</span></p>
                <p className="mb-4 text-gray-400">Reward: <span className="text-yellow-400">{quest.reward}</span></p>
                <p className="mb-6 text-gray-300">{quest.description}</p>
                <Button className="w-full bg-gray-700 hover:bg-gray-600 text-pink-400">
                  Accept Quest
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-3xl font-bold mb-8 text-pink-400">Join the Guild</h3>
          <div className="flex max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="flex-grow bg-gray-800 text-gray-100 border-gray-700 focus:border-pink-500" />
            <Button className="ml-2 bg-pink-500 text-gray-900 hover:bg-pink-400">
              Subscribe
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
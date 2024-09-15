'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronRight, X } from 'lucide-react'

const quests = [
  {
    region: 'Ashenvale',
    quests: [
      { name: 'Culling the Threat', status: 'active' },
      { name: "Raene's Cleansing", status: 'active' },
      { name: 'Kayneth Stillwind', status: 'complete' },
    ]
  },
  {
    region: 'Blackfathom Deeps',
    quests: [
      { name: 'Researching the Corruption', status: 'dungeon' },
    ]
  },
  {
    region: 'Darkshore',
    quests: [
      { name: 'The Tower of Althalaxx', status: 'active' },
    ]
  },
  // Add more regions and quests as needed
]

const selectedQuest = {
  name: 'Culling the Threat',
  description: "Directly to the north of Astranaar are the Thistlefur furbolg. My scouts report that their numbers have grown greatly over the past few months. If they grow too great, they may find the courage to attack Astranaar directly.\n\nKill as many of their kind as you can, but bring me their chieftain's skull as proof that their efforts have been stalled... for now.\n\nI shall remain here in Astranaar and await word from you. Elune be with you.",
  objective: "Dal Bloodclaw's Skull: 0/1",
  reward: "18 silver",
  status: 'active'
}

export default function QuestsPage() {
  const [expandedRegions, setExpandedRegions] = useState<string[]>(['Ashenvale'])
  const [isOpen, setIsOpen] = useState(true)

  const toggleRegion = (region: string) => {
    setExpandedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region)
        : [...prev, region]
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      {isOpen && (
        <div className="w-full max-w-4xl bg-gray-800 border-2 border-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="flex justify-between items-center bg-gradient-to-r from-gray-900 to-gray-800 p-2 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-yellow-500">Quest Log</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-200">
              <X size={20} />
            </button>
          </div>
          <div className="flex h-[600px]">
            <div className="w-1/2 border-r border-gray-700 overflow-y-auto p-2 bg-gray-900">
              {quests.map((region) => (
                <div key={region.region} className="mb-2">
                  <button
                    onClick={() => toggleRegion(region.region)}
                    className="flex items-center w-full text-left text-yellow-500 hover:text-yellow-400"
                  >
                    {expandedRegions.includes(region.region) ? (
                      <ChevronDown size={16} className="mr-1" />
                    ) : (
                      <ChevronRight size={16} className="mr-1" />
                    )}
                    {region.region}
                  </button>
                  {expandedRegions.includes(region.region) && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {region.quests.map((quest) => (
                        <li
                          key={quest.name}
                          className={`text-sm ${
                            quest.status === 'active' ? 'text-green-400' :
                            quest.status === 'complete' ? 'text-gray-400' :
                            'text-yellow-400'
                          }`}
                        >
                          {quest.name}
                          {quest.status === 'dungeon' && ' (Dungeon)'}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <div className="w-1/2 p-4 bg-gradient-to-b from-yellow-900/30 to-gray-900 overflow-y-auto">
              <h3 className="text-2xl font-semibold text-yellow-500 mb-4">{selectedQuest.name}</h3>
              <p className="text-yellow-200 mb-2">{selectedQuest.objective}</p>
              <h4 className="text-lg font-semibold text-yellow-500 mb-2">Description</h4>
              <p className="text-gray-300 mb-4 whitespace-pre-line">{selectedQuest.description}</p>
              <h4 className="text-lg font-semibold text-yellow-500 mb-2">Rewards</h4>
              <p className="text-gray-300">You will receive: {selectedQuest.reward}</p>
            </div>
          </div>
          <div className="bg-gray-900 p-2 border-t border-gray-700 flex justify-between">
            <button className="text-red-500 hover:text-red-400">Abandon Quest</button>
            <button className="text-green-500 hover:text-green-400">Share Quest</button>
          </div>
        </div>
      )}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
        >
          Open Quest Log
        </button>
      )}
    </div>
  )
}
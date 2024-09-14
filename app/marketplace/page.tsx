'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sword, Shield, Beaker, Gem, Coins } from 'lucide-react'

const CATEGORIES = ['Weapons', 'Armor', 'Potions', 'Materials', 'Mounts', 'Pets']
const QUALITY_LEVELS = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary']

const MOCK_ITEMS = [
  { id: 1, name: 'Excalibur', category: 'Weapons', level: 50, quality: 'Legendary', price: 10000, timeLeft: '2d 5h', seller: 'KingArthur' },
  { id: 2, name: 'Dragon Scale Armor', category: 'Armor', level: 45, quality: 'Epic', price: 5000, timeLeft: '1d 12h', seller: 'DragonSlayer99' },
  { id: 3, name: 'Elixir of Life', category: 'Potions', level: 30, quality: 'Rare', price: 1000, timeLeft: '5h 30m', seller: 'Alchemist42' },
  { id: 4, name: 'Mithril Ore', category: 'Materials', level: 1, quality: 'Uncommon', price: 50, timeLeft: '3d', seller: 'MinerDwarf' },
  { id: 5, name: 'Swift Pegasus', category: 'Mounts', level: 40, quality: 'Epic', price: 7500, timeLeft: '6h 15m', seller: 'CloudRider' },
]

const INVENTORY_ITEMS = [
  { id: 101, name: 'Iron Sword', category: 'Weapons', quantity: 1 },
  { id: 102, name: 'Leather Armor', category: 'Armor', quantity: 1 },
  { id: 103, name: 'Health Potion', category: 'Potions', quantity: 5 },
  { id: 104, name: 'Gold Ore', category: 'Materials', quantity: 20 },
]

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState('browse')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All categories')
  const [selectedQuality, setSelectedQuality] = useState('All qualities')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [sortBy, setSortBy] = useState('price-asc')

  const [items, setItems] = useState(MOCK_ITEMS)
  const [inventory, setInventory] = useState(INVENTORY_ITEMS)

  const filteredItems = items.filter(item => 
    (searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'All categories' || item.category === selectedCategory) &&
    (selectedQuality === 'All qualities' || item.quality === selectedQuality) &&
    (item.price >= priceRange[0] && item.price <= priceRange[1])
  ).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    if (sortBy === 'level-asc') return a.level - b.level
    if (sortBy === 'level-desc') return b.level - a.level
    return 0
  })

  const handleBuy = (item) => {
    setItems(items.filter(i => i.id !== item.id))
    setInventory([...inventory, { ...item, quantity: 1 }])
  }

  const handleSell = (item) => {
    setInventory(inventory.filter(i => i.id !== item.id))
    setItems([...items, { ...item, seller: 'You', timeLeft: '7d' }])
  }

  const handleCreateBuyOrder = (details) => {
    console.log('Buy order created:', details)
  }

  const handleCreateSellOrder = (details) => {
    console.log('Sell order created:', details)
  }

  const handleMakeOffer = (item, offerAmount) => {
    console.log(`Offer of ${offerAmount} made for ${item.name}`)
  }

  const handleBid = (item, bidAmount) => {
    console.log(`Bid of ${bidAmount} placed on ${item.name}`)
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Weapons': return <Sword className="w-4 h-4" />
      case 'Armor': return <Shield className="w-4 h-4" />
      case 'Potions': return <Beaker className="w-4 h-4" />
      case 'Materials': return <Gem className="w-4 h-4" />
      default: return <Coins className="w-4 h-4" />
    }
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Marketplace
      </h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="sell">Sell</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        <TabsContent value="browse">
          <Card className="bg-gray-800 border-purple-700">
            <CardHeader>
              <CardTitle className="text-purple-400">Browse Items</CardTitle>
              <CardDescription className="text-gray-400">Explore and purchase items from other players</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 text-white border-purple-500"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px] bg-gray-700 text-white border-purple-500">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All categories">All categories</SelectItem>
                    {CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                  <SelectTrigger className="w-[180px] bg-gray-700 text-white border-purple-500">
                    <SelectValue placeholder="Quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All qualities">All qualities</SelectItem>
                    {QUALITY_LEVELS.map(quality => (
                      <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] bg-gray-700 text-white border-purple-500">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="level-asc">Level: Low to High</SelectItem>
                    <SelectItem value="level-desc">Level: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-2">Price Range</label>
                <Slider
                  min={0}
                  max={10000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>{priceRange[0]} EOC</span>
                  <span>{priceRange[1]} EOC</span>
                </div>
              </div>
              <ScrollArea className="h-[400px] rounded-md border border-purple-700 p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Quality</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Time Left</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map(item => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {getCategoryIcon(item.category)}
                            <span className="ml-2">{item.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{item.level}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`bg-${item.quality.toLowerCase()}-900 text-${item.quality.toLowerCase()}-200`}>
                            {item.quality}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.price} EOC</TableCell>
                        <TableCell>{item.timeLeft}</TableCell>
                        <TableCell>{item.seller}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">Buy</Button>
                              </DialogTrigger>
                              <DialogContent className="bg-gray-800 text-white">
                                <DialogHeader>
                                  <DialogTitle>Buy {item.name}</DialogTitle>
                                  <DialogDescription>Are you sure you want to buy this item?</DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button onClick={() => handleBuy(item)}>Confirm Purchase</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">Offer</Button>
                              </DialogTrigger>
                              <DialogContent className="bg-gray-800 text-white">
                                <DialogHeader>
                                  <DialogTitle>Make an Offer for {item.name}</DialogTitle>
                                  <DialogDescription>Enter your offer amount:</DialogDescription>
                                </DialogHeader>
                                <Input type="number" placeholder="Offer amount" className="bg-gray-700 text-white" />
                                <DialogFooter>
                                  <Button onClick={() => handleMakeOffer(item, 0)}>Submit Offer</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">Bid</Button>
                              </DialogTrigger>
                              <DialogContent className="bg-gray-800 text-white">
                                <DialogHeader>
                                  <DialogTitle>Place a Bid on {item.name}</DialogTitle>
                                  <DialogDescription>Enter your bid amount:</DialogDescription>
                                </DialogHeader>
                                <Input type="number" placeholder="Bid amount" className="bg-gray-700 text-white" />
                                <DialogFooter>
                                  <Button onClick={() => handleBid(item, 0)}>Place Bid</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sell">
          <Card className="bg-gray-800 border-purple-700">
            <CardHeader>
              <CardTitle className="text-purple-400">Sell Items</CardTitle>
              <CardDescription className="text-gray-400">List your items for sale on the marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] rounded-md border border-purple-700 p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventory.map(item => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {getCategoryIcon(item.category)}
                            <span className="ml-2">{item.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">Sell</Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-800 text-white">
                              <DialogHeader>
                                <DialogTitle>Sell {item.name}</DialogTitle>
                                <DialogDescription>Set your selling price and duration:</DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label htmlFor="price" className="text-right">Price:</label>
                                  <Input id="price" type="number" className="col-span-3 bg-gray-700 text-white" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label htmlFor="duration" className="text-right">Duration:</label>
                                  <Select>
                                    <SelectTrigger className="col-span-3 bg-gray-700 text-white">
                                      <SelectValue placeholder="Select duration" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="12h">12 hours</SelectItem>
                                      <SelectItem value="1d">1 day</SelectItem>
                                      <SelectItem value="3d">3 days</SelectItem>
                                      <SelectItem value="7d">7 days</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button onClick={() => handleSell(item)}>List Item</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
          <Card className="bg-gray-800 border-purple-700">
            <CardHeader>
              <CardTitle className="text-purple-400">Market Orders</CardTitle>
              <CardDescription className="text-gray-400">Manage your buy and sell orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="buy-orders">
                <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                  <TabsTrigger value="buy-orders">Buy Orders</TabsTrigger>
                  <TabsTrigger value="sell-orders">Sell Orders</TabsTrigger>
                </TabsList>
                <TabsContent value="buy-orders">
                  <ScrollArea className="h-[300px] rounded-md border border-purple-700 p-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Simulated buy orders would go here */}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                  <Button className="mt-4" onClick={() => handleCreateBuyOrder({})}>Create Buy Order</Button>
                </TabsContent>
                <TabsContent value="sell-orders">
                  <ScrollArea className="h-[300px] rounded-md border border-purple-700 p-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Simulated sell orders would go here */}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                  <Button className="mt-4" onClick={() => handleCreateSellOrder({})}>Create Sell Order</Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inventory">
          <Card className="bg-gray-800 border-purple-700">
            <CardHeader>
              <CardTitle className="text-purple-400">Your Inventory</CardTitle>
              <CardDescription className="text-gray-400">Manage your items and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] rounded-md border border-purple-700 p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {inventory.map(item => (
                    <Card key={item.id} className="bg-gray-700 border-purple-600">
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm text-purple-300">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex justify-between items-center">
                          {getCategoryIcon(item.category)}
                          <Badge variant="outline" className="bg-purple-900 text-purple-200">
                            x{item.quantity}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
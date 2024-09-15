'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from '@/components/ui/card'
import Image from "next/image"
import { darkFantasyStyles } from '@/components/DarkFantasyLayout'

export default function HomePage() {
  return (
    <div className={`${darkFantasyStyles.background} ${darkFantasyStyles.text}`}>
      <section className="text-center mb-16">
        <h1 className={`text-5xl font-bold mb-4 ${darkFantasyStyles.heading}`}>
          Welcome to the Secret Shop
        </h1>
        <p className="text-xl mb-8">Uncover legendary items in our mystical marketplace.</p>
        <Button className={darkFantasyStyles.button}>
          Begin Your Quest
        </Button>
      </section>

      <section className="mb-16">
        <h2 className={`text-3xl font-bold mb-8 ${darkFantasyStyles.heading}`}>Explore</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Gather", description: "Collect rare resources", image: "parallelao_a_bustling_marketplace_in_an_mmorpg_where_many_diffe_4337648c-6134-4140-83e8-7205c0c4ed94-QcruRQJlGSCHGjCg66cb7MQzNiA2NZ.png" },
            { name: "Crafting", description: "Create powerful items", image: "parallelao_Create_an_icon_for_crafting_in_a_dark_fantasy_style._3aa7cc3c-c6c9-404b-9a9f-20d52da825be-canDAiKR3HX7ewGoYcT50m6mtKBpeh.png" },
            { name: "Relics", description: "Discover ancient artifacts", image: "parallelao_a_bustling_crafting_center_in_an_mmorpg_where_many_d_cee1ff27-8626-4a14-8bbf-826d944f15ae-X8QSgbRs5cojaZbMlXIFApox9e21zt.png" },
            { name: "Quests", description: "Embark on epic adventures", image: "parallelao_a_bustling_city_center_in_an_mmorpg_where_many_diffe_4ba298c2-cadf-40b3-82a8-8f57c876ae85-rY7gbhLFlZAQSnHUyW6Pj64yvXJLcR.png" },
          ].map((item) => (
            <Card key={item.name} className={`${darkFantasyStyles.card} ${darkFantasyStyles.glowBorder}`}>
              <CardContent className="p-6">
                <Image
                  src={`https://hebbkx1anhila5yf.public.blob.vercel-storage.com/${item.image}`}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className={`text-xl font-bold mb-2 ${darkFantasyStyles.heading}`}>{item.name}</h3>
                <p className="mb-4">{item.description}</p>
                <Button className={darkFantasyStyles.button}>
                  Explore {item.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
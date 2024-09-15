import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Gem, Sword, Map, Shield, Scroll, User } from 'lucide-react';
import Image from "next/image";

export const darkFantasyStyles = {
  background: "bg-gray-900",
  text: "text-gray-300",
  heading: "text-gray-100",
  accent: "text-yellow-500",
  accentHover: "hover:text-yellow-400",
  button: "bg-gray-800 hover:bg-gray-700 text-yellow-500 border border-yellow-500",
  card: "bg-gray-800 border border-gray-700",
  glowBorder: "border border-yellow-500 shadow-lg shadow-yellow-500/50",
};

interface DarkFantasyLayoutProps {
  children: React.ReactNode;
}

export default function DarkFantasyLayout({ children }: DarkFantasyLayoutProps) {
  return (
    <div className={`min-h-screen ${darkFantasyStyles.background} ${darkFantasyStyles.text} flex flex-col`}>
      <header className={`p-4 flex justify-between items-center bg-black bg-opacity-50 backdrop-blur-md sticky top-0 z-10 ${darkFantasyStyles.glowBorder}`}>
        <Link href="/">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/parallelao_secret_shop_logo_with_transparent_background_for_web_7a100720-0f57-43e0-99fb-19005bc2f0f7-removebg-preview-ra5HtqZGEFU2MOJwZGdUF9ocEosI5c.png"
            alt="Secret Shop Logo"
            width={80}
            height={80}
            className="mr-2"
          />
        </Link>
        <nav className="space-x-4">
          {[
            { name: "Home", icon: <Gem className="w-4 h-4" />, href: "/" },
            { name: "Marketplace", icon: <Sword className="w-4 h-4" />, href: "/marketplace" },
            { name: "Gather", icon: <Map className="w-4 h-4" />, href: "/gathering" },
            { name: "Crafting", icon: <Shield className="w-4 h-4" />, href: "/crafting" },
            { name: "Relics", icon: <Scroll className="w-4 h-4" />, href: "/relic-hunter" },
            { name: "Quests", icon: <Scroll className="w-4 h-4" />, href: "/quests" },
            { name: "Profile", icon: <User className="w-4 h-4" />, href: "/profile" },
          ].map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={`${darkFantasyStyles.text} ${darkFantasyStyles.accentHover} transition-all duration-300`}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Button>
            </Link>
          ))}
        </nav>
        <Button variant="outline" className={darkFantasyStyles.button}>
          Connect Wallet
        </Button>
      </header>

      <main className="container mx-auto p-8 flex-grow">
        {children}
      </main>

      <footer className={`bg-black bg-opacity-50 text-gray-400 py-8 ${darkFantasyStyles.glowBorder}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className={`text-xl font-bold mb-4 ${darkFantasyStyles.heading}`}>Secret Shop</h4>
              <p>Your mystical marketplace for legendary items and rare artifacts.</p>
            </div>
            <div>
              <h4 className={`text-xl font-bold mb-4 ${darkFantasyStyles.heading}`}>Quick Links</h4>
              <ul className="space-y-2">
                {["About Us", "Terms of Service", "Privacy Policy", "Contact Us"].map((item) => (
                  <li key={item}>
                    <a href="#" className={`${darkFantasyStyles.accentHover} transition-colors duration-300`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className={`text-xl font-bold mb-4 ${darkFantasyStyles.heading}`}>Community</h4>
              <ul className="space-y-2">
                {["Guild Hall", "Adventurers' Discord", "Lore Compendium", "Support"].map((item) => (
                  <li key={item}>
                    <a href="#" className={`${darkFantasyStyles.accentHover} transition-colors duration-300`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className={`text-xl font-bold mb-4 ${darkFantasyStyles.heading}`}>Follow the Quest</h4>
              <div className="flex space-x-4">
                {["Facebook", "Twitter", "Instagram", "Youtube"].map((item) => (
                  <a key={item} href="#" className={`${darkFantasyStyles.text} ${darkFantasyStyles.accentHover} transition-colors duration-300`}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; 2024 Secret Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
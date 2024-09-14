'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4 text-gray-100">Secret Shop</h4>
            <p>Your mystical marketplace for legendary items and rare artifacts.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4 text-gray-100">Quick Links</h4>
            <ul className="space-y-2">
              {["About Us", "Terms of Service", "Privacy Policy", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-pink-400 transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4 text-gray-100">Community</h4>
            <ul className="space-y-2">
              {["Guild Hall", "Adventurers' Discord", "Lore Compendium", "Support"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-pink-400 transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4 text-gray-100">Follow the Quest</h4>
            <div className="flex space-x-4">
              {["Facebook", "Twitter", "Instagram", "Youtube"].map((item) => (
                <Link key={item} href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} Secret Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
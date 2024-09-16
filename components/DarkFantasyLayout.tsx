import React from 'react';
import HeaderComponent from './components-header';
import Footer from './Footer';

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
      <HeaderComponent />
      <main className="container mx-auto p-8 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
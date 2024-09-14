/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          900: '#4C1D95',
        },
        pink: {
          400: '#F472B6',
          500: '#EC4899',
        },
        gray: {
          100: '#F3F4F6',
          300: '#D1D5DB',
          400: '#9CA3AF',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
}
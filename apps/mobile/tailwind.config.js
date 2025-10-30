/** @type {import('tailwindcss').Config} */
module.exports = {
  // Use 'class' strategy for dark mode (allows programmatic control)
  darkMode: 'class',
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Wani Brand Colors (Original)
        coral: {
          DEFAULT: '#FB923C',
          light: '#FED7AA',
          deep: '#F97316',
        },
        brown: {
          DEFAULT: '#292524',
          light: '#44403C',
          dark: '#1C1917',
        },
        cream: {
          DEFAULT: '#FFF7ED',
          light: '#FFFBF5',
          dark: '#FFEDD5',
        },
        // Modern Design Colors (Based on reference images)
        mint: {
          DEFAULT: '#9FD4C5',
          light: '#B8E0D5',
          dark: '#8CC4B5',
        },
        aqua: {
          DEFAULT: '#A8D5BA',
          light: '#C5E5D0',
          dark: '#8FBF9F',
        },
        lime: {
          DEFAULT: '#F7F06D',
          light: '#FBF5A0',
          dark: '#E8E05D',
        },
        surface: {
          DEFAULT: '#F5F5F5',
          light: '#FAFAFA',
          dark: '#E8E8E8',
        },
      },
      fontFamily: {
        // Add custom fonts here when available
        sans: ['System'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}

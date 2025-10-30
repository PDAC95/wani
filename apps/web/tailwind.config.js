/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Wani Brand Colors - Orange/Coral Theme
        wani: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          DEFAULT: '#FB923C',
        },
        coral: {
          50: '#FFF5F3',
          100: '#FFE8E3',
          200: '#FFD5CC',
          300: '#FFB8A8',
          400: '#FF9178',
          500: '#FF6B4A',
          600: '#F04E29',
          DEFAULT: '#FF6B4A',
        },
        sunset: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          DEFAULT: '#F59E0B',
        },
        dark: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          DEFAULT: '#18181B',
        },
        cream: {
          50: '#FEFDFB',
          100: '#FBF9F5',
          200: '#F8F4ED',
          300: '#F5EFE5',
          DEFAULT: '#FBF9F5',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(251, 146, 60, 0.3)',
        'glow-lg': '0 0 40px rgba(251, 146, 60, 0.4)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 48px rgba(0, 0, 0, 0.12)',
        'inner-glow': 'inset 0 2px 24px rgba(251, 146, 60, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-wani': 'linear-gradient(135deg, #FB923C 0%, #FF6B4A 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #F59E0B 0%, #FB923C 50%, #FF6B4A 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(251, 146, 60, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(251, 146, 60, 0.6)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

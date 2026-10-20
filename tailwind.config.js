/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        obsidian: '#07090E',
        carbon: '#0D111A',
        slateCard: '#131926',
        cyber: {
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
        },
        volt: {
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        }
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px)",
        'hero-glow': "radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.14), transparent 45%), radial-gradient(circle at 80% 60%, rgba(16, 185, 129, 0.14), transparent 45%)"
      }
    },
  },
  plugins: [],
};

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
        sans: ['Trebuchet MS', 'sans-serif'],
        display: ['Trebuchet MS', 'sans-serif'],
        mono: ['Consolas', 'Liberation Mono', 'monospace'],
      },
      colors: {
        ink: '#123563',
        muted: '#506583',
        line: '#D9E3EF',
        mist: '#EDF3FB',
        obsidian: '#F5F8FD',
        carbon: '#FFFFFF',
        slateCard: '#FFFFFF',
        cyber: {
          400: '#2059AE',
          500: '#174CA0',
          600: '#123D80',
        },
        volt: {
          400: '#806000',
          500: '#F5CF38',
          600: '#D9B321',
        }
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(rgba(23, 76, 160, 0.045) 1px, transparent 1px)",
        'hero-glow': "none"
      }
    },
  },
  plugins: [],
};

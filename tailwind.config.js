/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Lilita One"', 'cursive'],
        body: ['"Nunito"', 'sans-serif'],
      },
      colors: {
        brand: {
          pink: '#FF2E93',
          yellow: '#FFD93D',
          blue: '#4CC9F0',
          purple: '#9B5DE5',
          green: '#6BCB77',
          orange: '#FF8C42',
        },
        ink: '#1B1530',
      },
      boxShadow: {
        // "sticker" shadow khas playful UI
        sticker: '4px 4px 0 0 #1B1530',
        'sticker-sm': '2px 2px 0 0 #1B1530',
        'sticker-lg': '6px 6px 0 0 #1B1530',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        wiggle: {
          '0%,100%': { transform: 'rotate(-6deg)' },
          '50%': { transform: 'rotate(6deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        marquee: 'marquee 20s linear infinite',
        'spin-slow': 'spinSlow 12s linear infinite',
      },
    },
  },
  plugins: [],
}

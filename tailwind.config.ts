import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        black: '#080808',
        surface: '#0d0d0f',
        'surface-2': '#141416',
        border: 'rgba(255,255,255,0.07)',
        'border-hover': 'rgba(255,255,255,0.15)',
        purple: '#7c5cfc',
        'purple-dim': 'rgba(124,92,252,0.15)',
        blue: '#3b82f6',
        'blue-dim': 'rgba(59,130,246,0.12)',
      },
      animation: {
        'grid-move': 'gridMove 20s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        gridMove: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

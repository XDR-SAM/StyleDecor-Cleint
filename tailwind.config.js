/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#ff6b35',
          light: '#ff8c5a',
          dark: '#e55a2b',
        },
        gradient: {
          start: '#ff6b35',
          end: '#ff4757',
        }
      },
      backgroundImage: {
        'gradient-orange-red': 'linear-gradient(135deg, #ff6b35 0%, #ff4757 100%)',
        'gradient-orange-red-hover': 'linear-gradient(135deg, #ff8c5a 0%, #ff6b6b 100%)',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        styledecor: {
          "primary": "#ff6b35",
          "secondary": "#ff8c5a",
          "accent": "#ff6b35",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
      {
        styledecorDark: {
          "primary": "#ff6b35",
          "secondary": "#ff8c5a",
          "accent": "#ff6b35",
          "neutral": "#1f2937",
          "base-100": "#111827",
          "base-200": "#1f2937",
          "base-300": "#374151",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
    darkTheme: "styledecorDark",
  },
}


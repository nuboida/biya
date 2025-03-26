/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1440px"
      }
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          "100": "#17235D",
          "200": "#0D67AA"
        },
        accent: "#FDA813",
        slated: {
         "200": "#F5F4F6",
         "100": "#F9F9F9"
        },
        black: "#000000",
        white: "#FFFFFF",
        disabled: "#959595"
      },
      fontFamily: {
        sans: ['var(--font-darker-grotesque)'],
        mono: ['var(--font-mango-grotesque)']
      }
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

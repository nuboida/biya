import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#062E47",
        activePrimary: "#062E47A1",
        secondary: "#DC157C",
        white: "#FFFFFF",
        black: '#000000',
        green: '#48B346',
        red: '#CE3F3F',
        grey: '#C0C0C0',
        blue: "hsl(203, 68%, 51%)",
        orange: "#F5A623",
      }
    },
    fontFamily: {
      'display': ['ClashDisplay'],
      'Roobert': ['Roobert']
    }
  },
  plugins: [],
};
export default config;

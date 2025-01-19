import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
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
      colors:{
        bgPrimary: "#01140d",
        bgSecondary: "#00ff95",
        grBlue: "#1f4f7d",
        grGreen: "#02462d",
        slideUp: "#02130c"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
  darkMode: 'class',
};
export default config;

import type { Config } from "tailwindcss";
import lineClamp from "@tailwindcss/line-clamp"; // require() 대신 import 사용

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "var(--color-dark)",
        gray: {
          500: "var(--color-gray-500)",
          400: "var(--color-gray-400)",
          300: "var(--color-gray-300)",
          200: "var(--color-gray-200)",
          100: "var(--color-gray-100)",
        },
        white: "var(--color-white)",
        red: "var(--color-red)",
        blue: "var(--color-blue)",
        purple: "var(--color-purple)",
        pink: "var(--color-pink)",
        main: "var(--color-main)",
      },
      fontFamily: {
        baskinBold: ["var(--font-BR-B)"],
      },
    },
  },
  plugins: [lineClamp],
} satisfies Config;

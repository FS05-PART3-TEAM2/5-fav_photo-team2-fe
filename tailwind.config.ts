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
        // CSS 변수로 정의한 색상들을 여기에 추가
        dark: "var(--color-dark)", // #0f0f0f;
        gray: {
          500: "var(--color-gray-500)", // #161616;
          400: "var(--color-gray-400)", // #5a5a5a;
          300: "var(--color-gray-300)", // #a4a4a4;
          200: "var(--color-gray-200)", // #dddddd;
          100: "var(--color-gray-100)", // #eeeeee;
        },
        white: "var(--color-white)", // #ffffff;
        red: "var(--color-red)", // #ff483d;
        blue: "var(--color-blue)", // #29c9f9;
        purple: "var(--color-purple)", // #a77eff;
        pink: "var(--color-pink)", // 예: #ff2a6a;
        main: "var(--color-main)", // 예: #efff04;
      },

      fontFamily: {
        baskinBold: ["var(--font-BR-B)"], // localFont로 설정한 폰트
      },
    },
  },
  plugins: [lineClamp],
} satisfies Config;

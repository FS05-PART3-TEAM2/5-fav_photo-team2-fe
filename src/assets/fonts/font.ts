import localFont from "next/font/local";

export const baskinBold = localFont({
  src: "../assets/fonts/BR-B.woff2",
  display: "swap",
  variable: "--font-BR-B",
  preload: true,
  fallback: ["system-ui", "arial"],
});

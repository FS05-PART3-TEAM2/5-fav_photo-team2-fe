import type { Metadata } from "next";
import "@/styles/globals.css";
import { baskinBold } from "../../public/assets/fonts/font";

export const metadata: Metadata = {
  title: "최애의 포토카드",
  description: "최애의 포토카드를 만들고 거래하세요",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${baskinBold.variable}`}>
      <body className="bg-black">{children}</body>
    </html>
  );
}

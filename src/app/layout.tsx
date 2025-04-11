import type { Metadata } from "next";
import "@/styles/globals.css";
import { baskinBold } from "@/assets/fonts/font";

import { SnackbarAlert } from "@/components/common/snackbar/SnackbarAlert";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthInitializer from "@/components/auth/AuthInitializer";
import Header from "@/components/gnb/Header";
export const metadata: Metadata = {
  title: "최애의 포토카드",
  description: "최애의 포토카드를 만들고 거래하세요",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${baskinBold.variable}`}>
      <body>
        <ReactQueryProvider>
          <AuthInitializer>
            <ReactQueryDevtools initialIsOpen={false} />
            <Header />
            <div className="pt-[60px] md:pt-[70px]">{children}</div>
            {/* 스낵바 팝업 전역 상태로 관리 */}
            <SnackbarAlert />
          </AuthInitializer>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

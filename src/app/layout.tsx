import type { Metadata } from "next";
import "@/styles/globals.css";
import { baskinBold } from "../../public/assets/fonts/font";
import { SnackbarAlert } from "@/components/common/snackbar/SnackbarAlert";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { cookies } from "next/headers";
import axios from "axios";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export const metadata: Metadata = {
  title: "최애의 포토카드",
  description: "최애의 포토카드를 만들고 거래하세요",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookie = await cookies();
  let userInfo = null;
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: {
        cookie: cookie.toString(),
      },
    });
    userInfo = response.data;
  } catch (error) {
    console.log("rootlayout error", error);
  }

  return (
    <html lang="ko" className={`${baskinBold.variable}`}>
      <body>
        <AuthProvider userInfo={userInfo}>
          {/* 스낵바 팝업 전역 상태로 관리 */}
          <ReactQueryProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
            {/* 스낵바 팝업 전역 상태로 관리 */}
            <SnackbarAlert />
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

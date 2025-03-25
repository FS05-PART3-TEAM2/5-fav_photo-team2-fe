import localFont from "next/font/local";

export const baskinBold = localFont({
  src: "../fonts/BR-B.woff2", // 폰트 파일 경로 (올바른 경로 확인 필요)
  display: "swap", // 폰트 로딩 전략
  variable: "--font-BR-B", // CSS 변수로 폰트 사용
});

// src/app/(protected)/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const accessToken = (await cookies()).get("token");

  // 로그인 안 되어 있으면 /login으로 리디렉트
  if (!accessToken) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}

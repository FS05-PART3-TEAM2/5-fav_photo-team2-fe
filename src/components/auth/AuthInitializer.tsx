// src/components/auth/AuthInitializer.tsx
import { cookies } from "next/headers";
import axios from "axios";
import { AuthProvider } from "./AuthProvider";
import { UserInfo } from "@/store/useUserStore";

export default async function AuthInitializer({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const cookie = (await cookieStore).toString();
  let userInfo = null;
  if (cookie) {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
          cookie,
        },
      });

      userInfo = {
        id: res.data.id,
        nickname: res.data.nickname,
        email: res.data.email,
      } as UserInfo;
    } catch (e) {
      console.log("auth init error", e);
    }
  }

  return <AuthProvider userInfo={userInfo}>{children}</AuthProvider>;
}

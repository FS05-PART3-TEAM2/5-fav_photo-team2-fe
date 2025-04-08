// src/components/auth/AuthInitializer.tsx
import { cookies } from "next/headers";
import axios from "axios";
import { AuthProvider } from "./AuthProvider";

export default async function AuthInitializer({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  let userInfo = null;

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: {
        cookie: cookieStore.toString(),
      },
    });
    userInfo = res.data;
  } catch (e) {
    console.log("auth init error", e);
  }

  return <AuthProvider userInfo={userInfo}>{children}</AuthProvider>;
}

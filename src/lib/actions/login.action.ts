"use server";

import { parseSetCookieHeader } from "@/utils/parseSetCookieHeader";
import { cookies } from "next/headers";
import { setCookie } from "cookies-next/server";
import axios, { AxiosError } from "axios";

interface LoginProps {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginProps) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      email,
      password,
    });
    const { message, user } = response.data;

    // 쿠키 헤더 직접 가져오기
    const setCookieHeader = response.headers["set-cookie"]; // string 또는 string[]
    console.log("setCookieHeader: ", setCookieHeader);

    // 쿠키 있는 경우 쿠키 설정
    if (setCookieHeader) {
      const parsed = parseSetCookieHeader(setCookieHeader);
      console.log("parsed: ", parsed);
      const [token, refreshToken] = parsed;
      await setCookie(token.name, token.value, { ...token.options, cookies }); // 브라우저 쿠기 설정
      await setCookie(refreshToken.name, refreshToken.value, { ...refreshToken.options, cookies }); // 브라우저 쿠기 설정

      // await deleteCookie('test1', { cookies }); // 브라우저 쿠기 삭제 (로그아웃 할 때)

      // axiosClient에 Authorization 헤더 설정
      axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;

      console.log(
        "🔐 axiosClient Authorization 설정됨:",
        axios.defaults.headers.common["Authorization"]
      );
    }

    return { status: true, message, user };
  } catch (error) {
    const axiosError = error as AxiosError<{ error?: string }>;
    const message = axiosError.response?.data?.error || "로그인 실패";
    return { status: false, message, user: null };
  }
};

export default async function loginAction(_: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      status: false,
      message: "이메일과 비밀번호를 입력해주세요.",
      user: null,
    };
  }

  const result = await login({ email, password });

  // 상태 객체를 명시적으로 반환
  return {
    status: result.status,
    message: result.message,
    user: result.user,
  };
}

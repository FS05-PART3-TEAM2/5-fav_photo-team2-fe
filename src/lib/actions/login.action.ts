"use server";

import { axiosClient } from "@/services/axiosClient/axiosClient";
import { AxiosError } from "axios";

interface LoginProps {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginProps) => {
  try {
    const response = await axiosClient.post("/auth/login", { email, password });
    const { message, user } = response.data;

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

  return result;
}

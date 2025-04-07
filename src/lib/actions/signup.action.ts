"use server";

import axios, { AxiosError } from "axios";

interface SignupProps {
  email: string;
  nickname: string;
  password: string;
}

export const signup = async ({ email, password, nickname }: SignupProps) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`;
  try {
    const response = await axios.post(url, {
      email,
      password,
      nickname,
    });
    const { message } = response.data;
    return { status: true, message };
  } catch (error) {
    const axiosError = error as AxiosError<{ error?: string }>;
    const message = axiosError.response?.data?.error || "회원가입 실패";
    return { status: false, message };
  }
};

export default async function signupAction(_: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nickname = formData.get("nickname") as string;

  if (!email || !password || !nickname) {
    return {
      status: false,
      message: "이메일, 비밀번호, 닉네임을 입력해주세요.",
    };
  }

  const result = await signup({ email, password, nickname });

  return result;
}

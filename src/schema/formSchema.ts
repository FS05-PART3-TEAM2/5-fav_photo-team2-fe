// form schema
import { z } from "zod";
import { InputSchema } from "@/schema/inputSchema";

// 로그인 폼 스키마
export const loginSchema = InputSchema.pick({
  email: true,
  password: true,
});
export type LoginFormSchema = z.infer<typeof loginSchema>; // 로그인 폼 스키마 타입

// 회원가입 폼 스키마
export const signupSchema = loginSchema
  .merge(
    InputSchema.pick({
      nickname: true,
      passwordConfirm: true,
    })
  )
  .refine(data => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"], // passwordConfirm 필드에서 오류 발생
  });
export type SignupFormSchema = z.infer<typeof signupSchema>;

// 포토카드 생성 폼 스키마
export const createPhotoCardSchema = InputSchema.pick({
  photoCardName: true,
  grade: true,
  genre: true,
  price: true,
  stock: true,
  image: true,
  photoCardContent: true,
});
export type CreatePhotoCardFormSchema = z.infer<typeof createPhotoCardSchema>; // 포토카드 생성 폼 스키마 타입

import { z } from "zod";
import { InputSchema } from "./inputSchema";

export const loginSchema = InputSchema.pick({
  email: true,
  password: true,
  wishContent: true, // 테스트
});
export type LoginFormSchema = z.infer<typeof loginSchema>;

export const signupSchema = loginSchema
  .merge(
    InputSchema.pick({
      nick: true,
      passwordConfirm: true,
    })
  )
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"], // passwordConfirm 필드에서 오류 발생
  });
export type SignupFormSchema = z.infer<typeof signupSchema>;

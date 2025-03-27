import { z } from 'zod';
import { InputSchema } from './inputSchema';

// 로그인 폼 스키마
export const loginSchema = InputSchema.pick({
  email: true,
  password: true,
  wishContent: true, // 로그인 폼이지만 Textarea 테스트용으로 속성 추가
});
export type LoginFormSchema = z.infer<typeof loginSchema>; // 로그인 폼 스키마 타입

// 회원가입 폼 스키마
export const signupSchema = loginSchema
  .merge(
    InputSchema.pick({
      nick: true,
      passwordConfirm: true,
    })
  )
  .refine(data => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'], // passwordConfirm 필드에서 오류 발생
  });
export type SignupFormSchema = z.infer<typeof signupSchema>;

import { z } from "zod";

// 입력 폼 스키마
export const InputSchema = z.object({
  email: z.string().email("잘못된 이메일입니다"), // 이메일
  nick: z.string().max(6, "닉네임은 6자 이내로 입력해주세요"), // 닉네임
  password: z.string().min(8, "비밀번호를 8자 이상 입력해주세요"), // 비밀번호
  passwordConfirm: z.string(), // 비밀번호 확인

  photoCardName: z.string().max(30, "최대 30자 이내로 입력해주세요"), // 포토카드 이름
  photoCardContent: z
    .string()
    .min(10, "10자 이상 입력해주세요")
    .max(100, "100자 이내로 입력해주세요"), // 포토카드 설명
  image: z.string(), // 사진 url
  price: z.number().int().positive("0보다 큰 수를 입력해주세요"), // 가격
  stock: z.number().int().positive("0보다 큰 수를 입력해주세요"), // 총 발행량
  search: z.string().min(1, "1자 이상 검색해주세요"), // 검색
  wishContent: z
    .string()
    .min(10, "10자 이상 입력해주세요")
    .max(100, "100자 이내로 입력해주세요"), // 교환 희망 설명
});

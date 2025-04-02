// input schema
import { z } from "zod";

const notEmptySchema = z.string().min(1, ""); // 빈 문자열이 아닌지 확인
const contentSchema = z
  .string()
  .min(10, "10자 이상 입력해주세요")
  .max(100, "100자 이내로 입력해주세요"); // 설명은 10자 이상 100자 이내로 입력받음

// 입력 폼 스키마
export const InputSchema = z.object({
  email: z.string().email("잘못된 이메일입니다"), // 이메일
  nickname: z
    .string()
    .min(1, "닉네임을 입력해주세요") // 빈 값 방지
    .max(6, "닉네임은 6자 이내로 입력해주세요"), // 닉네임
  password: z
    .string()
    .min(9, "비밀번호를 9자 이상 입력해주세요") // 비밀번호 최소 길이
    .regex(/[A-Z]/, "비밀번호에 대문자를 포함해주세요") // 대문자 포함
    .regex(/[a-z]/, "비밀번호에 소문자를 포함해주세요") // 소문자 포함
    .regex(/[0-9]/, "비밀번호에 숫자를 포함해주세요") // 숫자 포함
    .regex(/[^A-Za-z0-9]/, "비밀번호에 특수기호를 포함해주세요"), // 특수기호 포함
  passwordConfirm: z.string(), // 비밀번호 확인

  photoCardName: z.string().max(30, "최대 30자 이내로 입력해주세요"), // 포토카드 이름
  photoCardContent: contentSchema, // 포토카드 설명
  image: z.string(), // 사진 url
  price: z.number().int().positive("0보다 큰 수를 입력해주세요"), // 가격
  stock: z.number().int().positive("0보다 큰 수를 입력해주세요"), // 총 발행량
  search: z.string().min(1, "1자 이상 검색해주세요"), // 검색
  wishContent: contentSchema, // 교환 희망 설명

  genre: notEmptySchema, // 장르
  grade: notEmptySchema, // 등급
});

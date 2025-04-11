// input schema
import { z } from "zod";
import { Grade } from "@/types/input.types";

const notEmptySchema = z.string().min(1, ""); // 빈 문자열이 아닌지 확인
const contentSchema = z
  .string()
  .min(10, "10자 이상 입력해주세요")
  .max(100, "100자 이내로 입력해주세요"); // 설명은 10자 이상 100자 이내로 입력받음

// 비밀번호 유효성 검사
const validatePassword = (password: string, ctx: z.RefinementCtx) => {
  const errors = [];

  if (password.length < 9) errors.push("9자 이상");
  if (!/[0-9]/.test(password)) errors.push("숫자 1개 이상");
  if (!/[^A-Za-z0-9]/.test(password)) errors.push("특수기호 1개 이상");

  if (errors.length > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `비밀번호는 ${errors.join(", ")}을 포함해야 합니다.`,
    });
  }
};

// 사진 파일 유효성 검사, 모든 이미지 MIME 타입 허용 (image/*)
export const fileSchema = z.instanceof(File).refine(file => file.type.startsWith("image/"), {
  message: "이미지 파일만 업로드할 수 있습니다.",
});

// 입력 폼 스키마
export const InputSchema = z.object({
  email: z.string().min(1, "이메일을 입력해주세요").email("잘못된 이메일입니다"), // 이메일
  nickname: z
    .string()
    .min(1, "닉네임을 입력해주세요") // 빈 값 방지
    .max(6, "닉네임은 6자 이내로 입력해주세요"), // 닉네임
  password: z.string().min(1, "비밀번호를 입력해주세요").superRefine(validatePassword), // 비밀번호
  passwordConfirm: z.string().min(1, "비밀번호 확인이 필요합니다"), // 비밀번호 확인

  photoCardName: z
    .string()
    .min(1, "포토카드 이름을 입력해주세요") // 빈 값 방지
    .max(30, "최대 30자 이내로 입력해주세요"), // 포토카드 이름
  photoCardContent: contentSchema, // 포토카드 설명
  image: fileSchema, // 사진 url
  price: z
    .string()
    .default("")
    .refine(val => val === "" || !isNaN(Number(val)), {
      message: "유효한 숫자를 입력해주세요",
    })
    .refine(val => val === "" || Number.isInteger(Number(val)), {
      message: "정수를 입력해주세요",
    })
    .refine(val => val === "" || Number(val) > 0, {
      message: "0보다 큰 수를 입력해주세요",
    }), // 가격
  stock: z.nativeEnum(Grade), // 재고
  search: z.string().min(1, "1자 이상 검색해주세요"), // 검색
  wishContent: z.string().min(1, "교환 희망 설명을 입력해주세요"), // 교환 희망 설명

  genre: notEmptySchema, // 장르
  grade: notEmptySchema, // 등급
});

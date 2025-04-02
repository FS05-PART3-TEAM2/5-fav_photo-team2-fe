"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormSchema, signupSchema } from "@/schema/formSchema";
import InputText from "@/components/common/input/Input";
import Password from "@/components/common/input/Password";
import ThinBtn from "../common/button/ThinBtn";
import signupAction from "@/lib/actions/signup.action";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const {
    control,
    formState: { isValid, isSubmitting },
  } = useForm<SignupFormSchema>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const [state, formAction, isPending] = useActionState(signupAction, null);
  const router = useRouter();

  useEffect(() => {
    if (!state) return; // 초기 state가 null인 경우 처리

    if (state.status) {
      // 회원가입 성공
      alert(state.message);
      router.push("/auth/login"); // 회원가입 성공 후 로그인 페이지로 이동
      // useRouter()가 클라이언트 내에서 상태를 유지한 채로 이동
      // 완전히 새로고침 없이 페이지 이동이 되기 때문에 상태가 유지
    } else {
      // 회원가입 실패
      alert(state.message); // 실패 메시지 출력
    }
  }, [state, router]);

  return (
    <form action={formAction} className="form-auth">
      <InputText name="email" control={control} />
      <InputText name="nickname" control={control} />
      <Password name="password" control={control} />
      <Password name="passwordConfirm" control={control} />
      <ThinBtn type="submit" disabled={!isValid || isSubmitting} className="mt-[10px]">
        {isPending ? "가입 중..." : "가입하기"}
      </ThinBtn>
    </form>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormSchema } from "@/schema/formSchema";
import InputText from "@/components/common/input/Input";
import Password from "@/components/common/input/Password";
import ThinBtn from "../common/button/ThinBtn";
import { useActionState, useEffect } from "react";
import loginAction from "@/lib/actions/login.action";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import { useSnackbarStore } from "@/store/useSnackbarStore";

export default function LoginForm() {
  const {
    control,
    formState: { isValid },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const router = useRouter();
  const { setUser } = useUserStore(); // 유저정보 상태 업데이트 함수 가져오기
  const { openSnackbar } = useSnackbarStore(); // Snackbar 상태 업데이트 함수 가져오기

  useEffect(() => {
    if (!state) return; // 초기 state가 null인 경우 처리

    if (state.status) {
      // 로그인 성공시
      setUser(state.user); // zustand store에 사용자 정보 저장
      router.push("/"); // 로그인 성공 후 홈으로 이동,
      // useRouter()가 클라이언트 내에서 상태를 유지한 채로 이동
      // 완전히 새로고침 없이 페이지 이동이 되기 때문에 상태가 유지
    } else {
      // 로그인 실패시
      openSnackbar("ERROR", state.message); // Snackbar를 통해 에러 메시지 표시
    }
  }, [state, router, setUser, openSnackbar]);

  return (
    <form action={formAction} className="form-auth">
      <InputText name="email" control={control} />
      <Password name="password" control={control} />
      <ThinBtn type="submit" disabled={!isValid || isPending} className="mt-[10px]">
        {isPending ? "로그인 중..." : "로그인"}
      </ThinBtn>
    </form>
  );
}

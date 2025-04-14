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
import { useSnackbarStore } from "@/store/useSnackbarStore";
import useUserStore from "@/store/useUserStore";

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
  const { setUser, isAuthenticated } = useUserStore(); // 유저정보 상태 업데이트 함수 가져오기
  const { openSnackbar } = useSnackbarStore(); // Snackbar 상태 업데이트 함수 가져오기

  useEffect(() => {
    if (!state) return;

    if (state.status) {
      setUser(state.user);
    } else {
      openSnackbar("ERROR", state.message || "로그인에 실패했습니다.");
    }
  }, [state, setUser, openSnackbar]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/market");
      openSnackbar("SUCCESS", "로그인 완료되었습니다.");
    }
  }, [isAuthenticated, router, openSnackbar]);

  return (
    <form action={formAction} className="w-form">
      <InputText name="email" control={control} />
      <Password name="password" control={control} />
      <ThinBtn type="submit" disabled={!isValid || isPending} className="mt-[10px]">
        {isPending ? "로그인 중..." : "로그인"}
      </ThinBtn>
    </form>
  );
}

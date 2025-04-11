"use server";

import { deleteCookie } from "cookies-next/server";
import { cookies } from "next/headers";

export const logout = async () => {
  try {
    // 쿠키 삭제
    await deleteCookie("token", { cookies });
    await deleteCookie("refreshToken", { cookies });

    // axios 기본 Authorization 헤더 제거 (선택적)
    // axios.defaults.headers.common["Authorization"] = "";

    console.log("🔓 로그아웃 완료: 쿠키 삭제됨");

    return {
      status: true,
      message: "로그아웃 되었습니다.",
    };
  } catch (error) {
    console.error("로그아웃 에러:", error);
    return {
      status: false,
      message: "로그아웃 중 오류가 발생했습니다.",
    };
  }
};

// 폼 제출 등의 방식으로 로그아웃 호출 시 사용할 수 있는 서버 액션
export default async function logoutAction() {
  return await logout();
}

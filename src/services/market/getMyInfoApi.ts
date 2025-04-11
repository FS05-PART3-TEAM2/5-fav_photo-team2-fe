import { axiosClient } from "@/services/axiosClient/axiosClient";
import { UserMe } from "@/types/user.types"; // 사용자 타입이 정의된 경로

/**
 * 로그인한 유저의 정보를 불러오는 API
 * @returns User 객체 (id, email, nickname 등)
 */
export async function getMyInfoApi(cookie?: string): Promise<UserMe> {
  const response = await axiosClient.get("/auth/me", {
    headers: {
      Cookie: cookie || "", // SSR 환경 대응 (선택)
    },
    withCredentials: true, // 클라이언트 환경에서도 쿠키 포함
  });

  return response.data;
}

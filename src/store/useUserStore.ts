import { axiosClient } from "@/services/axiosClient/axiosClient";
import { PointDto } from "@/types/user.types";
// import { removeQueryKeys } from "@/utils/invalidateQueryKeys";
// import { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserInfo {
  id: string;
  email: string;
  nickname: string;
  point: number;
}

interface UserStore {
  userInfo: UserInfo | null;
  isAuthenticated: boolean; // 로그인 여부
  setUser: (user: UserInfo) => void;
  logout: () => void;
  // logout: (queryClient: QueryClient) => void;
  updatePoints: () => Promise<void>; // 포인트 업데이트
}

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      userInfo: null,
      isAuthenticated: false,

      setUser: (userInfo: UserInfo) => {
        set({ userInfo, isAuthenticated: true });
      },

      logout: () => {
        set({ userInfo: null, isAuthenticated: false });
      },
      // logout: queryClient => {
      //   set({ userInfo: null, isAuthenticated: false });
      //   removeQueryKeys(queryClient); // 로그아웃 시 관련 쿼리 캐시 초기화
      // },

      updatePoints: async () => {
        const { userInfo } = get();
        if (!userInfo) return;

        try {
          const response = await axiosClient.get<PointDto>("/points");
          const { totalPoint } = response.data;

          set({
            userInfo: {
              ...userInfo,
              point: totalPoint,
            },
          });
        } catch (error) {
          console.error("포인트 업데이트 실패:", error);
          // 필요시 사용자 알림 등 추가
        }
      },
    }),
    {
      name: "user-storage", // storage name
    }
  )
);

export default useUserStore;

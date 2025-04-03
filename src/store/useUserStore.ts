import { create } from "zustand";

interface UserInfo {
  id: string;
  email: string;
  nickname: string;
}

interface UserStore {
  userInfo: UserInfo | null;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
}

// Zustand Store 생성
const useUserStore = create<UserStore>(set => ({
  userInfo: null, // 초기값: 로그인되지 않은 상태
  setUser: userInfo => set({ userInfo }), // 사용자 정보 업데이트
  clearUser: () => set({ userInfo: null }), // 로그아웃 시 초기화
}));

export default useUserStore;

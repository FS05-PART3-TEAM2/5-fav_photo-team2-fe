import { QueryClient } from "@tanstack/react-query";
import { photoCardKeys } from "./queryKeys";

// XXX: 로그인/로그아웃 시 기존에 받아왔던 리스트 등 데이터 무효화 필요 - 이때 한번에 관련 쿼리를 한번에 invalidate하는 함수입니다.
// 무효화 필요한 경우 예시 : 판매 상태, 소유 여부 등 변경될 수 있음

/**
 * 로그인 등 유저 관련 정보 업데이트 시 관련 쿼리 모두 무효화
 * @param queryClient
 */
export const invalidateQueryKeys = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: photoCardKeys.all });
  // TODO: 유저 포인트나 알림 등도 추가될 수 있을 듯
};

/**
 * 로그아웃 시 관련 쿼리 캐시 초기화
 * @param queryClient
 */
export const removeQueryKeys = (queryClient: QueryClient) => {
  queryClient.removeQueries({ queryKey: photoCardKeys.all });
};

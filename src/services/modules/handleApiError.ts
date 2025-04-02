import { AxiosError } from "axios";

// 500 서버 에러를 처리하기 위한 핸들러 입니다.
// api 서비스 catch문에서 사용합니다.
export const handleApiError = (err: AxiosError) => {
  if (err?.response?.data) {
    return err.response.data;
  }
  return { status: 500, message: "Unknown error occurred" };
};

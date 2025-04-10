import { axiosClient } from "../axiosClient/axiosClient";
import { AxiosError } from "axios";

export interface RandomPointStatusResponse {
  canDraw: boolean;
  remainingSeconds: number;
  lastDrawTime: string;
  message: string;
}

export interface RandomPointDrawResponse {
  success: boolean;
  point?: number;
  message: string;
  canDraw?: boolean;
  remainingSeconds?: number;
  lastDrawTime?: string;
}

interface ErrorResponse {
  message?: string;
  canDraw?: boolean;
  remainingSeconds?: number;
}

/**
 * 랜덤 포인트 뽑기 가능 여부 확인 API
 */
export const getRandomPointStatus = async (): Promise<RandomPointStatusResponse> => {
  try {
    const response = await axiosClient.get("/random-box");

    if (response.status !== 200) {
      throw new Error("상태 확인에 실패했습니다.");
    }

    return response.data;
  } catch (error) {
    console.error("랜덤 포인트 상태 확인 오류:", error);
    // 오류 발생 시 기본값 반환
    return {
      canDraw: false,
      remainingSeconds: 3600,
      lastDrawTime: new Date().toString(),
      message: "상태 확인 중 오류가 발생했습니다.",
    };
  }
};

/**
 * 랜덤 포인트 뽑기 API
 * @param boxIndex
 */
export const drawRandomPoint = async (boxIndex: number): Promise<RandomPointDrawResponse> => {
  try {
    const response = await axiosClient.post("/random-box/test", {
      boxNumber: boxIndex + 1,
    });

    const data = response.data;

    // 성공 응답 구조 변환
    if (response.status === 200) {
      return {
        success: true,
        point: data.point,
        message: data.message,
        lastDrawTime: data.lastDrawTime,
      };
    } else {
      // 실패 응답 반환 (뽑기 불가능, 이미 뽑음 등)
      return {
        success: false,
        message: data.message,
        canDraw: data.canDraw,
        remainingSeconds: data.remainingSeconds,
        lastDrawTime: data.lastDrawTime,
      };
    }
  } catch (error) {
    console.error("랜덤 포인트 뽑기 오류:", error);

    if (error instanceof AxiosError) {
      const errorResponse = error.response?.data as ErrorResponse;

      if (error.response?.status === 401) {
        return {
          success: false,
          message: "로그인 후 이용 가능합니다.",
        };
      } else if (error.response?.status === 400) {
        // 400 에러는 로그인은 되어 있지만 뽑기 조건이 맞지 않는 경우
        return {
          success: false,
          message: errorResponse?.message || "지금은 뽑기를 진행할 수 없습니다.",
          canDraw: errorResponse?.canDraw || false,
          remainingSeconds: errorResponse?.remainingSeconds,
        };
      }
    }

    // 기타 에러 메시지
    return {
      success: false,
      message: "요청 처리 중 오류가 발생했습니다.",
    };
  }
};

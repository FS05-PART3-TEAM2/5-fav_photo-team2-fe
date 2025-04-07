import { useSnackbarStore } from "@/store/useSnackbarStore";
import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next/client";

const instances: Record<string, AxiosInstance> = {};

// 개발 서버
// const devURL = "https://five-fav-photo-team2-be.onrender.com/api";
const devURL = "http://localhost:8000/api";

// 운영 서버
// const prodURL = "https://#.onrender.com";

const baseURL = devURL;

const AxiosDefault = (baseURL: string): AxiosInstance => {
  if (!instances[baseURL]) {
    const axiosInstance = createAxiosInstance(baseURL);
    requestInterceptor(axiosInstance);
    responseInterceptor(axiosInstance);
    instances[baseURL] = axiosInstance;
  }
  return instances[baseURL];
};

const createAxiosInstance = (baseURL: string) => {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키를 주고받기 위해 필요한 설정
  });
  return axiosInstance;
};

const responseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      // 401 에러 처리 (토큰 만료된 경우)
      if (error.response?.status === 401) {
        // 로그인 필요한 서비스인 경우 alert 표시
        if (typeof window !== "undefined") {
          const { openSnackbar } = useSnackbarStore.getState();
          openSnackbar("ERROR", "로그인 후 이용해주세요.");
        }
        // TODO: 토큰 갱신 로직 추가 필요
      }
      return Promise.reject(error);
    }
  );
};

const requestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // 쿼리 설정
      config.params = {
        ...(config.params || {}),
      };

      // access token header 설정
      const auth_header = config.headers["x-auth-not-required"];
      if (auth_header) return config;

      const token = getCookie("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );
};

// 현재 baseURL: dev
export const axiosClient = AxiosDefault(baseURL);

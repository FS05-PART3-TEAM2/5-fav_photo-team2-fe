import { AxiosError } from "axios";
import { handleApiError } from "../modules/handleApiError";
import { PointDto } from "@/types/user.types";
import { axiosClient } from "../axiosClient/axiosClient";

export const getUserPointApi = async (): Promise<PointDto> => {
  try {
    const response = await axiosClient.get<PointDto>(`/point`);
    return response.data;
  } catch (err) {
    throw handleApiError(err as AxiosError);
  }
};

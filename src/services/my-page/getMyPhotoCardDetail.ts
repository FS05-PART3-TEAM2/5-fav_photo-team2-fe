import { axiosClient } from "@/services/axiosClient/axiosClient";
import { Grade, Genre } from "@/types/photocard.types";

export interface MyPhotoCardDetailResponse {
  id: string;
  name: string;
  grade: Grade;
  genre: Genre;
  price: number;
  availableAmount: number;
  creator: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

/**
 * 마이 포토카드 상세 조회 API
 * @param id 포토카드 ID
 * @returns MyPhotoCardDetailResponse
 */
export const getMyPhotoCardDetail = async (id: string): Promise<MyPhotoCardDetailResponse> => {
  const response = await axiosClient.get<MyPhotoCardDetailResponse>(`/photocards/me/${id}`);
  return response.data;
};

import { Grade, Genre, MyPhotoCardDto } from "@/types/photocard.types";
import { axiosClient } from "../axiosClient/axiosClient";
export interface MyPhotosResponse {
  userNickname: string;
  gradeCounts: {
    COMMON: number;
    RARE: number;
    SUPER_RARE: number;
    LEGENDARY: number;
  };
  hasMore: boolean;
  nextCursor: string | null;
  list: MyPhotoCardDto[];
  filterInfo: {
    grade: GradeInfo[];
    genre: GenreInfo[];
  };
}

interface GradeInfo {
  name: Grade;
  count: number;
}

interface GenreInfo {
  name: Genre;
  count: number;
}

interface GetMyPhotosParams {
  cursor?: string | null;
  keyword?: string;
  grade?: Grade | undefined;
  genre?: Genre | undefined;
}

export const getMyPhotos = async ({
  cursor,
  keyword,
  grade,
  genre,
}: GetMyPhotosParams = {}): Promise<MyPhotosResponse> => {
  const response = await axiosClient.get("/photocards/me", {
    params: { cursor, keyword, grade, genre },
  });
  return response.data;
};

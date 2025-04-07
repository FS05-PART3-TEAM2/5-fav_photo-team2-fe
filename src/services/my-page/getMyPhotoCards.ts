import { Grade, Genre } from "@/types/photocard.types";

// 사용자 포토카드 API 응답 타입 정의
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
  list: MyPhotoCard[];
  filterInfo: {
    grade: GradeInfo[];
    genre: GenreInfo[];
  };
}

export interface MyPhotoCard {
  id: string;
  name: string;
  genre: Genre;
  grade: Grade;
  price: number;
  imageUrl: string;
  amount: number;
  creatorNickname: string;
  createdAt: string;
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

export const getMyPhotos = async (params: GetMyPhotosParams = {}): Promise<MyPhotosResponse> => {
  const { cursor = null, keyword = "", grade, genre } = params;

  // 테스트를 위한 더미 데이터 반환
  console.log("API 호출 파라미터:", { cursor, keyword, grade, genre });

  // 실제 API 대신 더미 데이터 반환
  return {
    userNickname: "초록사과",
    gradeCounts: {
      COMMON: 2,
      RARE: 1,
      SUPER_RARE: 1,
      LEGENDARY: 0,
    },
    hasMore: false,
    nextCursor: null,
    list: [
      {
        id: "693cd1ff-3399-4e59-ad3f-a148c400b0e7",
        name: "Cute Animals 3",
        genre: "LANDSCAPE" as Genre,
        grade: "COMMON" as Grade,
        price: 500,
        imageUrl: "/assets/images/mock1.png",
        amount: 1,
        creatorNickname: "푸른하늘",
        createdAt: "2025-04-04T06:47:28.173Z",
      },
      {
        id: "793de2gg-4400-5f60-be4g-b259d511c1f8",
        name: "Mountain View",
        genre: "LANDSCAPE" as Genre,
        grade: "COMMON" as Grade,
        price: 450,
        imageUrl: "/assets/images/mock2.png",
        amount: 2,
        creatorNickname: "산악인",
        createdAt: "2025-04-03T12:30:28.173Z",
      },
      {
        id: "893ef3hh-5511-6g71-cf5h-c360e622d2g9",
        name: "Sunset Beach",
        genre: "TRAVEL" as Genre,
        grade: "RARE" as Grade,
        price: 800,
        imageUrl: "/assets/images/mock3.png",
        amount: 1,
        creatorNickname: "바다사랑",
        createdAt: "2025-04-02T15:45:28.173Z",
      },
      {
        id: "993fg4ii-6622-7h82-dg6i-d471f733e3h0",
        name: "Vintage Camera",
        genre: "OBJECT" as Genre,
        grade: "SUPER_RARE" as Grade,
        price: 1200,
        imageUrl: "/assets/images/mock1.png",
        amount: 1,
        creatorNickname: "사진작가",
        createdAt: "2025-04-01T09:15:28.173Z",
      },
    ],
    filterInfo: {
      grade: [
        {
          name: "COMMON" as Grade,
          count: 2,
        },
        {
          name: "RARE" as Grade,
          count: 1,
        },
        {
          name: "SUPER_RARE" as Grade,
          count: 1,
        },
        {
          name: "LEGENDARY" as Grade,
          count: 0,
        },
      ],
      genre: [
        {
          name: "TRAVEL" as Genre,
          count: 1,
        },
        {
          name: "LANDSCAPE" as Genre,
          count: 2,
        },
        {
          name: "PORTRAIT" as Genre,
          count: 0,
        },
        {
          name: "OBJECT" as Genre,
          count: 1,
        },
      ],
    },
  };
};

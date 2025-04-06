// import { axiosClient } from "@/services/axiosClient/axiosClient";
import { Grade, Genre, TradeStatus } from "@/types/photocard.types";

export interface MySalesCardsResponse {
  hasMore: boolean;
  nextCursor: string | null;
  list: MySaleCard[];
  info: {
    grade: GradeInfo[];
    genre: GenreInfo[];
    status: StatusInfo[];
  };
}

export interface MySaleCard {
  saleCardId: string;
  status: TradeStatus;
  name: string;
  genre: Genre;
  grade: Grade;
  price: number;
  image: string;
  total: number;
  remaining: number;
  creator: {
    id: string;
    nickname: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface GradeInfo {
  name: Grade;
  count: number;
}

interface GenreInfo {
  name: Genre;
  count: number;
}

interface StatusInfo {
  name: TradeStatus;
  count: number;
}

interface GetMySalesCardsParams {
  cursor?: string | null;
  keyword?: string;
  grade?: Grade | undefined;
  genre?: Genre | undefined;
  status?: TradeStatus | undefined;
}

export const getMySalesCards = async (
  params: GetMySalesCardsParams = {}
): Promise<MySalesCardsResponse> => {
  const { cursor = null, keyword = "", grade, genre, status } = params;

  // 테스트를 위한 더미 데이터 반환
  console.log("API 호출 파라미터:", { cursor, keyword, grade, genre, status });

  // 실제 API 대신 더미 데이터 반환
  return {
    hasMore: true,
    nextCursor: "next_page_token",
    list: [
      {
        saleCardId: "f0eaa205-26a3-4a85-a715-cba9b45954ab",
        status: "PENDING",
        name: "Tropical Beach 18",
        genre: "LANDSCAPE",
        grade: "SUPER_RARE",
        price: 700,
        image: "/assets/images/mock2.png",
        total: 1,
        remaining: 1,
        creator: {
          id: "dc9cd485-709b-424c-97ae-f0288a3b6e1c",
          nickname: "황금호랑이",
        },
        createdAt: "2025-04-04T06:47:28.190Z",
        updatedAt: "2025-04-04T06:47:28.190Z",
      },
      {
        saleCardId: "804d6cdd-ddf5-4be1-ba6f-e6520f337fd3",
        status: "PENDING",
        name: "Underwater World 10",
        genre: "TRAVEL",
        grade: "RARE",
        price: 700,
        image: "/assets/images/mock2.png",
        total: 1,
        remaining: 1,
        creator: {
          id: "85df9dfb-4670-4425-8b2f-a7a52da67b78",
          nickname: "마법여우",
        },
        createdAt: "2025-04-04T06:47:28.190Z",
        updatedAt: "2025-04-04T06:47:28.190Z",
      },
      {
        saleCardId: "a2b95c8d-1234-5678-9abc-def012345678",
        status: "ON_SALE",
        name: "Mountain Sunrise",
        genre: "LANDSCAPE",
        grade: "LEGENDARY",
        price: 1500,
        image: "/assets/images/mock2.png",
        total: 3,
        remaining: 2,
        creator: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          nickname: "산의영혼",
        },
        createdAt: "2025-04-03T10:22:18.190Z",
        updatedAt: "2025-04-03T10:22:18.190Z",
      },
      {
        saleCardId: "b3c45d6e-2345-6789-abcd-ef0123456789",
        status: "SOLD_OUT",
        name: "Paris Streets",
        genre: "TRAVEL",
        grade: "COMMON",
        price: 300,
        image: "/assets/images/mock3.png",
        total: 5,
        remaining: 0,
        creator: {
          id: "234f5678-f89b-23e4-b567-537725285111",
          nickname: "여행가",
        },
        createdAt: "2025-04-02T15:37:42.190Z",
        updatedAt: "2025-04-02T15:37:42.190Z",
      },
      {
        saleCardId: "c4d56e7f-3456-789a-bcde-f01234567890",
        status: "ON_SALE",
        name: "Vintage Camera",
        genre: "OBJECT",
        grade: "RARE",
        price: 650,
        image: "/assets/images/mock1.png",
        total: 2,
        remaining: 1,
        creator: {
          id: "345g6789-g89b-34f5-c678-648836396222",
          nickname: "사진작가",
        },
        createdAt: "2025-04-01T08:12:33.190Z",
        updatedAt: "2025-04-01T08:12:33.190Z",
      },
      {
        saleCardId: "d5e67f8g-4567-89ab-cdef-0123456789ab",
        status: "PENDING",
        name: "Smiling Child",
        genre: "PORTRAIT",
        grade: "SUPER_RARE",
        price: 850,
        image: "/assets/images/mock2.png",
        total: 1,
        remaining: 1,
        creator: {
          id: "456h7890-h90c-45g6-d789-759947407333",
          nickname: "웃음전도사",
        },
        createdAt: "2025-03-31T19:58:51.190Z",
        updatedAt: "2025-03-31T19:58:51.190Z",
      },
      {
        saleCardId: "e6f78g9h-5678-9abc-def0-123456789abc",
        status: "ON_SALE",
        name: "Desert Sunset",
        genre: "LANDSCAPE",
        grade: "LEGENDARY",
        price: 1800,
        image: "/assets/images/mock2.png",
        total: 2,
        remaining: 1,
        creator: {
          id: "567i8901-i01d-56h7-e890-860058518444",
          nickname: "사막여우",
        },
        createdAt: "2025-03-30T11:45:22.190Z",
        updatedAt: "2025-03-30T11:45:22.190Z",
      },
      {
        saleCardId: "f7g89h0i-6789-abcd-ef01-23456789abcd",
        status: "SOLD_OUT",
        name: "Antique Clock",
        genre: "OBJECT",
        grade: "COMMON",
        price: 250,
        image: "/assets/images/mock2.png",
        total: 10,
        remaining: 0,
        creator: {
          id: "678j9012-j12e-67i8-f901-971169629555",
          nickname: "시간여행자",
        },
        createdAt: "2025-03-29T14:27:39.190Z",
        updatedAt: "2025-03-29T14:27:39.190Z",
      },
      {
        saleCardId: "g8h90i1j-789a-bcde-f012-3456789abcde",
        status: "ON_SALE",
        name: "Tokyo Skyline",
        genre: "TRAVEL",
        grade: "RARE",
        price: 720,
        image: "/assets/images/mock2.png",
        total: 3,
        remaining: 2,
        creator: {
          id: "789k0123-k23f-78j9-g012-082270730666",
          nickname: "도시탐험가",
        },
        createdAt: "2025-03-28T16:19:07.190Z",
        updatedAt: "2025-03-28T16:19:07.190Z",
      },
      {
        saleCardId: "h9i01j2k-89ab-cdef-0123-456789abcdef",
        status: "PENDING",
        name: "Elderly Smile",
        genre: "PORTRAIT",
        grade: "SUPER_RARE",
        price: 920,
        image: "/assets/images/mock2.png",
        total: 1,
        remaining: 1,
        creator: {
          id: "890l1234-l34g-89k0-h123-193381841777",
          nickname: "인생사진사",
        },
        createdAt: "2025-03-27T09:33:45.190Z",
        updatedAt: "2025-03-27T09:33:45.190Z",
      },
      {
        saleCardId: "i0j12k3l-9abc-def0-1234-56789abcdef0",
        status: "ON_SALE",
        name: "Northern Lights",
        genre: "LANDSCAPE",
        grade: "LEGENDARY",
        price: 2000,
        image: "/assets/images/mock2.png",
        total: 1,
        remaining: 1,
        creator: {
          id: "901m2345-m45h-90l1-i234-204492952888",
          nickname: "극광사냥꾼",
        },
        createdAt: "2025-03-26T21:52:13.190Z",
        updatedAt: "2025-03-26T21:52:13.190Z",
      },
      {
        saleCardId: "j1k23l4m-abcd-ef01-2345-6789abcdef01",
        status: "SOLD_OUT",
        name: "Vintage Record Player",
        genre: "OBJECT",
        grade: "RARE",
        price: 580,
        image: "/assets/images/mock2.png",
        total: 4,
        remaining: 0,
        creator: {
          id: "012n3456-n56i-01m2-j345-315503063999",
          nickname: "음악수집가",
        },
        createdAt: "2025-03-25T13:05:29.190Z",
        updatedAt: "2025-03-25T13:05:29.190Z",
      },
      {
        saleCardId: "k2l34m5n-bcde-f012-3456-789abcdef012",
        status: "ON_SALE",
        name: "Moroccan Street",
        genre: "TRAVEL",
        grade: "COMMON",
        price: 320,
        image: "/assets/images/mock2.png",
        total: 8,
        remaining: 5,
        creator: {
          id: "123o4567-o67j-12n3-k456-426614174000",
          nickname: "세계일주",
        },
        createdAt: "2025-03-24T17:41:38.190Z",
        updatedAt: "2025-03-24T17:41:38.190Z",
      },
      {
        saleCardId: "l3m45n6o-cdef-0123-4567-89abcdef0123",
        status: "PENDING",
        name: "Child with Balloon",
        genre: "PORTRAIT",
        grade: "SUPER_RARE",
        price: 790,
        image: "/assets/images/mock2.png",
        total: 2,
        remaining: 2,
        creator: {
          id: "234p5678-p78k-23o4-l567-537725285111",
          nickname: "순간포착",
        },
        createdAt: "2025-03-23T08:19:55.190Z",
        updatedAt: "2025-03-23T08:19:55.190Z",
      },
      {
        saleCardId: "m4n56o7p-def0-1234-5678-9abcdef01234",
        status: "ON_SALE",
        name: "Autumn Forest",
        genre: "LANDSCAPE",
        grade: "LEGENDARY",
        price: 1700,
        image: "/assets/images/mock2.png",
        total: 2,
        remaining: 1,
        creator: {
          id: "345q6789-q89l-34p5-m678-648836396222",
          nickname: "가을숲",
        },
        createdAt: "2025-03-22T14:28:42.190Z",
        updatedAt: "2025-03-22T14:28:42.190Z",
      },
      {
        saleCardId: "n5o67p8q-ef01-2345-6789-abcdef012345",
        status: "SOLD_OUT",
        name: "Ancient Compass",
        genre: "OBJECT",
        grade: "COMMON",
        price: 280,
        image: "/assets/images/mock2.png",
        total: 6,
        remaining: 0,
        creator: {
          id: "456r7890-r90m-45q6-n789-759947407333",
          nickname: "방향탐색가",
        },
        createdAt: "2025-03-21T11:37:19.190Z",
        updatedAt: "2025-03-21T11:37:19.190Z",
      },
      {
        saleCardId: "o6p78q9r-f012-3456-789a-bcdef0123456",
        status: "ON_SALE",
        name: "New York Skyline",
        genre: "TRAVEL",
        grade: "RARE",
        price: 680,
        image: "/assets/images/mock2.png",
        total: 3,
        remaining: 2,
        creator: {
          id: "567s8901-s01n-56r7-o890-860058518444",
          nickname: "도시풍경",
        },
        createdAt: "2025-03-20T19:45:33.190Z",
        updatedAt: "2025-03-20T19:45:33.190Z",
      },
      {
        saleCardId: "p7q89r0s-0123-4567-89ab-cdef01234567",
        status: "PENDING",
        name: "Performer on Stage",
        genre: "PORTRAIT",
        grade: "SUPER_RARE",
        price: 880,
        image: "/assets/images/mock2.png",
        total: 1,
        remaining: 1,
        creator: {
          id: "678t9012-t12o-67s8-p901-971169629555",
          nickname: "공연캡처",
        },
        createdAt: "2025-03-19T07:12:51.190Z",
        updatedAt: "2025-03-19T07:12:51.190Z",
      },
      {
        saleCardId: "q8r90s1t-1234-5678-9abc-def012345678",
        status: "ON_SALE",
        name: "Starry Night Sky",
        genre: "LANDSCAPE",
        grade: "LEGENDARY",
        price: 1900,
        image: "/assets/images/mock2.png",
        total: 1,
        remaining: 1,
        creator: {
          id: "789u0123-u23p-78t9-q012-082270730666",
          nickname: "별빛사진사",
        },
        createdAt: "2025-03-18T22:33:47.190Z",
        updatedAt: "2025-03-18T22:33:47.190Z",
      },
      {
        saleCardId: "r9s01t2u-2345-6789-abcd-ef0123456789",
        status: "SOLD_OUT",
        name: "Classic Typewriter",
        genre: "OBJECT",
        grade: "RARE",
        price: 550,
        image: "/assets/images/mock2.png",
        total: 3,
        remaining: 0,
        creator: {
          id: "890v1234-v34q-89u0-r123-193381841777",
          nickname: "빈티지모음",
        },
        createdAt: "2025-03-17T15:29:10.190Z",
        updatedAt: "2025-03-17T15:29:10.190Z",
      },
      {
        saleCardId: "s0t12u3v-3456-789a-bcde-f01234567890",
        status: "ON_SALE",
        name: "Bali Temple",
        genre: "TRAVEL",
        grade: "COMMON",
        price: 340,
        image: "/assets/images/mock2.png",
        total: 7,
        remaining: 4,
        creator: {
          id: "901w2345-w45r-90v1-s234-204492952888",
          nickname: "아시아여행",
        },
        createdAt: "2025-03-16T12:18:25.190Z",
        updatedAt: "2025-03-16T12:18:25.190Z",
      },
    ],
    info: {
      grade: [
        { name: "COMMON", count: 4 },
        { name: "RARE", count: 6 },
        { name: "SUPER_RARE", count: 5 },
        { name: "LEGENDARY", count: 5 },
      ],
      genre: [
        { name: "TRAVEL", count: 6 },
        { name: "LANDSCAPE", count: 6 },
        { name: "PORTRAIT", count: 4 },
        { name: "OBJECT", count: 4 },
      ],
      status: [
        { name: "ON_SALE", count: 10 },
        { name: "SOLD_OUT", count: 5 },
        { name: "PENDING", count: 5 },
      ],
    },
  };

  // 아래 코드는 주석 처리
  // const params: Record<string, string> = {};
  // if (cursor) params.cursor = cursor;
  // if (keyword) params.keyword = keyword;
  // if (grade && grade !== "default") params.grade = grade;
  // if (genre && genre !== "default") params.genre = genre;
  // if (status && status !== "default") params.status = status;
  //
  // const response = await axiosClient.get("/market/me", { params });
  // return response.data;
};

"use client";

// 포토카드 상세페이지
// import { useParams } from 'next/navigation';
import { SupplierPage } from "./SupplierPage";
import { ConsumerPage } from "./ConsumerPage";
import { Grade } from "@/types/photocard.types";
export default function PhotoCardDetailPage() {
  //   const { id } = useParams();
  // TODO: id로 포토카드 상세정보 조회하는 훅 추가될 예정. 상세정보 조회 후 isMine 여부에 따라 판매자/구매자 페이지 렌더링

  // XXX: 아직 api 연동 전, 상세페이지 ui 작업 위해 목데이터로 넣어둠
  const isLoading = false;
  const data = {
    id: "acg",
    userNickname: "총명한판다",
    imageUrl: "/assets/images/mock1.png",
    name: "우리집 앞마당",
    grade: "LEGENDARY" as Grade,
    genre: "풍경",
    description:
      "우리집 앞마당 포토카드입니다. 오랜만에 보니 너무 좋아요. 우리집 앞마당 포토카드입니다. 오랜만에 보니 너무 좋아요. 우리집 앞마당 포토카드입니다. 오랜만에 보니 너무 좋아요.",
    price: 15,
    availableAmount: 2,
    totalAmount: 5,
    exchangeDetail: {
      grade: "RARE" as Grade,
      genre: "인물",
      description: "푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.",
    },
    isMine: true,
    createdAt: "2025-03-27",
    // receivedOffers: null,
    receivedOffers: [
      {
        id: "acg",
        offererNickname: "룰루",
        imageUrl: "/assets/images/mock3.png",
        name: "how far i'll go",
        grade: "SUPER RARE" as Grade,
        genre: "풍경",
        description:
          "여름 바다 풍경과 교환하실래요? 여름 바다 풍경과 교환하실래요 여름 바다 풍경과 교환하실래요? 여름 바다 풍경과 교환하실래요 여름 바다 풍경과 교환하실래요? 여름 바다 풍경과 교환하실래요",
        price: 4,
        createdAt: "2025-03-27",
      },
      {
        id: "acwegas",
        offererNickname: "난나",
        imageUrl: "/assets/images/mock2.png",
        name: "스페인 여행",
        grade: "COMMON" as Grade,
        genre: "인물",
        description: "스페인 여행 포토카드입니다. 오랜만에 보니 너무 좋아요.",
        price: 10,
        createdAt: "2025-03-27",
      },
      {
        id: "acgfgg",
        offererNickname: "락토핏",
        imageUrl: "/assets/images/mock3.png",
        name: "how far i'll go",
        grade: "SUPER RARE" as Grade,
        genre: "풍경",
        description: "여름 바다 풍경과 교환하실래요? 여름 바다 풍경과 교환하실래요",
        price: 4,
        createdAt: "2025-03-27",
      },
      {
        id: "acwegasssss",
        offererNickname: "금명이",
        imageUrl: "/assets/images/mock2.png",
        name: "스페인 여행",
        grade: "COMMON" as Grade,
        genre: "인물",
        description: "스페인 여행 포토카드입니다. 오랜만에 보니 너무 좋아요.",
        price: 10,
        createdAt: "2025-03-27",
      },
      {
        id: "acgasdfg",
        offererNickname: "관식",
        imageUrl: "/assets/images/mock3.png",
        name: "how far i'll go",
        grade: "SUPER RARE" as Grade,
        genre: "풍경",
        description: "여름 바다 풍경과 교환하실래요? 여름 바다 풍경과 교환하실래요",
        price: 4,
        createdAt: "2025-03-27",
      },
      {
        id: "acwegaasssssdf",
        offererNickname: "판다",
        imageUrl: "/assets/images/mock2.png",
        name: "스페인 여행",
        grade: "COMMON" as Grade,
        genre: "인물",
        description: "스페인 여행 포토카드입니다. 오랜만에 보니 너무 좋아요.",
        price: 10,
        createdAt: "2025-03-27",
      },
      {
        id: "acgasdfsdf",
        offererNickname: "코어",
        imageUrl: "/assets/images/mock3.png",
        name: "how far i'll go",
        grade: "SUPER RARE" as Grade,
        genre: "풍경",
        description: "여름 바다 풍경과 교환하실래요? 여름 바다 풍경과 교환하실래요",
        price: 4,
        createdAt: "2025-03-27",
      },
    ],
    // myOffers: null,
    myOffers: [
      {
        id: "acg",
        offererNickname: "난나",
        imageUrl: "/assets/images/mock1.png",
        name: "스페인 여행",
        grade: "COMMON" as Grade,
        genre: "인물",
        description: "스페인 여행 포토카드입니다. 오랜만에 보니 너무 좋아요.",
        price: 10,
        createdAt: "2025-03-27",
      },
      {
        id: "acgasd",
        offererNickname: "난나",
        imageUrl: "/assets/images/mock1.png",
        name: "포르투갈 여행",
        grade: "SUPER RARE" as Grade,
        genre: "풍경",
        description: "포르투갈 여행 포토카드입니다. 오랜만에 보니 너무 좋아요.",
        price: 10,
        createdAt: "2025-03-27",
      },
    ],
  };

  return (
    <div className="w-[100%] pt-[20px] md:pt-[0px] pb-[40px] md:pb-[60px] lg:pb-[180px]">
      <div className="hidden md:block py-[40px] lg:py-[60px] w-[100%]">
        <p className="text-gray-300 text-[16px] lg:text-[24px] font-BR-B">마켓플레이스</p>
      </div>

      {isLoading ? (
        // FIXME: 로딩스피너 못생겨서 수정하고 싶긴한데 일단 찾아볼예정
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-main rounded-full animate-spin"></div>
        </div>
      ) : data.isMine ? (
        // 판매자 페이지
        <SupplierPage data={data} />
      ) : (
        // 구매자 페이지
        <ConsumerPage data={data} />
      )}
    </div>
  );
}

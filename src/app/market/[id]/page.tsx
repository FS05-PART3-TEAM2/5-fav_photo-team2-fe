"use client";

// 포토카드 상세페이지
// import { useParams } from "next/navigation";
import { SupplierPage } from "./SupplierPage";
import { ConsumerPage } from "./ConsumerPage";
import { Grade, Genre } from "@/types/photocard.types";
import { useExchangeCardList } from "@/hooks/market/detail/useExchangeCardService";

// XXX: 판매 카드 기본 상세 정보는 서버사이드 fetch,
// XXX: 교환 목록은 reactQuery로 CSR 처리
export default function PhotoCardDetailPage() {
  // 교환 목록 데이터 불러오기
  const { data: exchangeListData, isPending: isExchangeListPending } = useExchangeCardList();

  // XXX: 아직 api 연동 전, 상세페이지 ui 작업 위해 목데이터로 넣어둠
  const saleCardData = {
    id: "acg",
    userNickname: "총명한판다",
    imageUrl: "/assets/images/mock1.png",
    name: "우리집 앞마당",
    grade: "LEGENDARY" as Grade,
    genre: "LANDSCAPE" as Genre,
    description:
      "우리집 앞마당 포토카드입니다. 오랜만에 보니 너무 좋아요. 우리집 앞마당 포토카드입니다. 오랜만에 보니 너무 좋아요. 우리집 앞마당 포토카드입니다. 오랜만에 보니 너무 좋아요.",
    price: 4,
    availableAmount: 4,
    totalAmount: 5,
    totalOwnAmount: 7,
    exchangeDetail: {
      grade: "RARE" as Grade,
      genre: "PORTRAIT" as Genre,
      description: "푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.",
    },
    isMine: true,
    createdAt: "2025-03-27",
  };

  return (
    <div className="w-[100%] pt-[20px] md:pt-[0px] pb-[40px] md:pb-[60px] lg:pb-[180px]">
      {/* XXX: 모바일에서는 페이지 타이틀 헤더에서 관리 */}
      <div className="hidden md:block py-[40px] lg:py-[60px] w-[100%]">
        <p className="text-gray-300 text-[16px] lg:text-[24px] font-BR-B">마켓플레이스</p>
      </div>

      {saleCardData.isMine ? (
        // 판매자 페이지
        <SupplierPage
          saleCardData={saleCardData}
          exchangeListData={exchangeListData}
          isExchangeListPending={isExchangeListPending}
        />
      ) : (
        // 구매자 페이지
        <ConsumerPage
          saleCardData={saleCardData}
          exchangeListData={exchangeListData}
          isExchangeListPending={isExchangeListPending}
        />
      )}
    </div>
  );
}

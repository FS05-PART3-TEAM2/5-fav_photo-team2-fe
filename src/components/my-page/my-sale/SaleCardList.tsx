import React, { useEffect, useRef } from "react";
import { MySaleCard } from "@/services/my-page/getMySalesCards";
import MyPhotoCard from "../MyPhotoCard";
import { MyPhotoCardDto, TradeStatus } from "@/types/photocard.types";

interface MySalesCardsProps {
  salesCards: MySaleCard[];
  onCardClick?: (cardId: string) => void;
  onLoadMore: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  className?: string;
}

const SaleCardList: React.FC<MySalesCardsProps> = ({
  salesCards,
  onCardClick,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  className = "",
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  /*
  MySaleCard 객체를 MyPhotoCardDto 객체로 변환하는 함수
  MyPhotoCard 컴포넌트가 필요한 데이터 형식에 맞추기 위해 필요합니다.
  */
  const convertToMyPhotoCardDto = (
    saleCard: MySaleCard
  ): MyPhotoCardDto & { status?: TradeStatus } => {
    return {
      id: saleCard.saleCardId,
      grade: saleCard.grade,
      genre: saleCard.genre,
      name: saleCard.name,
      price: saleCard.price,
      amount: saleCard.remaining,
      creatorNickname: saleCard.creator.nickname,
      imageUrl: saleCard.image,
      createdAt: saleCard.createdAt,
      status: saleCard.status,
    };
  };

  useEffect(() => {
    /*
    IntersectionObserver API를 사용하여 무한 스크롤 구현
    viewPort 내에 요소가 10%(threshold: 0.1) 이상 노출되었을 때 콜백을 실행
    */

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;

    /* 관찰 대상 등록
    loadMoreRef에 할당된 요소를 observer가 감지할 수 있도록 observer.observe로 등록합니다.
    */
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    // 클린업
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);
  console.log(salesCards);
  return (
    <div className="relative">
      <div className={className}>
        {salesCards.map((saleCard: MySaleCard) => (
          <MyPhotoCard
            key={saleCard.saleCardId}
            myPhotoCard={convertToMyPhotoCardDto(saleCard)}
            onClick={() => onCardClick && onCardClick(saleCard.saleCardId)}
          />
        ))}
      </div>

      {/* 무한 스크롤 로딩 인디케이터 */}
      <div ref={loadMoreRef} className="py-4 flex justify-center">
        {isFetchingNextPage && <div className="text-main">데이터를 불러오는 중...</div>}
      </div>
    </div>
  );
};

export default SaleCardList;

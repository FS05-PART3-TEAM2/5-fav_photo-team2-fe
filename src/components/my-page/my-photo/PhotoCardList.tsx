import React, { useEffect, useRef } from "react";
import { MyPhotoCard as MyPhotoCardType } from "@/services/my-page/getMyPhotoCards";
import MyPhotoCardComponent from "../MyPhotoCard";
import { MyPhotoCardDto } from "@/types/photocard.types";

interface PhotoCardsProps {
  photoCards: MyPhotoCardType[];
  onCardClick?: (cardId: string) => void;
  onLoadMore: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
}

const PhotoCardList: React.FC<PhotoCardsProps> = ({
  photoCards,
  onCardClick,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  /*
  MyPhotoCard 객체를 MyPhotoCardDto 객체로 변환하는 함수
  MyPhotoCard 컴포넌트가 필요한 데이터 형식에 맞추기 위해 필요합니다.
  */
  const convertToMyPhotoCardDto = (photoCard: MyPhotoCardType): MyPhotoCardDto => {
    return {
      id: photoCard.id,
      grade: photoCard.grade,
      genre: photoCard.genre,
      name: photoCard.name,
      price: photoCard.price,
      availableAmount: photoCard.amount,
      totalAmount: photoCard.amount,
      creator: photoCard.creatorNickname,
      imageUrl: photoCard.imageUrl,
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

  return (
    <div className="relative">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 md:mt-15 md:gap-7 lg:gap-10">
        {photoCards.map(photoCard => (
          <MyPhotoCardComponent
            key={photoCard.id}
            myPhotoCard={convertToMyPhotoCardDto(photoCard)}
            onClick={(id: string) => onCardClick && onCardClick(id)}
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

export default PhotoCardList;

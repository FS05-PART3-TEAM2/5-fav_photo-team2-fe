import React, { useEffect, useRef } from "react";
import { MyPhotoCardDto } from "@/types/photocard.types";
import MyPhotoCardComponent from "../MyPhotoCard";

interface PhotoCardsProps {
  photoCards: MyPhotoCardDto[];
  onCardClick?: (cardId: string) => void;
  onLoadMore: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  className?: string;
}

const PhotoCardList: React.FC<PhotoCardsProps> = ({
  photoCards,
  onCardClick,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  className = "",
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

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
      <div className={className}>
        {photoCards
          .filter(card => card !== null)
          .map(photoCard => (
            <MyPhotoCardComponent
              key={photoCard.id}
              myPhotoCard={photoCard}
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

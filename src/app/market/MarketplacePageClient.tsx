// app/market/MarketplacePageClient.tsx
"use client";

import { useQueryClient } from "@tanstack/react-query";
import { photoCardKeys } from "@/utils/queryKeys";
import MarketplaceHeader from "@/components/market/list/MarketplaceHeader";
import CardGrid from "@/components/market/list/CardGrid";
import { SellerPage } from "@/components/market/list/seller/SellerPage";
import SellForm from "@/components/market/list/seller/SaleForm";
import { useState, useEffect, useRef } from "react";
import { Grade, Genre, SaleCardStatus, Sort, SaleCardDto } from "@/types/photocard.types";
import ResponsiveForm from "@/components/common/responsiveLayout/responsiveForm/ResponsiveForm";
import { useRouter } from "next/navigation";
import { useMarketplacePhotoCards } from "@/hooks/market/list/useMarketplacePhotoCards";
import useUserStore from "@/store/useUserStore";
import { CommonModal } from "@/components/common/modal/CommonModal";

type FilterValue<T> = T | "default";

export default function MarketplacePageClient() {
  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  //무한 스크롤로 전달하는 필터링 상태들
  const [searchTerm, setSearchTerm] = useState("");
  const [grade, setGrade] = useState<FilterValue<Grade>>("default");
  const [genre, setGenre] = useState<FilterValue<Genre>>("default");
  const [status, setStatus] = useState<FilterValue<SaleCardStatus>>("default");
  const [sort, setSort] = useState<Sort>("recent");

  // ✅ 무한스크롤 데이터 가져오기
  const { photoCards, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch } =
    useMarketplacePhotoCards({
      keyword: searchTerm,
      grade,
      genre,
      status,
      sort,
    });

  // 로그인 유저 정보 가져오기
  const { userInfo, isAuthenticated } = useUserStore();

  const [isSellerPageOpen, setIsSellerPageOpen] = useState(false);
  const [isSellFormOpen, setIsSellFormOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<SaleCardDto | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOpenMyPhotoList = () => {
    if (!isAuthenticated || !userInfo) {
      setIsLoginModalOpen(true);
      setIsSellerPageOpen(false);
      return;
    }
    setIsSellerPageOpen(true);
    setSelectedCard(null);
  };

  const handleCardSelect = (converted: SaleCardDto) => {
    setSelectedCard(converted);
    setIsSellerPageOpen(false);
    setIsSellFormOpen(true);
  };

  const handleSellFormClose = () => {
    setIsSellFormOpen(false);
    setSelectedCard(null);

    // ✅ 판매 등록 후 서버 데이터 반영을 위해 캐시 무효화
    queryClient.invalidateQueries({ queryKey: photoCardKeys.all });
    refetch();
  };

  // ✅ 무한스크롤 옵저버 등록
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: document.querySelector(".overflow-y-scroll"),
        threshold: 0.1,
      }
    );

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <MarketplaceHeader
        photoCards={photoCards}
        onClickSellButton={handleOpenMyPhotoList}
        onFilterChange={({ searchTerm, grade, genre, isSoldOut, orderBy }) => {
          setSearchTerm(searchTerm);
          setGrade(grade);
          setGenre(genre);
          setStatus(isSoldOut);

          // orderBy 변환만 필요
          const sortMap: Record<typeof orderBy, Sort> = {
            latest: "recent",
            oldest: "old",
            expensive: "expensive",
            cheap: "cheap",
          };

          setSort(sortMap[orderBy]);
        }}
      />
      <CardGrid
        photoCards={photoCards}
        isLoading={isLoading}
        onCardClick={card => {
          if (isAuthenticated || userInfo) {
            router.push(`/market/${card.saleCardId}`);
          } else {
            setIsLoginModalOpen(true);
          }
        }}
      />
      <CommonModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title="로그인이 필요합니다."
        desc={
          <>
            로그인 하시겠습니까?
            <br />
            다양한 서비스를 편리하게 이용하실 수 있습니다.
          </>
        }
        btnText="확인"
        btnClick={() => {
          setIsLoginModalOpen(false);
          router.push("/auth/login");
        }}
      />
      {/* 무한스크롤 로딩 감지 지점 */}
      <div ref={loadMoreRef} className="w-[100%] py-4 flex justify-center">
        {isFetchingNextPage && <p className="text-main">데이터를 불러오는 중...</p>}
      </div>

      {isSellerPageOpen && (
        <SellerPage
          isOpen={isSellerPageOpen}
          onClose={() => setIsSellerPageOpen(false)}
          setSelectedCard={handleCardSelect}
        />
      )}

      {isSellFormOpen && selectedCard && (
        <>
          <ResponsiveForm
            title="나의 포토카드 판매하기"
            isOpen={isSellFormOpen}
            onClose={handleSellFormClose}
          >
            <SellForm
              data={selectedCard}
              onSubmit={handleSellFormClose} // 판매 성공 후 모달 닫기용
              onCancel={handleSellFormClose}
            />
          </ResponsiveForm>
        </>
      )}
    </>
  );
}

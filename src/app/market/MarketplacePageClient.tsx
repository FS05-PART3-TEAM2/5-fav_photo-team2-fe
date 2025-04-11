// app/market/MarketplacePageClient.tsx
"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyInfoApi } from "@/services/market/getMyInfoApi";
import { photoCardKeys } from "@/utils/queryKeys";
import MarketplaceHeader from "@/components/market/list/MarketplaceHeader";
import CardGrid from "@/components/market/list/CardGrid";
import { SellerPage } from "@/components/market/list/seller/SellerPage";
import SellForm from "@/components/market/list/seller/SaleForm";
import { useState, useEffect, useRef } from "react";
import { Grade, Genre, SaleCardStatus, Sort, SaleCardDto } from "@/types/photocard.types";
import ResponsiveForm from "@/components/common/responsiveLayout/responsiveForm/ResponsiveForm";
import { useSnackbarStore } from "@/store/useSnackbarStore";
import { useRouter } from "next/navigation";
import { useMarketplacePhotoCards } from "@/hooks/market/list/useMarketplacePhotoCards";

type FilterValue<T> = T | "default";

export default function MarketplacePageClient() {
  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbarStore();

  //무한 스크롤로 전달하는 필터링 상태들
  const [searchTerm, setSearchTerm] = useState("");
  const [grade, setGrade] = useState<FilterValue<Grade>>("default");
  const [genre, setGenre] = useState<FilterValue<Genre>>("default");
  const [status, setStatus] = useState<FilterValue<SaleCardStatus>>("default");
  const [sort, setSort] = useState<Sort>("recent");

  // ✅ 무한스크롤 데이터 가져오기
  const { photoCards, fetchNextPage, hasNextPage, isFetchingNextPage } = useMarketplacePhotoCards({
    keyword: searchTerm,
    grade,
    genre,
    status,
    sort,
  });

  // 로그인 유저 정보 가져오기
  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMyInfoApi(),
    retry: false, // 로그인 안 되어있을 때 무한 재시도 방지
  });

  const [isSellerPageOpen, setIsSellerPageOpen] = useState(false);
  const [isSellFormOpen, setIsSellFormOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<SaleCardDto | null>(null);

  const handleOpenMyPhotoList = () => {
    if (!user) {
      openSnackbar("ERROR", "로그인 후 이용해주세요.");
      router.push("/auth/login");
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
          setStatus(isSoldOut); // 이제 타입이 맞습니다

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
      <CardGrid photoCards={photoCards} />

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
          <ResponsiveForm title="판매 등록" isOpen={isSellFormOpen} onClose={handleSellFormClose}>
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

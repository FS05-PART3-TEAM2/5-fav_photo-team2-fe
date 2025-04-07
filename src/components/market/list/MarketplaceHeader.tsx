import { useState, useEffect } from "react";
import Image from "next/image";
import ThinBtn from "@/components/common/button/ThinBtn";
import Search from "@/components/common/input/Search";
import Filter from "@/components/common/filter/Filter";
import Order from "@/components/common/filter/Order";
import { FILTER_CONFIG } from "@/components/common/filter/constants";
import { MarketplacePhotoCardDto } from "@/types/photocard.types";
import FilterModal from "@/components/common/filter/FilterModal";
import { buildMarketCountUrl } from "@/components/common/filter/FilterUtils";

interface MarketplaceHeaderProps {
  photoCards: MarketplacePhotoCardDto[];
  setFilteredCards: (cards: MarketplacePhotoCardDto[]) => void;
}

export default function MarketplaceHeader({
  photoCards,
  setFilteredCards,
}: MarketplaceHeaderProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [grade, setGrade] = useState<keyof typeof FILTER_CONFIG.filter.grade.options>("default");
  const [genre, setGenre] = useState<keyof typeof FILTER_CONFIG.filter.genre.options>("default");
  const [isSoldOut, setIsSoldOut] =
    useState<keyof typeof FILTER_CONFIG.filter.isSoldOut.options>("default");
  const [orderBy, setOrderBy] = useState<"latest" | "oldest" | "expensive" | "cheap">("latest");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // 필터 변경 핸들러 (FilterModal에서 사용)
  const handleFilterChange = (
    filterName: "grade" | "genre" | "isSoldOut" | "tradeStatus",
    value: string
  ) => {
    if (filterName === "grade") {
      setGrade(value as keyof typeof FILTER_CONFIG.filter.grade.options);
    } else if (filterName === "genre") {
      setGenre(value as keyof typeof FILTER_CONFIG.filter.genre.options);
    } else if (filterName === "isSoldOut") {
      setIsSoldOut(value as keyof typeof FILTER_CONFIG.filter.isSoldOut.options);
    }
  };

  // 필터링 및 정렬 함수
  useEffect(() => {
    let filteredCards = [...photoCards];

    // 검색어 필터링
    if (searchTerm) {
      filteredCards = filteredCards.filter(card =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // grade 필터링
    if (grade !== "default") {
      filteredCards = filteredCards.filter(card => card.grade === grade);
    }

    // genre 필터링
    if (genre !== "default") {
      filteredCards = filteredCards.filter(card => card.genre === genre);
    }

    // isSoldOut 필터링
    if (isSoldOut !== "default") {
      filteredCards = filteredCards.filter(card =>
        isSoldOut === "SOLD_OUT" ? card.status === "SOLD_OUT" : card.status !== "SOLD_OUT"
      );
    }
    // 정렬
    if (orderBy === "latest") {
      filteredCards = filteredCards.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (orderBy === "oldest") {
      filteredCards = filteredCards.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (orderBy === "expensive") {
      filteredCards = filteredCards.sort((a, b) => b.price - a.price);
    } else if (orderBy === "cheap") {
      filteredCards = filteredCards.sort((a, b) => a.price - b.price);
    }

    setFilteredCards(filteredCards);
  }, [searchTerm, grade, genre, isSoldOut, orderBy, photoCards, setFilteredCards]);

  return (
    <>
      <div className="hidden md:flex pb-[20px] mb-[20px] border-b-[2px] border-white">
        <div className="hidden md:flex justify-between w-full">
          <div className="font-BR-B whitespace-nowrap text-[48px] lg:text-[62px]">마켓플레이스</div>
          <div className="flex items-center w-[345px] md:w-[342px] lg:w-[440px]">
            {/* SEJEONG: 판매자 페이지 완성되면 버튼에 페이지 이동 추가하기 */}
            <ThinBtn onClick={() => console.log("버튼 클릭됨!")}>포토카드 판매하기</ThinBtn>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full p-4 shadow-md sm:flex sm:justify-center md:hidden z-[999]">
        <ThinBtn onClick={() => console.log("버튼 클릭됨!")}>포토카드 판매하기</ThinBtn>
      </div>

      <div className="flex flex-wrap md:flex-nowrap items-center justify-between my-[20px] gap-[15px] md:gap-[30px] lg:gap-[60px]">
        <div className="w-full md:w-auto">
          <Search onSearch={setSearchTerm} />
        </div>

        <div className="w-full border-t border-gray-400 md:hidden" />
        {/* 모바일에서는 필터 아이콘만 보이도록 설정 */}
        <div className="md:hidden">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="border border-gray-200 p-[3px]  cursor-pointer"
          >
            <Image src="/assets/icons/filter.png" alt="필터 아이콘" width={35} height={35} />
          </button>
        </div>
        <div className="hidden md:flex flex-nowrap grow gap-[25px] lg:gap-[45px]">
          <Filter name="grade" value={grade} onFilter={setGrade} />
          <Filter name="genre" value={genre} onFilter={setGenre} />
          <Filter name="isSoldOut" value={isSoldOut} onFilter={setIsSoldOut} />
        </div>
        <Order orderBy={orderBy} setOrderBy={setOrderBy} />
      </div>
      {isFilterModalOpen && (
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          selectedFilters={{ grade, genre, isSoldOut }}
          onFilterChange={handleFilterChange}
          availableFilters={["grade", "genre", "isSoldOut"]}
          buildCountUrl={buildMarketCountUrl}
        />
      )}
    </>
  );
}

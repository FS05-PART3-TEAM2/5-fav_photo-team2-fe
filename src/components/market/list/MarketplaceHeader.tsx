import { useState, useEffect } from "react";
import ThinBtn from "@/components/common/button/ThinBtn";
import Search from "@/components/common/input/Search";
import Filter from "@/components/common/filter/Filter";
import Order from "@/components/common/filter/Order";
import { FILTER_CONFIG } from "@/components/common/filter/constants";
import { UpdateSaleCardResponseDto } from "@/types/photocard.types";
// import FilterModal from "@/components/common/filter/FilterModal";

interface MarketplaceHeaderProps {
  photoCards: UpdateSaleCardResponseDto[];
  setFilteredCards: (cards: UpdateSaleCardResponseDto[]) => void;
}

// 한글->영어->한글로 변환해줘야 genre 필터 동작?? -> 백엔드 데이터 들어오면 수정할수도...
const GENRE_MAP_KO_TO_EN: Record<string, string> = {
  여행: "travel",
  풍경: "landscape",
  인물: "portrait",
  사물: "object",
};

const GENRE_MAP_EN_TO_KO = Object.fromEntries(
  Object.entries(GENRE_MAP_KO_TO_EN).map(([ko, en]) => [en, ko])
);

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
      filteredCards = filteredCards.filter(card => card.genre === GENRE_MAP_EN_TO_KO[genre]);
    }

    // isSoldOut 필터링
    if (isSoldOut !== "default") {
      filteredCards = filteredCards.filter(card =>
        isSoldOut === "soldOut" ? card.status === "SOLD_OUT" : card.status !== "SOLD_OUT"
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
      <div className="hidden md:flex pb-[20px] mb-[20px] border-b">
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

      <div className="flex items-center justify-between my-[20px] gap-[30px] lg:gap-[60px]">
        <Search onSearch={setSearchTerm} />
        <div className="flex grow">
          <Filter name="grade" value={grade} onFilter={setGrade} />
          <Filter name="genre" value={genre} onFilter={setGenre} />
          <Filter name="isSoldOut" value={isSoldOut} onFilter={setIsSoldOut} />
        </div>
        <Order orderBy={orderBy} setOrderBy={setOrderBy} />
      </div>
    </>
  );
}

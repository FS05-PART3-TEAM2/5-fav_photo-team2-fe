import { GenreFilter, GradeFilter } from "@/components/my-page/CardFilter";
import FilterSection from "@/components/my-page/FilterSection";
import MyPhotoCard from "@/components/my-page/MyPhotoCard";
import { useEffect } from "react";
import { Grade, MyPhotoCardDto } from "@/types/photocard.types";
import { useState } from "react";
import { FILTER_CONFIG } from "../../filter/constants";

interface MyPhotoListContentProps {
  title: string;
  onCardClick: (cardId: string, cardData: MyPhotoCardDto) => void;
}

// TODO: 마이갤러리 조회 api 붙여야됨
export const MyPhotoListContent: React.FC<MyPhotoListContentProps> = ({ title, onCardClick }) => {
  // TODO: 필터링 부분 현재 임의로 목데이터에서 필터링으로 들어가있음
  // TODO: 하윤님쪽 api 연결되면 그거에 맞춰서 다시 수정하기
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>("default");
  const [genreFilter, setGenreFilter] = useState<GenreFilter>("default");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCards, setFilteredCards] = useState<MyPhotoCardDto[]>(myPhotoCards);

  useEffect(() => {
    // 검색어와 필터를 적용하여 카드 필터링
    const filtered = myPhotoCards.filter(myPhotoCard => {
      // 등급 필터 적용
      if (gradeFilter !== "default") {
        if (myPhotoCard.grade !== gradeFilter) {
          return false;
        }
      }

      // 장르 필터 적용
      if (genreFilter !== "default") {
        const genreKey = genreFilter as keyof typeof FILTER_CONFIG.filter.genre.options;
        const genreValue = FILTER_CONFIG.filter.genre.options[genreKey];

        if (myPhotoCard.genre !== genreValue) {
          return false;
        }
      }

      // 검색어 적용 (카드 이름 또는 제작자로 검색)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          myPhotoCard.name.toLowerCase().includes(query) ||
          myPhotoCard.creator.toLowerCase().includes(query)
        );
      }

      return true;
    });

    setFilteredCards(filtered);
  }, [gradeFilter, genreFilter, searchQuery, myPhotoCards]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCardClick = (cardId: string) => {
    // TODO: myPhotoCards 데이터 api 데이터로 수정해야됨
    const selectedCardData = myPhotoCards.find(card => card.id === cardId);
    if (selectedCardData) {
      onCardClick(cardId, selectedCardData);
    }
  };

  return (
    <div className="w-[100%] h-full flex flex-col">
      {/* 타이틀 영역 */}
      <div className="w-[100%] pb-[15px] md:pb-[40px] flex-shrink-0">
        <p className="text-gray-300 text-[14px] md:text-[16px] lg:text-[24px] font-BR-B">
          마이갤러리
        </p>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="w-[100%] flex flex-col  gap-[30px] md:gap-[20px] flex-1">
        {/* 타이틀 */}
        <div className="lg:pr-[48px] flex-shrink-0">
          <div className={titleSx}>{title}</div>
        </div>

        <div className="w-[100%] flex flex-col gap-[4px] md:gap-[20px] h-[calc(100vh-340px)]">
          {/* 필터 영역 */}
          <div className="flex-shrink-0">
            <FilterSection
              gradeFilter={gradeFilter}
              genreFilter={genreFilter}
              onGradeFilterChange={setGradeFilter}
              onGenreFilterChange={setGenreFilter}
              onSearch={handleSearch}
            />
          </div>

          {/* 스크롤 영역 */}
          <div className={contentScrollWrapperSx}>
            <div className="grid grid-cols-2 gap-[5px] md:gap-5 lg:gap-10">
              {/* TODO: 여기도 api 데이터로 수정 */}
              {filteredCards.map(myPhotoCard => (
                <MyPhotoCard
                  key={myPhotoCard.id}
                  myPhotoCard={myPhotoCard}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const titleSx =
  "w-[100%] border-b-none md:border-b-[2px] border-gray-100 pb-[0px] md:pb-[20px] font-BR-B text-white text-[26px] md:text-[40px] lg:text-[46px] leading-none";
const contentScrollWrapperSx =
  "w-[100%] h-full overflow-y-auto lg:pr-[40px] [&::-webkit-scrollbar]:w-[0px] lg:[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full";

/* 임시 카드 데이터
 * TODO : 포토카드 목록 데이터 API 연동 후 데이터 변경
 */
const myPhotoCards: MyPhotoCardDto[] = [
  {
    id: "2",
    grade: "COMMON" as Grade,
    genre: "풍경",
    name: "우리집 앞마당",
    price: 4,
    availableAmount: 1,
    totalAmount: 10,
    creator: "미쓰손",
    imageUrl: "/assets/images/mock1.png",
  },
  {
    id: "3",
    grade: "SUPER_RARE" as Grade,
    genre: "풍경",
    name: "How Far I'll Go",
    price: 4,
    availableAmount: 1,
    totalAmount: 10,
    creator: "랍스타",
    imageUrl: "/assets/images/mock1.png",
  },
  {
    id: "4",
    grade: "LEGENDARY" as Grade,
    genre: "인물",
    name: "웃는 모습",
    price: 8,
    availableAmount: 1,
    totalAmount: 10,
    creator: "프로여행러",
    imageUrl: "/assets/images/mock1.png",
  },
  {
    id: "5",
    grade: "COMMON" as Grade,
    genre: "동물",
    name: "귀여운 강아지",
    price: 3,
    availableAmount: 2,
    totalAmount: 10,
    creator: "미쓰손",
    imageUrl: "/assets/images/mock1.png",
  },
  {
    id: "6",
    grade: "RARE" as Grade,
    genre: "음식",
    name: "맛있는 파스타",
    price: 5,
    availableAmount: 1,
    totalAmount: 10,
    creator: "랍스타",
    imageUrl: "/assets/images/mock1.png",
  },
  {
    id: "7",
    grade: "SUPER_RARE" as Grade,
    genre: "풍경",
    name: "일몰",
    price: 7,
    availableAmount: 1,
    totalAmount: 10,
    creator: "프로여행러",
    imageUrl: "/assets/images/mock1.png",
  },
  {
    id: "8",
    grade: "COMMON" as Grade,
    genre: "인물",
    name: "친구들과 함께",
    price: 3,
    availableAmount: 3,
    totalAmount: 10,
    creator: "미쓰손",
    imageUrl: "/assets/images/mock1.png",
  },
  {
    id: "9",
    grade: "LEGENDARY" as Grade,
    genre: "풍경",
    name: "오로라",
    price: 10,
    availableAmount: 1,
    totalAmount: 10,
    creator: "랍스타",
    imageUrl: "/assets/images/mock1.png",
  },
  {
    id: "10",
    grade: "RARE" as Grade,
    genre: "동물",
    name: "잠자는 고양이",
    price: 5,
    availableAmount: 2,
    totalAmount: 10,
    creator: "프로여행러",
    imageUrl: "/assets/images/mock1.png",
  },
  {
    id: "11",
    grade: "SUPER_RARE" as Grade,
    genre: "음식",
    name: "홈메이드 케이크",
    price: 6,
    availableAmount: 1,
    totalAmount: 10,
    creator: "미쓰손",
    imageUrl: "/assets/images/mock1.png",
  },
  {
    id: "12",
    grade: "COMMON" as Grade,
    genre: "풍경",
    name: "도시야경",
    price: 4,
    availableAmount: 2,
    totalAmount: 10,
    creator: "랍스타",
    imageUrl: "/assets/images/mock1.png",
  },
  {
    id: "13",
    grade: "LEGENDARY" as Grade,
    genre: "인물",
    name: "공연현장",
    price: 9,
    availableAmount: 1,
    totalAmount: 10,
    creator: "프로여행러",
    imageUrl: "/assets/images/mock1.png",
  },
  {
    id: "14",
    grade: "RARE" as Grade,
    genre: "동물",
    name: "새들의 군무",
    price: 6,
    availableAmount: 1,
    totalAmount: 10,
    creator: "미쓰손",
    imageUrl: "/assets/images/mock1.png",
  },
  {
    id: "15",
    grade: "SUPER_RARE" as Grade,
    genre: "음식",
    name: "디저트 플레이팅",
    price: 7,
    availableAmount: 1,
    totalAmount: 10,
    creator: "랍스타",
    imageUrl: "/assets/images/mock1.png",
  },
  {
    id: "16",
    grade: "COMMON" as Grade,
    genre: "풍경",
    name: "산정상",
    price: 3,
    availableAmount: 2,
    totalAmount: 10,
    creator: "프로여행러",
    imageUrl: "/assets/images/mock1.png",
  },
  {
    id: "17",
    grade: "LEGENDARY" as Grade,
    genre: "인물",
    name: "졸업식",
    price: 8,
    availableAmount: 1,
    totalAmount: 10,
    creator: "미쓰손",
    imageUrl: "/assets/images/mock1.png",
  },
  {
    id: "18",
    grade: "RARE" as Grade,
    genre: "동물",
    name: "수족관",
    price: 5,
    availableAmount: 1,
    totalAmount: 10,
    creator: "랍스타",
    imageUrl: "/assets/images/mock1.png",
  },
];

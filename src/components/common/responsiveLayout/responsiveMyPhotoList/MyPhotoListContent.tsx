import { MyPhotoCardDto } from "@/types/photocard.types";
import { useMyPhotoCards } from "@/hooks/my-page/useMyPhotoCards";
import CardFilter from "@/components/my-page/my-photo/PhotoCardFilter";

interface MyPhotoListContentProps {
  title: string;
  onCardClick: (cardId: string, cardData: MyPhotoCardDto) => void;
}

// XXX: 하윤님 마이갤러리 api + 컴포넌트로 보유하고 있는 카드 보여줌.
// TODO: 포토카드 등록 가능해지면 등록 테스트 후, 무한스크롤 + 교환제시 모달로 잘 넘어가는지 확인 필요
export const MyPhotoListContent: React.FC<MyPhotoListContentProps> = ({ title, onCardClick }) => {
  // React Query 훅 사용 (초기 로딩용)
  const { myPhotos } = useMyPhotoCards();

  const handleCardClick = (cardId: string) => {
    const selectedCardData = myPhotos.find(card => card.id === cardId);
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

        {/* 필터 + 카드 리스트 영역 */}
        <div className="w-[100%] flex flex-col h-[calc(100vh-340px)]">
          <CardFilter
            onCardClick={handleCardClick}
            className="grid grid-cols-2 mt-[4px] md:mt-[20px] gap-[5px] md:gap-5 lg:gap-10"
          />
        </div>
      </div>
    </div>
  );
};

const titleSx =
  "w-[100%] border-b-none md:border-b-[2px] border-gray-100 pb-[0px] md:pb-[20px] font-BR-B text-white text-[26px] md:text-[40px] lg:text-[46px] leading-none";

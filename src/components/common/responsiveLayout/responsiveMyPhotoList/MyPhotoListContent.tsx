// import { MyPhotoCardDto } from "@/types/photocard.types";

interface MyPhotoListContentProps {
  title: string;
  //   onCardClick: (card: MyPhotoCardDto) => void;
  onCardClick: () => void;
}

// TODO: 마이갤러리 조회 api 붙여야됨
// TODO: 필터 컴포넌트 추가 - 세정님
export const MyPhotoListContent: React.FC<MyPhotoListContentProps> = ({ title, onCardClick }) => {
  return (
    <div className="w-[100%] h-full flex flex-col ">
      <div className="w-[100%] pb-[15px] md:pb-[40px]">
        <p className="text-gray-300 text-[14px] md:text-[16px] lg:text-[24px] font-BR-B">
          마이갤러리
        </p>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="w-[100%] flex flex-col gap-[30px] md:gap-[20px] pb-[40px]">
        {/* 타이틀 */}
        <div className={titleSx}>{title}</div>

        <div className="w-[100%] flex flex-col gap-[20px] md:gap-[40px]">
          {/* 필터 */}
          <div className="w-[100%]">필터 - 세정님 여기 컴포넌트 넣어주시면 됩니다.</div>
          {/* 리스트 */}
          <div className="w-[100%]" onClick={onCardClick}>
            {/* // TODO: 여기 card 클릭을 어떻게 전달할건지 또 문제 */}
            {/* <PhotoCardGrid cards={myPhotoCardList} onCardClick={onClickCard}/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const titleSx =
  "w-[100%] border-b-none md:border-b-[2px] border-gray-100 pb-[0px] md:pb-[20px] font-BR-B text-white text-[26px] md:text-[40px] lg:text-[46px] leading-none";

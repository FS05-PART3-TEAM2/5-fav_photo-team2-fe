import { CardType, PhotoCardDetailDto } from "@/types/photocard.types";
import Image from "next/image";
import CardHeader from "@/components/common/card/CardHeader";
import ThinBtn from "@/components/common/button/ThinBtn";
import { SectionTitle } from "../SectionTitle";

interface OnSaleCardEditFormProps {
  data: PhotoCardDetailDto;
  onClose: () => void;
}

// TODO: 수정하기 api 연결
// TODO: 수정 input 넣기
export const OnSaleCardEditForm: React.FC<OnSaleCardEditFormProps> = ({ data, onClose }) => {
  // XXX: 취소 컨펌 모달 띄울지 고민
  // -> ResponsiveForm 컴포넌트 백드랍 클릭시에도 취소 확인 모달을 띄워줘야하는데, 부모 컴포넌트로 전달할 방법 모르겠어서 일단 보류
  //   const [isCancelEditModalOpen, setIsCancelEditModalOpen] = useState(false);
  //   const handleCancelEditModalOpen = () => {
  //     setIsCancelEditModalOpen(true);
  //   };
  //   const handleCancelEditModalClose = () => {
  //     setIsCancelEditModalOpen(false);
  //   };

  const cardHeaderProps = {
    grade: data.grade,
    genre: data.genre,
    owner: data.userNickname,
    cardType: "details" as CardType,
  };

  return (
    <div className="w-[100%] h-full flex flex-col ">
      {/* 태블릿/데스크탑 타이틀 */}
      <div className="hidden md:block w-[100%] pb-[40px]">
        <p className="text-gray-300 text-[16px] lg:text-[24px] font-BR-B">수정하기</p>
      </div>

      {/* 수정 폼 */}
      <div className="w-[100%] flex flex-col gap-[20px] md:gap-[40px] lg:gap-[80px] pb-[40px]">
        {/* 수정 입력 */}
        <div className="w-[100%] flex flex-col gap-[80px]">
          {/* 기본정보 수정*/}
          <div className="w-[100%] flex flex-col gap-[20px] md:gap-[40px]">
            <SectionTitle title={data.name} />

            <div className={cardDetailContainerSx}>
              <div className="w-[100%] h-fit min-h-[260px] max-h-[330px] aspect-square relative">
                <Image
                  src={data.imageUrl}
                  alt={data.name}
                  fill
                  sizes="100%"
                  className="object-cover"
                />
              </div>

              <div className={cardDetailWrapperSx}>
                <CardHeader {...cardHeaderProps} />
                <div className="w-[100%] flex flex-col gap-[20px] pt-[30px] border-t-[1px] border-gray-400">
                  <div className={cardDetailInputWrapperSx}>
                    <p className="text-18-20-light">총 판매 수량</p>
                    <p className="text-18-20-light">/{data.totalAmount}</p>
                  </div>

                  <div className={cardDetailInputWrapperSx}>
                    <p className="text-18-20-light">장당 가격</p>
                    <p className="text-18-20-light">/장당 가격 인풋</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 교환 희망 정보 수정*/}
          <div className={exchangeDetailWrapperSx}>
            <div className="w-[100%] pb-[10px] border-b-[2px] border-gray-100">
              <p className="market-detail-subtitle">교환 희망 정보</p>
            </div>
            <div>교환 희망정보 인풋</div>
          </div>
        </div>

        {/* 수정 버튼 */}
        <div className={btnWrapperSx}>
          <ThinBtn buttonType="Secondary" onClick={onClose}>
            취소하기
          </ThinBtn>
          <ThinBtn onClick={() => {}}>수정하기</ThinBtn>
        </div>
      </div>
    </div>
  );
};

const cardDetailContainerSx = "w-[100%] h-full flex flex-col md:flex-row gap-[20px] lg:gap-[40px]";
const cardDetailWrapperSx = "w-[100%] md:w-[342px] lg:w-[440px] h-fit flex flex-shrink-0 flex-col";
const cardDetailInputWrapperSx = "w-[100%] flex items-center justify-between gap-[20px] ";
const exchangeDetailWrapperSx = "w-[100%] flex flex-col gap-[40px]";
const btnWrapperSx = "  w-[100%] flex gap-[15px] md:gap-[20px] lg:gap-[40px]";

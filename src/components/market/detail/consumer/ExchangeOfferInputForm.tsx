"use client";

import { MyPhotoCardDto } from "@/types/photocard.types";
import ThinBtn from "@/components/common/button/ThinBtn";
import { SectionTitle } from "../SectionTitle";
import CommonTextarea from "@/components/common/input/CommonTextarea";
import MyPhotoCard from "@/components/my-page/MyPhotoCard";

interface ExchangeOfferInputFormProps {
  data: MyPhotoCardDto;
  inputValue: string;
  isExchangeBtnDisabled: boolean;
  onChange: (value: string) => void;
  onCancel: () => void;
  onExchange: () => void;
}

export const ExchangeOfferInputForm: React.FC<ExchangeOfferInputFormProps> = ({
  data,
  inputValue,
  isExchangeBtnDisabled,
  onChange,
  onCancel,
  onExchange,
}) => {
  // XXX: 취소 컨펌 모달 띄울지 고민
  // -> ResponsiveForm 컴포넌트 백드랍 클릭시에도 취소 확인 모달을 띄워줘야하는데, 부모 컴포넌트로 전달할 방법 모르겠어서 일단 보류
  // const [isCancelOfferModalOpen, setIsCancelOfferModalOpen] = useState(false);
  // const handleCancelOfferModalOpen = () => {
  //   setIsCancelEditModalOpen(true);
  // };
  // const handleCancelOfferModalClose = () => {
  //   setIsCancelEditModalOpen(false);
  // };

  return (
    <div className="w-[100%] h-full flex flex-col">
      {/* 태블릿/데스크탑 타이틀 */}
      <div className="hidden md:block w-[100%] pb-[40px]">
        <p className="text-gray-300 text-[16px] lg:text-[24px] font-BR-B">포토카드 교환하기</p>
      </div>

      {/* 컨텐츠 영역 */}
      <div className={contentContainerSx}>
        <SectionTitle title={data.name} />

        <div className={contentWrapperSx}>
          {/* 선택한 카드 정보 */}
          <div className="w-[100%] md:w-[342px] lg:w-[440px] flex-shrink-0">
            <MyPhotoCard myPhotoCard={data} />
          </div>

          {/* 교환 제시 입력 폼*/}
          <div className={exchangeOfferInputFormSx}>
            <CommonTextarea
              label="교환 제시 내용"
              placeholder="내용을 입력해주세요"
              value={inputValue}
              onChange={onChange}
            />

            {/* 수정 버튼 */}
            <div className={btnWrapperSx}>
              <ThinBtn buttonType="Secondary" onClick={onCancel}>
                취소하기
              </ThinBtn>
              <ThinBtn onClick={onExchange} disabled={isExchangeBtnDisabled}>
                교환하기
              </ThinBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const contentContainerSx = "w-full h-fit flex flex-col gap-[20px] md:gap-[40px] pb-10 md:pb-[0px]";
const contentWrapperSx = "w-full h-fit flex flex-col md:flex-row gap-[20px] lg:gap-[40px]";
const exchangeOfferInputFormSx = "w-full  h-fit flex flex-col gap-[40px] md:gap-[60px] ";
const btnWrapperSx = "w-[100%] flex gap-[15px] md:gap-[20px]";

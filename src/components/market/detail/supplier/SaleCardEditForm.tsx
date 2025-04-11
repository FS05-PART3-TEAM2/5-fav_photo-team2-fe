"use client";

import { CardType, SaleCardDetailDto } from "@/types/photocard.types";
import { useEditSaleCardForm } from "@/hooks/market/detail/useEditSaleCardForm";
import Image from "next/image";
import CardHeader from "@/components/common/card/CardHeader";
import ThinBtn from "@/components/common/button/ThinBtn";
import { SectionTitle } from "../SectionTitle";
import AmountInput from "@/components/common/input/AmountInput";
import PriceInput from "@/components/common/input/PriceInput";
import CommonDropdownInput from "@/components/common/input/CommonDropdownInput";
import CommonTextarea from "@/components/common/input/CommonTextarea";
import { useState } from "react";

interface SaleCardEditFormProps {
  data: SaleCardDetailDto;
  onClose: () => void;
}

export const SaleCardEditForm: React.FC<SaleCardEditFormProps> = ({ data, onClose }) => {
  const {
    params,
    isDisabled,
    handleQuantityChange,
    handlePriceChange,
    handleGradeChange,
    handleGenreChange,
    handleDescriptionChange,
    handleUpdateSaleCard,
  } = useEditSaleCardForm(data, onClose);

  // 현재 열린 드롭다운 상태 관리
  const [openDropdown, setOpenDropdown] = useState<"grade" | "genre" | null>(null);

  const handleDropdownOpen = (dropdownType: "grade" | "genre") => {
    setOpenDropdown(dropdownType);
  };

  const handleDropdownClose = () => {
    setOpenDropdown(null);
  };

  const cardHeaderProps = {
    grade: data.grade,
    genre: data.genre,
    creator: data.creatorNickname,
    cardType: "details" as CardType,
  };

  // XXX: 취소 컨펌 모달 띄울지 고민
  // -> ResponsiveForm 컴포넌트 백드랍 클릭시에도 취소 확인 모달을 띄워줘야하는데, 부모 컴포넌트로 전달할 방법 모르겠어서 일단 보류
  // const [isCancelEditModalOpen, setIsCancelEditModalOpen] = useState(false);
  // const handleCancelEditModalOpen = () => {
  //   setIsCancelEditModalOpen(true);
  // };
  // const handleCancelEditModalClose = () => {
  //   setIsCancelEditModalOpen(false);
  // };

  return (
    <div className="w-[100%] h-full flex flex-col ">
      {/* 태블릿/데스크탑 타이틀 */}
      <div className="hidden md:block w-[100%] pb-[40px]">
        <p className="text-gray-300 text-[16px] lg:text-[24px] font-BR-B">수정하기</p>
      </div>

      {/* 수정 폼 */}
      <div className="w-[100%] flex flex-col gap-[40px] md:gap-[60px] pb-[40px]">
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
                    <p className="text-18-20-normal">총 판매 수량</p>
                    <div className="w-[202px] lg:w-[245px] h-[45px] lg:h-[50px] flex items-center justify-between gap-[15px] lg:gap-[20px]">
                      <AmountInput
                        onChange={handleQuantityChange}
                        value={params.quantity}
                        max={data.totalOwnAmount}
                      />
                      <div className="w-fit flex flex-col flex-shrink-0">
                        <p className="text-18-20-bold">/{data.totalOwnAmount}</p>
                        <p className="text-[12px] lg:text-[14px] text-gray-200 font-light">
                          최대 {data.totalOwnAmount}장
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={cardDetailInputWrapperSx}>
                    <p className="text-18-20-normal">장당 가격</p>
                    <div className="w-[202px] lg:w-[245px] h-[45px] lg:h-[50px] flex items-center">
                      <PriceInput onChange={handlePriceChange} value={params.price} />
                    </div>
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
            <div className="w-[100%] flex flex-col gap-[30px]">
              <div className="w-[100%] flex flex-col md:flex-row gap-[30px] md:gap-[20px] lg:gap-[40px] items-center">
                <CommonDropdownInput
                  inputLabel="grade"
                  value={params.exchangeOffer.grade}
                  onChange={handleGradeChange}
                  isOpen={openDropdown === "grade"}
                  onOpen={() => handleDropdownOpen("grade")}
                  onClose={handleDropdownClose}
                />
                <CommonDropdownInput
                  inputLabel="genre"
                  value={params.exchangeOffer.genre}
                  onChange={handleGenreChange}
                  isOpen={openDropdown === "genre"}
                  onOpen={() => handleDropdownOpen("genre")}
                  onClose={handleDropdownClose}
                />
              </div>
              <CommonTextarea
                label="교환 희망 설명"
                placeholder="설명을 입력해주세요"
                value={params.exchangeOffer.description}
                onChange={handleDescriptionChange}
              />
            </div>
          </div>
        </div>

        {/* 수정 버튼 */}
        <div className={btnWrapperSx}>
          <ThinBtn buttonType="Secondary" onClick={onClose}>
            취소하기
          </ThinBtn>
          <ThinBtn onClick={handleUpdateSaleCard} disabled={isDisabled}>
            수정하기
          </ThinBtn>
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

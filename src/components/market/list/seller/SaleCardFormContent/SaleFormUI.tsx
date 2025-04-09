//UI 전용 컴포넌트
// components/SaleCardForm/SaleCardFormContent.tsx
"use client";

import Image from "next/image";
import CardHeader from "@/components/common/card/CardHeader";
import ThinBtn from "@/components/common/button/ThinBtn";
import { SectionTitle } from "@/components/market/detail/SectionTitle";
import AmountInput from "@/components/common/input/AmountInput";
import PriceInput from "@/components/common/input/PriceInput";
import CommonDropdownInput from "@/components/common/input/CommonDropdownInput";
import CommonTextarea from "@/components/common/input/CommonTextarea";
import { CardType, SaleCardDto, Genre, Grade } from "@/types/photocard.types";

interface Props {
  data: SaleCardDto;
  params: {
    quantity: number;
    price: number;
    exchangeOffer: {
      grade: Grade;
      genre: Genre;
      description: string;
    };
  };
  isDisabled: boolean;
  openDropdown: "grade" | "genre" | null;
  onDropdownOpen: (dropdownType: "grade" | "genre") => void;
  onDropdownClose: () => void;
  onQuantityChange: (value: number) => void;
  onPriceChange: (value: number) => void;
  onGradeChange: (value: string) => void;
  onGenreChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export const SaleFormUI = ({
  data,
  params,
  isDisabled,
  openDropdown,
  onDropdownOpen,
  onDropdownClose,
  onQuantityChange,
  onPriceChange,
  onGradeChange,
  onGenreChange,
  onDescriptionChange,
  onCancel,
  onSubmit,
}: Props) => {
  console.log("✅ card데이터확인 in SaleFormUI:", data);

  const cardHeaderProps = {
    grade: data.grade,
    genre: data.genre,
    creator: data.owner.nickname,
    cardType: "details" as CardType,
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* 타이틀 */}
      <div className="hidden md:block w-full pb-[40px]">
        <p className="text-gray-300 text-[16px] lg:text-[24px] font-BR-B">나의 포토카드 판매하기</p>
      </div>

      <div className="w-full flex flex-col gap-[40px] md:gap-[60px] pb-[40px]">
        <div className="flex flex-col gap-[80px]">
          {/* 기본정보 */}
          <div className="flex flex-col gap-[20px] md:gap-[40px]">
            <SectionTitle title={data.name} />
            <div className={cardDetailContainerSx}>
              <div className="w-full min-h-[260px] max-h-[330px] aspect-square relative">
                <Image
                  src={data.image}
                  alt={data.name}
                  width={345}
                  height={259}
                  className="object-cover w-[100%] md:w-[342px] lg:w-[440px] h-full"
                />
              </div>
              <div className={cardDetailWrapperSx}>
                <CardHeader {...cardHeaderProps} />
                <div className="pt-[30px] border-t-[1px] border-gray-400 flex flex-col gap-[20px]">
                  <div className={cardDetailInputWrapperSx}>
                    <p className="text-18-20-normal">총 판매 수량</p>
                    <div className="flex items-center gap-[20px]">
                      <AmountInput
                        value={params.quantity}
                        onChange={onQuantityChange}
                        max={data.total}
                      />
                      <div className="flex flex-col">
                        <p className="text-18-20-bold">/{data.total}</p>
                        <p className="text-[12px] lg:text-[14px] text-gray-200 font-light">
                          최대 {data.total}장
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={cardDetailInputWrapperSx}>
                    <p className="text-18-20-normal">장당 가격</p>
                    <div className="w-[202px] lg:w-[245px]">
                      <PriceInput value={params.price} onChange={onPriceChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 교환 희망 정보 */}
          <div className={exchangeDetailWrapperSx}>
            <div className="pb-[10px] border-b-[2px] border-gray-100">
              <p className="market-detail-subtitle">교환 희망 정보</p>
            </div>
            <div className="flex flex-col gap-[30px]">
              <div className="flex flex-col md:flex-row gap-[30px] items-center">
                <CommonDropdownInput
                  inputLabel="grade"
                  value={params.exchangeOffer.grade}
                  isOpen={openDropdown === "grade"}
                  onOpen={() => onDropdownOpen("grade")}
                  onClose={onDropdownClose}
                  onChange={onGradeChange}
                />
                <CommonDropdownInput
                  inputLabel="genre"
                  value={params.exchangeOffer.genre}
                  isOpen={openDropdown === "genre"}
                  onOpen={() => onDropdownOpen("genre")}
                  onClose={onDropdownClose}
                  onChange={onGenreChange}
                />
              </div>
              <CommonTextarea
                label="교환 희망 설명"
                value={params.exchangeOffer.description}
                onChange={onDescriptionChange}
                placeholder="설명을 입력해주세요"
              />
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className={btnWrapperSx}>
          <ThinBtn buttonType="Secondary" onClick={onCancel}>
            취소하기
          </ThinBtn>
          <ThinBtn onClick={onSubmit} disabled={isDisabled}>
            판매하기
          </ThinBtn>
        </div>
      </div>
    </div>
  );
};

const cardDetailContainerSx = "w-full flex flex-col md:flex-row gap-[40px]";
const cardDetailWrapperSx = "w-full md:w-[342px] lg:w-[440px] flex flex-col";
const cardDetailInputWrapperSx = "w-full flex items-center justify-between gap-[20px]";
const exchangeDetailWrapperSx = "w-full flex flex-col gap-[40px]";
const btnWrapperSx = "w-full flex gap-[20px]";

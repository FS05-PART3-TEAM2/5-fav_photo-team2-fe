import { useState } from "react";
import { AmountText, CardType, SaleCardDetailDto } from "@/types/photocard.types";
import { SectionTitle } from "../SectionTitle";
import Image from "next/image";
import ThickBtn from "@/components/common/button/ThickBtn";
import CardHeader from "@/components/common/card/CardHeader";
import CardDetail from "@/components/common/card/CardDetail";
import { CommonModal } from "@/components/common/modal/CommonModal";
import { PurchaseAmountInput } from "./PurchaseAmountInput";
import { useSaleCardPurchase } from "@/hooks/market/detail/useSaleCardPurchase";

interface CardDetailProps {
  data: SaleCardDetailDto;
}

export const ConsumerCardDetail: React.FC<CardDetailProps> = ({ data }) => {
  const { purchaseAmount, handleChangePurchaseAmount, handlePurchaseSaleCard } =
    useSaleCardPurchase(data.id, data.grade, data.name);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const handlePurchaseModalOpen = () => {
    setIsPurchaseModalOpen(true);
  };
  const handlePurchaseModalClose = () => {
    setIsPurchaseModalOpen(false);
  };
  const handleClickPurchaseBtn = () => {
    handlePurchaseSaleCard(); // 구매로직
    handlePurchaseModalClose(); // 모달닫기
  };
  const purchaseModalTitle = `포토카드 구매`;
  const purchaseModalDesc = `[${data.grade} | ${data.name}] ${purchaseAmount}장을 구매하시겠습니까?`;
  const purchaseModalBtnText = `구매하기`;

  const cardHeaderProps = {
    grade: data.grade,
    genre: data.genre,
    creator: data.userNickname,
    cardType: "details" as CardType,
  };
  const cardDetailProps = {
    description: data.description,
    price: data.price,
    availableAmount: data.availableAmount,
    totalAmount: data.totalAmount,
    amountText: "잔여" as AmountText,
    cardType: "details" as CardType,
  };

  return (
    <div className="w-[100%] flex flex-col gap-[20px] md:gap-[40px] lg:gap-[60px]">
      <SectionTitle title={data.name} />

      <div className={cardDetailContainerSx}>
        <div className="w-[100%] h-[100%] min-h-[260px] max-h-[500px] lg:max-h-[720px] aspect-square relative">
          <Image src={data.imageUrl} alt={data.name} fill sizes="100%" className="object-cover" />
        </div>

        <div className={cardDetailWrapperSx}>
          <div className="w-[100%] flex flex-col ">
            <CardHeader {...cardHeaderProps} />
            <CardDetail {...cardDetailProps} />
            <PurchaseAmountInput
              maxAmount={data.availableAmount}
              price={data.price}
              amount={purchaseAmount}
              onChange={handleChangePurchaseAmount}
            />
          </div>

          <div className="w-[100%]">
            <ThickBtn onClick={handlePurchaseModalOpen} disabled={purchaseAmount <= 0}>
              포토카드 구매하기
            </ThickBtn>
          </div>
        </div>
      </div>
      {/* 구매하기 모달 */}
      {isPurchaseModalOpen && (
        <CommonModal
          isOpen={isPurchaseModalOpen}
          onClose={handlePurchaseModalClose}
          title={purchaseModalTitle}
          desc={purchaseModalDesc}
          btnText={purchaseModalBtnText}
          btnClick={handleClickPurchaseBtn}
        />
      )}
    </div>
  );
};

const cardDetailContainerSx = "w-[100%] h-full flex flex-col md:flex-row gap-[20px] lg:gap-[80px]";
const cardDetailWrapperSx =
  "w-[100%] md:w-[342px] lg:w-[440px] h-full flex flex-shrink-0 flex-col gap-[40px] lg:gap-[80px]";

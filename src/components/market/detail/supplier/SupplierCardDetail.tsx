import { AmountText, CardType, PhotoCardDetailDto } from "@/types/photocard.types";
import { SectionTitle } from "../SectionTitle";
import Image from "next/image";
import ThickBtn from "@/components/common/button/ThickBtn";
import CardHeader from "@/components/common/card/CardHeader";
import CardDetail from "@/components/common/card/CardDetail";
import { useState } from "react";
import { CommonModal } from "@/components/common/modal/CommonModal";
import ResponsiveForm from "@/components/common/responsiveForm/ResponsiveForm";
import { OnSaleCardEditForm } from "./OnSaleCardEditForm";
interface CardDetailProps {
  data: PhotoCardDetailDto;
}

// TODO: 판매 내리기 api 연결 추가
export const SupplierCardDetail: React.FC<CardDetailProps> = ({ data }) => {
  const [isCloseSaleModalOpen, setIsCloseSaleModalOpen] = useState(false);
  const [isEditSaleModalOpen, setIsEditSaleModalOpen] = useState(false);
  const handleCloseSaleModalOpen = () => {
    setIsCloseSaleModalOpen(true);
  };
  const handleCloseSaleModalClose = () => {
    setIsCloseSaleModalOpen(false);
  };
  const handleEditSaleModalOpen = () => {
    setIsEditSaleModalOpen(true);
  };
  const handleEditSaleModalClose = () => {
    setIsEditSaleModalOpen(false);
  };

  const cardHeaderProps = {
    grade: data.grade,
    genre: data.genre,
    owner: data.userNickname,
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
  const exchangeDetailHeaderProps = {
    grade: data.exchangeDetail.grade,
    genre: data.exchangeDetail.genre,
    cardType: "details" as CardType,
  };
  const exchangeDetailProps = {
    description: data.exchangeDetail.description,
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
          <div className="w-[100%] flex flex-col gap-[30px]">
            <div className="w-[100%] flex flex-col ">
              <CardHeader {...cardHeaderProps} />
              <CardDetail {...cardDetailProps} />
            </div>

            <div className={exchangeDetailWrapperSx}>
              <div className="w-[100%] flex items-center gap-[5px] lg:gap-[6.5px] pb-[10px] border-b-[2px] border-gray-100">
                <Image
                  src="/assets/icons/exchange.png"
                  alt="교환 희망 정보"
                  width={22}
                  height={22}
                  className="lg:w-[28px] lg:h-[28px]"
                />
                <p className="market-detail-subtitle">교환 희망 정보</p>
              </div>
              <div>
                <CardHeader {...exchangeDetailHeaderProps} />
                <CardDetail {...exchangeDetailProps} />
              </div>
            </div>
          </div>

          <div className={btnWrapperSx}>
            <ThickBtn onClick={handleEditSaleModalOpen}>수정하기</ThickBtn>
            <ThickBtn buttonType="Secondary" onClick={handleCloseSaleModalOpen}>
              판매 내리기
            </ThickBtn>
          </div>
        </div>
      </div>
      {/* 수정하기 모달 */}
      {isEditSaleModalOpen && (
        <ResponsiveForm
          title="수정하기"
          isOpen={isEditSaleModalOpen}
          onClose={handleEditSaleModalClose}
        >
          <OnSaleCardEditForm data={data} onClose={handleEditSaleModalClose} />
        </ResponsiveForm>
      )}
      {/* 판매 내리기 모달 */}
      {isCloseSaleModalOpen && (
        <CommonModal
          isOpen={isCloseSaleModalOpen}
          onClose={handleCloseSaleModalClose}
          title="포토카드 판매 내리기"
          desc="정말로 판매를 중단하시겠습니까?"
          btnText="판매 내리기"
          btnClick={handleCloseSaleModalClose}
        />
      )}
    </div>
  );
};

const cardDetailContainerSx = "w-[100%] h-full flex flex-col md:flex-row gap-[20px] lg:gap-[80px]";
const cardDetailWrapperSx =
  "w-[100%] md:w-[342px] lg:w-[440px] h-full flex flex-shrink-0 flex-col gap-[10px] lg:gap-[50px]";
const exchangeDetailWrapperSx = "w-[100%] flex flex-col gap-[30px] lg:gap-[40px]";
const btnWrapperSx = "w-[100%] flex flex-col gap-[20px]";

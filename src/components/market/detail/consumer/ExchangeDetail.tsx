import { useState } from "react";
import { SectionTitle } from "../SectionTitle";
import ThinBtn from "@/components/common/button/ThinBtn";
import { CardType, Grade, Genre, MyPhotoCardDto } from "@/types/photocard.types";
import CardHeader from "@/components/common/card/CardHeader";
import ResponsiveMyPhotoList from "@/components/common/responsiveLayout/responsiveMyPhotoList/ResponsiveMyPhotoList";
import { ExchangeOfferInputForm } from "./ExchangeOfferInputForm";
import ResponsiveForm from "@/components/common/responsiveLayout/responsiveForm/ResponsiveForm";

interface ExchangeDetailProps {
  exchangeDetail: {
    grade: Grade;
    genre: Genre;
    description: string;
  };
}

export const ExchangeDetail: React.FC<ExchangeDetailProps> = ({ exchangeDetail }) => {
  const [isMyPhotoListModalOpen, setIsMyPhotoListModalOpen] = useState(false);
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<MyPhotoCardDto | null>(null);

  // 보유 카드 목록 모달 핸들러
  const handleMyPhotoListModalOpen = () => {
    setIsMyPhotoListModalOpen(true);
    setSelectedCard(null);
  };
  const handleMyPhotoListModalClose = () => {
    setIsMyPhotoListModalOpen(false);
    setSelectedCard(null);
  };

  // MyPhotoListContent에서 카드 선택 시 호출될 콜백
  const handleCardSelect = (cardId: string, cardData: MyPhotoCardDto) => {
    setSelectedCard(cardData);
    setIsMyPhotoListModalOpen(false);
    setIsExchangeModalOpen(true);
  };

  // 교환 제시 입력 폼 모달 핸들러
  const handleExchangeModalClose = () => {
    // 교환 제시 폼에서 취소하거나 뒤로가기 클릭 시 다시 보유 목록 보여주기
    setIsExchangeModalOpen(false);
    setIsMyPhotoListModalOpen(true);
  };
  const handleSubmitExchange = () => {
    // 교환 제시 제출하면, 입력 모달, 보유 목록 모달 둘 다 닫기
    // TODO: 교환 제시 api 붙이기
    setIsMyPhotoListModalOpen(false);
    setIsExchangeModalOpen(false);
    setSelectedCard(null);
  };

  const exchangeDetailHeaderProps = {
    grade: exchangeDetail.grade,
    genre: exchangeDetail.genre,
    cardType: "details" as CardType,
  };

  const ExchangeOfferBtn = () => {
    return (
      <ThinBtn className="w-full md:w-[342px] lg:w-[440px]" onClick={handleMyPhotoListModalOpen}>
        포토카드 교환하기
      </ThinBtn>
    );
  };

  return (
    <div className="w-[100%] flex flex-col gap-[40px] lg:gap-[60px]">
      <SectionTitle title="교환 희망 정보" button={<ExchangeOfferBtn />} />
      <div className="w-[100%] flex flex-col gap-[10px]">
        <div className="w-[100%] flex flex-col gap-[20px] text-white">
          <p className="text-18-24-bold break-keep">{exchangeDetail.description}</p>
          <CardHeader {...exchangeDetailHeaderProps} />
        </div>
        <div className="w-[100%] block md:hidden pb-[30px] md:pb-[0px]">
          <ExchangeOfferBtn />
        </div>
      </div>

      {/* XXX: 교환하기 버튼 클릭 시 보유 카드 목록 모달 - 교환 제시 입력 폼 모달 - 교환 제시 요청 후 스낵바 순서  */}
      {isMyPhotoListModalOpen && (
        <ResponsiveMyPhotoList
          isOpen={isMyPhotoListModalOpen}
          onClose={handleMyPhotoListModalClose}
          title="포토카드 교환하기"
          onCardClick={handleCardSelect}
        />
      )}
      {isExchangeModalOpen && selectedCard && (
        <ResponsiveForm
          title="포토카드 교환하기"
          isOpen={isExchangeModalOpen}
          onClose={handleExchangeModalClose}
        >
          <ExchangeOfferInputForm
            data={selectedCard}
            onCancel={handleExchangeModalClose}
            onExchange={handleSubmitExchange}
          />
        </ResponsiveForm>
      )}
    </div>
  );
};

import { useState } from "react";
import { SectionTitle } from "../SectionTitle";
import ThinBtn from "@/components/common/button/ThinBtn";
import { CommonModal } from "@/components/common/modal/CommonModal";
import { CardType, Grade } from "@/types/photocard.types";
import CardHeader from "@/components/common/card/CardHeader";

interface ExchangeDetailProps {
  exchangeDetail: {
    grade: Grade;
    genre: string;
    description: string;
  };
}

export const ExchangeDetail: React.FC<ExchangeDetailProps> = ({ exchangeDetail }) => {
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const handleExchangeModalOpen = () => {
    setIsExchangeModalOpen(true);
  };
  const handleExchangeModalClose = () => {
    setIsExchangeModalOpen(false);
  };

  const exchangeDetailHeaderProps = {
    grade: exchangeDetail.grade,
    genre: exchangeDetail.genre,
    cardType: "details" as CardType,
  };

  const ExchangeOfferBtn = () => {
    return (
      <ThinBtn className="w-full md:w-[342px] lg:w-[440px]" onClick={handleExchangeModalOpen}>
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
      {/* TODO: 교환 제시 모달로 수정 예정 */}
      <CommonModal
        isOpen={isExchangeModalOpen}
        onClose={handleExchangeModalClose}
        title="교환 제시"
        desc="교환 제시 목록"
        btnText="교환 제시"
        btnClick={handleExchangeModalClose}
      />
    </div>
  );
};

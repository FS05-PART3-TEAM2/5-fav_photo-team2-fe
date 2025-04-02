import { ExchangeCardDto } from "@/types/photocard.types";
import { useState } from "react";
import XSBtn from "@/components/common/button/XSBtn";
import { ExchangeCard } from "../ExchangeCard";
import { CommonModal } from "@/components/common/modal/CommonModal";

interface ReceivedExchangeCardProps {
  data: ExchangeCardDto;
}

// TODO: 모달에서 승인/거절 눌렀을 때 api 호출 이벤트핸들러 추가하기
export const ReceivedExchangeCard: React.FC<ReceivedExchangeCardProps> = ({ data }) => {
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const handleAcceptModalOpen = () => {
    setIsAcceptModalOpen(true);
  };
  const handleAcceptModalClose = () => {
    setIsAcceptModalOpen(false);
  };
  const handleRejectModalOpen = () => {
    setIsRejectModalOpen(true);
  };
  const handleRejectModalClose = () => {
    setIsRejectModalOpen(false);
  };

  const rejectModalTitle = `교환 제시 거절`;
  const rejectModalDesc = `[${data.grade} | ${data.name}] 카드와의 교환을 거절하시겠습니까?`;
  const rejectModalBtnText = `거절하기`;

  const acceptModalTitle = `교환 제시 승인`;
  const acceptModalDesc = `[${data.grade} | ${data.name}] 카드와의 교환을 승인하시겠습니까?`;
  const acceptModalBtnText = `승인하기`;

  const ExchangeAcceptBtn: React.FC = () => {
    return (
      <XSBtn className="w-full" onClick={handleAcceptModalOpen}>
        <span className="hidden md:inline">승인하기</span>
        <span className="inline md:hidden">승인</span>
      </XSBtn>
    );
  };

  const ExchangeRejectBtn: React.FC = () => {
    return (
      <XSBtn className="w-full" buttonType="Secondary" onClick={handleRejectModalOpen}>
        <span className="hidden md:inline">거절하기</span>
        <span className="inline md:hidden">거절</span>
      </XSBtn>
    );
  };

  const ExchangeBtns: React.FC = () => {
    return (
      <div className="flex gap-[5px] md:gap-[20px]">
        <ExchangeRejectBtn />
        <ExchangeAcceptBtn />
      </div>
    );
  };

  return (
    <>
      <ExchangeCard data={data} button={<ExchangeBtns />} />
      {/* 교환 제시 거절 모달 */}
      {isRejectModalOpen && (
        <CommonModal
          isOpen={isRejectModalOpen}
          onClose={handleRejectModalClose}
          title={rejectModalTitle}
          desc={rejectModalDesc}
          btnText={rejectModalBtnText}
          btnClick={handleRejectModalClose}
        />
      )}
      {/* 교환 제시 승인 모달 */}
      {isAcceptModalOpen && (
        <CommonModal
          isOpen={isAcceptModalOpen}
          onClose={handleAcceptModalClose}
          title={acceptModalTitle}
          desc={acceptModalDesc}
          btnText={acceptModalBtnText}
          btnClick={handleAcceptModalClose}
        />
      )}
    </>
  );
};

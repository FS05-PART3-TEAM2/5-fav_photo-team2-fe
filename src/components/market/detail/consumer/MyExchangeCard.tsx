import { ExchangeCardDto } from "@/types/photocard.types";
import { useState } from "react";
import XSBtn from "@/components/common/button/XSBtn";
import { ExchangeCard } from "../ExchangeCard";
import { CommonModal } from "@/components/common/modal/CommonModal";

interface MyExchangeCardProps {
  data: ExchangeCardDto;
}

// TODO: 모달에서 취소하기 api 호출 이벤트핸들러 추가하기
export const MyExchangeCard: React.FC<MyExchangeCardProps> = ({ data }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handleCancelModalOpen = () => {
    setIsCancelModalOpen(true);
  };
  const handleCancelModalClose = () => {
    setIsCancelModalOpen(false);
  };

  const cancelModalTitle = `교환 제시 취소`;
  const cancelModalDesc = `[${data.grade} | ${data.name}] 교환 제시를 취소하시겠습니까?`;
  const cancelModalBtnText = `취소하기`;

  const ExchangeCancelBtn: React.FC = () => {
    return (
      <XSBtn className="w-full" buttonType="Secondary" onClick={handleCancelModalOpen}>
        취소하기
      </XSBtn>
    );
  };

  return (
    <>
      <ExchangeCard data={data} button={<ExchangeCancelBtn />} />
      {/* 교환 제시 취소 모달 */}
      {isCancelModalOpen && (
        <CommonModal
          isOpen={isCancelModalOpen}
          onClose={handleCancelModalClose}
          title={cancelModalTitle}
          desc={cancelModalDesc}
          btnText={cancelModalBtnText}
          // TODO: 교환 제시 취소 버튼 클릭 시 교환 제시 취소 로직 추가
          btnClick={handleCancelModalClose}
        />
      )}
    </>
  );
};

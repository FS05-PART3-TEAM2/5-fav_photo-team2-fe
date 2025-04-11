import { ExchangeCardDto } from "@/types/photocard.types";
import { useState } from "react";
import XSBtn from "@/components/common/button/XSBtn";
import { ExchangeCard } from "../ExchangeCard";
import { CommonModal } from "@/components/common/modal/CommonModal";
import { useExchangeCardActionHook } from "@/hooks/market/detail/useExchangeCardActioinHook";

interface MyExchangeCardProps {
  data: ExchangeCardDto;
}

export const MyExchangeCard: React.FC<MyExchangeCardProps> = ({ data }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  // api 요청 핸들러 가져오기
  const { handleCancelExchangeOffer } = useExchangeCardActionHook();

  // 확인 모달 상태 컨트롤
  const handleCancelModalOpen = () => {
    setIsCancelModalOpen(true);
  };
  const handleCancelModalClose = () => {
    setIsCancelModalOpen(false);
  };

  // 버튼 클릭 : api 요청, 모달 닫기
  const handleClickCancelBtn = () => {
    handleCancelExchangeOffer(data.id);
    handleCancelModalClose();
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
          btnClick={handleClickCancelBtn}
        />
      )}
    </>
  );
};

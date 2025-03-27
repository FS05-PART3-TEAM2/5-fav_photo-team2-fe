import { useState } from 'react';
import { SectionTitle } from '../sectionTitle';
import ThinBtn from '@/components/common/button/ThinBtn';
import { CommonModal } from '@/components/common/modal/CommonModal';

export const ExchangeDetail: React.FC = () => {
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);

  const handleExchangeModalOpen = () => {
    setIsExchangeModalOpen(true);
  };

  const handleExchangeModalClose = () => {
    setIsExchangeModalOpen(false);
  };

  const ExchangeOfferBtn = () => {
    return (
      <ThinBtn className="w-[345px] md:w-[342px] lg:w-[440px]" onClick={handleExchangeModalOpen}>
        포토카드 교환하기
      </ThinBtn>
    );
  };

  return (
    <div className="w-[100%] flex flex-col gap-[40px] lg:gap-[60px]">
      <SectionTitle title="교환 희망 정보" button={<ExchangeOfferBtn />} />
      <div className="w-[100%] flex flex-col gap-[20px] md:gap-[40px] lg:gap-[60px] text-white">
        <p>교환 희망 정보</p>
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

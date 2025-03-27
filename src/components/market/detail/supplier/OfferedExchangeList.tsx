// import { useState } from 'react';
import { SectionTitle } from '../sectionTitle';
// import XSBtn from '@/components/common/button/XSBtn';

export const OfferedExchangeList: React.FC = () => {
  // const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  // const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  // const handleAcceptModalOpen = () => {
  //   setIsAcceptModalOpen(true);
  // };

  // const handleAcceptModalClose = () => {
  //   setIsAcceptModalOpen(false);
  // };

  // const handleRejectModalOpen = () => {
  //   setIsRejectModalOpen(true);
  // };

  // const handleRejectModalClose = () => {
  //   setIsRejectModalOpen(false);
  // };

  // // TODO: 여기 모바일에서 텍스트 바뀌는거 처리 필요
  // const ExchangeAcceptBtn = () => {
  //   return (
  //     <XSBtn className="w-[72.5px] md:w-[141px] lg:w-[170px]" onClick={handleAcceptModalOpen}>
  //       승인하기
  //     </XSBtn>
  //   );
  // };

  // const ExchangeRejectBtn = () => {
  //   return (
  //     <XSBtn
  //       className="w-[72.5px] md:w-[141px] lg:w-[170px]"
  //       buttonType="Secondary"
  //       onClick={handleRejectModalOpen}
  //     >
  //       거절하기
  //     </XSBtn>
  //   );
  // };

  return (
    <div className="w-[100%] flex flex-col gap-[40px] lg:gap-[60px]">
      <SectionTitle title="교환 제시 목록" />
      <div className="w-[100%] flex flex-col gap-[20px] md:gap-[40px] lg:gap-[60px]">
        <p>교환 제시 목록</p>
      </div>
      {/* TODO: 교환 제시된 카드 컴포넌트 배열로 보여줄 것 */}
    </div>
  );
};

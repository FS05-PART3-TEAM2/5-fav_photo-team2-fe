import React from "react";
import ThinBtn from "@/components/common/button/ThinBtn";

interface MobileCreateButtonProps {
  onClick?: () => void;
}

const MobileCreateButton: React.FC<MobileCreateButtonProps> = ({ onClick }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-5 mb-8">
        <ThinBtn buttonType="Primary" className="w-full bg-main shadow-lg" onClick={onClick}>
          포토카드 생성하기
        </ThinBtn>
      </div>
    </div>
  );
};

export default MobileCreateButton;

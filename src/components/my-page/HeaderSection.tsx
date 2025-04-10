import React from "react";
import ThinBtn from "@/components/common/button/ThinBtn";

type PageType = "my-photos" | "my-sales";

interface HeaderSectionProps {
  type: PageType;
  onCreateClick?: () => void;
  headerTitle?: string;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ type, headerTitle, onCreateClick }) => {
  // 페이지 타입에 따라 제목 설정
  const title = headerTitle || (type === "my-photos" ? "마이갤러리" : "나의 판매 포토카드");

  // 버튼 표시 여부 (my-photos 페이지에서만 버튼 표시)
  const showButton = type === "my-photos";

  return (
    <div className="relative hidden md:flex flex-row justify-between items-center mt-5 md:mt-10 lg:mt-15 mb-10 border-b-[2px] border-color-gray-100 pb-5">
      {/* 제목 */}
      <h1 className="font-BR-B text-[48px] lg:text-[62px] text-white text-left">{title}</h1>

      {/* 데스크탑 버튼 - my-photos 페이지에서만 표시 */}
      {showButton && (
        <ThinBtn buttonType="Primary" className="w-[342px] lg:w-[440px]" onClick={onCreateClick}>
          포토카드 생성하기
        </ThinBtn>
      )}
    </div>
  );
};

export default HeaderSection;

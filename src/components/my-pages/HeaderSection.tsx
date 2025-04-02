import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ThinBtn from "@/components/common/button/ThinBtn";

type PageType = "my-photos" | "my-sales";

interface HeaderSectionProps {
  type: PageType;
  onCreateClick?: () => void;
  headerTitle?: string;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ type, headerTitle, onCreateClick }) => {
  const router = useRouter();

  // 페이지 타입에 따라 제목 설정
  const title = headerTitle || (type === "my-photos" ? "마이갤러리" : "나의 판매 포토카드");

  // 버튼 표시 여부 (my-photos 페이지에서만 버튼 표시)
  const showButton = type === "my-photos";

  return (
    <div className="relative flex flex-row justify-between items-center mb-10 md:border-b-[2px] md:border-color-gray-100 md:pb-5">
      {/* 모바일 뒤로가기 버튼 */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 md:hidden"
        onClick={() => router.back()}
      >
        <Image src="/assets/icons/back.png" alt="back" width={24} height={24} className="w-6 h-6" />
      </button>

      {/* 제목 */}
      <h1 className="font-BR-B text-[20px] md:text-[48px] lg:text-[62px] text-white w-full md:w-auto text-center md:text-left">
        {title}
      </h1>

      {/* 데스크탑 버튼 - my-photos 페이지에서만 표시 */}
      {showButton && (
        <ThinBtn
          buttonType="Primary"
          className="hidden md:block w-[342px] lg:w-[440px]"
          onClick={onCreateClick}
        >
          포토카드 생성하기
        </ThinBtn>
      )}
    </div>
  );
};

export default HeaderSection;

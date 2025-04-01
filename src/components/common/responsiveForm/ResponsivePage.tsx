import Image from "next/image";
import React from "react";

interface PageProps {
  children: React.ReactNode;
  title?: string;
  onClose?: () => void;
}

export default function ResponsivePage({ children, title, onClose }: PageProps) {
  return (
    <div className="fixed inset-0 z-50 bg-dark">
      {title && (
        // 모바일 타이틀
        <div className="sticky top-0 z-10 block md:hidden w-full h-[60px] px-[15px] flex items-center justify-between bg-dark">
          <Image
            src="/assets/icons/back.png"
            alt="back"
            width={22}
            height={22}
            className="cursor-pointer"
            onClick={onClose}
          />
          <p className="text-white text-[20px] font-BR-B">{title}</p>
          <div className="w-[22px] h-[22px]" />
        </div>
      )}

      {/* 컨텐츠 영역 */}
      <div className="h-[calc(100vh-60px)] pt-[20px] px-[15px] overflow-y-auto [&::-webkit-scrollbar]:w-[0px]">
        {children}
      </div>
    </div>
  );
}

import Image from "next/image";
import React from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function ResponsiveModal({ onClose, children }: ModalProps) {
  return (
    // 오버레이
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/80" onClick={onClose} />

      {/* modal */}
      <div className={modalStyle}>
        <div className="h-full flex justify-between gap-[10px]">
          {/* 컨텐츠 영역 */}
          <div
            className="w-full h-[calc(90vh-80px)] pr-[40px] overflow-y-auto
            [&::-webkit-scrollbar]:w-[8px] 
            [&::-webkit-scrollbar-track]:bg-transparent 
            [&::-webkit-scrollbar-thumb]:bg-gray-400 
            [&::-webkit-scrollbar-thumb]:rounded-full"
          >
            {children}
          </div>

          {/* 닫기 버튼 */}
          <div className="w-[32px] h-[32px] flex-shrink-0 cursor-pointer">
            <Image
              src="/assets/icons/close-gray3.png"
              alt="close modal"
              width={32}
              height={32}
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const modalStyle =
  "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-40px)] max-w-[1160px] h-[90vh] rounded-[2px] z-50 bg-gray-500 shadow-lg pt-[30px] pb-[20px] pl-[120px] pr-[30px] overflow-hidden";

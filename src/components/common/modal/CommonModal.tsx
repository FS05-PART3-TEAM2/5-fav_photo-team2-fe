import Image from "next/image.js";
import React from "react";
import ThinBtn from "../button/ThinBtn";

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  desc: string;
  btnText: string;
  btnClick: () => void;
}

// 공통 모달 컴포넌트
// 사용할 페이지에서 isOpen상태와 onClose함수, 버튼을 클릭했을 때 실행할 함수를 정의해서 props로 함께 전달해주세요.
export const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  onClose,
  title,
  desc,
  btnText,
  btnClick,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* 모달 배경 */}
          <div className="absolute inset-0 bg-black opacity-80" onClick={onClose}></div>
          {/* 모달 컨텐츠 */}
          <div
            className="relative bg-gray-500 mx-[15px] px-[15px] pt-[15px] pb-[40px] lg:px-[30px] lg:pt-[30px] lg:pb-[60px] w-[100%] max-w-[400px] lg:max-w-[560px] h-[fit-content] rounded-[2px] shadow-lg z-10"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-[100%] flex flex-col">
              <div className="w-full flex justify-end">
                <div
                  className="w-[28px] h-[28px] lg:w-[32px] lg:h-[32px] flex items-center justify-center cursor-pointer relative"
                  onClick={onClose}
                >
                  <Image
                    src="/assets/icons/close-gray3.png"
                    alt="close modal"
                    width={28}
                    height={28}
                    className="lg:w-[32px] lg:h-[32px]"
                  />
                </div>
              </div>
              <div className="w-[100%] flex flex-col items-center justify-center mt-[18px]">
                <p className="modal-title">{title}</p>
                <p className="modal-desc">{desc}</p>
                <ThinBtn className="w-[120px] md:w-[140px] lg:w-[170px]" onClick={btnClick}>
                  {btnText}
                </ThinBtn>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

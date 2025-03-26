import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean; // 로딩 상태 추가
  width?: string; // 너비를 props로 받음
};

const XSPrimaryBtn = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isLoading, children, className, disabled, width, ...props }, ref) => {
    // 기본 스타일 XS는 px없앰
    const baseStyles =
      "flex items-center justify-center h-[40px] rounded-[2px] py-[17px] gap-[10px] text-dark font-bold leading-[100%] whitespace-nowrap";

    // 화면 크기에 따라 스타일 변경 (반응형)
    const responsiveStyles = `
      h-[40px] px-[25px] gap-[10px] text-[12px]
      md: md:h-[55px] text-[16px]
      lg: lg:h-[60px] text-[18px]
    `;

    // 활성화된 버튼 스타일 (main 색상 적용)
    const enabledStyles = "bg-main cursor-pointer";

    // 로딩 중 또는 비활성화 상태의 버튼 스타일
    const disabledStyles = "bg-gray-400 text-gray-300 cursor-not-allowed";

    return (
      <button
        ref={ref}
        className={`
          ${baseStyles} 
          ${responsiveStyles} 
          ${isLoading || disabled ? disabledStyles : enabledStyles} 
          ${className}
        `}
        style={{ width }} // width를 props로 받아 적용
        //<XSPrimaryButton width="345px"> 이런식으로 써주세요!
        //<XSPrimaryButton className="w-[300px] md:w-[400px] lg:w-[500px]"> 반응형은 기존 tailwind와 동일
        disabled={isLoading || disabled} // 로딩 중일 때도 비활성화
        {...props}
      >
        {children} {/* 로딩 중이어도 기존 텍스트 유지 */}
      </button>
    );
  }
);

export default XSPrimaryBtn;

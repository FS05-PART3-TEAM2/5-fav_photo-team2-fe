import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean; // 로딩 상태 추가
};

const ThickPrimaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isLoading, children, className, disabled, ...props }, ref) => {
    // 기본 스타일
    const baseStyles =
      "flex items-center justify-center rounded-[2px] px-[144px] py-[25px] gap-[10px] text-dark font-bold leading-[100%] whitespace-nowrap";

    // 화면 크기에 따라 스타일 변경 (반응형)
    const responsiveStyles = `
      w-[345px] h-[75px] px-[25px] gap-[10px] text-[18px]
      md:w-[342px] md:h-[75px] text-[18px]
      lg:w-[440px] lg:h-[80px] text-[20px]
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
        disabled={isLoading || disabled} // 로딩 중일 때도 비활성화
        {...props}
      >
        {children} {/* 로딩 중이어도 기존 텍스트 유지 */}
      </button>
    );
  }
);

export default ThickPrimaryButton;

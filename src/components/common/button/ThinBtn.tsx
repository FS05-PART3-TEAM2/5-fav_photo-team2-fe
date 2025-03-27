import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean; // 로딩 상태 추가
  buttonType?: "Primary" | "Secondary";
};

// 기본적으로 버튼의 상위 div에 대해 100% 너비를 가짐 - 대부분의 경우 별도의 스타일링 없이 onClick 이벤트만 전달하면 됩니다.
// 필요에 따라 버튼 너비 조정이 필요한 경우, className prop으로 전달하면 됩니다.
// 예) <ThinPrimaryBtn className="w-[120px] md:w-[140px] lg:w-[170px]">
const ThinBtn = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isLoading, children, className, disabled, buttonType = "Primary", ...props }, ref) => {
    // 기본 스타일
    const baseStyles =
      "flex items-center justify-center rounded-[2px] px-[20px] py-[17px] text-dark font-bold leading-[100%] whitespace-nowrap w-[100%]";

    // 화면 크기에 따라 스타일 변경 (반응형)
    const responsiveStyles = `
      h-[55px] text-[16px]
      lg:h-[60px] lg:text-[18px]
    `;

    // Primary 스타일
    const primaryStyles = "bg-main font-bold cursor-pointer";

    // Secondary 스타일
    const secondaryStyles = "border border-gray-100 text-white bg-dark font-medium cursor-pointer";

    // 로딩 중 또는 비활성화 상태의 버튼 스타일
    const disabledStyles = "bg-gray-400 text-gray-300 cursor-not-allowed";

    return (
      <button
        ref={ref}
        className={`
          ${baseStyles} 
          ${responsiveStyles} 
          ${
            isLoading || disabled
              ? disabledStyles
              : buttonType === "Primary"
                ? primaryStyles
                : secondaryStyles
          } 
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

export default ThinBtn;

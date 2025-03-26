import { Meta, StoryFn } from "@storybook/react";
import ThickBtn from "@/components/common/button/ThickBtn";
import ThinBtn from "@/components/common/button/ThinBtn";
import XSBtn from "@/components/common/button/XSBtn";

const meta: Meta<typeof ThickBtn> = {
  title: "Components/Buttons", // 스토리북 내에서 이 컴포넌트가 나타날 위치
  component: ThickBtn,
};

export default meta;

// StoryFn을 사용하여 스토리 정의
export const BtnTest: StoryFn = () => {
  return (
    <div className="bg-gray-500">
      <div className="p-[20px] w-[345px] md:w-[342px] lg:w-[440px]">
        <ThickBtn>포토카드 구매하기</ThickBtn>
        <ThickBtn buttonType="Secondary">Secondary 버튼</ThickBtn>
      </div>
      <div className="p-[20px] w-[345px] md:w-[440px] lg:w-[520px]">
        <ThinBtn>포토카드 교환하기</ThinBtn>
        <ThinBtn buttonType="Secondary">포토카드 교환하기</ThinBtn>
      </div>
      <div className="p-[20px] w-[345px] md:w-[440px] lg:w-[520px]">
        <ThinBtn disabled>포토카드 교환하기</ThinBtn>
      </div>
      <div className="p-[20px] w-[72.5px] md:w-[141px] lg:w-[170px]">
        <XSBtn>승인</XSBtn>
        <XSBtn buttonType="Secondary">승인</XSBtn>
      </div>
    </div>
  );
};

import { Meta, StoryFn } from "@storybook/react";
import ThickPrimaryBtn from "../components/common/button/ThickPrimaryBtn";
import ThinPrimaryBtn from "../components/common/button/ThinPrimaryBtn";
import XSPrimaryBtn from "../components/common/button/XSPrimaryBtn";

const meta: Meta<typeof ThickPrimaryBtn> = {
  title: "Components/Buttons", // 스토리북 내에서 이 컴포넌트가 나타날 위치
  component: ThickPrimaryBtn,
};

export default meta;

// StoryFn을 사용하여 스토리 정의
export const BtnTest: StoryFn = () => {
  return (
    <div className="bg-gray-500">
      <div className="p-[20px] w-[345px] md:w-[342px] lg:w-[440px]">
        <ThickPrimaryBtn>포토카드 구매하기</ThickPrimaryBtn>
        <ThickPrimaryBtn buttonType="Secondary">Secondary 버튼</ThickPrimaryBtn>
      </div>
      <div className="p-[20px] w-[345px] md:w-[440px] lg:w-[520px]">
        <ThinPrimaryBtn>포토카드 교환하기</ThinPrimaryBtn>
        <ThinPrimaryBtn buttonType="Secondary">
          포토카드 교환하기
        </ThinPrimaryBtn>
      </div>
      <div className="p-[20px] w-[345px] md:w-[440px] lg:w-[520px]">
        <ThinPrimaryBtn disabled>포토카드 교환하기</ThinPrimaryBtn>
      </div>
      <div className="p-[20px] w-[72.5px] md:w-[141px] lg:w-[170px]">
        <XSPrimaryBtn>승인</XSPrimaryBtn>
        <XSPrimaryBtn buttonType="Secondary">승인</XSPrimaryBtn>
      </div>
    </div>
  );
};

//테스트 페이지
"use client";

import ThickPrimaryBtn from "@/components/common/button/ThickPrimaryBtn";
import ThinPrimaryBtn from "@/components/common/button/ThinPrimaryBtn";
import XSPrimaryBtn from "@/components/common/button/XSPrimaryBtn";

export default function TestPage() {
  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <ThickPrimaryBtn className="w-[300px] md:w-[400px] lg:w-[500px]">
        기본 버튼
      </ThickPrimaryBtn>
      <ThickPrimaryBtn disabled>비활성화 버튼</ThickPrimaryBtn>
      <ThickPrimaryBtn isLoading>로딩 중 버튼</ThickPrimaryBtn>
      <ThinPrimaryBtn>포토카드 교환하기</ThinPrimaryBtn>
      <ThinPrimaryBtn disabled>포토카드 교환하기</ThinPrimaryBtn>
      <XSPrimaryBtn className="w-[72.5px] md:w-[141px] lg:w-[170px]">
        승인
      </XSPrimaryBtn>
    </div>
  );
}

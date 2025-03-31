import ThinBtn from "@/components/common/button/ThinBtn";

export default function MarketplaceHeader() {
  return (
    <div className="flex justify-between pb-[20px] mb-[20px] border-b">
      <div className="hidden md:flex justify-between w-full">
        <div className="font-BR-B whitespace-nowrap text-[48px] lg:text-[62px]">마켓플레이스</div>
        <div className="flex items-center w-[345px] md:w-[342px] lg:w-[440px]">
          <ThinBtn onClick={() => console.log("버튼 클릭됨!")}>포토카드 교환하기</ThinBtn>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full p-4 shadow-md sm:flex sm:justify-center md:hidden">
        <ThinBtn onClick={() => console.log("버튼 클릭됨!")}>포토카드 교환하기</ThinBtn>
      </div>
    </div>
  );
}

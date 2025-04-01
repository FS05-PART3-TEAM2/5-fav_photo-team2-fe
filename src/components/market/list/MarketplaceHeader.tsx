import ThinBtn from "@/components/common/button/ThinBtn";
import Search from "@/components/common/input/Search";

export default function MarketplaceHeader({ onSearch }: { onSearch: (keyword: string) => void }) {
  return (
    <>
      <div className="hidden md:flex pb-[20px] mb-[20px] border-b">
        <div className="hidden md:flex justify-between w-full">
          <div className="font-BR-B whitespace-nowrap text-[48px] lg:text-[62px]">마켓플레이스</div>
          <div className="flex items-center w-[345px] md:w-[342px] lg:w-[440px]">
            {/* SEJEONG: 판매자 페이지 완성되면 버튼에 페이지 이동 추가하기 */}
            <ThinBtn onClick={() => console.log("버튼 클릭됨!")}>포토카드 판매하기</ThinBtn>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full p-4 shadow-md sm:flex sm:justify-center md:hidden z-[999]">
        <ThinBtn onClick={() => console.log("버튼 클릭됨!")}>포토카드 판매하기</ThinBtn>
      </div>
      <div className="flex my-[20px]">
        <Search onSearch={onSearch} />
        {/* SEJEONG: 공통컴포넌트 완성되면 드롭다운 추가하기 */}
      </div>
    </>
  );
}

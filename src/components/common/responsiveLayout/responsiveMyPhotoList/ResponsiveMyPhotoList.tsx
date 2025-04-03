import ResponsiveModal from "../ResponsiveModal";
import ResponsiveDrawer from "../ResponsiveDrawer";
import { MyPhotoListContent } from "./MyPhotoListContent";
// import { MyPhotoCardDto } from "@/types/photocard.types";

// 마켓플레이스 목록에서 [판매하기] 버튼 클릭시,
// 또는 상세페이지에서 [교환하기] 버튼 클릭시
// **내가 가지고 있는 카드 리스트** 중에서 선택하기 위한 반응형 모달입니다.
interface ResponsiveMyPhotoListProps {
  title: string; //판매하기 또는 교환하기
  isOpen: boolean;
  onClose: () => void;
  // onClickCard: (card: MyPhotoCardDto) => void; //리스트에서 카드 클릭시 이벤트를 전달
  onCardClick: () => void;
}

export default function ResponsiveMyPhotoList({
  title,
  isOpen,
  onClose,
  onCardClick,
}: ResponsiveMyPhotoListProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* 데스크탑 */}
      <div className="hidden lg:block">
        <ResponsiveModal onClose={onClose}>
          <MyPhotoListContent title={title} onCardClick={onCardClick} />
        </ResponsiveModal>
      </div>

      {/* 모바일, 태블릿 */}
      <div className="block lg:hidden">
        <ResponsiveDrawer onClose={onClose}>
          <MyPhotoListContent title={title} onCardClick={onCardClick} />
        </ResponsiveDrawer>
      </div>
    </>
  );
}

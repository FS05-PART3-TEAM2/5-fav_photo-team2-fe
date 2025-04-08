// SellerPage.tsx 예시
import ResponsiveMyPhotoList from "@/components/common/responsiveLayout/responsiveMyPhotoList/ResponsiveMyPhotoList";
import { MyPhotoCardDto } from "@/types/photocard.types";

interface SellerPageProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCard: MyPhotoCardDto | null;
  setSelectedCard: (card: MyPhotoCardDto | null) => void;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SellerPage = ({ isOpen, onClose, selectedCard, setSelectedCard }: SellerPageProps) => {
  return (
    <>
      <ResponsiveMyPhotoList
        isOpen={isOpen}
        onClose={onClose}
        onCardClick={(cardId, cardData) => {
          setSelectedCard(cardData);
          onClose();
        }}
        title="나의 포토카드 판매하기"
      />
    </>
  );
};

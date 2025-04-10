import ResponsiveMyPhotoList from "@/components/common/responsiveLayout/responsiveMyPhotoList/ResponsiveMyPhotoList";
import { SaleCardDto } from "@/types/photocard.types";
import { convertToSaleCardDto } from "@/utils/convertToSaleCardDto";

interface SellerPageProps {
  isOpen: boolean;
  onClose: () => void;
  // selectedCard: SaleCardDto | null;
  setSelectedCard: (card: SaleCardDto) => void;
}

export const SellerPage = ({ isOpen, onClose, setSelectedCard }: SellerPageProps) => {
  return (
    <div>
      <ResponsiveMyPhotoList
        isOpen={isOpen}
        onClose={onClose}
        onCardClick={(cardId, cardData) => {
          const converted = convertToSaleCardDto(cardData);
          setSelectedCard(converted);
          onClose();
        }}
        title="나의 포토카드 판매하기"
      />
    </div>
  );
};

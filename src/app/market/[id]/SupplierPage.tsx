import { SupplierCardDetail } from "@/components/market/detail/supplier/SupplierCardDetail";
import { ReceivedExchangeOffers } from "@/components/market/detail/supplier/ReceivedExchangeOffers";
import { SaleCardDetailDto, SaleCardExchangeListDto } from "@/types/photocard.types";

interface SupplierPageProps {
  saleCardData: SaleCardDetailDto;
  exchangeListData: SaleCardExchangeListDto;
}

export const SupplierPage: React.FC<SupplierPageProps> = ({ saleCardData, exchangeListData }) => {
  return (
    <div className="w-[100%] flex flex-col gap-[120px]">
      <SupplierCardDetail data={saleCardData} />
      <ReceivedExchangeOffers data={exchangeListData.receivedOffers} />
    </div>
  );
};

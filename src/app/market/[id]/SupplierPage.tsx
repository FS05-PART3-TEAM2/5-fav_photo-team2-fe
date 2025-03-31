import { PhotoCardDetailDto } from "@/types/photocard.types";
import { SupplierCardDetail } from "@/components/market/detail/supplier/SupplierCardDetail";
import { ReceivedExchangeOffers } from "@/components/market/detail/supplier/ReceivedExchangeOffers";

interface SupplierPageProps {
  data: PhotoCardDetailDto;
}

export const SupplierPage: React.FC<SupplierPageProps> = ({ data }) => {
  return (
    <div className="w-[100%] flex flex-col gap-[120px]">
      <SupplierCardDetail data={data} />
      <ReceivedExchangeOffers data={data.receivedOffers} />
    </div>
  );
};

import { ConsumerCardDetail } from "@/components/market/detail/consumer/ConsumerCardDetail";
import { ExchangeDetail } from "@/components/market/detail/consumer/ExchangeDetail";
import { MyExchangeOffers } from "@/components/market/detail/consumer/MyExchangeOffers";
import { SaleCardDetailDto, SaleCardExchangeListDto } from "@/types/photocard.types";

interface ConsumerPageProps {
  saleCardData: SaleCardDetailDto;
  exchangeListData: SaleCardExchangeListDto;
  isExchangeListPending: boolean;
}

export const ConsumerPage: React.FC<ConsumerPageProps> = ({
  saleCardData,
  exchangeListData,
  isExchangeListPending,
}) => {
  return (
    <div className="w-[100%] flex flex-col gap-[120px]">
      <ConsumerCardDetail data={saleCardData} />
      <div className="w-[100%] flex flex-col gap-[90px]">
        <ExchangeDetail saleCardId={saleCardData.id} exchangeDetail={saleCardData.exchangeDetail} />
        <MyExchangeOffers data={exchangeListData.myOffers} isLoading={isExchangeListPending} />
      </div>
    </div>
  );
};

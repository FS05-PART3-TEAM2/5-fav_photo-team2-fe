import { ConsumerCardDetail } from "@/components/market/detail/consumer/ConsumerCardDetail";
import { ExchangeDetail } from "@/components/market/detail/consumer/ExchangeDetail";
import { MyExchangeOffers } from "@/components/market/detail/consumer/MyExchangeOffers";
import { SaleCardDetailDto, SaleCardExchangeListDto } from "@/types/photocard.types";

interface ConsumerPageProps {
  saleCardData: SaleCardDetailDto;
  exchangeListData: SaleCardExchangeListDto;
}

export const ConsumerPage: React.FC<ConsumerPageProps> = ({ saleCardData, exchangeListData }) => {
  return (
    <div className="w-[100%] flex flex-col gap-[120px]">
      <ConsumerCardDetail data={saleCardData} />
      <div className="w-[100%] flex flex-col gap-[90px]">
        <ExchangeDetail exchangeDetail={saleCardData.exchangeDetail} />
        <MyExchangeOffers data={exchangeListData.myOffers} />
      </div>
    </div>
  );
};

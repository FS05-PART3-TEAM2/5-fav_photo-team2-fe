import { PhotoCardDetailDto } from "@/types/photocard.types";
import { ConsumerCardDetail } from "@/components/market/detail/consumer/ConsumerCardDetail";
import { ExchangeDetail } from "@/components/market/detail/consumer/ExchangeDetail";
import { MyExchangeOffers } from "@/components/market/detail/consumer/MyExchangeOffers";
interface ConsumerPageProps {
  data: PhotoCardDetailDto;
}

export const ConsumerPage: React.FC<ConsumerPageProps> = ({ data }) => {
  return (
    <div className="w-[100%] flex flex-col gap-[120px]">
      <ConsumerCardDetail data={data} />
      <div className="w-[100%] flex flex-col gap-[90px]">
        <ExchangeDetail exchangeDetail={data.exchangeDetail} />
        <MyExchangeOffers data={data.myOffers} />
      </div>
    </div>
  );
};

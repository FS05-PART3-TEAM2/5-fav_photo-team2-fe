import { ConsumerCardDetail } from "@/components/market/detail/consumer/ConsumerCardDetail";
import { ExchangeDetail } from "@/components/market/detail/consumer/ExchangeDetail";
import { PhotoCardDetailDto } from "@/types/photocard.types";

interface ConsumerPageProps {
  data: PhotoCardDetailDto;
}

export const ConsumerPage: React.FC<ConsumerPageProps> = ({ data }) => {
  return (
    <div className="w-[100%] flex flex-col gap-[120px]">
      <ConsumerCardDetail data={data} />
      <ExchangeDetail />
    </div>
  );
};

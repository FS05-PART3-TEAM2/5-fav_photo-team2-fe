import { ConsumerCardDetail } from '@/components/market/detail/consumer/ConsumerCardDetail';
import { ExchangeDetail } from '@/components/market/detail/consumer/ExchangeDetail';
import { PhotoCardDetail } from '@/types/photocard.types';

interface ConsumerPageProps {
  data: PhotoCardDetail;
}

export const ConsumerPage: React.FC<ConsumerPageProps> = ({ data }) => {
  return (
    <div className="w-[100%] flex flex-col gap-[120px]">
      <ConsumerCardDetail data={data} />
      <ExchangeDetail />
    </div>
  );
};

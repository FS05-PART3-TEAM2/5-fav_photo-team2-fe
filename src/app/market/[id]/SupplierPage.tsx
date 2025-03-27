import { PhotoCardDetail } from '@/types/photocard.types';
import { SupplierCardDetail } from '@/components/market/detail/supplier/SupplierCardDetail';
import { OfferedExchangeList } from '@/components/market/detail/supplier/OfferedExchangeList';

interface SupplierPageProps {
  data: PhotoCardDetail;
}

export const SupplierPage: React.FC<SupplierPageProps> = ({ data }) => {
  return (
    <div className="w-[100%] flex flex-col gap-[120px]">
      <SupplierCardDetail data={data} />
      <OfferedExchangeList />
    </div>
  );
};

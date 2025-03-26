import { PhotoCardDetail } from '@/types/photocard.types';

interface SupplierPageProps {
  data: PhotoCardDetail;
}

export const SupplierPage: React.FC<SupplierPageProps> = ({ data }) => {
  return (
    <div className="flex flex-col md:flex-row">
      판매자 페이지
      <p>{data.name}</p>
    </div>
  );
};

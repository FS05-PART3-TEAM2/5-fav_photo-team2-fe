import { PhotoCardDetail } from '@/types/photocard.types';

interface ConsumerPageProps {
  data: PhotoCardDetail;
}

export const ConsumerPage: React.FC<ConsumerPageProps> = ({ data }) => {
  return (
    <div className="flex flex-col md:flex-row">
      구매자 페이지
      <p>{data.name}</p>
    </div>
  );
};

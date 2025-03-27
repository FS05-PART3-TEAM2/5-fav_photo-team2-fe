import { PhotoCardDetail } from '@/types/photocard.types';
import { SectionTitle } from '../sectionTitle';

interface CardDetailProps {
  data: PhotoCardDetail;
}

export const ConsumerCardDetail: React.FC<CardDetailProps> = ({ data }) => {
  return (
    <div className="w-[100%] flex flex-col gap-[20px] md:gap-[40px] lg:gap-[60px]">
      <SectionTitle title={data.name} />
      <div className="w-[100%] flex flex-col gap-[20px] md:gap-[40px] lg:gap-[60px] text-white">
        카드 디테일
      </div>
    </div>
  );
};

import { ExchangeCardDto } from "@/types/photocard.types";
import { SectionTitle } from "../SectionTitle";
import { MyExchangeCard } from "./MyExchangeCard";
import { CircularProgress } from "@/components/common/loading/CircularProgress";

interface MyExchangeOffersProps {
  data: ExchangeCardDto[] | null;
  isLoading: boolean;
}

export const MyExchangeOffers: React.FC<MyExchangeOffersProps> = ({ data, isLoading }) => {
  const isEmpty = data === null || data.length === 0;

  return (
    <div className="w-[100%] flex flex-col gap-[40px] lg:gap-[60px]">
      <SectionTitle title="내가 제시한 교환 목록" />
      {isLoading ? (
        <CircularProgress />
      ) : isEmpty ? (
        <div className="w-[100%] h-[200px] flex items-center justify-center">
          <p className="text-gray-100 text-[18px] md:text-[24px] font-normal">
            교환 제시 내역이 없습니다.
          </p>
        </div>
      ) : (
        // 교환 제시 카드 목록
        <div className="w-[100%] grid grid-cols-2 lg:grid-cols-3 gap-[5px] md:gap-[20px] lg:gap-[40px]">
          {data?.map(item => <MyExchangeCard key={item.id} data={item} />)}
        </div>
      )}
    </div>
  );
};

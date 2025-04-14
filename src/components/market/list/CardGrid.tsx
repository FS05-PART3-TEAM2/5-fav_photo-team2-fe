import Image from "next/image";
import { MarketplacePhotoCardDto } from "@/types/photocard.types";
import CardHeader from "@/components/common/card/CardHeader";
import CardDetail from "@/components/common/card/CardDetail";
import { CircularProgress } from "@/components/common/loading/CircularProgress";

interface PhotoCardListProps {
  photoCards: MarketplacePhotoCardDto[];
  onCardClick: (card: MarketplacePhotoCardDto) => void;
  isLoading: boolean;
}

export default function PhotoCardList({
  photoCards,
  onCardClick,
  isLoading = false,
}: PhotoCardListProps) {
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-[5px] md:gap-[20px] lg:gap-[40px]">
      {photoCards.length === 0 ? (
        <div className="col-span-2 lg:col-span-3 text-center text-gray-400 text-lg h-[400px]">
          해당하는 포토카드가 없습니다.
        </div>
      ) : (
        photoCards.map(card => (
          <div
            key={card.saleCardId}
            onClick={() => onCardClick(card)}
            className=" cursor-pointer border p-[10px] md:p-[20px] lg:p-[40px] rounded-[2px] bg-gray-500"
            style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
          >
            <div className="relative w-full h-[112px] md:h-[226.5px] lg:h-[270px] overflow-hidden">
              <Image
                src={card.image}
                alt={card.name}
                fill
                className={`object-cover transition-all duration-300 ${
                  card.status === "SOLD_OUT" ? "brightness-30" : ""
                }`}
              />
              {/* SOLD_OUT 상태일 경우 오버레이 및 SOLD_OUT 이미지 추가 */}
              {card.status === "SOLD_OUT" && (
                <>
                  {/* 이미지 위에 어두운 오버레이 */}
                  <div className="absolute inset-0 bg-opacity-60 z-10"></div>

                  {/* SOLD_OUT 이미지 */}
                  <div className="absolute inset-0 flex justify-center items-center z-20">
                    <div className="relative flex justify-center items-center w-[112px] h-[112px] md:w-[200px] md:h-[200px] lg:w-[230px] lg:h-[230px]">
                      <Image
                        src="/assets/icons/soldout.png"
                        alt="판매 완료"
                        width={200}
                        height={200}
                        className="object-contain w-"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-[10px] md:mt-[25px]">
              <h2>{card.name}</h2>
              <CardHeader
                grade={card.grade}
                genre={card.genre}
                cardType="list"
                creator={card.creator.nickname}
              />
              <CardDetail
                price={card.price}
                availableAmount={card.remaining}
                totalAmount={card.total}
                amountText="잔여"
                cardType="list"
              />
            </div>
            <Image
              src="/assets/icons/logo.png"
              alt="로고 아이콘"
              width={99.25}
              height={18}
              className="mx-auto"
            />
          </div>
        ))
      )}
    </div>
  );
}

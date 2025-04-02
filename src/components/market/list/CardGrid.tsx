import Image from "next/image";
import { UpdateSaleCardResponseDto } from "@/types/photocard.types";
import CardHeader from "@/components/common/card/CardHeader";
import CardDetail from "@/components/common/card/CardDetail";
import Link from "next/link";

interface PhotoCardListProps {
  photoCards: UpdateSaleCardResponseDto[];
}

export default function PhotoCardList({ photoCards }: PhotoCardListProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-[5px] md:gap-[20px] lg:gap-[40px]">
      {photoCards.map(card => (
        <Link key={card.id} href={`/market/${card.id}`}>
          {/* 상세 페이지로 이동하는 링크 */}
          <div
            style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
            className=" border p-[10px] md:p-[20px] lg:p-[40px] rounded-[2px] bg-gray-500"
          >
            <div className="relative">
              <Image
                src={card.image}
                alt={card.name}
                width={150}
                height={112}
                layout="responsive" // 부모 컨테이너 크기에 맞춰 자동 조절
                objectFit="cover" // 기존 object-cover 효과 적용
                className={`rounded-md transition-all duration-300 ${
                  card.status === "SOLD_OUT" ? "brightness-30" : ""
                }`}
              />
              {/* SOLD_OUT 상태일 경우 오버레이 및 SOLD_OUT 이미지 추가 */}
              {card.status === "SOLD_OUT" && (
                <>
                  {/* 이미지 위에 어두운 오버레이 */}
                  <div className="absolute inset-0 bg-opacity-60"></div>

                  {/* SOLD_OUT 이미지 */}
                  <div className="absolute inset-0 flex justify-center items-center">
                    <Image
                      src="/assets/icons/soldout.png"
                      alt="판매 완료"
                      width={200}
                      height={200}
                      className="object-contain"
                    />
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
                availableAmount={2}
                totalAmount={5}
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
        </Link>
      ))}
    </div>
  );
}

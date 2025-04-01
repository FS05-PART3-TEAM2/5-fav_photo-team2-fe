import Image from "next/image";
import { PhotoCard } from "@/types/photocard.types";
import CardHeader from "@/components/common/card/CardHeader";
import CardDetail from "@/components/common/card/CardDetail";
interface PhotoCardListProps {
  photoCards: PhotoCard[];
}

export default function PhotoCardList({ photoCards }: PhotoCardListProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-[5px] md:gap-[20px] lg:gap-[40px]">
      {photoCards.map(card => (
        <div
          key={card.id}
          style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
          className=" border p-[10px] md:p-[20px] lg:p-[40px] rounded-[2px] bg-gray-500"
        >
          <Image
            src={card.image}
            alt={card.name}
            width={150}
            height={112}
            layout="responsive" // 부모 컨테이너 크기에 맞춰 자동 조절
            objectFit="cover" // 기존 object-cover 효과 적용
          />
          <div className="mt-[10px] md:mt-[25px]">
            <h2>{card.name}</h2>
            <CardHeader grade={card.grade} genre={card.genre} cardType="list" owner="nickname" />
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
      ))}
    </div>
  );
}

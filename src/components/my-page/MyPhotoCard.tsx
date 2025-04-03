import React from "react";
import Image from "next/image";
import { MyPhotoCardDto } from "@/types/photocard.types";
import CardHeader from "@/components/common/card/CardHeader";
import CardDetail from "@/components/common/card/CardDetail";

// 거래 현황 타입 추가
type TradeStatus = "ON_SALE" | "SOLD_OUT" | "PENDING" | undefined;

interface MyPhotoCardProps {
  myPhotoCard: MyPhotoCardDto & { status?: TradeStatus };
  onClick?: (cardId: string) => void;
}

const MyPhotoCard: React.FC<MyPhotoCardProps> = ({ myPhotoCard, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(myPhotoCard.id);
    }
  };

  // 거래 현황 텍스트와 스타일 매핑
  const getTradeStatusInfo = (status?: TradeStatus) => {
    switch (status) {
      case "ON_SALE":
        return { text: "판매 중", className: "bg-[#000000]/50 text-white " };
      case "SOLD_OUT":
        return { text: "판매 완료", className: "bg-gray-400" };
      case "PENDING":
        return { text: "교환 제시 대기중", className: "bg-[#000000]/50 text-main" };
      default:
        return { text: "", className: "" };
    }
  };

  const tradeStatusInfo = getTradeStatusInfo(myPhotoCard.status);
  const isSoldOut = myPhotoCard.status === "SOLD_OUT";

  return (
    <div
      onClick={handleClick}
      className="bg-gray-500 border border-white/10 rounded-[2px] overflow-hidden cursor-pointer shadow-lg w-full p-2 md:p-4 lg:p-8"
    >
      <div className="relative aspect-[360/270] overflow-hidden mb-[10px] md:mb-[25px]">
        <Image
          src={myPhotoCard.imageUrl || "/assets/images/default.png"}
          alt={myPhotoCard.name}
          fill
          sizes="(max-width: 768px) 100%, (max-width: 1024px) 50%, 33%"
          className="object-cover"
        />

        {/* SOLD OUT 이미지 오버레이 */}
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <Image
              src="/assets/icons/soldout.png"
              alt="SOLD OUT"
              width={200}
              height={200}
              className="w-3/4 h-auto"
            />
          </div>
        )}

        {/* 거래 현황 표시 (SOLD OUT이 아닌 경우) */}
        {myPhotoCard.status && !isSoldOut && (
          <div
            className={`absolute top-[10px] left-[10px] px-2 py-1 rounded-xs text-[10px] md:text-[14px] lg:text-[16px] ${tradeStatusInfo.className}`}
          >
            {tradeStatusInfo.text}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-white font-bold text-[14px] md:text-[22px] mb-[10px]">
          {myPhotoCard.name}
        </h3>
        <div>
          <CardHeader
            grade={myPhotoCard.grade}
            genre={myPhotoCard.genre}
            creator={myPhotoCard.creator}
            cardType="list"
          />
        </div>
        <CardDetail
          price={myPhotoCard.price}
          availableAmount={myPhotoCard.availableAmount}
          totalAmount={myPhotoCard.totalAmount}
          amountText="수량"
          cardType="list"
        />
        <div className="hidden md:block md:mt-[30px] lg:mt-[40px] text-center">
          <span className="font-BR-B text-white text-[18px]">
            최애<span className="text-main">의</span>
            <span className="text-white">포토</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyPhotoCard;

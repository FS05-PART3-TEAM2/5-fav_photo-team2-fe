import React from "react";
import Image from "next/image";
import { Grade } from "@/types/photocard.types";
import CardHeader from "@/components/common/card/CardHeader";
import CardDetail from "@/components/common/card/CardDetail";

interface PhotoCardProps {
  id: string;
  grade: Grade;
  genre: string;
  name: string;
  price: number;
  availableAmount: number;
  totalAmount: number;
  creator: string;
  imageUrl: string;
  onClick?: (cardId: string) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  id,
  grade,
  genre,
  name,
  price,
  availableAmount,
  totalAmount,
  creator,
  imageUrl,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-500 border border-white/10 rounded-md overflow-hidden cursor-pointer shadow-lg w-full p-2 md:p-4 lg:p-8"
    >
      <div className="p-3 md:p-4 lg:p-5">
        <div className="relative aspect-[360/270] overflow-hidden mb-[10px] md:mb-[25px]">
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 100%, (max-width: 1024px) 50%, 33%"
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-white font-bold text-[14px] md:text-[22px] mb-[10px]">{name}</h3>
          <div className="pb-[10px] md:pb-[20px]">
            <CardHeader grade={grade} genre={genre} creator={creator} cardType="list" />
          </div>
          <CardDetail
            price={price}
            availableAmount={availableAmount}
            totalAmount={totalAmount}
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
    </div>
  );
};

export default PhotoCard;

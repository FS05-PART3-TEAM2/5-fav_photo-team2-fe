import React from "react";
import Image from "next/image";
import { Grade } from "@/types/photocard.types";
import CardHeader from "@/components/common/card/CardHeader";
import CardDetail from "@/components/common/card/CardDetail";

interface PhotoCard {
  id: number;
  grade: Grade;
  genre: string;
  name: string;
  price: number;
  availableAmount: number;
  totalAmount: number;
  creator: string;
}

interface PhotoCardGridProps {
  cards: PhotoCard[];
}

const PhotoCardGrid: React.FC<PhotoCardGridProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 md:mt-15 md:gap-7 lg:gap-10">
      {cards.map(card => (
        <div
          key={card.id}
          className="bg-gray-500 border border-white/10 rounded-md overflow-hidden cursor-pointer shadow-lg w-full p-2 md:p-4 lg:p-8"
        >
          <div className="p-3 md:p-4 lg:p-5">
            <div className="relative aspect-[360/270] overflow-hidden mb-[10px] md:mb-[25px]">
              <Image
                src="/assets/images/mock1.png"
                alt={card.name}
                fill
                sizes="(max-width: 768px) 100%, (max-width: 1024px) 50%, 33%"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-white font-bold text-[14px] md:text-[22px] mb-[10px]">
                {card.name}
              </h3>
              <div className="pb-[10px] md:pb-[20px]">
                <CardHeader
                  grade={card.grade}
                  genre={card.genre}
                  creator={card.creator}
                  cardType="list"
                />
              </div>
              <CardDetail
                price={card.price}
                availableAmount={card.availableAmount}
                totalAmount={card.totalAmount}
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
      ))}
    </div>
  );
};

export default PhotoCardGrid;

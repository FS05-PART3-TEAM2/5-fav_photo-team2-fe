import React from "react";
import { Grade } from "@/types/photocard.types";
import PhotoCard from "./PhotoCard";

interface PhotoCard {
  id: string;
  grade: Grade;
  genre: string;
  name: string;
  price: number;
  availableAmount: number;
  totalAmount: number;
  creator: string;
  imageUrl?: string;
}

interface PhotoCardGridProps {
  cards: PhotoCard[];
  onCardClick?: (cardId: string) => void;
}

const PhotoCardGrid: React.FC<PhotoCardGridProps> = ({ cards, onCardClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 md:mt-15 md:gap-7 lg:gap-10">
      {cards.map(card => (
        <PhotoCard
          key={card.id}
          id={card.id}
          grade={card.grade}
          genre={card.genre}
          name={card.name}
          price={card.price}
          availableAmount={card.availableAmount}
          totalAmount={card.totalAmount}
          creator={card.creator}
          imageUrl={card.imageUrl || "/assets/images/mock1.png"}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default PhotoCardGrid;

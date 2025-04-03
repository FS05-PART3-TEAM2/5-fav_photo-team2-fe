import React from "react";
import { MyPhotoCardDto } from "@/types/photocard.types";
import MyPhotoCard from "./MyPhotoCard";

interface MyPhotoCardGridProps {
  myPhotoCards?: MyPhotoCardDto[];
  onCardClick?: (cardId: string) => void;
}

const MyPhotoCardGrid: React.FC<MyPhotoCardGridProps> = ({ myPhotoCards = [], onCardClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 md:mt-15 md:gap-7 lg:gap-10">
      {myPhotoCards.map(myPhotoCard => (
        <MyPhotoCard key={myPhotoCard.id} myPhotoCard={myPhotoCard} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default MyPhotoCardGrid;

import React from "react";

interface MyPhotoCardGradesProps {
  nickname: string;
  totalCards: number;
  photoCard: {
    common: number;
    rare: number;
    superRare: number;
    legendary: number;
  };
}

const MyPhotoCardGrades: React.FC<MyPhotoCardGradesProps> = ({
  nickname,
  totalCards,
  photoCard,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-white text-[24px] font-bold">{nickname}님이 보유한 포토카드</h2>
        <span className="text-gray-300 text-[24px] ">({totalCards}장)</span>
      </div>

      {/* 라벨 탭 */}
      <div className="flex mb-5 pb-10 border-b border-gray-400">
        <div className="flex gap-5">
          <button className="px-5 py-2 text-main border border-main">
            COMMON <span className="text-main">{photoCard.common}장</span>
          </button>
          <button className="px-5 py-2 text-blue border border-blue">
            RARE <span className="text-blue">{photoCard.rare}장</span>
          </button>
          <button className="px-5 py-2 text-purple border border-purple">
            SUPER RARE <span className="text-purple">{photoCard.superRare}장</span>
          </button>
          <button className="px-5 py-2 text-red border border-red">
            LEGENDARY <span className="text-red">{photoCard.legendary}장</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPhotoCardGrades;

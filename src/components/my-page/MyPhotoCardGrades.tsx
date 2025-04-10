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
  pageType: "my-photos" | "my-sales";
}

const MyPhotoCardGrades: React.FC<MyPhotoCardGradesProps> = ({
  nickname,
  totalCards,
  photoCard,
  pageType,
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-white text-[24px] font-bold">
          {nickname}님이 {pageType === "my-photos" ? "보유한" : "판매 중인"} 포토카드
        </h2>
        <span className="text-gray-300 text-[24px] ">({totalCards}장)</span>
      </div>

      {/* 라벨 탭 */}
      <div className="flex mb-5 pb-10 border-b border-gray-400 text-[12px] md:text-[14px] lg:text-[16px]">
        <div className="flex gap-5">
          <button className="px-5 py-2 min-w-fit text-main border border-main">
            COMMON <span className="text-main">{photoCard.common}장</span>
          </button>
          <button className="px-5 py-2 min-w-fit text-blue border border-blue">
            RARE <span className="text-blue">{photoCard.rare}장</span>
          </button>
          <button className="px-5 py-2 min-w-fit text-purple border border-purple">
            SUPER RARE <span className="text-purple">{photoCard.superRare}장</span>
          </button>
          <button className="px-5 py-2 min-w-fit text-red border border-red">
            LEGENDARY <span className="text-red">{photoCard.legendary}장</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPhotoCardGrades;

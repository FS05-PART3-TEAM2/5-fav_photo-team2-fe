"use client";
import { useEffect, useState } from "react";
import { CommonLayout } from "@/components/common/layout/CommonLayout";
import ThinBtn from "@/components/common/button/ThinBtn";
import CardHeader from "@/components/common/card/CardHeader";
import CardDetail from "@/components/common/card/CardDetail";
import { Grade } from "@/types/photocard.types";

interface PhotoCard {
  id: string;
  creatorId: string;
  name: string;
  genre: string;
  grade: Grade;
  price: number;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
// SEJEONG: 데이터 받아오면 삭제하기

export default function MarketplacePage() {
  const [photoCards, setPhotoCards] = useState<PhotoCard[]>([]);

  useEffect(() => {
    fetch("/photoCardsData.json")
      .then(res => res.json())
      .then(data => {
        console.log("📌 불러온 데이터 확인용:", data);
        setPhotoCards(data);
      })
      .catch(err => console.error("데이터 불러오기 실패:", err));
  }, []);

  return (
    <CommonLayout>
      <div>
        {/* 마켓플레이스 + 나의 포토카드 판매하기 버튼 = div */}
        <div className="flex justify-between pb-[20px] mb-[20px] border-b ">
          <h1 className="font-BR-B text-[62px] whitespace-nowrap">마켓플레이스</h1>
          <div className="flex items-center w-[345px] md:w-[342px] lg:w-[440px]">
            <ThinBtn onClick={() => console.log("버튼2 클릭됨!")}>포토카드 교환하기</ThinBtn>
          </div>
        </div>
        <div className="flex">
          {/*  input/search + 드롭다운 = div */}
          {/*  SEJEONG: 공통컴포넌트 완성되면 넣기 */}
        </div>

        <div className="grid grid-cols-3 gap-4 ">
          {/*  카드 배치 = div */}
          {photoCards.map(card => (
            <div
              key={card.id}
              className="border p-[10px] md:p-[20px] lg:p-[40px] rounded-lg bg-gray-500"
            >
              <img src={card.imageUrl} alt={card.name} className="w-full h-40 object-cover" />
              <div>
                <h2>{card.name}</h2>
                <CardHeader
                  grade={card.grade}
                  genre={card.genre}
                  cardType="details"
                  owner="nickname"
                />
                <CardDetail
                  price={card.price}
                  availableAmount={2}
                  totalAmount={5}
                  amountText="잔여"
                  cardType="list"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </CommonLayout>
  );
}

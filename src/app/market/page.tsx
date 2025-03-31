"use client";
import { useEffect, useState } from "react";
import { CommonLayout } from "@/components/common/layout/CommonLayout";
import ThinBtn from "@/components/common/button/ThinBtn";
import CardHeader from "@/components/common/card/CardHeader";
import CardDetail from "@/components/common/card/CardDetail";
import { Grade } from "@/types/photocard.types";
import Image from "next/image";

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

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[5px] md:gap-[20px] lg:gap-[40px] ">
          {/*  카드 배치 = div */}
          {photoCards.map(card => (
            <div
              key={card.id}
              style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
              className=" border p-[10px] md:p-[20px] lg:p-[40px] rounded-[2px] bg-gray-500"
            >
              <Image
                src={card.imageUrl}
                alt={card.name}
                width={150}
                height={112}
                layout="responsive" // 부모 컨테이너 크기에 맞춰 자동 조절
                objectFit="cover" // 기존 object-cover 효과 적용
              />
              <div className="mt-[10px] md:mt-[25px]">
                <h2>{card.name}</h2>
                <CardHeader
                  grade={card.grade}
                  genre={card.genre}
                  cardType="list"
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
      </div>
    </CommonLayout>
  );
}

// 마켓 페이지

import CardDetail from "@/components/common/card/CardDetail";

export default function Market() {
  return (
    <div>
      <p className="text-purple font-BR-B">베스킨라빈스</p>
      <div className="bg-gray-900">
        <CardDetail
          description="스페인 여행 사진도 좋은데.. 우리집 앞마당 포토카드와 교환하고 싶습니다!"
          price={4}
          availableAmount={2}
          totalAmount={5}
          amountText="잔여"
          cardType="list"
        />
      </div>
      <p className="line-clamp-3">222222222 222222222 222222222 222222222 222222222 ...</p>
    </div>
  );
}

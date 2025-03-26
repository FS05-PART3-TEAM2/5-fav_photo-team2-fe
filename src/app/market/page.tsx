// 마켓 페이지

import CardDetail from "@/components/common/card/CardDetail";
import CardHeader from "@/components/common/card/CardHeader";

export default function Market() {
  return (
    <div>
      <p className="text-purple font-BR-B">베스킨라빈스</p>
      <div className="bg-gray-900">
        <CardHeader grade="COMMON" genre="Science Fiction" cardType="details" />
      </div>
      <hr className="min-h-10" />
      <div className="bg-gray-900">
        <CardHeader
          grade="COMMON"
          genre="Science Fiction"
          cardType="details"
          owner="nickname"
        />
      </div>
      <hr className="min-h-10" />
      <div className="bg-gray-900 h-20 pt-5">
        <CardDetail
          description="스페인 여행 사진도 좋은데.. 우리집 앞마당 포토카드와 교환하고 싶습니다!"
          cardType="list"
        />
      </div>
      <hr className="min-h-10" />
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
      <hr className="min-h-10" />
      <div className="bg-gray-900">
        <CardDetail
          description="스페인 여행 사진도 좋은데.. 우리집 앞마당 포토카드와 교환하고 싶습니다!"
          price={4}
          availableAmount={2}
          totalAmount={5}
          amountText="잔여"
          cardType="details"
        />
      </div>
      <hr className="min-h-10" />
      <div className="bg-gray-900">
        <CardDetail
          description="스페인 여행 사진도 좋은데.. 우리집 앞마당 포토카드와 교환하고 싶습니다!"
          price={4}
          availableAmount={2}
          totalAmount={5}
          amountText="보유량"
          cardType="details"
        />
      </div>
      <hr className="min-h-10" />
      <div className="bg-gray-900">
        <CardDetail
          description="스페인 여행 사진도 좋은데.. 우리집 앞마당 포토카드와 교환하고 싶습니다!"
          price={4}
          totalAmount={5}
          amountText="수량"
          cardType="details"
        />
      </div>
      <hr className="min-h-10" />
      <div className="bg-gray-900">
        <CardHeader
          grade="COMMON"
          genre="Science Fiction"
          cardType="details"
          owner="nickname"
        />
      </div>
      <hr className="min-h-10" />
      <div className="bg-gray-900">
        <CardHeader
          grade="COMMON"
          genre="Science Fiction"
          cardType="list"
          owner="nickname"
          points={4}
        />
      </div>
    </div>
  );
}

// SellForm.tsx
import { useState } from "react";
import { convertToSaleRegisterRequest } from "@/utils/convertToSaleRegisterRequest";
import { axiosClient } from "@/services/axiosClient/axiosClient";
import { useSnackbarStore } from "@/store/useSnackbarStore";
import { SaleFormUI } from "./SaleCardFormContent/SaleFormUI";
import type { SaleCardDto, Grade, Genre } from "@/types/photocard.types";

interface SellFormProps {
  data: SaleCardDto;
  onCancel: () => void;
  onSubmit: () => void;
}

const SellForm = ({ data, onCancel, onSubmit }: SellFormProps) => {
  // console.log("✅ SellForm 내부 data 확인:", data);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [grade, setGrade] = useState<Grade | "default">("default");
  const [genre, setGenre] = useState<Genre | "default">("default");
  const [description, setDescription] = useState("");
  const [openDropdown, setOpenDropdown] = useState<"grade" | "genre" | null>(null);

  const { openSnackbar } = useSnackbarStore();

  // 클라이언트에서 쿠키를 직접 읽어오기
  //  const cookie = document.cookie; // document.cookie를 사용하여 쿠키 가져오기

  const handleSubmit = async () => {
    try {
      if (!data) return;
      const requestData = convertToSaleRegisterRequest(data, {
        price: Number(price),
        quantity,
        grade: grade as Grade,
        genre: genre as Genre,
        description,
      });
      // console.log("😏내가 입력한 데이터 확인용", requestData);
      await axiosClient.post("/market", requestData);
      openSnackbar("SUCCESS", "판매 등록이 완료되었습니다!");
      onSubmit();
    } catch (error) {
      openSnackbar("ERROR", "판매 등록에 실패했습니다. 다시 시도해주세요.");
      console.error("판매 등록 실패:", error);
    }
  };

  // card가 없으면 렌더링X
  if (!data) {
    return null; // 혹은 <Loading /> 또는 fallback 컴포넌트
  }
  return (
    <SaleFormUI
      data={data}
      isDisabled={price <= 0 || quantity <= 0}
      openDropdown={openDropdown}
      onDropdownOpen={type => setOpenDropdown(type)}
      onDropdownClose={() => setOpenDropdown(null)}
      params={{
        price,
        quantity,
        exchangeOffer: {
          grade,
          genre,
          description,
        },
      }}
      onPriceChange={setPrice}
      onQuantityChange={setQuantity}
      onGradeChange={value => setGrade(value as Grade)}
      onGenreChange={value => setGenre(value as Genre)}
      onDescriptionChange={setDescription}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  );
};

export default SellForm;

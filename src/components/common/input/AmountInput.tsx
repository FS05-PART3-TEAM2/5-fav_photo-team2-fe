import { useEffect, useState } from "react";
import Image from "next/image";

interface AmountInputProps {
  onChange: (value: number) => void;
  value?: number;
  max?: number;
}

export default function AmountInput({ onChange, value = 0, max = 10 }: AmountInputProps) {
  const [inputValue, setInputValue] = useState<number>(value);

  // 입력값 변경 시 상태 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === "" ? 0 : Number(e.target.value);
    setInputValue(newValue);
  };

  const handleClickPlus = () => {
    setInputValue(prev => Math.min(prev + 1, max));
  };

  const handleClickMinus = () => {
    setInputValue(prev => Math.max(0, prev - 1)); // 0 미만으로 내려가지 않도록
  };

  useEffect(() => {
    onChange(inputValue);
  }, [inputValue, onChange]);

  return (
    <div className="w-full h-full relative">
      <div
        className="absolute w-[22px] h-[22px] left-[12px] top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer"
        onClick={handleClickMinus}
      >
        <Image src="/assets/icons/dash.png" alt="minus" width={22} height={22} />
      </div>
      <input
        type="text"
        value={inputValue}
        className="w-full h-full px-[20px] rounded-[2px] text-white text-18-20-normal text-center
          outline-none border-[1px] border-gray-200 "
        onChange={handleChange}
      />
      <div
        className="absolute w-[22px] h-[22px] right-[12px] top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer"
        onClick={handleClickPlus}
      >
        <Image src="/assets/icons/plus.png" alt="plus" width={22} height={22} />
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

interface PriceInputProps {
  onChange: (value: number) => void;
  value?: number;
}

export default function PriceInput({ onChange, value = 0 }: PriceInputProps) {
  const [inputValue, setInputValue] = useState<number>(value);

  // 입력값 변경 시 상태 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === "" ? 0 : Number(e.target.value);
    setInputValue(newValue);
  };

  useEffect(() => {
    onChange(inputValue);
  }, [inputValue, onChange]);

  return (
    <div className="w-full h-full relative">
      <input
        type="text"
        placeholder="숫자만 입력"
        value={inputValue}
        className="w-full h-full px-[20px] rounded-[2px] text-white text-[14px] lg:text-[16px] font-normal
          outline-none border-[1px] border-gray-200 placeholder:text-gray-200 placeholder:font-light "
        onChange={handleChange}
      />
      <div className="absolute w-fit h-fit right-[20px] top-1/2 -translate-y-1/2 flex items-center justify-center">
        <p className="text-18-20-bold text-white">P</p>
      </div>
    </div>
  );
}

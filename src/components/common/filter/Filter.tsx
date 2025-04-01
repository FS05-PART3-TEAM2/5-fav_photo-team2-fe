"use client";

import { useState } from "react";
import { FILTER_CONFIG } from "./constants";
import Menu from "@/components/common/menu/Menu";
import Image from "next/image";

// FILTER_CONFIG.filter의 각 필드에 대한 타입을 자동으로 유추하도록 T 타입을 정의
type FilterName = keyof typeof FILTER_CONFIG.filter;
type OptionType<T extends FilterName> = (typeof FILTER_CONFIG.filter)[T]["options"];
type ValueType<T extends FilterName> = keyof OptionType<T>;

interface FilterProps<T extends FilterName> {
  name: T;
  value: ValueType<T>;
  onFilter: (value: ValueType<T>) => void;
}

export default function Filter<T extends FilterName>({ name, value, onFilter }: FilterProps<T>) {
  const { label, options } = FILTER_CONFIG.filter[name];
  const isDefault = value === "default";
  const [isOpen, setIsOpen] = useState(false);

  // 수정된 부분: handleSelect에서 OptionType[T]로 타입을 수정
  const handleSelect = (option: ValueType<T>) => {
    onFilter(option);
    setIsOpen(false); // 메뉴 닫기
  };

  return (
    <div className="w-32 md:w-35 xl:w-45 relative cursor-pointer">
      <div className="flex gap-2 items-center mb-4" onClick={() => setIsOpen(prev => !prev)}>
        <p>{isDefault ? label : options[value as keyof typeof options]}</p>
        <Image
          src="/assets/icons/down.png"
          alt={isDefault ? label : options[value as keyof typeof options]}
          width={24}
          height={24}
          className={`transform cursor-pointer transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && <Menu options={options} onSelect={handleSelect} />}
    </div>
  );
}

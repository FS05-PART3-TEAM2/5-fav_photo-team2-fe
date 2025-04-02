"use client";

import { useState } from "react";
import { Grade } from "@/types/photocard.types";
import Image from "next/image";

type DropdownType = {
  grade: {
    label: string;
    placeholder: string;
    options: Grade[];
    value: Grade;
  };
  genre: {
    label: string;
    placeholder: string;
    options: string[];
    value: string;
  };
};

const dropdownOptions: DropdownType = {
  grade: {
    label: "등급",
    placeholder: "등급을 선택해 주세요",
    options: ["COMMON", "RARE", "SUPER RARE", "LEGENDARY"],
    value: "" as Grade,
  },
  genre: {
    label: "장르",
    placeholder: "장르를 선택해 주세요",
    options: ["여행", "풍경", "인물", "사물"],
    value: "",
  },
};

interface CommonDropdownProps<T extends keyof DropdownType> {
  inputLabel: T;
  value?: DropdownType[T]["value"];
  onChange: (value: DropdownType[T]["value"]) => void;
}

export default function CommonDropdownInput<T extends keyof DropdownType>({
  inputLabel,
  value,
  onChange,
}: CommonDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const { label, placeholder, options } = dropdownOptions[inputLabel];

  // 현재 선택된 값 표시
  const selectedValue = value || "";

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={inputLabel}
        className="text-white font-bold text-[16px] lg:text-[20px] mb-3 text-left"
      >
        {label}
      </label>

      <div className="relative" onClick={() => setIsOpen(prev => !prev)}>
        <input
          type="text"
          value={selectedValue}
          className={`rounded-[2px] p-3 font-light text-base w-full outline-none border-[1px] border-gray-200 cursor-pointer text-white
            ${isOpen ? "outline-main" : ""}
            ${!selectedValue ? "placeholder:text-gray-200 placeholder:font-light" : ""}`}
          placeholder={placeholder}
          readOnly
        />
        <Image
          src="/assets/icons/down.png"
          alt={label}
          width={24}
          height={24}
          className={`transform -translate-y-1/2 cursor-pointer absolute right-4 top-1/2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
        {isOpen && (
          <ul className="bg-dark w-full border border-gray-200 rounded-[2px] p-[10px] mt-1 z-10 absolute">
            {options.map(option => (
              <li
                key={option}
                className={`p-3 cursor-pointer hover:bg-main hover:rounded-[2px] hover:text-dark
                  ${option === selectedValue ? "text-main" : "text-white"}`}
                onClick={event => {
                  event.stopPropagation();
                  onChange(option as DropdownType[T]["value"]);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

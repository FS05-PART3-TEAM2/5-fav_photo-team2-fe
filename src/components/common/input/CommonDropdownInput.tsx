"use client";

import { Grade, Genre } from "@/types/photocard.types";
import Image from "next/image";

type DropdownType = {
  grade: {
    label: string;
    placeholder: string;
    options: Record<Grade, string>;
    value: Grade;
  };
  genre: {
    label: string;
    placeholder: string;
    options: Record<Genre, string>;
    value: Genre;
  };
};

const dropdownOptions: Record<
  keyof DropdownType,
  Omit<DropdownType[keyof DropdownType], "value">
> = {
  grade: {
    label: "등급",
    placeholder: "등급을 선택해 주세요",
    options: {
      COMMON: "COMMON",
      RARE: "RARE",
      SUPER_RARE: "SUPER RARE",
      LEGENDARY: "LEGENDARY",
    },
  },
  genre: {
    label: "장르",
    placeholder: "장르를 선택해 주세요",
    options: {
      TRAVEL: "여행",
      LANDSCAPE: "풍경",
      PORTRAIT: "인물",
      OBJECT: "사물",
    },
  },
};

interface CommonDropdownProps<T extends keyof DropdownType> {
  inputLabel: T;
  value?: DropdownType[T]["value"];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChange: (value: DropdownType[T]["value"]) => void;
}

export default function CommonDropdownInput<T extends keyof DropdownType>({
  inputLabel,
  value,
  isOpen,
  onOpen,
  onClose,
  onChange,
}: CommonDropdownProps<T>) {
  const { label, placeholder, options } = dropdownOptions[inputLabel];

  const handleOptionClick = (key: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onChange(key as DropdownType[T]["value"]);
    onClose();
  };

  const selectedText = value ? options[value as keyof typeof options] : "";

  return (
    <div className="flex flex-col w-full">
      <label className="text-white font-bold text-[16px] lg:text-[20px] mb-3 text-left">
        {label}
      </label>

      <div className="relative" onClick={() => (isOpen ? onClose() : onOpen())}>
        <input
          type="text"
          value={selectedText}
          className={`rounded-[2px] p-3 font-light text-base w-full outline-none border-[1px] border-gray-200 cursor-pointer text-white
            ${isOpen ? "outline-main" : ""}
            ${!value ? "placeholder:text-gray-200 placeholder:font-light" : ""}`}
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

        <div
          className={`absolute w-full mt-1 transition-all duration-200 ease-in-out origin-top ${
            isOpen
              ? "opacity-100 scale-y-100 translate-y-0 z-50"
              : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <ul className="bg-dark w-full border border-gray-200 rounded-[2px] p-[10px] relative">
            {Object.entries(options).map(([key, text]) => (
              <li
                key={key}
                className={`p-3 cursor-pointer hover:bg-main hover:rounded-[2px] hover:text-dark
                  ${key === value ? "text-main" : "text-white"}`}
                onClick={e => handleOptionClick(key, e)}
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useDropdownStore } from "@/store/useDropdownStore";
import { FORM_CONFIG } from "./constants";
import Image from "next/image";
import Menu from "@/components/common/menu/Menu";
import { UseControllerProps, useController, FieldValues, FieldPath } from "react-hook-form";

type DropdownName = keyof typeof FORM_CONFIG.Dropdown;

interface DropdownProps<T extends FieldValues> extends Omit<UseControllerProps<T>, "name"> {
  name: DropdownName;
}

export default function Dropdown<T extends FieldValues>({ name, ...props }: DropdownProps<T>) {
  const { field } = useController({
    name: name as FieldPath<T>, // name을 FieldPath<T>로 강제
    ...props,
  });
  const { label, placeholder, options } = FORM_CONFIG.Dropdown[name];
  const { openName, setOpenName } = useDropdownStore();
  const isOpen = openName === name;
  const selectedValue = field.value ? options[field.value] : "";

  const handleToggle = () => {
    setOpenName(isOpen ? null : name); // 열려있으면 닫고, 닫혀있으면 열기
  };

  const handleSelect = (option: string) => {
    field.onChange(option);
    setOpenName(null); // 선택 시 메뉴 닫기
  };

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="text-white font-bold text-lg mb-3 text-left">
        {label}
      </label>

      <div className="relative" onClick={handleToggle}>
        <input
          type="text"
          {...{ ...field, value: selectedValue }}
          className={`rounded-[2px] p-3 font-light text-base w-full outline outline-gray-200 cursor-pointer
            ${isOpen ? "outline-main" : ""}`}
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
        {isOpen && <Menu options={options} onSelect={handleSelect} widthStyle="w-full" />}
      </div>
    </div>
  );
}

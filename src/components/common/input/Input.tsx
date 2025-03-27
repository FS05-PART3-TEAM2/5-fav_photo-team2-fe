"use client";

import { FORM_CONFIG } from "@/components/common/input/constants";
import { UseControllerProps, useController, FieldValues, FieldPath } from "react-hook-form";

type InputName = keyof typeof FORM_CONFIG.Input;

interface InputProps<T extends FieldValues> extends Omit<UseControllerProps<T>, "name"> {
  name: InputName; // name 기존 TName 타입 바꿔치기! 🥷🏻
}

export default function Input<T extends FieldValues>({ name, ...props }: InputProps<T>) {
  const { field, fieldState } = useController({
    name: name as FieldPath<T>, // name을 FieldPath<T>로 강제 // 안하면 오류 생김
    ...props,
  });
  const type = name === "email" ? "email" : "text";
  const { label, placeholder } = FORM_CONFIG.Input[name];

  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name} className="text-white font-bold text-lg mb-3 text-left">
        {label}
      </label>

      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...field}
        className={`pl-5 pr-11 py-4 rounded-[2px] text-white font-light text-base outline ${
          fieldState.error ? "outline-red" : "outline-gray-200 focus:outline-main"
        } focus:outline-2`}
      />

      {fieldState.error && (
        <p className="text-red text-base font-light mt-1 text-left">{fieldState.error.message}</p>
      )}
    </div>
  );
}

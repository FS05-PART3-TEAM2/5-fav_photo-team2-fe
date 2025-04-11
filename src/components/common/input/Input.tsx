"use client";

import { FORM_CONFIG } from "@/components/common/input/constants";
import { InputHTMLAttributes } from "react";
import { UseControllerProps, useController, FieldValues, FieldPath } from "react-hook-form";

type InputName = keyof typeof FORM_CONFIG.Input;
type InputAttribute = InputHTMLAttributes<HTMLInputElement>;
interface InputProps<T extends FieldValues>
  extends Omit<UseControllerProps<T>, "name">,
    Omit<InputAttribute, "name" | "defaultValue"> {
  name: InputName;
  hidden?: boolean; // hidden은 InputProps에서 사용되는 속성
  defaultValue?: UseControllerProps<T>["defaultValue"]; // defaultValue는 useController에서 사용되는 속성
}

export default function Input<T extends FieldValues>({ name, hidden, ...props }: InputProps<T>) {
  const isEmail = name === "email";
  const { field, fieldState } = useController({
    name: name as FieldPath<T>, // name을 FieldPath<T>로 강제 // 안하면 오류 생김
    ...props,
  });
  const type = isEmail ? "email" : "text";
  const { label, placeholder } = FORM_CONFIG.Input[name];

  return (
    <div className={`w-full flex flex-col ${hidden ? "hidden" : ""}`}>
      <label htmlFor={name} className="text-white font-bold text-lg mb-3 text-left">
        {label}
      </label>

      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...field}
        {...props}
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

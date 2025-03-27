"use client";

import { FORM_CONFIG } from "@/components/common/input/constants";
import Image from "next/image";
import { UseControllerProps, useController, FieldValues, FieldPath } from "react-hook-form";
import { useState } from "react";

const ICON_PATHS = {
  iconVisible: "/assets/icons/visible.png",
  iconInvisible: "/assets/icons/invisible.png",
};

type PasswordName = "password" | "passwordConfirm";

interface PasswordProps<T extends FieldValues> extends Omit<UseControllerProps<T>, "name"> {
  name: PasswordName; // name 기존 TName 타입 바꿔치기! 🥷🏻
}

export default function Password<T extends FieldValues>({ name, ...props }: PasswordProps<T>) {
  const { field, fieldState } = useController({
    name: name as FieldPath<T>, // name을 FieldPath<T>로 강제 // 안하면 오류 생김
    ...props,
  });
  const { label, placeholder } = FORM_CONFIG.Password[name];

  // 비밀번호 보이기/숨기기 상태 관리
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 비밀번호 보이기/숨기기 토글 함수
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name} className="text-white font-bold text-lg mb-3 text-left">
        {label}
      </label>

      <div className="relative">
        <input
          type={isPasswordVisible ? "text" : "password"} // 비밀번호 보이기/숨기기
          id={name}
          placeholder={placeholder}
          {...field}
          className={`w-full pl-5 pr-11 py-4 rounded-[2px] text-white font-light text-base outline ${
            fieldState.error ? "outline-red" : "outline-gray-200 focus:outline-main"
          } focus:outline-2`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="transform -translate-y-1/2 cursor-pointer absolute right-4 top-1/2"
        >
          <Image
            src={isPasswordVisible ? ICON_PATHS.iconVisible : ICON_PATHS.iconInvisible} // 아이콘 변경
            alt="비밀번호 미리보기"
            width={24}
            height={24}
          />
        </button>
      </div>

      {fieldState.error && (
        <p className="text-red text-base font-light mt-1 text-left">{fieldState.error.message}</p>
      )}
    </div>
  );
}

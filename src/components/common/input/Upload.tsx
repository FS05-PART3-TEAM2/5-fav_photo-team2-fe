"use client";

import Image from "next/image";
import { useRef } from "react";
import { useController, FieldValues, FieldPath, UseControllerProps } from "react-hook-form";

interface UploadProps<T extends FieldValues> extends Omit<UseControllerProps<T>, "defaultValue"> {
  name: FieldPath<T>;
}

export default function Upload<T extends FieldValues>({ name, control }: UploadProps<T>) {
  const { field } = useController({ name, control });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      field.onChange(file); // 파일 자체 저장
    }
  };

  const handleDelete = () => {
    field.onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // 파일 input 초기화
    }
  };

  return (
    <div className="w-full">
      <label htmlFor="upload" className="text-white font-bold text-lg mb-3 text-left">
        사진 업로드
      </label>

      <div className="w-full mt-[10px] flex gap-[10px]">
        <div className="flex-1 relative group">
          <input
            type="text"
            placeholder="사진 업로드"
            value={
              typeof field.value === "object" && field.value !== null && "name" in field.value
                ? field.value.name
                : ""
            }
            readOnly
            className="w-full py-4 pl-5 pr-11 outline outline-white rounded-[2px]"
          />
          {field.value && (
            <Image
              src="/assets/icons/close.png"
              alt="사진 업로드"
              width={24}
              height={24}
              onClick={handleDelete}
              className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer group-hover:block"
            />
          )}
        </div>

        <button
          type="button"
          onClick={handleUpload}
          className="py-4 px-6 md:px-8 xl:px-7 outline outline-main rounded-[2px] text-main text-sm xl:text-base font-normal cursor-pointer"
        >
          파일 선택
        </button>

        {/* 실제 파일 선택 input */}
        <input
          type="file"
          name={name}
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          hidden
        />
      </div>
    </div>
  );
}

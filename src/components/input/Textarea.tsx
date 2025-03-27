'use client';

import { FORM_CONFIG } from '@/components/common/input/constants';
import { UseControllerProps, useController, FieldValues, FieldPath } from 'react-hook-form';

type TextareaName = keyof typeof FORM_CONFIG.Textarea;

interface TextareaProps<T extends FieldValues> extends Omit<UseControllerProps<T>, 'name'> {
  name: TextareaName;
  content?: string; // 수정일 경우 기존 내용
}

export default function Textarea<T extends FieldValues>({ name, ...props }: TextareaProps<T>) {
  const { field, fieldState } = useController({
    name: name as FieldPath<T>,
    ...props,
  });
  const { label, placeholder, height } = FORM_CONFIG.Textarea[name];

  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name} className="text-white font-bold text-lg mb-3 text-left">
        {label}
      </label>

      <textarea
        id={name}
        placeholder={placeholder}
        {...field}
        style={{ height: `${height}px` }}
        className={`pl-5 pr-11 py-4 rounded-[2px] text-white font-light text-base outline ${
          fieldState.error ? 'outline-red' : 'outline-gray-200 focus:outline-main'
        } focus:outline-2`}
      />

      {fieldState.error && (
        <p className="text-red text-base font-light mt-1 text-left">{fieldState.error.message}</p>
      )}
    </div>
  );
}

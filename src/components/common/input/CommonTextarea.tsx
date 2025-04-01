interface CommonTextareaProps {
  label: string;
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
}

export default function CommonTextarea({
  label,
  placeholder,
  value,
  onChange,
}: CommonTextareaProps) {
  return (
    <div className="w-full flex flex-col gap-[10px]">
      <label htmlFor={label} className="text-white font-bold text-[16px] lg:text-[20px] text-left">
        {label}
      </label>

      <textarea
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`px-5 py-4 h-[140px] md:h-[120px] rounded-[2px] text-white font-normal border-[1px] border-gray-200 outline-none
          placeholder:text-gray-200 placeholder:font-light`}
      />
    </div>
  );
}

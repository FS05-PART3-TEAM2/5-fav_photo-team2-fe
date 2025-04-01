interface MenuProps<T extends Record<string, string>> {
  options: T;
  onSelect: (value: keyof T) => void;
}

export default function Menu<T extends Record<string, string>>({
  options,
  onSelect,
}: MenuProps<T>) {
  return (
    <ul className="bg-dark w-full border border-gray-200 rounded-[2px] p-[10px] mt-1 z-10 absolute">
      {Object.entries(options).map(([key, value]) => (
        <li
          key={key}
          className="p-3 cursor-pointer hover:bg-main hover:rounded-[2px] hover:text-dark"
          onClick={event => {
            event.stopPropagation(); // 부모로 이벤트 전파 방지
            onSelect(key);
          }}
        >
          {value}
        </li>
      ))}
    </ul>
  );
}

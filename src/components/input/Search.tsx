import Image from 'next/image';
import { useState } from 'react';

interface SearchProps {
  onSearch: (keyword: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [inputValue, setInputValue] = useState(''); // 입력값 상태 관리

  // 입력값 변경 시 상태 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // enter 키 입력 시 검색 실행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
    }
  };

  return (
    <div className="xl:w-80 md:w-50 relative">
      <input
        type="text"
        placeholder="검색어 입력 후 엔터로 검색"
        className="w-full pl-5 pr-11 py-4 rounded-[2px] text-white font-light text-base outline outline-gray-200 focus:outline-main focus:outline-2 bg-transparent"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
      {/* 아이콘을 입력란 오른쪽에 배치 */}
      <Image
        src="/assets/icons/search.png"
        alt="검색창"
        width={24}
        height={24}
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
      />
    </div>
  );
}

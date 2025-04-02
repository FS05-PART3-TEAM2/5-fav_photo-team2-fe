import React, { useState } from "react";
import Image from "next/image";
import { FILTER_CONFIG } from "@/components/common/filter/constants";

// 필터 가능한 타입 정의
type FilterName = "grade" | "genre" | "isSoldOut";
type FilterValue = string;

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilters: {
    grade: FilterValue;
    genre: FilterValue;
    isSoldOut: FilterValue;
  };
  onFilterChange: (filterName: FilterName, value: FilterValue) => void;
}

export default function FilterModal({
  isOpen,
  onClose,
  selectedFilters,
  onFilterChange,
}: FilterModalProps) {
  const [activeTab, setActiveTab] = useState<FilterName>("grade");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-[400px]">
        <h2 className="text-lg font-bold mb-4">필터</h2>
        <button onClick={onClose}>
          <Image src="/assets/icons/close-gray3.png" alt="모달 닫기" width={24} height={24} />
        </button>
        {/* 필터 탭 버튼 */}
        <div className="flex justify-around border-b pb-2 mb-4">
          {(["grade", "genre", "isSoldOut"] as FilterName[]).map(filter => (
            <button
              key={filter}
              onClick={() => setActiveTab(filter)}
              className={`px-4 py-2 ${activeTab === filter ? "border-b-2 border-black font-bold" : "text-gray-500"}`}
            >
              {FILTER_CONFIG.filter[filter].label}
            </button>
          ))}
        </div>

        {/* 선택 가능한 옵션 */}
        <div className="space-y-2">
          {Object.entries(FILTER_CONFIG.filter[activeTab].options).map(([key, label]) => (
            <button
              key={key}
              onClick={() => onFilterChange(activeTab, key)}
              className={`block w-full text-left px-4 py-2 rounded ${selectedFilters[activeTab] === key ? "bg-gray-200 font-bold" : "hover:bg-gray-100"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import Image from "next/image";
import { FILTER_CONFIG } from "@/components/common/filter/constants";
import { UpdateSaleCardResponseDto } from "@/types/photocard.types";

//SEJEONG: API받아오고, 판매현황 추가하기

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
  photoCards: UpdateSaleCardResponseDto[];
}

const GRADE_MAP: Record<string, string> = {
  "SUPER RARE": "SUPER_RARE",
  COMMON: "COMMON",
  RARE: "RARE",
  LEGENDARY: "LEGENDARY",
};

const GENRE_MAP: Record<string, string> = {
  travel: "여행",
  landscape: "풍경",
  portrait: "인물",
  object: "사물",
};

export default function FilterModal({
  isOpen,
  onClose,
  selectedFilters,
  onFilterChange,
  photoCards,
}: FilterModalProps) {
  const [activeTab, setActiveTab] = useState<FilterName>("grade");

  if (!isOpen) return null;

  // 각 필터 옵션에 대한 데이터 개수 계산
  const getOptionCount = (filterName: FilterName, value: string) => {
    if (value === "default") return photoCards.length; // '전체' 선택 시 모든 항목 개수 반환
    return photoCards.filter(card => {
      if (filterName === "grade") {
        // 데이터를 FILTER_CONFIG 형식과 맞춤 (ex. "SUPER RARE" → "SUPER_RARE")
        return GRADE_MAP[card.grade] === value;
      }
      if (filterName === "genre") {
        return GENRE_MAP[value] === card.genre;
      }
      if (filterName === "isSoldOut") {
        return value === "soldOut" ? card.status === "SOLD_OUT" : card.status !== "SOLD_OUT";
      }
      return false;
    }).length;
  };

  // 필터 초기화
  const onResetFilters = () => {
    onFilterChange("grade", "default");
    onFilterChange("genre", "default");
    onFilterChange("isSoldOut", "default");
  };
  // 현재 선택한 필터에 맞는 총 데이터 개수 계산
  const getFilteredCount = () => {
    return photoCards.filter(card => {
      // 등급 필터 적용
      if (selectedFilters.grade !== "default" && GRADE_MAP[card.grade] !== selectedFilters.grade) {
        return false;
      }
      // 장르 필터 적용
      if (selectedFilters.genre !== "default" && GENRE_MAP[selectedFilters.genre] !== card.genre) {
        return false;
      }
      // 매진 여부 필터 적용
      if (selectedFilters.isSoldOut !== "default") {
        if (selectedFilters.isSoldOut === "soldOut" && card.status !== "SOLD_OUT") {
          return false;
        }
        if (selectedFilters.isSoldOut !== "soldOut" && card.status === "SOLD_OUT") {
          return false;
        }
      }
      return true;
    }).length;
  };

  return (
    <div
      className="fixed inset-0 flex items-end justify-center bg-black/50 z-[1000]"
      onClick={onClose}
    >
      <div
        className="bg-[#1B1B1B] w-full min-h-[541px] flex flex-col rounded-t-[16px] z-[1001]"
        onClick={e => e.stopPropagation()}
      >
        {/* 모달 상단 헤더 */}
        <div className="relative flex items-center justify-between px-[10px] py-[16px]">
          <h2 className="absolute left-1/2 transform -translate-x-1/2 text-[16px] text-gray-400 font-medium">
            필터
          </h2>
          <button onClick={onClose} className="ml-auto">
            <Image src="/assets/icons/close-gray3.png" alt="모달 닫기" width={24} height={24} />
          </button>
        </div>
        {/* 필터 탭 버튼 */}
        <div className="mb-[16px] px-[24px] gap-[24px]">
          {(["grade", "genre", "isSoldOut"] as FilterName[]).map(filter => (
            <button
              key={filter}
              onClick={() => setActiveTab(filter)}
              className={`p-[16px] text-[14px] ${activeTab === filter ? "border-b-[1.5px] border-white font-bold" : "text-gray-400"}`}
            >
              {FILTER_CONFIG.filter[filter].label}
            </button>
          ))}
        </div>

        {/* 선택 가능한 옵션 */}
        <div className="flex-grow">
          {Object.entries(FILTER_CONFIG.filter[activeTab].options).map(([key, label]) => {
            const isSelected = selectedFilters[activeTab] === key;

            return (
              <button
                key={key}
                onClick={() => onFilterChange(activeTab, key)}
                className={`flex justify-between w-full text-left px-[32px] py-[16PX] rounded ${
                  isSelected
                    ? "bg-gray-500 font-bold text-white"
                    : "hover:bg-gray-500 text-gray-300"
                }`}
              >
                <span className={isSelected ? "text-white" : "text-gray-300"}>{label}</span>
                <span className={isSelected ? "text-white" : "text-gray-300"}>
                  {getOptionCount(activeTab, key)}개
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-center px-[15px] py-[40px] gap-[11px]">
          <button onClick={onResetFilters} className="flex items-center p-[15px]">
            <Image src="/assets/icons/exchange.png" alt="리셋" width={20} height={20} />
          </button>
          <button
            onClick={onClose}
            className="bg-main text-black w-full h-[55px] px-auto py-[17px] rounded-[2px] font-medium"
          >
            {getFilteredCount()}개 포토보기
          </button>
        </div>
      </div>
    </div>
  );
}

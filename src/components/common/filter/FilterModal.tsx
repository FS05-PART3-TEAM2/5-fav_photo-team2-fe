import React, { useState, useEffect } from "react";
import { axiosClient } from "@/services/axiosClient/axiosClient";
import Image from "next/image";
import { FILTER_CONFIG } from "@/components/common/filter/constants";
import { FilterCountResponse } from "@/types/filter.types";

const GRADE_COLOR_MAP: Record<string, string> = {
  default: "text-gray-300",
  COMMON: "text-main",
  RARE: "text-blue",
  SUPER_RARE: "text-purple",
  LEGENDARY: "text-pink",
};

// 필터 가능한 타입 정의
type FilterName = "grade" | "genre" | "isSoldOut";
type FilterValue = string;

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilters: {
    grade: FilterValue;
    genre: FilterValue;
    isSoldOut?: FilterValue;
  };
  onFilterChange: (filterName: FilterName, value: FilterValue) => void;
  availableFilters: FilterName[];
  buildCountUrl: (filterParams: { grade?: string; genre?: string; isSoldOut?: string }) => string;
}

export default function FilterModal({
  isOpen,
  onClose,
  selectedFilters,
  onFilterChange,
  availableFilters,
  buildCountUrl,
}: FilterModalProps) {
  const [activeTab, setActiveTab] = useState<FilterName>(availableFilters[0]);
  const [count, setCount] = useState<number>(0);
  const [optionCounts, setOptionCounts] = useState<Record<string, number>>({}); //각 옵션별 count(개)

  // API 요청하여 필터별 개수 불러오기
  const fetchCounts = async () => {
    try {
      const { grade, genre, isSoldOut } = selectedFilters;
      const params = new URLSearchParams();

      if (grade !== "default") params.append("grade", grade);
      if (genre !== "default") params.append("genre", genre);
      if (isSoldOut !== "default") {
        params.append("status", isSoldOut === "soldOut" ? "SOLD_OUT" : "ON_SALE");
      }

      // const url = `/market/count${queryString ? `?${queryString}` : ""}`;
      const url = buildCountUrl({
        grade: grade !== "default" ? grade : undefined,
        genre: genre !== "default" ? genre : undefined,
        isSoldOut: isSoldOut !== "default" ? isSoldOut : undefined,
      });
      const response = await axiosClient.get<FilterCountResponse>(url);
      setCount(response.data.count);
    } catch (error) {
      console.error("❌ 필터 count 불러오기 실패:", error);
    }
  };

  // 모달이 열릴 때마다 필터 개수 불러오기
  useEffect(() => {
    if (isOpen) {
      fetchCounts();
    }
  }, [isOpen, selectedFilters]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchOptionCounts = async () => {
      const optionKeys = Object.keys(FILTER_CONFIG.filter[activeTab].options);
      const newCounts: Record<string, number> = {};

      await Promise.all(
        optionKeys.map(async key => {
          const params = new URLSearchParams();

          // ✅ 수정 1: "default" 키도 요청을 보냅니다
          // (단, 현재 활성 탭의 파라미터는 포함하지 않음)

          // 👉 현재 활성화된 탭에 따라 해당 파라미터는 생략하고, 나머지만 추가
          if (activeTab !== "grade" && selectedFilters.grade !== "default") {
            params.append("grade", selectedFilters.grade);
          }

          if (activeTab !== "genre" && selectedFilters.genre !== "default") {
            params.append("genre", selectedFilters.genre);
          }

          if (activeTab !== "isSoldOut" && selectedFilters.isSoldOut !== "default") {
            params.append(
              "status",
              selectedFilters.isSoldOut === "soldOut" ? "SOLD_OUT" : "ON_SALE"
            );
          }

          // ✅ 수정 2: 현재 탭에 해당하는 파라미터는 "default"가 아닐 때만 포함
          if (activeTab === "grade" && key !== "default") {
            params.append("grade", key);
          } else if (activeTab === "genre" && key !== "default") {
            params.append("genre", key);
          } else if (activeTab === "isSoldOut") {
            if (key === "soldOut") {
              params.append("status", "SOLD_OUT");
            } else if (key === "onSale") {
              params.append("status", "ON_SALE");
            }
            // default일 경우 아무것도 추가하지 않음
          }

          // const url = `/market/count?${params.toString()}`;
          // 옵션 개수 요청할 때 URL 생성 부분
          const url = buildCountUrl({
            grade:
              activeTab === "grade"
                ? key !== "default"
                  ? key
                  : undefined
                : selectedFilters.grade !== "default"
                  ? selectedFilters.grade
                  : undefined,
            genre:
              activeTab === "genre"
                ? key !== "default"
                  ? key
                  : undefined
                : selectedFilters.genre !== "default"
                  ? selectedFilters.genre
                  : undefined,
            isSoldOut:
              activeTab === "isSoldOut"
                ? key !== "default"
                  ? key
                  : undefined
                : selectedFilters.isSoldOut !== "default"
                  ? selectedFilters.isSoldOut
                  : undefined,
          });
          try {
            const res = await axiosClient.get<{ count: number }>(url);
            newCounts[key] = res.data.count;
          } catch (error) {
            console.error("❌ 옵션 count 불러오기 실패:", error);
          }
        })
      );

      setOptionCounts(newCounts);
    };

    fetchOptionCounts();
  }, [activeTab, isOpen, selectedFilters]);

  // 필터 초기화
  const onResetFilters = () => {
    availableFilters.forEach(filter => {
      onFilterChange(filter, "default");
    });
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
          {availableFilters.map(filter => (
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
            const isGradeFilter = activeTab === "grade";
            // 등급(grade) 필터일 때만 색상을 적용
            const textColorClass = isGradeFilter
              ? GRADE_COLOR_MAP[key] || "text-gray-300"
              : isSelected
                ? "text-white"
                : "text-gray-300";

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
                <span className={textColorClass}>{label}</span>
                <span className={isSelected ? "text-white" : "text-gray-300"}>
                  {optionCounts[key] ?? 0}개
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
            {count}개 포토보기
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * latest: 최신순
 * oldest: 오래된순
 * expensive: 비싼순
 * cheap: 저렴한순
 */

import Image from "next/image";
import { FILTER_CONFIG } from "./constants";
import Menu from "../menu/Menu";
import { useMemo, useState } from "react";

export type OrderOption = "latest" | "oldest" | "expensive" | "cheap";

interface OrderProps {
  orderBy: OrderOption;
  setOrderBy: (value: OrderOption) => void;
}

export default function Order({ orderBy, setOrderBy }: OrderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const name = useMemo(() => FILTER_CONFIG.orderBy[orderBy], [orderBy]);

  const handleSelect = (option: OrderOption) => {
    setOrderBy(option);
    setIsOpen(false); // 메뉴 닫기
  };

  return (
    <div className="w-32 md:w-35 xl:w-45 relative">
      <div
        className="px-5 py-3 border border-gray-200 rounded-[2px] font-normal flex justify-between relative cursor-pointer"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <p className="text-xs md:text-sm xl:text-base">{name}</p>
        <Image
          src="/assets/icons/down.png"
          alt="정렬"
          width={24}
          height={24}
          className={`transform -translate-y-1/2 cursor-pointer absolute right-4 top-1/2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && <Menu options={FILTER_CONFIG.orderBy} onSelect={handleSelect} />}
    </div>
  );
}

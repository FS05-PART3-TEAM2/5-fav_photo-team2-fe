"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 50); // 일정 이상 스크롤 시 버튼 보이기
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-8 z-999 w-14 h-14 bg-gray-700 hover:bg-gray-600 text-white rounded-full shadow-md transition-all flex items-center justify-center"
    >
      <div className="relative w-8 h-8 cursor-pointer">
        <Image src="/assets/icons/up_button.png" alt="맨 위로" layout="fill" objectFit="contain" />
      </div>
    </button>
  );
};

export default ScrollToTopButton;

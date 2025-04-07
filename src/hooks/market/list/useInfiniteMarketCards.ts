import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { MarketplacePhotoCardDto } from "@/types/photocard.types";
import { axiosClient } from "@/services/axiosClient/axiosClient";

export default function useInfiniteMarketCards() {
  const [data, setData] = useState<MarketplacePhotoCardDto[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // ✅ 브레이크포인트에 따른 limit 설정
  const limit = useMemo(() => {
    if (typeof window === "undefined") return 15;
    const width = window.innerWidth;
    if (width <= 768) return 10; // 모바일
    if (width <= 1024) return 10; // 태블릿
    return 15; // 데스크탑
  }, []);

  const fetchMore = useCallback(async () => {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const res = await axiosClient.get("/market", {
        params: {
          cursor: cursor || undefined,
          limit,
        },
      });

      const newCards = res.data.list;
      const nextCursor = res.data.nextCursor;
      // 배열인지 확인
      if (Array.isArray(newCards)) {
        setData(prev => [...prev, ...newCards]);
        setCursor(nextCursor);
      } else {
        console.warn("서버 응답 형식이 예상과 다릅니다:", res.data);
      }
    } catch (err) {
      console.error("데이터 불러오기 실패:", err);
    } finally {
      setIsFetching(false);
    }
  }, [cursor, isFetching, limit]);

  useEffect(() => {
    fetchMore(); // 첫 로드
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && cursor) {
          fetchMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchMore, cursor]);

  return { data, isFetching, observerRef };
}

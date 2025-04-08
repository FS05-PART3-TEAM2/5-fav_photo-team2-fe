import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { MarketplacePhotoCardDto } from "@/types/photocard.types";
import { axiosClient } from "@/services/axiosClient/axiosClient";
import qs from "qs";

interface Cursor {
  createdAt: string;
  id: string;
}

interface FetchParams {
  limit: number;
  cursor?: Cursor;
}

export default function useInfiniteMarketCards() {
  const [data, setData] = useState<MarketplacePhotoCardDto[]>([]);
  const [cursor, setCursor] = useState<Cursor | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const lastCardRef = useRef<HTMLDivElement | null>(null);

  // ✅ 브레이크포인트에 따른 limit 설정
  const limit = useMemo(() => {
    if (typeof window === "undefined") return 15;
    const width = window.innerWidth;
    if (width <= 768) return 10; // 모바일
    if (width <= 1024) return 10; // 태블릿
    return 15; // 데스크탑
  }, []);

  const fetchMore = useCallback(async () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);

    try {
      const params: FetchParams = { limit };

      if (cursor) {
        params.cursor = cursor; // 중첩 객체로 넣기
      }
      //console. log(
      //   "📤 요청 쿼리스트링:",
      //   qs.stringify(params, { encode: false, arrayFormat: "brackets" })
      // );
      const queryString = qs.stringify(params, {
        encode: false,
        arrayFormat: "brackets",
      });
      const res = await axiosClient.get(`/market?${queryString}`);

      const newCards = res.data.list;
      const nextCursor = res.data.nextCursor;

      if (Array.isArray(newCards)) {
        setData(prev => [...prev, ...newCards]);
        setCursor(nextCursor || null);
        setHasMore(!!nextCursor);
        //console. log("📄 받아온 데이터:", newCards.length, newCards);
        //console. log("➡️ 다음 커서:", nextCursor);
      } else {
        console.warn("서버 응답 형식이 예상과 다릅니다:", res.data);
      }
    } catch (err) {
      console.error("데이터 불러오기 실패:", err);
    } finally {
      setIsFetching(false);
    }
  }, [cursor, isFetching, limit]);

  // ✅ 첫 페이지 로드
  useEffect(() => {
    fetchMore();
  }, []);

  // ✅ IntersectionObserver로 감시
  useEffect(() => {
    //console. log("👀 감시 useEffect 실행됨", lastCardRef.current);
    const target = lastCardRef.current;
    if (!target) {
      //console. log("⛔ 아직 DOM에 연결되지 않음 (ref가 null)", target);
      return;
    }

    //console. log("👀 감시 시작:", target);

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          //console. log("📦 카드가 보입니다. fetchMore 호출!");
          fetchMore();
        }
      },
      { threshold: 0.5 }
    );

    if (lastCardRef.current) {
      //console. log("👀 감시 시작:", lastCardRef.current);
      observer.observe(lastCardRef.current);
    }

    return () => {
      if (lastCardRef.current) {
        //console. log("🧹 감시 해제:", lastCardRef.current);
        observer.unobserve(lastCardRef.current);
      }
    };
  }, [data.length, fetchMore, hasMore, isFetching]);

  return { data, isFetching, lastCardRef };
}

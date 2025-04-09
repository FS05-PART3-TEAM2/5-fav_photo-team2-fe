"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { drawRandomPoint, getRandomPointStatus } from "../../services/random-point/getRandomPoint";
import { useSnackbarStore } from "@/store/useSnackbarStore";

interface RandomPointModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RandomPointModal = ({ isOpen, onClose }: RandomPointModalProps) => {
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [earnedPoint, setEarnedPoint] = useState<number | null>(null);
  const [isSelectable, setIsSelectable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const { openSnackbar } = useSnackbarStore();

  // 모달이 열릴 때 서버에서 상태 확인
  useEffect(() => {
    if (isOpen) {
      checkDrawStatus();
    } else {
      setSelectedBox(null);
      setEarnedPoint(null);
      setApiError(null);
    }
  }, [isOpen]);

  // 남은 시간이 있을 경우 카운트다운 시작
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            // 카운트다운이 끝나면 상태 재확인
            checkDrawStatus();
            return 0;
          }
          return newTime;
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 뽑기 가능 여부 확인
  const checkDrawStatus = async () => {
    setIsLoading(true);
    setApiError(null);

    try {
      const statusData = await getRandomPointStatus();

      setIsSelectable(statusData.canDraw);

      if (!statusData.canDraw && statusData.remainingSeconds > 0) {
        setCountdown(Math.ceil(statusData.remainingSeconds));
      } else {
        setCountdown(0);
      }
    } catch {
      setApiError("상태 확인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 랜덤 박스 클릭
  const handleBoxClick = async (boxIndex: number) => {
    if (selectedBox !== null || isLoading) return;

    setIsLoading(true);
    setApiError(null);
    setSelectedBox(boxIndex);

    try {
      const result = await drawRandomPoint(boxIndex);

      if (result.success) {
        setEarnedPoint(result.point || 0);
        setIsSelectable(false);

        // 서버에서 업데이트된 상태 반영
        if (result.canDraw !== undefined) {
          setIsSelectable(result.canDraw);
        }
      } else {
        // 실패 응답 (400)
        setApiError(result.message);
        if (result.remainingSeconds !== undefined) {
          setCountdown(Math.ceil(result.remainingSeconds));
        }
        if (result.canDraw !== undefined) {
          setIsSelectable(result.canDraw);
        }
        setSelectedBox(null);
      }
    } catch {
      setApiError("서버와의 통신 중 오류가 발생했습니다.");
      setSelectedBox(null);
    } finally {
      setIsLoading(false);
    }
  };

  const formatRemainingSeconds = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.ceil(seconds % 60);

    if (minutes > 0) {
      return `${minutes}분 ${remainingSeconds}초`;
    }
    return `${remainingSeconds}초`;
  };

  // apiError 상태가 변경될 때 스낵바 표시
  useEffect(() => {
    if (apiError) {
      openSnackbar("ERROR", apiError);
      setApiError(null);
    }
  }, [apiError, openSnackbar]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* 모달 배경 */}
          <div className="absolute inset-0 bg-black opacity-80" onClick={onClose}></div>

          {/* 모달 컨텐츠 */}
          <div className="relative bg-gray-500 mx-1 px-5 pt-5 pb-10 w-full max-w-md md:max-w-xl lg:max-w-2xl rounded-[2px] shadow-lg z-10">
            <div className="w-full flex justify-end">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white cursor-pointer"
                disabled={isLoading}
              >
                <Image
                  src="/assets/icons/close-gray3.png"
                  alt="close modal"
                  width={28}
                  height={28}
                />
              </button>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-[30px] md:text-[36px] lg:text-[46px] font-BR-B text-white mb-[30px] lg:mb-[40px]">
                랜덤<span className="text-main">포인트</span>
              </h2>
              <p className="text-white text-[16px] md:text-[20px] font-bold">
                1시간마다 돌아오는 기회!
              </p>
              <p className="text-white text-[16px] md:text-[20px] font-bold">
                랜덤 상자 뽑기를 통해 포인트를 획득하세요!
              </p>

              {/* 실시간 카운트다운 표시 */}
              {!isSelectable && countdown > 0 && (
                <p className="mt-[30px] lg:mt-[40px]">
                  <div className="flex flex-col lg:flex-row justify-center items-center text-[14px] lg:text-[16px] gap-1">
                    <span className="text-gray-300">다음 기회까지 남은 시간</span>
                    <span className="text-main lg:ml-[10px]">
                      {formatRemainingSeconds(countdown)}
                    </span>
                  </div>
                </p>
              )}

              {/* {isLoading && !selectedBox && (
                <p className="mt-4 text-gray-300">Loading...</p>
              )} */}
            </div>

            {/* 선물 상자 선택 UI */}
            <div className="flex justify-center items-center space-x-4 my-8">
              {[0, 1, 2].map(boxIndex => (
                <div
                  key={boxIndex}
                  onClick={() => handleBoxClick(boxIndex)}
                  className={`relative cursor-pointer hover:scale-110 animate-pulse transition-transform ${
                    isLoading
                      ? "cursor-wait"
                      : isSelectable && selectedBox === null
                        ? "hover:scale-110"
                        : ""
                  } ${selectedBox === boxIndex ? "scale-100 ring-4 ring-main rounded-lg" : ""}`}
                >
                  <Image
                    src={`/assets/images/box${boxIndex + 1}.png`}
                    alt={`선물상자 ${boxIndex + 1}`}
                    width={200}
                    height={200}
                  />

                  {selectedBox === boxIndex && earnedPoint !== null && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                      {earnedPoint === 0 ? (
                        <p className="text-red-500 font-BR-B text-lg md:text-xl lg:text-2xl">
                          💣 실패 ! 💣
                        </p>
                      ) : (
                        <div className="text-main font-BR-B text-lg md:text-xl lg:text-2xl">
                          <p>🎉 성공 ! 🎉</p>
                          <p className="text-white">+ {earnedPoint} 포인트</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 포인트 획득 성공 메시지 */}
            {selectedBox !== null && earnedPoint !== null && (
              <div className="text-center">
                <p className="text-white text-sm lg:text-md mb-4">
                  {earnedPoint === 0
                    ? "다음 기회에 도전해보세요 ! 😭"
                    : `축하합니다! ${earnedPoint} 포인트가 적립되었습니다 ! 🥳`}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RandomPointModal;

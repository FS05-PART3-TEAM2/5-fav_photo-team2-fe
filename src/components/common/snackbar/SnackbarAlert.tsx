"use client";

import { useSnackbarStore } from "@/store/useSnackbarStore";
import { useEffect } from "react";

export const SnackbarAlert = () => {
  const { isSnackbarOpened, SnackbarType, SnackbarTitle, SnackbarMessage, closeSnackbar } =
    useSnackbarStore();

  useEffect(() => {
    if (isSnackbarOpened) {
      const timer = setTimeout(() => {
        closeSnackbar();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSnackbarOpened, closeSnackbar]);

  if (!isSnackbarOpened) return null;

  return (
    <div className="fixed inset-x-0 top-[70px] z-[10000] flex justify-center animate-fadeInOut">
      <div
        className={`w-[300px] md:w-[350px] lg:w-[400px] min-h-[100px] p-5
        flex items-center justify-center text-center rounded-[8px]
        shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] bg-gray-500 text-white border border-gray-300 whitespace-pre-line`}
      >
        <div className="flex flex-col items-center justify-center gap-[10px] text-center w-full">
          {SnackbarTitle && (
            <div className="flex items-center justify-center font-BR-B text-[24px] md:text-[28px] lg:text-[36px] gap-[4px]">
              {SnackbarTitle}
              {SnackbarType === "SUCCESS" ? (
                <p className="text-main">성공</p>
              ) : (
                <p className="text-gray-300">실패</p>
              )}
            </div>
          )}
          <p className="w-full text-[14px] md:text-[16px] lg:text-[20px] font-bold break-keep">
            {SnackbarMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

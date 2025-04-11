import React from "react";

interface DrawerProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function ResponsiveDrawer({ onClose, children }: DrawerProps) {
  return (
    // 오버레이
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/80" onClick={onClose} />

      {/* drawer */}
      <div className={drawerStyle}>
        <div className="sticky top-0 w-full  flex justify-center bg-gray-500">
          <div className="w-[48px] h-[6px] rounded-[50px] bg-gray-400" />
        </div>

        {/* 컨텐츠 영역 */}
        {/* <div className="w-full h-[calc(90vh-51px)] overflow-y-auto [&::-webkit-scrollbar]:w-[0px]"> */}
        {children}
        {/* </div> */}
      </div>
    </div>
  );
}

const drawerStyle =
  "fixed bottom-0 left-0 right-0 w-[100%] h-fit max-h-[90%] transition-transform bg-gray-500 px-[20px] pt-[15px] pb-[20px] flex flex-col items-center gap-[30px]";

import ResponsiveModal from "../ResponsiveModal";
import ResponsivePage from "../ResponsivePage";
import ResponsiveDrawer from "../ResponsiveDrawer";

interface ResponsiveFormProps {
  children: React.ReactNode;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ResponsiveForm({ children, title, isOpen, onClose }: ResponsiveFormProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* 데스크탑 */}
      <div className="hidden lg:block">
        <ResponsiveModal onClose={onClose}>
          <div
            className="w-full h-[calc(90vh-80px)] pr-[40px] overflow-y-auto
            [&::-webkit-scrollbar]:w-[8px] 
            [&::-webkit-scrollbar-track]:bg-transparent 
            [&::-webkit-scrollbar-thumb]:bg-gray-400 
            [&::-webkit-scrollbar-thumb]:rounded-full"
          >
            {children}
          </div>
        </ResponsiveModal>
      </div>

      {/* 태블릿 */}
      <div className="hidden md:block lg:hidden">
        <ResponsiveDrawer onClose={onClose}>
          <div className="w-full h-[calc(90vh-51px)] overflow-y-auto [&::-webkit-scrollbar]:w-[0px]">
            {children}
          </div>
        </ResponsiveDrawer>
      </div>

      {/* 모바일 */}
      <div className="block md:hidden">
        <ResponsivePage title={title} onClose={onClose}>
          {children}
        </ResponsivePage>
      </div>
    </>
  );
}

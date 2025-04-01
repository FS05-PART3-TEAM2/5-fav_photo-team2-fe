import ResponsiveModal from "./ResponsiveModal";
import ResponsivePage from "./ResponsivePage";
import ResponsiveDrawer from "./ResponsiveDrawer";

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
        <ResponsiveModal onClose={onClose}>{children}</ResponsiveModal>
      </div>

      {/* 태블릿 */}
      <div className="hidden md:block lg:hidden">
        <ResponsiveDrawer onClose={onClose}>{children}</ResponsiveDrawer>
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

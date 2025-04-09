import ResponsivePage from "@/components/common/responsiveLayout/ResponsivePage";

interface NotificationDrawerProps {
  onClose: () => void;
  children: React.ReactNode;
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ onClose, children }) => {
  return (
    <ResponsivePage title="알림" onClose={onClose}>
      {children || (
        <div className="flex justify-center items-center h-full text-gray-300">
          알림이 없습니다.
        </div>
      )}
    </ResponsivePage>
  );
};

export default NotificationDrawer;

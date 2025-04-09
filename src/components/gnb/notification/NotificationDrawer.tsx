import ResponsivePage from "@/components/common/responsiveLayout/ResponsivePage";

interface NotificationDrawerProps {
  onClose: () => void;
  children: React.ReactNode;
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ onClose, children }) => {
  return (
    <ResponsivePage title="알림" onClose={onClose}>
      {children}
    </ResponsivePage>
  );
};

export default NotificationDrawer;

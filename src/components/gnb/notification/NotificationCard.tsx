interface NotificationProps {
  children: React.ReactNode;
}

const NotificationCard: React.FC<NotificationProps> = ({ children }) => {
  return (
    <div className={`absolute top-4 md:right-0 w-[300px] h-[535px] overflow-y-auto`}>
      {children}
    </div>
  );
};

export default NotificationCard;

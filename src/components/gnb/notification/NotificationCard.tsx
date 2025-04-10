interface NotificationProps {
  children: React.ReactNode;
}

const NotificationCard: React.FC<NotificationProps> = ({ children }) => {
  return (
    <div
      className={`absolute top-5 md:right-0 w-[300px] h-[535px] overflow-y-auto bg-neutral-800 z-10`}
    >
      {children || (
        <div className="flex justify-center items-center h-full text-gray-300">
          알림이 없습니다.
        </div>
      )}
    </div>
  );
};

export default NotificationCard;

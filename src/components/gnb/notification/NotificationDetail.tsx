interface NotificationItemProps {
  content: string;
  time: string;
  isRead?: boolean;
  onClick?: () => void;
}

const NotificationDetail: React.FC<NotificationItemProps> = ({
  content,
  time,
  isRead,
  onClick,
}) => {
  return (
    <div
      className={`flex flex-col gap-[10px] p-[20px] border-b-[1px] border-gray-400 ${isRead ? "bg-gray-500" : "bg-neutral-800"} cursor-pointer`}
      onClick={onClick}
    >
      <div className={`"text-[14px] font-normal" ${isRead ? "text-gray-300" : "text-white"}`}>
        {content}
      </div>
      <div className="text-[12px] font-light text-gray-300">{time}</div>
    </div>
  );
};

export default NotificationDetail;

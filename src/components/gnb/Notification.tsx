interface NotificationProps {
  children: React.ReactNode;
  isOpen: boolean;
}
interface NotificationComponent extends React.FC<NotificationProps> {
  Item: React.FC<NotificationItemProps>;
}
interface NotificationItemProps {
  content: string;
  time: string;
  isRead?: boolean;
  onClick?: () => void;
}

const Notification: NotificationComponent = ({ isOpen, children }) => {
  return (
    isOpen && (
      <div className={`absolute top-4 md:right-0 w-[300px] h-[535px] overflow-y-auto`}>
        {children}
      </div>
    )
  );
};

const Item: React.FC<NotificationItemProps> = ({ content, time, isRead, onClick }) => {
  return (
    <div
      className={`flex flex-col gap-[10px] p-[20px] border-b-[1px] border-gray-400 ${isRead ? "bg-gray-500" : "bg-neutral-800"}`}
      onClick={onClick}
    >
      <div className={`"text-[14px] font-normal" ${isRead ? "text-gray-300" : "text-white"}`}>
        {content}
      </div>
      <div className="text-[12px] font-light text-gray-300">{time}</div>
    </div>
  );
};

Notification.Item = Item;

export default Notification;

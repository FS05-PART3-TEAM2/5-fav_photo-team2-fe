import Link from "next/link";

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  nickname: string;
  point: number;
  children?: React.ReactNode;
}

interface ProfileTextLinkProps {
  text: string;
  href: string;
}

interface ProfileComponent extends React.FC<ProfileProps> {
  TextLink: React.FC<ProfileTextLinkProps>;
}

const Profile: ProfileComponent = ({ isOpen, onClose, nickname, point, children }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="md:hidden fixed top-0 left-0 h-full w-full bg-[#0f0f0f]/75 shadow-lg z-40 transition-transform duration-300"
          onClick={handleClose}
        >
          <div
            className="top-0 left-0 h-full w-[260px] bg-white shadow-lg z-40 transition-transform duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 flex justify-between items-center border-b">
              <span className="text-lg font-semibold">Menu</span>
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <div
          className={`hidden md:block absolute w-[260px] md:py-[20px] right-0 bg-gray-500 rounded-[2px] z-10}`}
        >
          <div className="px-[20px] flex flex-col gap-[20px] mb-[20px]">
            <div className="text-[18px] font-bold text-white">안녕하세요, {nickname}님!</div>
            <div className="flex justify-between items-center">
              <div className="text-[12px] text-gray-300 font-light">보유포인트</div>
              <div className="text-[12px] text-main font-normal">{point}&nbsp;P</div>
            </div>
          </div>
          <hr className="border-t-[1px] border-gray-400"></hr>
          <div className="flex flex-col mt-[20px] gap-[15px] px-[20px]">{children}</div>
        </div>
      )}
    </>
  );
};

const TextLink: React.FC<ProfileTextLinkProps> = ({ text, href }) => {
  return (
    <Link href={href} className="text-[14px] font-bold text-white cursor-pointer">
      {text}
    </Link>
  );
};

Profile.TextLink = TextLink;

export default Profile;

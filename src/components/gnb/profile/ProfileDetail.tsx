import Link from "next/link";
import React from "react";

interface ProfileProps {
  nickname: string;
  point: number;
  children?: React.ReactNode;
  onLogout?: () => void;
}

interface ProfileTextLinkProps {
  text: string;
  href: string;
}

interface ProfileCardComponent extends React.FC<ProfileProps> {
  TextLink: React.FC<ProfileTextLinkProps>;
}

const ProfileDetail: ProfileCardComponent = ({ nickname, point, onLogout, children }) => {
  return (
    <>
      <div>
        <div className="px-[20px] flex flex-col gap-[20px] mb-[20px]">
          <div className="text-[18px] font-bold text-white">안녕하세요, {nickname}님!</div>
          <div className="flex justify-between items-center">
            <div className="text-[12px] text-gray-300 font-light">보유포인트</div>
            <div className="text-[12px] text-main font-normal">{point.toLocaleString()}&nbsp;P</div>
          </div>
        </div>
        <hr className="border-t-[1px] border-gray-400"></hr>
        <div className="flex flex-col mt-[20px] gap-[15px]">{children}</div>
      </div>
      {onLogout && (
        <div>
          <button
            className="text-[14px] font-normal text-gray-400 cursor-pointer px-[20px]"
            onClick={onLogout}
          >
            로그아웃
          </button>
        </div>
      )}
    </>
  );
};

const TextLink: React.FC<ProfileTextLinkProps> = ({ text, href }) => {
  return (
    <Link href={href} className="px-[20px] text-[14px] font-bold text-white cursor-pointer">
      {text}
    </Link>
  );
};

ProfileDetail.TextLink = TextLink;

export default ProfileDetail;

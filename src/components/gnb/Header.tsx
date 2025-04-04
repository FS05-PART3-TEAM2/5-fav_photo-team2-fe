"use client";

import useUserStore from "@/store/useUserStore";
import Title from "./Title";
import Link from "next/link";
import Image from "next/image";

/**
 * 최애의포토 : 마켓 플레이스 공통,
 * 제목 : 마켓플레이스 페이지(구매자), 판매 포토카드 상세
 */

const Header = () => {
  const { userInfo } = useUserStore();
  const isLogin = !!userInfo;

  return (
    <div className="flex justify-between max-w-[1520px] w-full items-center h-[60px] md:h-[70px] lg:h-[80px] px-[15px] md:px-[20px]">
      <Link href={"/"}>
        <Title>
          최애<span className="text-main">의</span>포토
        </Title>
      </Link>
      <div className="flex md:gap-[20px] lg:gap-[30px] items-center">
        {isLogin && (
          <>
            <div className="text-[14px] font-bold">{userInfo.point.toLocaleString()}&nbsp;P</div>
            <div className="flex md:gap-[10px] lg:gap-[16px] items-center">
              <button className="cursor-pointer">
                <Image
                  src={"/assets/icons/notification.png"}
                  alt="notification"
                  width={16}
                  height={16}
                />
              </button>
              <button className="cursor-pointer">
                <Image src={"/assets/icons/gift.png"} alt="gift" width={16} height={16} />
              </button>
            </div>
            <button className="font-BR-B text-[18px] font-normal cursor-pointer">
              {userInfo.nickname}
            </button>
            <div className="w-0.5 bg-gray-400 h-[14px] self-center"></div>
            <button className="text-[14px] font-normal text-gray-400 cursor-pointer">
              로그아웃
            </button>
          </>
        )}
        {!isLogin && (
          <>
            <Link href={"/auth/login"}>로그인</Link>
            <Link href={"/auth/signup"}>회원가입</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

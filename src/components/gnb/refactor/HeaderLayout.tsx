import Image from "next/image";
import { useEffect, useState } from "react";
import Title from "../Title";
import Link from "next/link";

interface HeaderContainerProps {
  children: React.ReactNode;
  title?: string;
  handleBack?: () => void;
  handleProfileOpen?: () => void;
}

const HeaderLayout: React.FC<HeaderContainerProps> = ({
  children,
  title,
  handleBack,
  handleProfileOpen,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hasTitle = title !== undefined;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-60 ${scrolled ? "bg-black/75" : "bg-transparent"}`}
    >
      <div className="flex justify-between mx-auto max-w-[1520px] w-full items-center h-[60px] md:h-[70px] px-[15px] md:px-[20px] lg:h-[80px]">
        <button
          className="md:hidden lg:hidden cursor-pointer"
          onClick={hasTitle ? handleBack : handleProfileOpen}
        >
          {hasTitle ? (
            <Image src={"/assets/icons/back.png"} alt="menu" width={20} height={20} />
          ) : (
            <Image src={"/assets/icons/menu.png"} alt="menu" width={16} height={16} />
          )}
        </button>
        {hasTitle ? (
          <>
            <div className="md:hidden">
              <Title>{title}</Title>
            </div>
            <div className="hidden md:block">
              <Link href={"/"}>
                <Title>
                  최애<span className="text-main">의</span>포토
                </Title>
              </Link>
            </div>
          </>
        ) : (
          <Link href={"/"}>
            <Title>
              최애<span className="text-main">의</span>포토
            </Title>
          </Link>
        )}
        {children}
      </div>
    </div>
  );
};

export default HeaderLayout;

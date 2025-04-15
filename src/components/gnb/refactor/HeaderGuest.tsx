interface HeaderGuestProps {
  children: React.ReactNode;
  hasTitle?: boolean;
}

const HeaderGuest: React.FC<HeaderGuestProps> = ({ children, hasTitle }) => {
  return (
    <>
      <div className="hidden md:flex md:gap-[20px] lg:gap-[30px] items-center">{children}</div>
      <div className={`w-[${hasTitle ? "20px" : "16px"}] md:hidden`}></div>
    </>
  );
};

export default HeaderGuest;

interface HeaderUserProps {
  children: React.ReactNode;
}

interface HeaderUserPointProps {
  points: number;
}

interface HeaderUserComponent extends React.FC<HeaderUserProps> {
  Point: React.FC<HeaderUserPointProps>;
}

const HeaderUser: HeaderUserComponent = ({ children }) => {
  return <div className="md:flex md:gap-[20px] lg:gap-[30px] items-center">{children}</div>;
};

const Point: React.FC<HeaderUserPointProps> = ({ points }) => {
  return (
    <div className="text-[14px] font-bold hidden md:block">{points.toLocaleString()}&nbsp;P</div>
  );
};

HeaderUser.Point = Point;

export default HeaderUser;

interface SectionTitleProps {
  title: string;
  button?: React.ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, button }) => {
  return (
    <div className="w-[100%] flex items-center justify-between pb-[10px] md:pb-[20px] border-b-[2px] border-gray-100">
      <p className="market-detail-title">{title}</p>
      <div className="hidden md:block">{button}</div>
    </div>
  );
};

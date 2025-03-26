import clsx from "clsx";

interface CardHeaderProps {
  grade: Grade;
  genre: string;
  points?: number;
  owner?: string;
  cardType: CardType;
}

const gradeColor = {
  COMMON: "text-main",
  RARE: "text-blue",
  "SUPER RARE": "text-purple",
  LEGENDARY: "text-red",
};

const CardHeader = ({ ...props }: CardHeaderProps) => {
  const textStyle =
    props.cardType === "details"
      ? "card-header__details pb-[30px]"
      : "card-header__list pb-[10px] md:pb-[10px]";
  const verticalLineStyle =
    props.cardType === "details"
      ? "w-0.5 bg-gray-300 min-h-[18px] lg:min-h-[24px]"
      : "w-[1px] md:w-0.5 bg-gray-300 min-h-[10px] md:min-h-[18px]";

  return (
    <div
      className={clsx(
        `flex justify-between items-center ${textStyle} text-gray-300 relative`,
        {
          ["items-end"]: props.points !== undefined,
        }
      )}
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-2">
        <div className="flex items-center gap-1 lg:gap-2">
          <div
            className={`${gradeColor[props.grade]} inline-block leading-none`}
          >
            {props.grade}
          </div>
          <div className={`${verticalLineStyle}`}></div>
          <div className="inline-block leading-none">{props.genre}</div>
        </div>
        {props.points && (
          <>
            <div className={`${verticalLineStyle} hidden lg:block`}></div>
            <div className="flex items-center gap-1 lg:gap-2">
              <p className={`text-white`}>{props.points}P</p>
              <p>에 구매</p>
            </div>
          </>
        )}
      </div>
      {props.owner && (
        <div className={`text-white underline decoration-white`}>
          {props.owner}
        </div>
      )}
    </div>
  );
};

export default CardHeader;

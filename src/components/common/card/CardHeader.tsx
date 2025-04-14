import { CardType, Grade, Genre } from "@/types/photocard.types";
import clsx from "clsx";

interface CardHeaderProps {
  grade: Grade;
  genre: Genre;
  points?: number;
  creator?: string;
  cardType: CardType;
}

const gradeColor = {
  COMMON: "text-main",
  RARE: "text-blue",
  SUPER_RARE: "text-purple",
  LEGENDARY: "text-red",
};

const genreDisplayMap: Record<Genre, string> = {
  TRAVEL: "여행",
  LANDSCAPE: "풍경",
  PORTRAIT: "인물",
  OBJECT: "사물",
};

const formatGradeDisplay = (grade: Grade): string => {
  return grade.replace("_", " ");
};

const formatGenreDisplay = (genre: Genre): string => {
  return genreDisplayMap[genre];
};

const CardHeader = ({ ...props }: CardHeaderProps) => {
  const points = props.points?.toLocaleString();
  const textStyle =
    props.cardType === "details"
      ? "card-header__details pb-[30px]"
      : "card-header__list pb-[10px] md:pb-[20px]";
  const verticalLineStyle =
    props.cardType === "details"
      ? "w-0.5 bg-gray-300 min-h-[18px] lg:min-h-[24px]"
      : "w-[1px] md:w-0.5 bg-gray-300 min-h-[10px] md:min-h-[16px]";

  return (
    <div
      className={clsx(`flex justify-between items-center ${textStyle} text-gray-300 relative`, {
        ["items-end"]: props.points !== undefined,
      })}
    >
      <div className="flex flex-col gap-[5px] md:gap-[10px]">
        <div className="flex items-center gap-[10px] lg:gap-4">
          <div className={`${gradeColor[props.grade]} inline-block leading-none`}>
            {formatGradeDisplay(props.grade)}
          </div>
          <div className={`${verticalLineStyle}`}></div>
          <div className="inline-block leading-none">{formatGenreDisplay(props.genre)}</div>
        </div>
        {props.points && (
          <div className="flex items-center gap-[10px] lg:gap-4">
            <div className="flex items-center gap-1">
              <p className={`text-white`}>{points}P</p>
              <p>에 구매</p>
            </div>
          </div>
        )}
      </div>
      {props.creator && (
        <div className={`text-white underline decoration-white`}>{props.creator}</div>
      )}
    </div>
  );
};

export default CardHeader;

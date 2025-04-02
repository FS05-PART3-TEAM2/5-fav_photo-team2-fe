import CardDetail from "@/components/common/card/CardDetail";
import CardHeader from "@/components/common/card/CardHeader";
import { CardType, ExchangeCardDto } from "@/types/photocard.types";
import Image from "next/image";

interface ExchangeCardProps {
  data: ExchangeCardDto;
  button?: React.ReactNode;
}

export const ExchangeCard: React.FC<ExchangeCardProps> = ({ data, button }) => {
  const cardHeaderProps = {
    grade: data.grade,
    genre: data.genre,
    creator: data.offererNickname,
    points: data.price,
    cardType: "list" as CardType,
  };
  const cardDetailProps = {
    description: data.description,
    cardType: "list" as CardType,
  };

  return (
    <div className={exchangeCardContainerSx}>
      <div className={cardDetailWrapperSx}>
        <div className={cardDetailImageSx}>
          <Image src={data.imageUrl} alt={data.name} fill sizes="100%" className="object-cover" />
        </div>
        <div>
          <p className="text-white text-14-22-bold mb-[5px] md:mb-[10px]">{data.name}</p>
          <CardHeader {...cardHeaderProps} />
          <CardDetail {...cardDetailProps} />
        </div>
      </div>
      {button}
    </div>
  );
};

const exchangeCardContainerSx =
  "w-[100%] min-w-[170px] md:min-w-[342px] lg:min-w-[440px] h-[308px] md:h-[561px] lg:h-[626px] flex flex-col p-[10px] md:p-[20px] lg:p-[40px] gap-[10px] md:gap-[5px] lg:gap-[20px] rounded-[2px] bg-gray-500 border-[1px] border-[rgba(255,255,255,0.1)]";
const cardDetailWrapperSx =
  "w-[100%] h-full flex flex-col gap-[10px] md:gap-[25.5px] lg:gap-[25px]";
const cardDetailImageSx =
  "w-[100%] h-[100%] min-h-[112px] max-h-[112px] md:max-h-[226.5px] lg:max-h-[270px] relative";

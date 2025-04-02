import { AmountText } from "@/types/photocard.types";
import clsx from "clsx";

interface CardDetailProps {
  description?: string;
  price?: number;
  availableAmount?: number;
  totalAmount?: number;
  amountText?: AmountText;
  cardType: "details" | "list";
}

const CardDetail = ({ ...props }: CardDetailProps) => {
  const commonStyle =
    props.cardType === "details"
      ? "py-[30px] border-t border-gray-400"
      : "pt-[10px] md:pt-[20px] mb-[10px] md:mb-[20px] border-t border-gray-400";
  const descriptionStyle =
    props.cardType === "details" ? "font-normal text-[16px] lg:text-[18px]" : "card-header__list";
  const grayStyle =
    props.cardType === "list"
      ? "font-light text-gray-300 text-[10px] md:text-[16px]"
      : "text-gray-300 text-[18px] font-normal";
  const responseStyle =
    props.cardType === "list"
      ? "font-normal text-white text-[10px] md:text-[18px]"
      : "text-white text-[20px] lg:text-[24px] font-bold";

  return (
    <div>
      {props.description && (
        <div
          className={clsx(`${descriptionStyle} ${commonStyle} text-white`, {
            ["line-clamp-2 break-all"]: props.cardType === "list",
          })}
        >
          {props.description}
        </div>
      )}
      {props.price && props.availableAmount && props.totalAmount && props.amountText === "잔여" && (
        <div className={`${commonStyle} flex flex-col gap-[10px]`}>
          <div className="flex justify-between items-center">
            <div className={grayStyle}>가격</div>
            <div className={responseStyle}>{props.price}&nbsp;P</div>
          </div>
          <div className="flex justify-between items-center">
            <div className={grayStyle}>잔여</div>
            <div className="flex items-center text-[20px] lg:text-[24px]">
              <p className={responseStyle}>{props.availableAmount}</p>
              <p className="text-gray-300 font-light text-[10px] md:text-[18px]">
                &nbsp;{"/"}
                &nbsp;{props.totalAmount}
              </p>
            </div>
          </div>
        </div>
      )}
      {props.price &&
        props.availableAmount &&
        props.totalAmount &&
        props.amountText === "보유량" && (
          <div className={`${commonStyle} flex flex-col gap-[10px]`}>
            <div className="flex justify-between items-center">
              <div className={grayStyle}>가격</div>
              <div className="text-white text-[20px] lg:text-[24px] font-bold">
                {props.price}&nbsp;P
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className={grayStyle}>{props.amountText}</div>
              <div className="flex items-center">
                <p className={responseStyle}>{props.availableAmount}</p>
              </div>
            </div>
          </div>
        )}
      {props.price && props.totalAmount && props.amountText === "수량" && (
        <div className={`${commonStyle} flex flex-col gap-[10px]`}>
          <div className="flex justify-between items-center">
            <div className={grayStyle}>가격</div>
            <div className={responseStyle}>{props.price}&nbsp;P</div>
          </div>
          <div className="flex justify-between items-center">
            <div className={grayStyle}>{props.amountText}</div>
            <div className="flex items-center">
              <p className={responseStyle}>{props.totalAmount}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetail;

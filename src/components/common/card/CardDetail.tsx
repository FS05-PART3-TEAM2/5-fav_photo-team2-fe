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
      : "pt-[10px] md:pt-[20px] mb-[10px] md:mb-[20px] border-t border-gray-400 font-normal";
  const descriptionStyle =
    props.cardType === "details" ? "font-normal text-[16px] lg:text-[18px]" : "card-header__list";
  const labelStyle =
    props.cardType === "list"
      ? "font-light text-gray-300 text-[10px] md:text-[16px]"
      : "font-normal text-gray-300 text-[18px] lg:text-[20px]";
  const responsiveWhiteStyle =
    props.cardType === "list"
      ? "text-white font-normal text-[10px] md:text-[18px]"
      : "text-white font-bold text-[20px] lg:text-[24px] ";
  const responsiveGrayStyle =
    props.cardType === "list"
      ? "text-gray-300 font-light text-[10px] md:text-[18px]"
      : "text-gray-300 font-normal text-[20px] lg:text-[24px]";

  const price = props.price?.toLocaleString();
  const hasPrice = props.price !== undefined && props.price !== null;
  const hasAvailableAmount = props.availableAmount !== undefined && props.availableAmount !== null;
  const hasTotalAmount = props.totalAmount !== undefined && props.totalAmount !== null;

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
      {/* 잔여인 경우 */}
      {hasPrice && hasAvailableAmount && hasTotalAmount && props.amountText === "잔여" && (
        <div className={`${commonStyle} flex flex-col gap-[10px]`}>
          <div className="flex justify-between items-center">
            <div className={labelStyle}>가격</div>
            <div className={responsiveWhiteStyle}>{price}&nbsp;P</div>
          </div>
          <div className="flex justify-between items-center">
            <div className={labelStyle}>잔여</div>
            <div className="flex items-center text-[20px] lg:text-[24px]">
              <p className={responsiveWhiteStyle}>{props.availableAmount}</p>
              <p className={responsiveGrayStyle}>
                &nbsp;{"/"}
                &nbsp;{props.totalAmount}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* 보유량인 경우 */}
      {hasPrice && hasAvailableAmount && hasTotalAmount && props.amountText === "보유량" && (
        <div className={`${commonStyle} flex flex-col gap-[10px]`}>
          <div className="flex justify-between items-center">
            <div className={labelStyle}>가격</div>
            <div className={responsiveWhiteStyle}>{price}&nbsp;P</div>
          </div>
          <div className="flex justify-between items-center">
            <div className={labelStyle}>{props.amountText}</div>
            <div className="flex items-center">
              <p className={responsiveWhiteStyle}>{props.availableAmount}</p>
            </div>
          </div>
        </div>
      )}
      {/* 수량인 경우 */}
      {hasPrice && hasAvailableAmount && props.amountText === "수량" && (
        <div className={`${commonStyle} flex flex-col gap-[10px]`}>
          <div className="flex justify-between items-center">
            <div className={labelStyle}>가격</div>
            <div className={responsiveWhiteStyle}>{price}&nbsp;P</div>
          </div>
          <div className="flex justify-between items-center">
            <div className={labelStyle}>{props.amountText}</div>
            <div className="flex items-center">
              <p className={responsiveWhiteStyle}>{props.totalAmount}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetail;

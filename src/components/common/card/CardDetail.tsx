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
            <div className="text-gray-300 text-[18px] font-normal">가격</div>
            <div className="text-whit  text-[20px] font-bold lg:text-[24px]">
              {props.price}&nbsp;P
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-300 text-[18px] font-normal">잔여</div>
            <div className="flex items-center text-[20px] lg:text-[24px]">
              <p className="text-white font-bold">{props.availableAmount}</p>
              <p className="text-gray-300 font-normal">
                &nbsp;{"/"}
                &nbsp;{props.totalAmount}
              </p>
            </div>
          </div>
        </div>
      )}
      {props.price && props.availableAmount && props.totalAmount && props.amountText === "잔여" && (
        <div className={`${commonStyle} flex flex-col gap-[10px]`}>
          <div className="flex justify-between items-center">
            <div className="text-gray-300 text-[18px] font-normal">가격</div>
            <div className="text-whit  text-[20px] font-bold lg:text-[24px]">
              {props.price}&nbsp;P
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-300 text-[18px] font-normal">잔여</div>
            <div className="flex items-center text-[20px] lg:text-[24px]">
              <p className="text-white font-bold">{props.availableAmount}</p>
              <p className="text-gray-300 font-normal">
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
              <div className="text-gray-300 text-[18px] font-normal">가격</div>
              <div className="text-white text-[20px] lg:text-[24px] font-bold">
                {props.price}&nbsp;P
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-300 text-[18px] font-normal">{props.amountText}</div>
              <div className="text-gray-300 text-[18px] font-normal">{props.amountText}</div>
              <div className="flex items-center">
                <p className="text-white text-[20px] lg:text-[24px] font-bold">
                  {props.availableAmount}
                </p>
              </div>
            </div>
          </div>
        )}
      {props.price && props.totalAmount && props.amountText === "수량" && (
        <div className={`${commonStyle} flex flex-col gap-[10px]`}>
          <div className="flex justify-between items-center">
            <div className="text-gray-300 text-[18px] font-normal">가격</div>
            <div className="text-white text-[20px] lg:text-[24px] font-bold">
              {props.price}&nbsp;P
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-gray-300 text-[18px] font-normal">{props.amountText}</div>
            <div className="text-gray-300 text-[18px] font-normal">{props.amountText}</div>
            <div className="flex items-center">
              <p className="text-white text-[20px] lg:text-[24px] font-bold">{props.totalAmount}</p>
              <p className="text-white text-[20px] lg:text-[24px] font-bold">{props.totalAmount}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetail;

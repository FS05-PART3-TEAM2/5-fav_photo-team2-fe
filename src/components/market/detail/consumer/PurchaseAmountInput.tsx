import AmountInput from "@/components/common/input/AmountInput";

interface PurchaseAmountInputProps {
  maxAmount: number; // 잔여 availableAmount 까지만 수량 입력 가능하도록
  price: number;
  amount: number;
  onChange: (amount: number) => void;
}

export const PurchaseAmountInput: React.FC<PurchaseAmountInputProps> = ({
  maxAmount,
  price,
  amount,
  onChange,
}) => {
  const totalCost = (price * amount).toLocaleString();

  return (
    <div className="w-[100%] flex flex-col gap-[20px] pt-[30px] border-t-[1px] border-gray-400">
      <div className={cardDetailInputWrapperSx}>
        <p className="text-18-20-normal">구매수량</p>
        <div className="w-[144px] lg:w-[176px] h-[45px] lg:h-[50px]">
          <AmountInput onChange={onChange} value={amount} max={maxAmount} />
        </div>
      </div>

      <div className={cardDetailInputWrapperSx}>
        <p className="text-18-20-normal">총 가격</p>
        <div className="w-fit flex items-center justify-end gap-[10px]">
          <p className="text-20-24-bold text-white">{totalCost}P</p>
          <p className="text-18-20-normal text-gray-300">({amount}장)</p>
        </div>
      </div>
    </div>
  );
};

const cardDetailInputWrapperSx = "w-[100%] flex items-center justify-between gap-[20px] ";

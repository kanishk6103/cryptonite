interface PriceBarProps {
  Low: number;
  currentPrice: number;
  High: number;
  Range: string;
}

const calculatePosition = (
  low: number,
  current: number,
  high: number
): number => {
  if (current < low) return 0;
  if (current > high) return 100;
  return ((current - low) / (high - low)) * 100;
};

const PriceBar: React.FC<PriceBarProps> = ({
  Low,
  currentPrice,
  High,
  Range,
}) => {
  const position = calculatePosition(Low, currentPrice, High);

  return (
    <div className="flex items-center justify-between w-full my-5">
      <div className="w-1/5">
        <span className="font-bold">{Range} Low</span> ₹
        {Low.toLocaleString("en-IN")}
      </div>
      <div className="relative w-3/5 h-2 bg-gray-300 rounded mx-2">
        <div className="absolute w-full h-full bg-green-400 dark:bg-green-700 rounded"></div>
        <div
          className="absolute top-[8px] left-0 transform translate-x-[-50%] border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[10px] border-b-gray-700 dark:border-b-gray-400"
          style={{ left: `${position}%` }}
        ></div>
      </div>
      <div className="w-1/5 text-right">
        <span className="font-bold">{Range} High</span> ₹
        {High.toLocaleString("en-IN")}
      </div>
    </div>
  );
};

export default PriceBar;

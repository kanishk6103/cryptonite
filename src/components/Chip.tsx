import Image from "next/image";
import { upArrow, downArrow } from "../../public/exports";
const Chip = ({ value }: { value: number }) => {
  return (
    <div
      className={`flex gap-1 w-max p-2 text-sm font-semibold rounded-lg ${
        value < 0
          ? "bg-red-200 text-red-700 dark:bg-red-300"
          : value === 0
          ? "bg-yellow-200 text-yellow-500 dark:bg-yellow-400"
          : "bg-green-200 text-green-600 dark:bg-green-300"
      }`}
    >
      <Image
        src={value < 0 ? downArrow : value === 0 ? "" : upArrow}
        className="opacity-50"
        alt="alt"
        width={8}
        height={8}
      />
      {value}%
    </div>
  );
};

export default Chip;

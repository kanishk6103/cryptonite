import Image from "next/image";
import { upArrow, downArrow } from "../../../../public/exports";
import Chip from "@/components/Chip";
const CoinPageHeader = ({ data }: any) => {
  const { name, image, market_data } = data;
  const { price_change_percentage_24h } = market_data;
  //   console.log(price_change_percentage_24h);
  return data ? (
    <>
      <div className="flex gap-3 items-center px-2 my-2">
        <div className="border rounded-md p-2">
          <Image src={image?.small} height={32} width={32} alt="coin-image" />
        </div>
        <div className="text-lg font-semibold">{name}</div>
      </div>
      <div className="flex gap-2 my-5">
        <div className="px-5 font-semibold text-3xl flex gap-2 items-end">
          <span className="font-light text-xl">₹</span>
          {market_data?.current_price?.inr.toLocaleString("en-IN")}
        </div>
        <Chip value={price_change_percentage_24h} />
      </div>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};

export default CoinPageHeader;

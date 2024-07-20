import { formatDate } from "@/utils/dateConverter";
import PriceBar from "./PriceBar";
import Chip from "@/components/Chip";
const PerformanceCard = ({
  today_high,
  today_low,
  current_price,
  year_change_percentage,
  all_time_high,
  all_time_low,
  all_time_high_date,
  all_time_low_date,
}: {
  today_high: number;
  today_low: number;
  current_price: number;
  year_change_percentage: number;
  all_time_high: number;
  all_time_low: number;
  all_time_high_date: Date;
  all_time_low_date: Date;
}) => {
  return (
    <div className="py-2 my-2 w-1/2">
      <div className="mainHeading my-2">Performance</div>
      <div>
        <div>
          <PriceBar
            Low={today_low}
            currentPrice={current_price}
            High={today_high}
            Range={"Today's"}
          />
          <hr />
        </div>
        <div>
          <PriceBar
            Low={all_time_low}
            currentPrice={current_price}
            High={all_time_high}
            Range={"All time"}
          />
          <hr />
          <div className="flex justify-evenly my-2">
            <div className="flex flex-col items-center gap-2 font-semibold p-3 border w-max rounded-xl my-4">
              1Y change <Chip value={year_change_percentage} />
            </div>
            <div className="flex flex-col items-center gap-2 font-semibold p-3 border w-max rounded-xl my-4">
              ATL Date{" "}
              <span className="font-light">
                {formatDate(all_time_low_date.toString())}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 font-semibold p-3 border w-max rounded-xl my-4">
              ATH Date{" "}
              <span className="font-light">
                {formatDate(all_time_high_date.toString())}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCard;

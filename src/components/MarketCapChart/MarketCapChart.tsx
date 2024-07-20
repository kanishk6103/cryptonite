import { coinIdList } from "./constants";
import MultipleCoinChart from "./MultipleCoinChart";

const getMultipleCoinsMarketCapData = async (
  coinIDs: string[],
  days: number
) => {
  try {
    const requests = coinIDs.map((id) =>
      fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=${days}&precision=3`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
          cache: "force-cache",
        }
      ).then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch data for ${id}`);
        }
        return res.json();
      })
    );

    const results = await Promise.all(requests);

    // console.log(results);
    return results.map((result, index) => ({
      coinID: coinIDs[index],
      marketCaps: result.market_caps,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

const MarketCapChartContainer = async ({
  coinIDs,
  days,
}: {
  coinIDs: string[];
  days: number;
}) => {
  const marketCapData = await getMultipleCoinsMarketCapData(coinIDs, days);
  //   console.log(marketCapData);
  return (
    <div>
      <MultipleCoinChart data={marketCapData} />
    </div>
  );
};

const MarketCapChart = async () => {
  return (
    <div>
      <div className="border-2 rounded-xl w-full p-5 mb-10 flex-1">
        <MarketCapChartContainer coinIDs={coinIdList} days={365} />
      </div>
    </div>
  );
};

export default MarketCapChart;

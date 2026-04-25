import { coinIdList, coinIdListWithColors } from "./constants";
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
          next: { revalidate: 120 },
        }
      ).then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch data for ${id}`);
        }
        return res.json();
      })
    );

    const results = await Promise.all(requests);

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
  return (
    <>
      {marketCapData && marketCapData.length > 0 ? (
        <MultipleCoinChart data={marketCapData} />
      ) : (
        <div className="w-full h-[400px] flex items-center justify-center text-sm text-ink-muted">
          Loading chart...
        </div>
      )}
    </>
  );
};

const MarketCapChart = async () => {
  return (
    <div className="surface-elevated rounded-2xl p-6 h-full">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">
            Market Cap
          </p>
          <h2 className="text-lg font-semibold mt-1">Top Coins · 1Y</h2>
        </div>
        <div className="flex items-center gap-3">
          {coinIdListWithColors.map((c) => (
            <div
              key={c.coin}
              className="flex items-center gap-1.5 text-xs text-ink-secondary capitalize"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: c.color }}
              />
              {c.coin}
            </div>
          ))}
        </div>
      </div>
      <MarketCapChartContainer coinIDs={coinIdList} days={365} />
    </div>
  );
};

export default MarketCapChart;

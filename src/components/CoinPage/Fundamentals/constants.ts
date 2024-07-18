export const fields = (market_cap: any, market_data: any) => [
  {
    heading: "Market Cap",
    value: market_cap?.inr,
    currency: true,
  },
  {
    heading: "Fully Diluted Valuation",
    value: market_data?.fully_diluted_valuation?.inr,
    currency: true,
  },
  {
    heading: "Total Volume",
    value: market_data?.total_volume?.inr,
    currency: true,
  },
  {
    heading: "Circulating Supply",
    value: market_data?.circulating_supply,
    currency: false,
  },
  {
    heading: "Total Supply",
    value: market_data?.total_supply,
    currency: false,
  },
  {
    heading: "Max Supply",
    value: market_data?.max_supply,
    currency: false,
  },
];

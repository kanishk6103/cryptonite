export const buttonList = [
  {
    name: "1D",
  },
  {
    name: "1W",
  },
  {
    name: "1M",
  },
  {
    name: "6M",
  },
  {
    name: "1Y",
  },
];

interface typeButtonListProps {
  name: string;
  path: "prices" | "market_caps" | "total_volumes";
}

export const typeButtonList: typeButtonListProps[] = [
  {
    name: "Price",
    path: "prices",
  },
  {
    name: "Market Cap",
    path: "market_caps",
  },
  {
    name: "Total Volume",
    path: "total_volumes",
  },
];

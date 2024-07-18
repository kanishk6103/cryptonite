export const buttonList = [
  {
    name: "1 day",
  },
  {
    name: "1 week",
  },
  {
    name: "1 month",
  },
  {
    name: "6 months",
  },
  {
    name: "1 year",
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

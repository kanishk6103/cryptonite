import Table from "@/components/Table";
import { coinListHeadings } from "@/constants/HeaderLists";
import { cache } from "react";

const getCoins = cache(async () => {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/list", {
    method: "GET",
    headers: { accept: "application/json" },
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
});
const page = async () => {
  const coinData = await getCoins();
  return (
    <div className="">
      <Table data={coinData} itemsPerPage={20} headings={coinListHeadings} />
    </div>
  );
};

export default page;

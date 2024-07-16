import { HoldingsData } from "@/types/companyHoldings";
import { companyHeaderList } from "@/constants/HeaderLists";
import Table from "@/components/Table";
import CompanyHoldings from "@/components/CompanyHoldings/CompanyHoldings";

async function getData() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin",
    { method: "GET", headers: { accept: "application/json" } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const data: HoldingsData = await getData();
  return (
    <div className="flex flex-col">
      <div className="px-24">
        <CompanyHoldings data={data} />
      </div>
    </div>
  );
}

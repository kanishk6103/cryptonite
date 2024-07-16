import Table from "@/components/Table";
import { companyHeaderList } from "@/constants/HeaderLists";
import { HoldingsData } from "@/types/companyHoldings";

const CompanyHoldings = ({ data }: { data: HoldingsData }) => {
  const { total_holdings, total_value_usd, market_cap_dominance } = data;
  return (
    <>
      <h1 className="font-black text-2xl">Public Company Holdings</h1>
      <div className="flex flex-col">
        <div className="flex gap-8 w-full items-center my-5">
          <div className="flex gap-2">
            <span className="font-semibold">Total Holdings: </span>
            {total_holdings}
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Total Value (USD):</span>{" "}
            {total_value_usd}
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Market Cap Dominance:</span>{" "}
            {market_cap_dominance}
          </div>
        </div>
        <Table headings={companyHeaderList} data={data.companies} />
      </div>
    </>
  );
};

export default CompanyHoldings;

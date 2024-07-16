import { HoldingsData } from "@/types/companyHoldings";
import { companyHeaderList } from "@/constants/HeaderLists";
import Table from "@/components/Table";
import CompanyHoldings from "@/components/CompanyHoldings/CompanyHoldings";

export default async function Home() {
  return (
    <div className="flex flex-col">
      <div className="px-24">
        <CompanyHoldings />
      </div>
    </div>
  );
}

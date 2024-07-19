import CompanyHoldings from "@/components/CompanyHoldings/CompanyHoldings";

export default async function Home() {
  return (
    <div className="flex flex-col flex-1">
      <div className="pl-24 pr-2">
        <CompanyHoldings />
      </div>
    </div>
  );
}

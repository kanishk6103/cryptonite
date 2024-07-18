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

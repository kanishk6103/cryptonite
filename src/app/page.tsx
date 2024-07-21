import CompanyHoldings from "@/components/CompanyHoldings/CompanyHoldings";
import MarketCapChart from "@/components/MarketCapChart/MarketCapChart";
import RecentSearches from "@/components/RecentSearches";
import WatchList from "@/components/WatchList";
export default async function Home() {
  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="px-24 w-full">
        <div className="w-full flex items-start my-10">
          <MarketCapChart />
          <div className="flex flex-col gap-5 w-full">
            <RecentSearches />
            <WatchList />
          </div>
        </div>
        <CompanyHoldings />
      </div>
    </div>
  );
}

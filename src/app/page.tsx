import CompanyHoldings from "@/components/CompanyHoldings/CompanyHoldings";
import MarketCapChart from "@/components/MarketCapChart/MarketCapChart";
import RecentSearches from "@/components/RecentSearches";
import WatchList from "@/components/WatchList";

export default async function Home() {
  return (
    <div className="mx-auto max-w-7xl w-full px-6 lg:px-10 py-10">
      <section className="mb-8">
        <p className="text-xs uppercase tracking-[0.18em] text-ink-muted mb-2">
          Overview
        </p>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
          Track the market at a glance
        </h1>
        <p className="mt-2 text-sm text-ink-secondary max-w-2xl">
          Live market caps, treasury holdings, and a personal watchlist — all in
          one place.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        <div className="lg:col-span-8">
          <MarketCapChart />
        </div>
        <div className="lg:col-span-4 flex flex-col gap-6">
          <RecentSearches />
          <WatchList />
        </div>
      </section>

      <CompanyHoldings />
    </div>
  );
}

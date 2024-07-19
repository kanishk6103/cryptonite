"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@/lib/store";
import { coinType } from "@/types/companyHoldings";
import { useRouter } from "next/navigation";

const RecentlySearchedCoins = () => {
  const [hydrated, setHydrated] = useState(false);
  const searchResults = useSelector((state: AppState) => state.search.results);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const handleCoinClick = (coinId: string) => {
    router.push(`/explore/coins/${coinId}`);
  };

  return (
    <div className="recently-searched-coins">
      <h2>Recently Searched Coins</h2>
      <ul>
        {Object.values(searchResults).map((coin) => (
          <li
            key={coin.id}
            className="cursor-pointer hover:underline"
            onClick={() => handleCoinClick(coin.id)}
          >
            {coin.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentlySearchedCoins;

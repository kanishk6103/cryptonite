"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { clearSearchResults } from "@/lib/features/coin/searchSlice";
import { FiClock, FiChevronRight } from "react-icons/fi";

const RecentSearches = () => {
  const [hydrated, setHydrated] = useState(false);
  const searchResults = useSelector((state: AppState) => state.search.results);
  const dispatch = useDispatch();
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

  const handleClearHistory = () => {
    dispatch(clearSearchResults());
    localStorage.removeItem("searchResults");
  };

  const items = Object.values(searchResults);

  return (
    <div className="surface-elevated rounded-2xl p-5">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <FiClock size={14} className="text-ink-muted" />
          <h2 className="text-sm font-semibold tracking-tight">
            Recently Searched
          </h2>
        </div>
        {items.length > 0 && (
          <button
            className="text-xs font-medium text-negative hover:opacity-80 transition-opacity"
            onClick={handleClearHistory}
          >
            Clear
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-6 text-center text-xs text-ink-muted">
          Coins you search for will appear here.
        </div>
      ) : (
        <ul className="flex flex-col">
          {items.map((coin, i) => (
            <li
              key={coin.id}
              onClick={() => handleCoinClick(coin.id)}
              className={`group flex items-center justify-between py-2.5 cursor-pointer ${
                i !== items.length - 1 ? "border-b border-border-subtle" : ""
              }`}
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-ink-primary group-hover:text-accent transition-colors">
                  {coin.name}
                </span>
                <span className="text-xs uppercase tracking-wider text-ink-muted">
                  {coin.symbol}
                </span>
              </div>
              <FiChevronRight
                size={16}
                className="text-ink-muted group-hover:text-accent transition-colors"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentSearches;

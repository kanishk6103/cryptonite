"use client";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/lib/store";
import { coinType } from "@/types/companyHoldings";
import { useRouter } from "next/navigation";
import { searchResults } from "@/lib/features/coin/searchSlice";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ placeholder }: { placeholder: string }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<coinType[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const coins = useSelector((state: AppState) => state.coins.coins);
  const previouslySearched = useSelector(
    (state: AppState) => state.search.results
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSearchResults = localStorage.getItem("searchResults");

      if (storedSearchResults) {
        dispatch(searchResults(JSON.parse(storedSearchResults)));
      }
    }
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (value.length > 0) {
        const filteredCoins = coins
          .filter((coin) =>
            coin.name.toLowerCase().includes(value.toLowerCase())
          )
          .sort((a, b) => {
            const aStartsWith = a.name
              .toLowerCase()
              .startsWith(value.toLowerCase());

            const bStartsWith = b.name
              .toLowerCase()
              .startsWith(value.toLowerCase());

            if (aStartsWith && !bStartsWith) return -1;

            if (!aStartsWith && bStartsWith) return 1;

            return a.name.localeCompare(b.name);
          })
          .slice(0, 6);
        setSuggestions(filteredCoins);
      } else {
        setSuggestions([]);
      }
    }, 300);
  };

  const handleInputFocus = () => {
    setIsFocused(true);

    if (query.length === 0) {
      setSuggestions(Object.values(previouslySearched).slice(0, 6));
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matchingCoin = coins.find(
      (coin) => coin.name.toLowerCase() === query.toLowerCase()
    );
    if (matchingCoin) {
      router.push(`/explore/coins/${matchingCoin.id}`);
      setQuery("");
      setSuggestions([]);
      dispatch(searchResults({ [matchingCoin.id]: matchingCoin }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl relative"
    >
      <div className="relative">
        <FiSearch
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full h-10 pl-9 pr-3 text-sm bg-surface-2 text-ink-primary placeholder:text-ink-muted border border-border-subtle rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition-colors"
        />
      </div>
      {isFocused && suggestions.length > 0 && (
        <ul
          className="w-full mt-2 surface-elevated rounded-lg overflow-hidden absolute top-full z-30"
          key={Date.now()}
        >
          {suggestions.map((coin) => (
            <li
              key={coin.id}
              className="px-3 py-2 text-sm text-ink-secondary hover:text-ink-primary hover:bg-surface-2 cursor-pointer flex items-center justify-between"
              onClick={() => {
                setQuery(coin.name);
                setSuggestions([]);
                router.push(`/explore/coins/${coin.id}`);
                dispatch(searchResults({ [coin.id]: coin }));
                setQuery("");
              }}
            >
              <span>{coin.name}</span>
              <span className="text-xs uppercase text-ink-muted tracking-wider">
                {coin.symbol}
              </span>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;

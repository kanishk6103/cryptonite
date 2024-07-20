"use client";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/lib/store";
import { coinType } from "@/types/companyHoldings";
import { useRouter } from "next/navigation";
import { searchResults } from "@/lib/features/coin/searchSlice";

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
    } else {
      console.log("No valid coin selected");
    }
    console.log("Searching for:", query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full max-w-xl mx-auto relative"
    >
      <input
        type="text"
        value={query}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="p-2 w-full text-gray-700 dark:text-gray-300 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isFocused && suggestions.length > 0 && (
        <ul className="w-full mt-2 bg-white dark:bg-gray-700 rounded-md shadow-md absolute top-10 z-20">
          {suggestions.map((coin) => (
            <li
              key={coin.id}
              className="py-1 px-2 hover:bg-gray-200 dark:hover:bg-gray-500 cursor-pointer"
              onClick={() => {
                setQuery(coin.name);
                setSuggestions([]);
                router.push(`/explore/coins/${coin.id}`);
                dispatch(searchResults({ [coin.id]: coin }));
                setQuery("");
              }}
            >
              {coin.name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;

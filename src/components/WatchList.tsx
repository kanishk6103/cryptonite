"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { clearSearchResults } from "@/lib/features/coin/searchSlice"; // make sure this action exists

const WatchList = () => {
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

  return (
    <div className="w-full px-5 border rounded-lg float-right mx-5 h-max">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold my-5">Recently Searches</h2>
        <button
          className="text-red-500 hover:underline pl-5 text-sm"
          onClick={handleClearHistory}
        >
          clear
        </button>
      </div>
      <ul className="flex flex-col gap-5 w-full my-5">
        {Object.values(searchResults).map((coin) => (
          <div key={coin.id}>
            <li
              className="cursor-pointer hover:underline my-2 w-full flex items-center justify-between text-lg"
              onClick={() => handleCoinClick(coin.id)}
            >
              <span className="font-semibold">{coin.name}</span>
              <span className="font-light">{coin.symbol}</span>
            </li>
            <hr />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default WatchList;

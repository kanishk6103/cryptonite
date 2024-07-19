"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinData } from "@/lib/features/coin/coinSlice";
import { AppState } from "@/lib/store";
import { coinType } from "@/types/companyHoldings";

const CoinList = () => {
  const dispatch = useDispatch();
  const coins = useSelector((state: AppState) => state.coins.coins);
  const coinStatus = useSelector((state: AppState) => state.coins.status);
  const coinError = useSelector((state: AppState) => state.coins.error);

  useEffect(() => {
    if (coinStatus === "idle") {
      dispatch(fetchCoinData() as any);
    }
  }, [coinStatus, dispatch]);

  if (coinStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (coinStatus === "failed") {
    return <div>Error: {coinError}</div>;
  }

  return (
    <ul>
      {coins.map((coin: coinType) => (
        <li key={coin.id}>{coin.name}</li>
      ))}
    </ul>
  );
};

export default CoinList;

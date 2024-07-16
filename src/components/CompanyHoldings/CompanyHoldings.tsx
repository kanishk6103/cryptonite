"use client";
import Table from "@/components/Table";
import { companyHeaderList } from "@/constants/HeaderLists";
import { Company, HoldingsData } from "@/types/companyHoldings";
import { cache } from "react";
import { useState, useEffect } from "react";

const getData = cache(async (id: string) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/companies/public_treasury/${id}`,
    {
      method: "GET",
      headers: { accept: "application/json" },
      cache: "force-cache",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
});

const CompanyHoldings = () => {
  const [buttonState, setButtonState] = useState<string>("bitcoin");
  const [companyData, setCompanyData] = useState<HoldingsData>();
  const handleClick = async (name: string) => {
    const data = await getData(name);
    setCompanyData(data);
  };
  useEffect(() => {
    handleClick(buttonState);
  }, []);
  return (
    <>
      <h1 className="font-black text-2xl">Public Company Holdings</h1>
      <div className="flex flex-col">
        <div className="w-full flex justify-between">
          {companyData ? (
            <div className="flex gap-8 w-full items-center my-5">
              <div className="flex gap-2">
                <span className="font-semibold">Total Holdings: </span>
                {companyData.total_holdings}
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Total Value (USD):</span>{" "}
                {companyData.total_value_usd}
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Market Cap Dominance:</span>{" "}
                {companyData.market_cap_dominance}
              </div>
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
          <div className="flex gap-6">
            <button
              className={`p-2 border rounded-lg h-max ${
                buttonState === "bitcoin"
                  ? "bg-blue-500 text-white font-semibold"
                  : ""
              }`}
              onClick={() => {
                handleClick("bitcoin");
                setButtonState("bitcoin");
              }}
              disabled={buttonState === "bitcoin"}
            >
              Bitcoin
            </button>
            <button
              className={`p-2 border rounded-lg h-max ${
                buttonState === "ethereum"
                  ? "bg-blue-500 text-white font-semibold"
                  : ""
              }`}
              onClick={() => {
                handleClick("ethereum");
                setButtonState("ethereum");
              }}
              disabled={buttonState === "ethereum"}
            >
              Ethereum
            </button>
          </div>
        </div>
        {companyData ? (
          <Table
            headings={companyHeaderList}
            data={companyData?.companies}
            itemsPerPage={5}
          />
        ) : (
          <h1>Loading Table data...</h1>
        )}
      </div>
    </>
  );
};

export default CompanyHoldings;

"use client";
import Table from "./Table";
import { companyHeaderList } from "@/constants/HeaderLists";
import { HoldingsData } from "@/types/companyHoldings";
import { useState, useEffect } from "react";

const getData = async (id: string) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/companies/public_treasury/${id}`,
    {
      method: "GET",
      headers: { accept: "application/json" },
      cache: "force-cache",
      next: { revalidate: 120 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

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
      <h1 className="mainHeading">Public Company Holdings</h1>
      <div className="flex flex-col">
        <div className="w-full flex justify-between">
          {companyData ? (
            <div className="flex flex-col xl:flex-row xl:gap-8 gap-2 w-full items-start xl:justify-normal justify-center my-5">
              <div className="flex gap-2">
                <span className="font-semibold">Total Holdings: </span>
                {companyData.total_holdings.toLocaleString('en-IN')}
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Total Value:</span>{" "}
                ${companyData.total_value_usd.toLocaleString('en-IN')}
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Market Cap Dominance:</span>{" "}
                {companyData.market_cap_dominance.toLocaleString('en-IN')}
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
            data={companyData?.companies as any}
            itemsPerPage={5}
            rowClickHandler={null}
          />
        ) : (
          <h1>Loading Table data...</h1>
        )}
      </div>
    </>
  );
};

export default CompanyHoldings;

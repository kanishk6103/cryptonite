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

const StatTile = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="surface rounded-xl px-4 py-3">
    <div className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">
      {label}
    </div>
    <div className="mt-1 text-base font-semibold tabular-nums">{value}</div>
  </div>
);

const SegmentButton = ({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors ${
      active
        ? "bg-surface text-ink-primary shadow-sm"
        : "text-ink-secondary hover:text-ink-primary"
    }`}
  >
    {children}
  </button>
);

const CompanyHoldings = () => {
  const [buttonState, setButtonState] = useState<string>("bitcoin");
  const [companyData, setCompanyData] = useState<HoldingsData>();
  const [loading, setLoading] = useState<boolean>(true);

  const handleClick = async (name: string) => {
    setLoading(true);
    try {
      const data = await getData(name);
      setCompanyData(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleClick(buttonState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="flex items-end justify-between flex-wrap gap-4 mb-5">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-ink-muted mb-1">
            Treasuries
          </p>
          <h2 className="text-2xl font-bold tracking-tight">
            Public Company Holdings
          </h2>
        </div>
        <div className="surface-2 rounded-lg p-1 inline-flex items-center gap-1">
          <SegmentButton
            active={buttonState === "bitcoin"}
            onClick={() => {
              handleClick("bitcoin");
              setButtonState("bitcoin");
            }}
          >
            Bitcoin
          </SegmentButton>
          <SegmentButton
            active={buttonState === "ethereum"}
            onClick={() => {
              handleClick("ethereum");
              setButtonState("ethereum");
            }}
          >
            Ethereum
          </SegmentButton>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <StatTile
          label="Total Holdings"
          value={
            companyData
              ? companyData.total_holdings.toLocaleString("en-IN")
              : "—"
          }
        />
        <StatTile
          label="Total Value"
          value={
            companyData
              ? `$${companyData.total_value_usd.toLocaleString("en-IN")}`
              : "—"
          }
        />
        <StatTile
          label="Market Cap Dominance"
          value={
            companyData
              ? `${companyData.market_cap_dominance.toLocaleString("en-IN")}%`
              : "—"
          }
        />
      </div>

      {companyData && !loading ? (
        <Table
          headings={companyHeaderList}
          data={companyData?.companies as any}
          itemsPerPage={5}
          rowClickHandler={null}
        />
      ) : (
        <div className="surface-elevated rounded-2xl h-[440px] flex items-center justify-center text-sm text-ink-muted">
          Loading table data...
        </div>
      )}
    </section>
  );
};

export default CompanyHoldings;

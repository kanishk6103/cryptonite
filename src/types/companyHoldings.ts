export interface Company {
  name: string;
  symbol: string;
  country: string;
  total_holdings: number;
  total_entry_value_usd: number;
  total_current_value_usd: number;
  percentage_of_total_supply: number;
  [key: string]: string | number;
}

export interface HoldingsData {
  total_holdings: number;
  total_value_usd: number;
  market_cap_dominance: number;
  companies: Company[];
}

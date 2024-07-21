"use client";
import { useState, useEffect, Suspense } from "react";
import Chart from "./Chart";
import { calculateTimestamp } from "@/utils/calculateTimestamp";
import { buttonList, typeButtonList } from "./buttonList";
import RangeButton from "./RangeButton";
import pubSub from "../utils/PubSub";
import useInterval from "../utils/useInterval";

const getCoinChartData = async (id: string, from: number, to: number) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=inr&from=${from}&to=${to}&precision=3`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
        cache: "force-cache",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const ChartContainer = ({ id }: { id: string }) => {
  const [data, setData] = useState<{
    prices: [number, number][];
    market_caps: [number, number][];
    total_volumes: [number, number][];
  } | null>(null);
  const [range, setRange] = useState("1M");
  const [type, setType] = useState<"prices" | "market_caps" | "total_volumes">(
    "prices"
  );
  const [typeData, setTypeData] = useState<[number, number][] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { from, to } = calculateTimestamp(range);
      const data = await getCoinChartData(id, from, to);
      setData(data);
    };
    fetchData();
  }, [id, range]);

  useEffect(() => {
    if (data) {
      setTypeData(data[type]);
    }
  }, [data, type]);

  useEffect(() => {
    const handleDataUpdate = (updatedData: any) => {
      setData(updatedData);
    };

    pubSub.subscribe("data-update", handleDataUpdate);

    return () => {
      pubSub.unsubscribe("data-update", handleDataUpdate);
    };
  }, [type]);

  useInterval(async () => {
    const { from, to } = calculateTimestamp(range);

    const updatedData = await getCoinChartData(id, from, to);

    pubSub.publish("data-update", updatedData);
  }, 60000);

  return (
    <div className="border-2 rounded-lg p-5 w-max ml-10">
      <div className="flex justify-end w-full">
        <div className="w-max gap-5 border-2 rounded-3xl px-2 py-1 text-xs">
          {typeButtonList.map((singleButton, index) => (
            <RangeButton
              name={singleButton.name}
              active={singleButton.path === type}
              handler={() => {
                setType(singleButton.path);
              }}
              key={index}
            />
          ))}
        </div>
      </div>
      {typeData ? (
        <div className="my-2 w-max">
          <Chart data={typeData} />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-xl font-semibold">
          Loading...
        </div>
      )}
      <div className="flex items-center justify-center w-full">
        <div className="flex gap-5 border-2 rounded-3xl px-2 py-1 w-max text-xs">
          {buttonList.map((singleButton, index) => (
            <RangeButton
              name={singleButton.name}
              handler={() => {
                setRange(singleButton.name);
              }}
              active={singleButton.name === range}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartContainer;

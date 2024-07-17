"use client";

import { useState, useEffect } from "react";
import Table from "@/components/Table";
import { coinListHeadings } from "@/constants/HeaderLists";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [coinData, setCoinData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/list", {
          method: "GET",
          headers: { accept: "application/json" },
          cache: "force-cache",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setCoinData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (id: string) => {
    router.push(`explore/coins/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <Table
        data={coinData}
        itemsPerPage={20}
        headings={coinListHeadings}
        rowClickHandler={handleRowClick}
      />
    </div>
  );
};

export default Page;

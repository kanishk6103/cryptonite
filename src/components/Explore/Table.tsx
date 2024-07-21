"use client";
import { useState, useEffect } from "react";
import { Coin, Company } from "@/types/companyHoldings";
import Image from "next/image";
import Chip from "../Chip";
const Table = ({
  headings,
  itemsPerPage,
  rowClickHandler,
}: {
  headings: { heading: string; key: string }[];
  itemsPerPage: number;
  rowClickHandler: ((id: string) => void) | null;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&category=layer-1&order=market_cap_desc&per_page=20&page=${page}&locale=en&precision=4`,
        {
          method: "GET",
          headers: { accept: "application/json" },
          cache: "force-cache",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-x-auto border rounded-lg">
      <div className="min-h-[440px] flex flex-col justify-between">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center text-lg font-semibold">
            Loading...
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs uppercase bg-gray-5">
              <tr>
                {headings.map((singleHeading, index) => {
                  return (
                    <th
                      scope="col"
                      className="px-6 py-3 w-[20%] cursor-pointer"
                      key={index}
                    >
                      {singleHeading.heading}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((singleCompany, index) => {
                return (
                  <tr
                    className={`border-b ${
                      rowClickHandler ? "cursor-pointer" : ""
                    }`}
                    key={index}
                    onClick={
                      rowClickHandler
                        ? () => rowClickHandler(singleCompany.id as string)
                        : undefined
                    }
                  >
                    {headings.map((singleHeading, index) => {
                      const currentHeading = singleHeading.key;
                      const isName = singleHeading.heading === "Name";
                      const isChange =
                        singleHeading.heading === "ATH Change" ||
                        singleHeading.heading === "ATL Change" ||
                        singleHeading.heading === "Today";
                      const isRank = singleHeading.heading === "Rank";
                      return (
                        <td
                          className={`p-6 ${index === 0 ? "font-medium" : ""}`}
                          key={index}
                        >
                          {isName ? (
                            <div className="flex gap-2">
                              <Image
                                src={singleCompany?.image as string}
                                alt="coin-image"
                                width={20}
                                height={16}
                              />
                              {singleCompany[currentHeading]}
                            </div>
                          ) : isChange ? (
                            <Chip
                              value={parseInt(
                                singleCompany[currentHeading] as string
                              )}
                            />
                          ) : isRank ? (
                            <div className="text-sm font-extralight">
                              #
                              <span className="text-base font-medium">
                                {singleCompany[currentHeading]}
                              </span>
                            </div>
                          ) : (
                            <div className="text-sm font-extralight flex gap-1 items-end">
                              ₹
                              <span className="text-base font-medium">
                                {singleCompany[currentHeading]?.toLocaleString(
                                  "en-IN"
                                )}
                              </span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex justify-between items-center p-4 w-full lg:w-1/3 m-auto">
        <button
          onClick={() => {
            setCurrentPage(currentPage - 1);
            paginate(currentPage - 1);
          }}
          disabled={currentPage === 1}
          className="px-4 py-1 rounded-lg disabled:opacity-50 border"
        >
          {`<`}
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => {
            setCurrentPage(currentPage + 1);
            paginate(currentPage + 1);
          }}
          disabled={data.length < itemsPerPage}
          className="px-4 py-1 rounded-lg disabled:opacity-50 border"
        >
          {`>`}
        </button>
      </div>
    </div>
  );
};

export default Table;

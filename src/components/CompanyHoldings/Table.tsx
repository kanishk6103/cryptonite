"use client";
import { useState } from "react";
import { Company } from "@/types/companyHoldings";

const Table = ({
  headings,
  data,
  itemsPerPage,
  rowClickHandler,
}: {
  headings: { heading: string; key: string }[];
  data: Company[];
  itemsPerPage: number;
  rowClickHandler: ((id: string) => void) | null;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-x-auto border rounded-lg">
      <div className="min-h-[440px] flex flex-col justify-between">
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
            {currentData.map((singleCompany, index) => {
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
                    return (
                      <td
                        className={`p-6 ${index === 0 ? "font-medium" : ""}`}
                        key={index}
                      >
                        {singleCompany[currentHeading].toLocaleString('en-IN')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center p-4 w-full lg:w-1/3 m-auto">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-1 rounded-lg disabled:opacity-50 border"
        >
          {`<`}
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= data.length}
          className="px-4 py-1 rounded-lg disabled:opacity-50 border"
        >
          {`>`}
        </button>
      </div>
    </div>
  );
};

export default Table;

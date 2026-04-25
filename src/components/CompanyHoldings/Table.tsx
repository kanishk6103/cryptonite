"use client";
import { useEffect, useState } from "react";
import { Company } from "@/types/companyHoldings";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    <div className="surface-elevated rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-border-subtle">
              {headings.map((singleHeading, index) => (
                <th
                  scope="col"
                  className="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted"
                  key={index}
                >
                  {singleHeading.heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((singleCompany, index) => (
              <tr
                className={`border-b border-border-subtle last:border-b-0 transition-colors hover:bg-surface-2 ${
                  rowClickHandler ? "cursor-pointer" : ""
                }`}
                key={index}
                onClick={
                  rowClickHandler
                    ? () => rowClickHandler(singleCompany.id as string)
                    : undefined
                }
              >
                {headings.map((singleHeading, idx) => {
                  const currentHeading = singleHeading.key;
                  return (
                    <td
                      className={`px-6 py-4 tabular-nums ${
                        idx === 0
                          ? "font-medium text-ink-primary"
                          : "text-ink-secondary"
                      }`}
                      key={idx}
                    >
                      {singleCompany[currentHeading].toLocaleString("en-IN")}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center px-6 py-3 border-t border-border-subtle">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-1 h-8 px-3 text-sm rounded-md border border-border-subtle text-ink-secondary hover:text-ink-primary hover:bg-surface-2 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <FiChevronLeft size={14} /> Prev
        </button>
        <span className="text-xs text-ink-muted">
          Page <span className="text-ink-primary font-medium">{currentPage}</span>{" "}
          of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= data.length}
          className="inline-flex items-center gap-1 h-8 px-3 text-sm rounded-md border border-border-subtle text-ink-secondary hover:text-ink-primary hover:bg-surface-2 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next <FiChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default Table;

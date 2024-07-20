"use server";
import Table from "@/components/Explore/Table";
import { coinListHeadings } from "@/constants/HeaderLists";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";
import RecentSearches from "@/components/RecentSearches";

const Page = async () => {
  const handleRowClick = (id: string) => {
    "use server";
    redirect(`explore/coins/${id}`);
  };

  return (
    <div className="px-5 flex-1 flex w-full">
      <div className="flex-1">
        <Suspense fallback={<Loading />}>
          <Table
            itemsPerPage={20}
            headings={coinListHeadings}
            rowClickHandler={handleRowClick}
          />
        </Suspense>
      </div>
      <div className="flex mx-1 min-w-[300px]">
        <RecentSearches />
      </div>
    </div>
  );
};

export default Page;

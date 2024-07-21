"use server";
import Table from "@/components/Explore/Table";
import { coinListHeadings } from "@/constants/HeaderLists";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";
import RecentSearches from "@/components/RecentSearches";
import WatchList from "@/components/WatchList";
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
        <div className="flex flex-col gap-5">
          <RecentSearches />
          <WatchList />
        </div>
      </div>
    </div>
  );
};

export default Page;

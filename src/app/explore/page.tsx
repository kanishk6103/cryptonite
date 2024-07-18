"use server";
import Table from "@/components/Table";
import { coinListHeadings } from "@/constants/HeaderLists";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

const Page = async () => {
  const handleRowClick = (id: string) => {
    "use server";
    redirect(`explore/coins/${id}`);
  };

  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        <Table
          itemsPerPage={20}
          headings={coinListHeadings}
          rowClickHandler={handleRowClick}
        />
      </Suspense>
    </div>
  );
};

export default Page;

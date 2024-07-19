import CoinPageHeader from "@/components/CoinPage/CoinPageHeader/CoinPageHeader";
import Fundamentals from "@/components/CoinPage/Fundamentals/Fundamentals";
import About from "@/components/CoinPage/About/About";
import ChatContainer from "@/components/CoinPage/Chart/ChatContainer";
import { Suspense } from "react";
import Loading from "./loading";

const getCoinData = async (id: string) => {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-pro-api-key": process.env.NEXT_PUBLIC_COINGECKO_KEY as string,
      },
      cache: "force-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const page = async ({ params }: { params: { coin_id: string } }) => {
  const coin_id = params.coin_id;
  const data = await getCoinData(coin_id);
  if (!data) return <h1>Data is not defined for this coin!</h1>;
  return (
    <div className="flex flex-col gap-5 px-12">
      <div className="px-12">
        <Suspense fallback={<Loading />}>
          {<CoinPageHeader data={data} />}
        </Suspense>
      </div>
      <div className="w-max">
        <Suspense fallback={<Loading />}>
          <ChatContainer id={coin_id} />
        </Suspense>
      </div>
      <div className="px-12">
        <Suspense fallback={<Loading />}>
          <Fundamentals data={data} />
        </Suspense>
      </div>
      <hr className="px-12" />
      <div className="px-12">
        <Suspense fallback={<Loading />}>
          <About
            heading={data?.localization?.en}
            description={data?.description?.en}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default page;

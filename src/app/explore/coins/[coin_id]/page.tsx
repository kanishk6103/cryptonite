import CoinPageHeader from "@/components/CoinPage/CoinPageHeader/CoinPageHeader";
import Fundamentals from "@/components/CoinPage/Fundamentals/Fundamentals";
import About from "@/components/CoinPage/About/About";
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
  console.log(data);
  return (
    <div className="flex flex-col gap-8 px-24">
      <div>
        <Suspense fallback={<Loading />}>
          {<CoinPageHeader data={data} />}
        </Suspense>
      </div>
      <div>
        <Suspense fallback={<Loading />}>
          <Fundamentals data={data} />
        </Suspense>
      </div>
      <hr />
      <div>
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

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
  console.log(data);
  return data ? (
    <div>
      {/* <div>{params.coin_id}</div> */}
      <div>{data?.name}</div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default page;

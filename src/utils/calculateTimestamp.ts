export const calculateTimestamp = (range: string) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  let fromTimestamp;

  switch (range) {
    case "1 day":
      fromTimestamp = currentTimestamp - 86400; // 1 day in seconds
      break;
    case "1 week":
      fromTimestamp = currentTimestamp - 7 * 86400; // 7 days in seconds
      break;
    case "1 month":
      fromTimestamp = currentTimestamp - 30 * 86400; // 30 days in seconds
      break;
    case "6 months":
      fromTimestamp = currentTimestamp - 6 * 30 * 86400; // 6 months in seconds
      break;
    case "1 year":
      fromTimestamp = currentTimestamp - 12 * 30 * 86400; // 1 year in seconds
      break;
    default:
      fromTimestamp = currentTimestamp - 30 * 86400; // Default to 1 month
  }

  return { from: fromTimestamp, to: currentTimestamp };
};

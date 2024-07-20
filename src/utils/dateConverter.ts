export function formatDate(isoDateString: string): string {
  const dateObj = new Date(isoDateString);

  const day = dateObj.getUTCDate();
  const monthIndex = dateObj.getUTCMonth();
  const year = dateObj.getUTCFullYear();

  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function getOrdinalSuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const formattedDate = `${day}${getOrdinalSuffix(day)} ${
    monthNames[monthIndex]
  }, ${year}`;

  return formattedDate;
}

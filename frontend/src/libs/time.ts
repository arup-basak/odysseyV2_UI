import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

const timeDifference = (end: string | Date): string => {
  const startDate = dayjs(new Date());
  const endDate = dayjs(end);

  const timeDiff = endDate.diff(startDate);

  const diffDuration = dayjs.duration(timeDiff);

  const components = [
    diffDuration.years() > 0 ? `${diffDuration.years()} yr` : "",
    diffDuration.months() > 0 ? `${diffDuration.months()} months` : "",
    diffDuration.days() > 0 ? `${diffDuration.days()}d` : "",
    diffDuration.hours() > 0 ? `${diffDuration.hours()} hr` : "",
    diffDuration.minutes() > 0 ? `${diffDuration.minutes()} min` : "",
    diffDuration.seconds() > 0 ? `${diffDuration.seconds()} sec` : "",
  ];

  return components.filter((component) => component !== "").join(" ");
};

const formatUnixTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // Convert to milliseconds

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formattedDate = new Intl.DateTimeFormat("en-SG", options).format(date);
  return formattedDate;
};

const unixTimeDiff = (timestamp: number) => {
  return timeDifference(formatUnixTimestamp(timestamp));
};

export { timeDifference, formatUnixTimestamp , unixTimeDiff};

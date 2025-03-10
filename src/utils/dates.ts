import dayjs, { extend } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

extend(relativeTime);

type DurationFormat = "short" | "long";

/**
 * Get the time difference between a given date and now
 * @param dateString - ISO date string to compare against current time
 * @param format - Format of the duration output ('short' or 'long')
 * @returns Formatted duration string (e.g., "2h" or "2 hours ago")
 */
export const getTimeDifference = (
  dateString: string,
  format: DurationFormat = "short",
): string => {
  try {
    const date = dayjs(dateString);
    if (!date.isValid()) {
      return "Invalid date";
    }

    const distance = date.fromNow();

    if (format === "short") {
      // Convert long format to short format
      return distance
        .replace(" seconds ago", "s")
        .replace(" minutes ago", "m")
        .replace(" hours ago", "h")
        .replace(" days ago", "d")
        .replace(" months ago", "mo")
        .replace(" years ago", "y")
        .replace("a few seconds ago", "1s")
        .replace("a minute ago", "1m")
        .replace("an hour ago", "1h")
        .replace("a day ago", "1d")
        .replace("a month ago", "1mo")
        .replace("a year ago", "1y")
        .replace("in a few seconds", "1s")
        .replace("in a minute", "1m")
        .replace("in an hour", "1h")
        .replace("in a day", "1d")
        .replace("in a month", "1mo")
        .replace("in a year", "1y");
    }

    return distance;
  } catch (error) {
    return "Invalid date";
  }
};

export const getHoursMinAndSecs = (seconds: number) => {
  const hour = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const min = Math.floor(remainingSeconds / 60);
  const sec = remainingSeconds % 60;

  const hourWithZeroPrefix = hour < 10 ? `0${hour}` : hour;
  const minWithZeroPrefix = min < 10 ? `0${min}` : min;
  const secWithZeroPrefix = sec < 10 ? `0${sec}` : sec;

  return {
    hour,
    min,
    sec,
    hourWithZeroPrefix,
    minWithZeroPrefix,
    secWithZeroPrefix,
  };
};

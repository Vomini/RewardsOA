import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Import the UTC plugin
import timezone from "dayjs/plugin/timezone"; // Import the Timezone plugin

// Extend dayjs with UTC and Timezone support
dayjs.extend(utc);
dayjs.extend(timezone);

// Set the default timezone you need (e.g., 'America/New_York')
const defaultTimezone = "America/New_York";

// Helper function to generate a random time and append it to the date
const getRandomTime = (baseDate) => {
  const randomHour = Math.floor(Math.random() * 24); // Random hour between 0 and 23
  const randomMinute = Math.floor(Math.random() * 60); // Random minute between 0 and 59
  return dayjs(baseDate).hour(randomHour).minute(randomMinute);
};

// Format the date with random time and add the ET manually
export const formatDateWithTimezone = (dateStr) => {
  const randomTime = getRandomTime(dateStr);
  return `${randomTime.tz(defaultTimezone).format("YYYY-MM-DD HH:mm")} ET`;
};

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
const formatDateWithTimezone = (dateStr) => {
  const randomTime = getRandomTime(dateStr);
  return `${randomTime.tz(defaultTimezone).format("YYYY-MM-DD HH:mm")} ET`;
};

export const data = [
  {
    customer_name: "Samantha",
    customer_id: 4,
    transaction_date: formatDateWithTimezone("2024-03-19"),
    amount: 346,
    transaction_id: 1000,
  },
  {
    customer_name: "Samantha",
    customer_id: 4,
    transaction_date: formatDateWithTimezone("2024-01-17"),
    amount: 192,
    transaction_id: 1001,
  },
  {
    customer_name: "Samantha",
    customer_id: 4,
    transaction_date: formatDateWithTimezone("2024-02-23"),
    amount: 136,
    transaction_id: 1002,
  },
  {
    customer_name: "Aaron",
    customer_id: 2,
    transaction_date: formatDateWithTimezone("2024-03-07"),
    amount: 62,
    transaction_id: 1003,
  },
  {
    customer_name: "Carter",
    customer_id: 1,
    transaction_date: formatDateWithTimezone("2024-01-22"),
    amount: 89,
    transaction_id: 1004,
  },
  {
    customer_name: "Aaron",
    customer_id: 2,
    transaction_date: formatDateWithTimezone("2024-01-20"),
    amount: 123,
    transaction_id: 1005,
  },
  {
    customer_name: "Aaron",
    customer_id: 2,
    transaction_date: formatDateWithTimezone("2024-03-18"),
    amount: 171,
    transaction_id: 1006,
  },
  {
    customer_name: "Aaron",
    customer_id: 2,
    transaction_date: formatDateWithTimezone("2024-03-05"),
    amount: 471,
    transaction_id: 1007,
  },
  {
    customer_name: "Maricela",
    customer_id: 3,
    transaction_date: formatDateWithTimezone("2024-01-28"),
    amount: 120,
    transaction_id: 1008,
  },
  {
    customer_name: "Samantha",
    customer_id: 4,
    transaction_date: formatDateWithTimezone("2024-01-05"),
    amount: 109,
    transaction_id: 1009,
  },
];

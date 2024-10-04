import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Import the UTC plugin
import timezone from "dayjs/plugin/timezone"; // Import the Timezone plugin

// Extend dayjs with UTC and Timezone support
dayjs.extend(utc);
dayjs.extend(timezone);

// Example timezone (can be changed based on requirements)
const defaultTimezone = "America/New_York";

/**
 * Get the month name and year from a transaction date (e.g., "March 2024")
 * Includes timezone handling and parses the formatted date string.
 */
export const getMonthName = (transactionDateStr) => {
  // Remove the " ET" suffix from the date string before parsing
  const cleanedDateStr = transactionDateStr.replace(" ET", "");
  const transactionDate = dayjs(cleanedDateStr, "YYYY-MM-DD HH:mm").tz(
    defaultTimezone
  );

  // Return formatted month and year
  return transactionDate.format("MMMM YYYY");
};

/**
 * Calculate the reward points for a transaction based on the amount spent.
 */
export const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2; // 2 points for every dollar above $100
    points += 50; // 1 point for every dollar between $50 and $100
  } else if (amount > 50) {
    points += amount - 50; // 1 point for every dollar above $50
  }
  return points;
};

/**
 * Calculate the total reward points per customer for each month and overall total.
 * Now handles dates with timezone support and calculates points accordingly.
 */
export const calculateRewards = (transactions) => {
  const customerPoints = {};

  transactions.forEach((transaction) => {
    const { customer_id, customer_name, transaction_date, amount } =
      transaction;

    // Get the month name from the transaction date (adjusted for timezone)
    const monthName = getMonthName(transaction_date);
    const points = calculatePoints(amount);

    if (!customerPoints[customer_id]) {
      customerPoints[customer_id] = {
        monthly: {},
        name: customer_name,
        total: 0,
      };
    }

    if (!customerPoints[customer_id].monthly[monthName]) {
      customerPoints[customer_id].monthly[monthName] = 0;
    }

    // Accumulate monthly and total points
    customerPoints[customer_id].monthly[monthName] += points;
    customerPoints[customer_id].total += points;
  });

  return customerPoints;
};

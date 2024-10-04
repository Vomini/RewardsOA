import { data } from "../data/data";
import { calculateRewards } from "../utils/rewards";

// Mock API to fetch all transactions
export const getTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 500);
  });
};

// Mock API to calculate and fetch rewards for all customers
export const getRewards = () => {
  return new Promise((resolve) => {
    const rewardsData = calculateRewards(data);
    setTimeout(() => resolve(rewardsData), 500);
  });
};

// Mock API to fetch rewards for a specific customer by ID
export const getCustomerRewardsById = (customerId) => {
  return new Promise((resolve) => {
    const rewardsData = calculateRewards(data);
    const customerData = rewardsData[customerId];
    setTimeout(() => resolve(customerData), 500);
  });
};

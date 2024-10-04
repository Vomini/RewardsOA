import React, { useState, useEffect } from "react";
import Transactions from "./Transactions";
import Rewards from "./Rewards";
import { getTransactions, getRewards } from "../api/api";
import "../stylessheet/main.css";

export default function RewardProgram() {
  const [transactions, setTransactions] = useState([]);
  const [rewards, setRewards] = useState(null);
  const [showRewards, setShowRewards] = useState(false);

  // Fetch transactions on component mount
  useEffect(() => {
    getTransactions().then((data) => setTransactions(data));
  }, []);

  // Fetch rewards when 'Get Rewards' button is clicked
  const handleGetRewards = () => {
    getRewards().then((rewardsData) => {
      setRewards(rewardsData);
      setShowRewards(true); // Switch to Rewards component
    });
  };
  const handleBackToTransactions = () => {
    setShowRewards(false); // Switch back to Transactions component
  };

  return (
    <div>
      <h1>Customer Rewards Program</h1>

      {/** Show Transactions or Rewards based on state */}
      {showRewards ? (
        <Rewards rewards={rewards} onBack={handleBackToTransactions} />
      ) : (
        <Transactions
          transactions={transactions}
          onGetRewards={handleGetRewards}
        />
      )}
    </div>
  );
}

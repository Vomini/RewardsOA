import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Transactions from "./Transactions";
import Rewards from "./Rewards";
import { getTransactions, getRewards } from "../api/api";
import "../stylessheet/main.css"; // Ensure this is the correct path for your CSS

export default function RewardProgram() {
  const [transactions, setTransactions] = React.useState([]);
  const [rewards, setRewards] = React.useState(null);

  // Fetch transactions on component mount
  React.useEffect(() => {
    getTransactions().then((data) => setTransactions(data));
  }, []);

  // Fetch rewards when navigating to Rewards tab
  const fetchRewards = () => {
    if (!rewards) {
      getRewards().then((rewardsData) => setRewards(rewardsData));
    }
  };

  return (
    <Router>
      <div className="reward-program-container">
        <h1>Customer Rewards Program</h1>

        {/** Navigation Tabs */}
        <nav className="tab-navigation">
          <NavLink
            exact
            to="/"
            className={({ isActive }) =>
              isActive ? "tab-link active-tab" : "tab-link"
            }
          >
            Transactions
          </NavLink>
          <NavLink
            to="/rewards"
            className={({ isActive }) =>
              isActive ? "tab-link active-tab" : "tab-link"
            }
            onClick={fetchRewards}
          >
            Rewards
          </NavLink>
        </nav>

        {/** Route-based component switching */}
        <Routes>
          <Route
            exact
            path="/"
            element={<Transactions transactions={transactions} />}
          />
          <Route path="/rewards" element={<Rewards rewards={rewards} />} />
        </Routes>
      </div>
    </Router>
  );
}

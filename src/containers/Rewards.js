import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce"; // Import the custom hook
import { getCustomerRewardsById } from "../api/api"; // Assuming this is in the API file
import Table from "../components/Table"; // Import the reusable table component

export default function Rewards({ rewards, onBack }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRewards, setFilteredRewards] = useState(null);

  // Debounced search query to prevent filtering on every keystroke
  const debouncedSearchQuery = useDebounce(searchQuery, 300); // 300ms delay

  // Search and fetch customer rewards by customer ID
  useEffect(() => {
    if (!debouncedSearchQuery) {
      setFilteredRewards(rewards); // Clear results if query is empty
    } else {
      // Make the API call to fetch the customer rewards by ID
      getCustomerRewardsById(debouncedSearchQuery).then((customerData) => {
        if (customerData) {
          const filtered = { [debouncedSearchQuery]: customerData };
          setFilteredRewards(filtered);
        } else {
          setFilteredRewards(null);
        }
      });
    }
  }, [debouncedSearchQuery]);

  const columns = [
    "Customer ID",
    "Customer Name",
    "Month",
    "Points",
    "Total Points",
  ];

  return (
    <div>
      <h2>Customer Rewards Program</h2>

      {/** Search bar for filtering rewards by customer ID */}
      <label htmlFor="search">Search by Customer ID:</label>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter customer ID"
      />

      {/** Reusable Table Component */}
      {filteredRewards ? (
        <Table
          columns={columns}
          data={Object.keys(filteredRewards)}
          renderRow={(customerId, rowIndex) => (
            <React.Fragment key={customerId}>
              {Object.keys(filteredRewards[customerId].monthly).map(
                (month, monthIndex) => (
                  <tr key={monthIndex}>
                    {monthIndex === 0 && (
                      <>
                        <td
                          rowSpan={
                            Object.keys(filteredRewards[customerId].monthly)
                              .length
                          }
                        >
                          {customerId}
                        </td>
                        <td
                          rowSpan={
                            Object.keys(filteredRewards[customerId].monthly)
                              .length
                          }
                        >
                          {filteredRewards[customerId].name}
                        </td>
                      </>
                    )}
                    <td>{month}</td>
                    <td>{filteredRewards[customerId].monthly[month]}</td>
                    {monthIndex === 0 && (
                      <td
                        rowSpan={
                          Object.keys(filteredRewards[customerId].monthly)
                            .length
                        }
                      >
                        {filteredRewards[customerId].total}
                      </td>
                    )}
                  </tr>
                )
              )}
            </React.Fragment>
          )}
        />
      ) : (
        <p>No results found for customer ID "{debouncedSearchQuery}".</p>
      )}

      {/** Back Button */}
      <button onClick={onBack} style={{ marginTop: "20px" }}>
        Back to Transactions
      </button>
    </div>
  );
}

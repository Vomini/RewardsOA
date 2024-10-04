import React, { useState, useEffect } from "react";
import { useDebounce } from "../utils/useDebounce"; // Import your custom hook
import Table from "../components/Table"; // Import the reusable table component

export default function Transactions({ transactions }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);

  // Debounced search query to prevent filtering on every keystroke
  const debouncedSearchQuery = useDebounce(searchQuery, 300); // 300ms delay

  // Filter transactions based on customer ID search query
  useEffect(() => {
    if (!debouncedSearchQuery) {
      setFilteredTransactions(transactions); // Show all transactions if search query is empty
    } else {
      const filtered = transactions.filter((transaction) =>
        transaction.customer_id.toString().includes(debouncedSearchQuery)
      );
      setFilteredTransactions(filtered);
    }
  }, [debouncedSearchQuery, transactions]);

  const columns = [
    "Customer ID",
    "Customer Name",
    "Transaction Date",
    "Amount",
  ];

  return (
    <div>
      <h2>Transactions</h2>

      {/** Search bar for filtering transactions by customer ID */}
      <label htmlFor="search">Search by Customer ID:</label>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter customer ID"
        style={{ marginBottom: "20px" }}
      />

      {/** Reusable Table Component */}
      <Table
        columns={columns}
        data={filteredTransactions}
        renderRow={(transaction, rowIndex) => (
          <tr key={transaction.transaction_id}>
            <td>{transaction.customer_id}</td>
            <td>{transaction.customer_name}</td>
            <td>{transaction.transaction_date}</td>
            <td>{transaction.amount}</td>
          </tr>
        )}
      />

    
    </div>
  );
}

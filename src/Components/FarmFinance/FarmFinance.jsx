import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./FarmFinance.css";

const FarmFinance = () => {
  // State for form data
  const [financeData, setFinanceData] = useState({
    income_type: "",
    expense_type: "",
    amount: "",
    date: "",
  });

  // State for filters
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Current year

  const [enhancedSummary, setEnhancedSummary] = useState({
    current_month: {
      month: "",
      income: {
        breakdown: [],
        total: 0,
        daily_average: 0,
      },
      expenses: {
        breakdown: [],
        total: 0,
        daily_average: 0,
      },
      net_profit_loss: 0,
      status: "",
    },
    summary_metrics: {
      profit_margin: 0,
      expense_ratio: 0,
    },
  });

  const [yearSummary, setYearSummary] = useState({
    total_income: 0,
    total_expenses: 0,
    net_profit_loss: 0,
    income_breakdown: [],
    expense_breakdown: [],
  });

  const [enhancedSummaryError, setEnhancedsummaryError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Generate arrays for dropdowns
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const fetchEnhancedSummary = async () => {
    try {
      setIsLoading(true);
      // Fetch monthly summary
      const monthResponse = await fetch(
        `http://127.0.0.1:8000/api/enhancedfinance-summary/?month=${selectedMonth}`
      );
      
      // Fetch yearly summary
      const yearResponse = await fetch(
        `http://127.0.0.1:8000/api/enhancedfinance-summary/?year=${selectedYear}`
      );

      if (monthResponse.ok && yearResponse.ok) {
        const monthData = await monthResponse.json();
        const yearData = await yearResponse.json();

        if (monthData?.current_month) {
          setEnhancedSummary(monthData.current_month);
          setEnhancedsummaryError(null);
        }

        if (yearData?.year) {
          setYearSummary(yearData.year);
        }
      } else {
        setEnhancedsummaryError("Failed to fetch summary data.");
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
      setEnhancedsummaryError("An error occurred while fetching summary data.");
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to fetch data when filters change
  useEffect(() => {
    fetchEnhancedSummary();
  }, [selectedMonth, selectedYear]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinanceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle income submission
  const handleIncomeSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    if (financeData.date > today) {
      setError("Date cannot be in the future");
      return;
    }
    try {
      const incomeData = {
        income_type: financeData.income_type,
        amount: parseFloat(financeData.amount),
        date: financeData.date || new Date().toISOString().split("T")[0],
      };

      await axios.post("http://127.0.0.1:8000/api/incomes/", incomeData);
      alert("Income record saved successfully!");
      fetchEnhancedSummary();
      setFinanceData({ income_type: "", amount: "", date: "" });
    } catch (error) {
      console.error("Error submitting income:", error);
      alert("Failed to save income record. Please try again.");
    }
  };

  // Handle expense submission
  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    if (financeData.date > today) {
      setError("Date cannot be in the future");
      return;
    }
    try {
      const expenseData = {
        expense_type: financeData.expense_type,
        amount: parseFloat(financeData.amount),
        date: financeData.date || new Date().toISOString().split("T")[0],
      };

      await axios.post("http://127.0.0.1:8000/api/expenses/", expenseData);
      alert("Expense record saved successfully!");
      fetchEnhancedSummary();
      setFinanceData({ income_type: "", amount: "", date: "" });
    } catch (error) {
      console.error("Error submitting expense:", error);
      alert("Failed to save expense record. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="loading">Loading financial data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div id="farmFinance" className="farm-finance-container">
      <div className="finance-form">
        {/* <h2>Farm Finance</h2> */}
        


        {/* Income Form */}
        <form onSubmit={handleIncomeSubmit}>
        <h3>Income Details</h3>
          <label className="label">
            Income Type:
            <select
              className="input-field"
              name="income_type"
              value={financeData.income_type}
              onChange={handleChange}
              required
            >
              <option value="">Select Income Type</option>
              <option value="MILK">Milk Sales</option>
              <option value="CATTLE">Cattle Sales</option>
              <option value="MANURE">Manure Sales</option>
              <option value="OTHER">Other Income</option>
            </select>
          </label>

          <label className="label">
            Amount:
            <input
              className="input-field"
              type="number"
              step="0.01"
              min="0"
              name="amount"
              value={financeData.amount}
              onChange={handleChange}
              required
            />
          </label>

          <label className="label">
            Date:
            <input
              className="input-field"
              type="date"
              name="date"
              value={financeData.date}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="submit-button">
            Save Income
          </button>

        </form>

        {/* Expense Form */}
        <form onSubmit={handleExpenseSubmit}>
        <h3>Expense Details</h3>
          <label className="label">
            Expense Type:
            <select
              className="input-field"
              name="expense_type"
              value={financeData.expense_type}
              onChange={handleChange}
              required
            >
              <option value="">Select Expense Type</option>
              <option value="FEED">Feed Purchase</option>
              <option value="VET">Veterinary Services</option>
              <option value="LABOR">Labor Costs</option>
              <option value="EQUIPMENT">Equipment</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="OTHERS">Other Expenses</option>
            </select>
          </label>

          <label className="label">
            Amount:
            <input
              className="input-field"
              type="number"
              step="0.01"
              min="0"
              name="amount"
              value={financeData.amount}
              onChange={handleChange}
              required
            />
          </label>

          <label className="label">
            Date:
            <input
              className="input-field"
              type="date"
              name="date"
              value={financeData.date}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="submit-button">
            Save Expense
          </button>

        </form>
      </div>

      {/* Finance Summary */}
      <div className="finance-summary">
        <h2>Finance Summary</h2>
        
        {/* Monthly Summary */}
        <div className="summary-section">
          <h3>Monthly Summary - {months.find(m => m.value === selectedMonth)?.label} {selectedYear}</h3>
          <select
              className="input-field"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Type</th>
                <th>Total</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {enhancedSummary.income_breakdown?.map((income, index) => (
                <tr key={`income-${index}`}>
                  <td>{index === 0 ? "Income" : ""}</td>
                  <td>{income.income_type}</td>
                  <td>{income.total}</td>
                  <td>{((income.total / enhancedSummary.total_income) * 100).toFixed(2)}%</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2"><strong>Total Income</strong></td>
                <td colSpan="2">{enhancedSummary.total_income}</td>
              </tr>

              {enhancedSummary.expense_breakdown?.map((expense, index) => (
                <tr key={`expense-${index}`}>
                  <td>{index === 0 ? "Expenses" : ""}</td>
                  <td>{expense.expense_type}</td>
                  <td>{expense.total}</td>
                  <td>{((expense.total / enhancedSummary.total_expenses) * 100).toFixed(2)}%</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2"><strong>Total Expenses</strong></td>
                <td colSpan="2">{enhancedSummary.total_expenses}</td>
              </tr>

              <tr>
                <td colSpan="2"><strong>Net Profit/Loss</strong></td>
                <td colSpan="2">{enhancedSummary.net_profit_loss}</td>
              </tr>
            </tbody>
          </table>
        </div>
                <hr />
                <hr />
        {/* Yearly Summary */}
        <div className="summary-section">
          <h3>Yearly Summary - {selectedYear}</h3>
          <select
              className="input-field"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          <table className="summary-table">
            <thead>
              <tr  className="table-secondary">
                <th >Category</th>
                <th>Type</th>
                <th>Total</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {yearSummary.income_breakdown?.map((income, index) => (
                <tr key={`yearly-income-${index}`}>
                  <td>{index === 0 ? "Income" : ""}</td>
                  <td>{income.income_type}</td>
                  <td>{income.total}</td>
                  <td>{((income.total / yearSummary.total_income) * 100).toFixed(2)}%</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2"><strong>Total Income</strong></td>
                <td colSpan="2">{yearSummary.total_income}</td>
              </tr>

              {yearSummary.expense_breakdown?.map((expense, index) => (
                <tr key={`yearly-expense-${index}`}>
                  <td>{index === 0 ? "Expenses" : ""}</td>
                  <td>{expense.expense_type}</td>
                  <td>{expense.total}</td>
                  <td>{((expense.total / yearSummary.total_expenses) * 100).toFixed(2)}%</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2"><strong>Total Expenses</strong></td>
                <td colSpan="2">{yearSummary.total_expenses}</td>
              </tr>

              <tr>
                <td colSpan="2"><strong>Net Profit/Loss</strong></td>
                <td colSpan="2">{yearSummary.net_profit_loss}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FarmFinance;
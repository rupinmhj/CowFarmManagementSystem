import React, { useState } from 'react';
import './FarmFinance.css';

const FarmFinance = () => {
  const [financeData, setFinanceData] = useState({
    incomeSource: '',
    incomeAmount: '',
    incomeDate: '',
    expenseCategory: '',
    expenseAmount: '',
    expenseDate: '',
  });

  const [financeSummary, setFinanceSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netProfit: 0,
    cashBalance: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinanceData({
      ...financeData,
      [name]: value,
    });
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    const income = parseFloat(financeData.incomeAmount || 0);
    setFinanceSummary((prev) => ({
      ...prev,
      totalIncome: prev.totalIncome + income,
      netProfit: prev.netProfit + income,
      cashBalance: prev.cashBalance + income,
    }));

    setFinanceData({
      ...financeData,
      incomeSource: '',
      incomeAmount: '',
      incomeDate: '',
    });
    alert('Income Record Saved!');
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    const expense = parseFloat(financeData.expenseAmount || 0);
    setFinanceSummary((prev) => ({
      ...prev,
      totalExpenses: prev.totalExpenses + expense,
      netProfit: prev.netProfit - expense,
      cashBalance: prev.cashBalance - expense,
    }));

    setFinanceData({
      ...financeData,
      expenseCategory: '',
      expenseAmount: '',
      expenseDate: '',
    });
    alert('Expense Record Saved!');
  };

  return (
    <div id="farmFinance" className="farm-finance-container">
      <div className="finance-form">
        <h2>Farm Finance</h2>

        {/* Income Form */}
        <form onSubmit={handleIncomeSubmit}>
          <h3>Income Details</h3>
          <label className="label">
            Income Source:
            <input
              className="input-field"
              type="text"
              name="incomeSource"
              value={financeData.incomeSource}
              onChange={handleChange}
              required
            />
          </label>
          <label className="label">
            Amount:
            <input
              className="input-field"
              type="number"
              name="incomeAmount"
              value={financeData.incomeAmount}
              onChange={handleChange}
              required
            />
          </label>
          <label className="label">
            Sale Date:
            <input
              className="input-field"
              type="date"
              name="incomeDate"
              value={financeData.incomeDate}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="submit-button">Save Income</button>
        </form>

        {/* Expense Form */}
        <form onSubmit={handleExpenseSubmit}>
          <h3>Expense Details</h3>
          <label className="label">
            Expense Category:
            <input
              className="input-field"
              type="text"
              name="expenseCategory"
              value={financeData.expenseCategory}
              onChange={handleChange}
              required
            />
          </label>
          <label className="label">
            Amount:
            <input
              className="input-field"
              type="number"
              name="expenseAmount"
              value={financeData.expenseAmount}
              onChange={handleChange}
              required
            />
          </label>
          <label className="label">
            Expense Date:
            <input
              className="input-field"
              type="date"
              name="expenseDate"
              value={financeData.expenseDate}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="submit-button">Save Expense</button>
        </form>
      </div>

      {/* Finance Summary */}
      <div className="finance-summary">
        <h2>Finance Summary</h2>
        <p>Total Income: Rs. {financeSummary.totalIncome.toFixed(2)}</p>
        <p>Total Expenses: Rs. {financeSummary.totalExpenses.toFixed(2)}</p>
        <p>Net Profit: Rs. {financeSummary.netProfit.toFixed(2)}</p>
        <p>Cash Balance: Rs. {financeSummary.cashBalance.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default FarmFinance;

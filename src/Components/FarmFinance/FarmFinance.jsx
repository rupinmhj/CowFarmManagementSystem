import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FarmFinance.css';

const FarmFinance = () => {
  const [financeData, setFinanceData] = useState({
    incomeType: '',
    incomeAmount: '',
    incomeDate: '',
    expenseType: '',
    expenseAmount: '',
    expenseDate: '',
  });

  const [financeSummary, setFinanceSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netProfit: 0,
    cashBalance: 0,
  });

  const [profitLoss, setProfitLoss] = useState({
    profit: 0,
    loss: 0,
  });

  // Fetch Finance Summary and Profit/Loss on Component Mount
  useEffect(() => {
    // Fetch Finance Summary
    axios.get('http://127.0.0.1:8000/api/finance-summary/')
      .then(response => {
        setFinanceSummary(response.data);
      })
      .catch(error => {
        console.error('Error fetching finance summary:', error);
      });

    // Fetch Profit/Loss
    axios.get('http://127.0.0.1:8000/api/profit-loss/')
      .then(response => {
        setProfitLoss(response.data);
      })
      .catch(error => {
        console.error('Error fetching profit/loss:', error);
      });
  }, []);

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
    axios.post('http://127.0.0.1:8000/api/incomes/', {
      income_type: financeData.incomeType,
      amount: income,
      date: financeData.incomeDate,
    })
      .then(response => {
        // Update the finance summary and net profit
        setFinanceSummary((prev) => ({
          ...prev,
          totalIncome: prev.totalIncome + income,
          netProfit: prev.netProfit + income,
          cashBalance: prev.cashBalance + income,
        }));
        alert('Income Record Saved!');
      })
      .catch(error => {
        console.error('Error saving income:', error);
      });

    setFinanceData({
      ...financeData,
      incomeType: '',
      incomeAmount: '',
      incomeDate: '',
    });
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    const expense = parseFloat(financeData.expenseAmount || 0);
    axios.post('http://127.0.0.1:8000/api/expenses/', {
      expense_type: financeData.expenseType,
      amount: expense,
      date: financeData.expenseDate,
    })
      .then(response => {
        // Update the finance summary and net profit
        setFinanceSummary((prev) => ({
          ...prev,
          totalExpenses: prev.totalExpenses + expense,
          netProfit: prev.netProfit - expense,
          cashBalance: prev.cashBalance - expense,
        }));
        alert('Expense Record Saved!');
      })
      .catch(error => {
        console.error('Error saving expense:', error);
      });

    setFinanceData({
      ...financeData,
      expenseType: '',
      expenseAmount: '',
      expenseDate: '',
    });
  };

  return (
    <div id="farmFinance" className="farm-finance-container">
      <div className="finance-form">
        <h2>Farm Finance</h2>

        {/* Income Form */}
        <form onSubmit={handleIncomeSubmit}>
          <h3>Income Details</h3>
          <label className="label">
            Income Type:
            <select
              className="input-field"
              name="incomeType"
              value={financeData.incomeType}
              onChange={handleChange}
              required
            >
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
        <form className="expenses" onSubmit={handleExpenseSubmit}>
          <h3>Expense Details</h3>
          <label className="label">
            Expense Type:
            <select
              className="input-field"
              name="expenseType"
              value={financeData.expenseType}
              onChange={handleChange}
              required
            >
              <option value="FEED">Feed Purchase</option>
              <option value="VET">Veterinary Services</option>
              <option value="LABOR">Labor Costs</option>
              <option value="EQUIPMENT">Equipment</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="OTHER">Other Expenses</option>
            </select>
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
        <h3>Profit/Loss</h3>
        <p>Profit: Rs. {profitLoss.profit.toFixed(2)}</p>
        <p>Loss: Rs. {profitLoss.loss.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default FarmFinance;

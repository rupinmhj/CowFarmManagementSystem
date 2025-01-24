import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FarmFinance.css';

const FarmFinance = () => {
  // State for form data
  const [financeData, setFinanceData] = useState({
    incomeType: '',
    incomeAmount: '',
    incomeDate: '',
    expenseType: '',
    expenseAmount: '',
    expenseDate: '',
  });

  // State for summary data
  const [financeSummary, setFinanceSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netProfit: 0,
    cashBalance: 0,
  });

  // State for profit/loss data
  const [profitLoss, setProfitLoss] = useState({
    incomeBreakdown: [],
    expenseBreakdown: [],
    totalIncome: 0,
    totalExpenses: 0,
    netProfit: 0,
  });

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [summaryRes, profitLossRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/finance-summary/'),
          axios.get('http://127.0.0.1:8000/api/profit-loss/')
        ]);
        
        console.log('Summary Data:', summaryRes.data);
        console.log('Profit/Loss Data:', profitLossRes.data);
        
        setFinanceSummary(summaryRes.data);
        setProfitLoss(profitLossRes.data);
        setError(null);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError('Failed to load financial data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinanceData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle income submission
  const handleIncomeSubmit = async (e) => {
    e.preventDefault();
    try {
      const incomeData = {
        income_type: financeData.incomeType,
        amount: parseFloat(financeData.incomeAmount),
        date: financeData.incomeDate || new Date().toISOString().split('T')[0]
      };

      console.log('Submitting income:', incomeData);

      await axios.post('http://127.0.0.1:8000/api/incomes/', incomeData);
      
      // Refresh financial data
      const [summaryRes, profitLossRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/finance-summary/'),
        axios.get('http://127.0.0.1:8000/api/profit-loss/')
      ]);
      
      setFinanceSummary(summaryRes.data);
      setProfitLoss(profitLossRes.data);

      // Reset form
      setFinanceData(prev => ({
        ...prev,
        incomeType: '',
        incomeAmount: '',
        incomeDate: ''
      }));

      alert('Income record saved successfully!');
    } catch (error) {
      console.error('Income submission error:', error);
      alert('Error saving income record. Please try again.');
    }
  };

  // Handle expense submission
  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseData = {
        expense_type: financeData.expenseType,
        amount: parseFloat(financeData.expenseAmount),
        date: financeData.expenseDate || new Date().toISOString().split('T')[0]
      };

      console.log('Submitting expense:', expenseData);

      await axios.post('http://127.0.0.1:8000/api/expenses/', expenseData);
      
      // Refresh financial data
      const [summaryRes, profitLossRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/finance-summary/'),
        axios.get('http://127.0.0.1:8000/api/profit-loss/')
      ]);
      
      setFinanceSummary(summaryRes.data);
      setProfitLoss(profitLossRes.data);

      // Reset form
      setFinanceData(prev => ({
        ...prev,
        expenseType: '',
        expenseAmount: '',
        expenseDate: ''
      }));

      alert('Expense record saved successfully!');
    } catch (error) {
      console.error('Expense submission error:', error);
      alert('Error saving expense record. Please try again.');
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
              <option value="">Select Expense Type</option>
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
              step="0.01"
              min="0"
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
        <div className="summary-details">
          <p>Total Income: Rs. {financeSummary.totalIncome?.toFixed(2) || '0.00'}</p>
          <p>Total Expenses: Rs. {financeSummary.totalExpenses?.toFixed(2) || '0.00'}</p>
          <p>Net Profit: Rs. {financeSummary.netProfit?.toFixed(2) || '0.00'}</p>
          <p>Cash Balance: Rs. {financeSummary.cashBalance?.toFixed(2) || '0.00'}</p>
        </div>

        {/* Profit/Loss Breakdown */}
        <div className="profit-loss-breakdown">
          <h3>Income Breakdown</h3>
          {profitLoss.incomeBreakdown?.map((item, index) => (
            <p key={index}>
              {item.income_type}: Rs. {item.total?.toFixed(2)}
            </p>
          ))}

          <h3>Expense Breakdown</h3>
          {profitLoss.expenseBreakdown?.map((item, index) => (
            <p key={index}>
              {item.expense_type}: Rs. {item.total?.toFixed(2)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmFinance;
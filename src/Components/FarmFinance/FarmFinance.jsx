import React, { useState, useEffect ,useCallback} from 'react';
import axios from 'axios';
import './FarmFinance.css';

const FarmFinance = () => {
  // State for form data
  const [financeData, setFinanceData] = useState({
    income_type: '',
    expense_type: '',
    amount: '',
    date: '',
  });

  // State for summary data
  const [financeSummary, setFinanceSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netProfit: 0,
    cashBalance: 0,
  });

  // State for income and expense breakdown
  const [incomeBreakdown, setIncomeBreakdown] = useState([]);
  const [expenseBreakdown, setExpenseBreakdown] = useState([]);

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [summaryRes, incomesRes, expensesRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/finance-summary/'),
        axios.get('http://127.0.0.1:8000/api/incomes/'),
        axios.get('http://127.0.0.1:8000/api/expenses/'),
      ]);

      setFinanceSummary(summaryRes.data);
      setIncomeBreakdown(incomesRes.data);
      setExpenseBreakdown(expensesRes.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load financial data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [setFinanceSummary, setIncomeBreakdown, setExpenseBreakdown, setError]);

   // Helper function to group and sum data by type
        const groupByType = (data, typeKey) => {
          const grouped = data.reduce((acc, item) => {
            const type = item[typeKey];
            const amount = parseFloat(item.amount);
            if (!acc[type]) {
              acc[type] = 0;
            }
            acc[type] += amount;
            return acc;
          }, {});
          return Object.entries(grouped).map(([type, total]) => ({ type, total }));
        };


  // Fetch financial data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    try {
      const incomeData = {
        income_type: financeData.income_type,
        amount: parseFloat(financeData.amount),
        date: financeData.date || new Date().toISOString().split('T')[0],
      };

      await axios.post('http://127.0.0.1:8000/api/incomes/', incomeData);
      alert('Income record saved successfully!');
      fetchData();// Reload to fetch updated data
      setFinanceData({ income_type: '', amount: '', date: '' }); // Clear form fields
    } catch (error) {
      console.error('Error submitting income:', error);
      alert('Failed to save income record. Please try again.');
    }
  };

  // Handle expense submission
  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseData = {
        expense_type: financeData.expense_type,
        amount: parseFloat(financeData.amount),
        date: financeData.date || new Date().toISOString().split('T')[0],
      };

      await axios.post('http://127.0.0.1:8000/api/expenses/', expenseData);
      alert('Expense record saved successfully!');
      fetchData(); 
      setFinanceData({ income_type: '', amount: '', date: '' }); // Clear form fields
      
    } catch (error) {
      console.error('Error submitting expense:', error);
      alert('Failed to save expense record. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="loading">Loading financial data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

    // Add new helper function for aggregating data
    const aggregateFinancialData = (data, typeKey) => {
      return data.reduce((acc, item) => {
        const type = item[typeKey];
        const amount = parseFloat(item.amount);
        if (!acc[type]) {
          acc[type] = 0;
        }
        acc[type] += amount;
        return acc;
      }, {});
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

          <button type="submit" className="submit-button">Save Income</button>
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

          <button type="submit" className="submit-button">Save Expense</button>
        </form>
      </div>

     {/* Finance Summary with Aggregated Data */}
     <div className="finance-summary">
        <h2>Finance Summary</h2>
        <div className="summary-card">
          <div className="summary-details">
            <p className="total-item">Total Income: Rs. {financeSummary.totalIncome.toFixed(2)}</p>
            <p className="total-item">Total Expenses: Rs. {financeSummary.totalExpenses.toFixed(2)}</p>
            <p className={`total-item ${financeSummary.netProfit >= 0 ? 'profit' : 'loss'}`}>
              Net Profit: Rs. {financeSummary.netProfit.toFixed(2)}
            </p>
            <p className="total-item">Cash Balance: Rs. {financeSummary.cashBalance.toFixed(2)}</p>
          </div>
        </div>

        <div className="breakdown-container">
          {/* Aggregated Income Breakdown */}
          <div className="breakdown-section">
            <h3>Income Breakdown</h3>
            <div className="breakdown-items">
              {Object.entries(aggregateFinancialData(incomeBreakdown, 'income_type')).map(([type, amount]) => (
                <div key={type} className="breakdown-item">
                  <span className="type">{type}</span>
                  <span className="amount">Rs. {amount.toFixed(2)}</span>
                  <span className="percentage">
                    ({((amount / financeSummary.totalIncome) * 100).toFixed(1)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

       {/* Aggregated Expense Breakdown */}
       <div className="breakdown-section">
            <h3>Expense Breakdown</h3>
            <div className="breakdown-items">
              {Object.entries(aggregateFinancialData(expenseBreakdown, 'expense_type')).map(([type, amount]) => (
                <div key={type} className="breakdown-item">
                  <span className="type">{type}</span>
                  <span className="amount">Rs. {amount.toFixed(2)}</span>
                  <span className="percentage">
                    ({((amount / financeSummary.totalExpenses) * 100).toFixed(1)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmFinance;

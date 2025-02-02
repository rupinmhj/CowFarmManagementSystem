import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,  //Provides a scale for categorical data on the x-axis
  LinearScale, //Provides a linear scale for numerical data on the y-axis.
  BarElement, //Renders individual bars in a bar chart
  Title, //Plugin for displaying a title on the chart.
  Tooltip, //Plugin for showing tooltips when hovering over chart elements.
  Legend, //Plugin for displaying a legend.
} from "chart.js"; // The core Chart.js object used to register plugins and build charts.

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyFinanceChart = ({ enhancedSummary }) => {
  // Fallback to empty arrays if breakdown arrays are not provided
  const incomeData = enhancedSummary.income_breakdown || [];
  const expenseData = enhancedSummary.expense_breakdown || [];

  // Prepare data for the Income Chart
  const incomeChartData = {
    labels: incomeData.map((item) => item.income_type),
    datasets: [
      {
        label: "Income (Rs)",
        data: incomeData.map((item) => item.total),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Prepare data for the Expense Chart
  const expenseChartData = {
    labels: expenseData.map((item) => item.expense_type),
    datasets: [
      {
        label: "Expenses (Rs)",
        data: expenseData.map((item) => item.total),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const fixedMaxValue = 200000;

  const chartOptions = {
    responsive: true, //Makes the chart responsive to the container’s dimensions.
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: fixedMaxValue,
        ticks: {
          stepSize: 5000, 
          callback: function (value) {
            return value + " Rs";
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="chart-wrapper" style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
      {/* Income Chart Container */}
      <div style={{ width: "400px", height: "400px" }}>
        <h3 style={{ textAlign: "center" }}>Income Chart</h3>
        <Bar data={incomeChartData} options={chartOptions} />
      </div>
      {/* Expense Chart Container */}
      <div style={{ width: "400px", height: "400px" }}>
        <h3 style={{ textAlign: "center" }}>Expense Chart</h3>
        <Bar data={expenseChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default MonthlyFinanceChart;

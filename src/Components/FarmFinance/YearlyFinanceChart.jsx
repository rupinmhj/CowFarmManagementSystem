import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components so that ChartJS knows what to render.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const YearlyFinanceChart = ({ yearSummary }) => {
  // Extract income and expense breakdown data from the yearSummary prop.
  // Fallback to empty arrays if they are not provided.
  const incomeData = yearSummary.income_breakdown || [];
  const expenseData = yearSummary.expense_breakdown || [];

  // Prepare the data object for the Income Bar Chart.
  // - labels: x-axis labels obtained by mapping each item to its income_type.
  // - datasets: an array containing one dataset object with the income totals.
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

  // Prepare the data object for the Expense Bar Chart.
  // - labels: x-axis labels obtained by mapping each expense item to its expense_type.
  // - datasets: an array containing one dataset object with the expense totals.
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

  // Set a fixed maximum value for the y-axis.
  // This value should be chosen to comfortably fit your highest expected yearly amounts.
  // For example, here we use 1,000,000 Rs. Adjust as needed.
  const fixedMaxValue = 1000000;

  // Define chart options to configure the look and behavior of the charts.
  // - responsive: ensures the chart adjusts to its container.
  // - maintainAspectRatio: false allows us to define custom container dimensions.
  // - scales: configures the y-axis:
  //   - min and max define the range.
  //   - ticks define the step size and format the tick labels.
  // - plugins: set the legend's position and disable the title.
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: fixedMaxValue,
        ticks: {
          stepSize: 50000, // For example, a 50,000 Rs increment per tick.
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
    <div
      className="chart-wrapper"
      style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}
    >
      {/* Yearly Income Chart Container */}
      <div style={{ width: "400px", height: "400px" }}>
        <h3 style={{ textAlign: "center" }}>Yearly Income Chart</h3>
        <Bar data={incomeChartData} options={chartOptions} />
      </div>
      {/* Yearly Expense Chart Container */}
      <div style={{ width: "400px", height: "400px" }}>
        <h3 style={{ textAlign: "center" }}>Yearly Expense Chart</h3>
        <Bar data={expenseChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default YearlyFinanceChart;

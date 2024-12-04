import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LearningCurveChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Materials",
        data: [10, 20, 30, 40, 50, 60],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        tension: 0.4,
      },
      {
        label: "Exams",
        data: [5, 15, 25, 35, 45, 55],
        borderColor: "purple",
        backgroundColor: "rgba(128, 0, 128, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Learning Activity" },
    },
    scales: {
      x: { type: "category", title: { display: true, text: "Months" } },
      y: { beginAtZero: true, title: { display: true, text: "Activity Level" } },
    },
  };

  return <Line data={data} options={options} />;
};

export default LearningCurveChart;

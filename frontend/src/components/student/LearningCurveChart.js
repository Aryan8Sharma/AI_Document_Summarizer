import {
    CategoryScale, // Import the category scale for the x-axis
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  // Register all required components
  Chart.register(
    CategoryScale, 
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  
  import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js';

const LearningCurveChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Materials',
            data: [10, 20, 30, 40, 50, 60],
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
          },
          {
            label: 'Exams',
            data: [5, 15, 25, 35, 45, 55],
            borderColor: 'purple',
            backgroundColor: 'rgba(128, 0, 128, 0.2)',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category', // Use category scale for x-axis
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup chart on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default LearningCurveChart;

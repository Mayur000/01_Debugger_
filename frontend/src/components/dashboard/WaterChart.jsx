import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WaterChart = ({ readings }) => {
  const data = {
    labels: readings.map(r => new Date(r.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Daily Consumption (Liters)',
        data: readings.map(r => r.consumption),
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151'
        }
      },
      title: {
        display: true,
        text: 'Water Consumption Trend',
        color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151'
      },
    },
    scales: {
      x: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280'
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Liters',
          color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151'
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280'
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb'
        }
      },
    },
  };

  return (
    <div className="card">
      <div style={{ height: '400px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default WaterChart;

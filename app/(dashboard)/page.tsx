'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import TotalCollections from '@/components/collections/TotalCollection';
import TotalCustomers from '@/components/customers/TotalCustomers';
import TotalProduct from '@/components/products/TotalProduct';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Dummy data for the sales chart, including the mock data for products and customers
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales ($)',
        data: [0, 50, 200, 150, 100, 0, 0, 0, 0, 0, 0, 0], // Mock data for sales per month
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Products Sold',
        data: [10, 30, 150, 100, 80, 20, 50, 90, 60, 120, 130, 110], // Mock data for products sold per month
        borderColor: 'rgba(255, 0, 0, 1)', // Red color for the product line
        backgroundColor: 'rgba(255, 0, 0, 0.2)', // Optional, red background with transparency
        tension: 0.4,
      },
      {
        label: 'Customers',
        data: [5, 20, 40, 60, 30, 90, 50, 120, 80, 100, 130, 140], // Mock data for customers per month
        borderColor: 'rgba(0, 255, 0, 1)', // Green color for the customer line
        backgroundColor: 'rgba(0, 255, 0, 0.2)', // Optional, green background with transparency
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <p className="text-heading2-bold">Dashboard</p>
      
      {/* ปรับระยะห่างด้านบนของเส้นดำ */}
      <hr className="border-t-2 border-gray-300 mb-6 mt-8" /> 

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Total Collections */}
        <TotalCollections />

        {/* Total Customers */}
        <TotalCustomers /> {/* เพิ่ม TotalCustomers */}

        {/* Total Products */}
        <TotalProduct /> {/* เพิ่ม TotalProduct */}
      </div>

      {/* Sales Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold">Sales, Products, and Customers Chart</h3>
        <div className="mt-0 w-full">
          <Line data={salesData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

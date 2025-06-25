// src/pages/Home.jsx
import React from 'react';
import { FaBell, FaBox, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Main Content Header */}
      <header className="bg-blue-600 shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        </div>
      </header>

      {/* Dashboard Cards Section */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

          {/* Notification Section */}
          <DashboardCard
            to="/notifications"
            icon={<FaBell />}
            title="Notifications"
            subtitle="You have 3 new notifications."
          />

          {/* All Products Section */}
          <DashboardCard
            to="/allproduct"
            icon={<FaBox />}
            title="All Products"
          />

          {/* Add Product Section */}
          <DashboardCard
            to="/add-product"
            icon={<FaPlus />}
            title="Add Product"
          />

          {/* Update Product Section - এখন এটি All Products পেজে লিঙ্ক করা */}
          <DashboardCard
            to="/update-product"
            icon={<FaEdit />}
            title="Update Product"
          />

          {/* Delete Product Section - এটিও All Products পেজে লিঙ্ক করা যেতে পারে */}
          <DashboardCard
            to="/delete-product" // <-- "/delete-product" এর পরিবর্তে
            icon={<FaTrash />}
            title="Delete Product"
          />

        </div>
      </main>
    </div>
  );
};

// A reusable Card component for the dashboard
const DashboardCard = ({ to, icon, title, subtitle }) => {
  return (
    <Link
      to={to}
      className="bg-slate-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:bg-slate-700 hover:-translate-y-2 group"
    >
      <div className="mb-4 bg-blue-600/20 text-blue-400 p-4 rounded-full transition-colors group-hover:bg-blue-600 group-hover:text-white">
        <div className="text-3xl">{icon}</div>
      </div>
      <h2 className="text-xl font-bold text-white">{title}</h2>
      {subtitle && (
        <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
      )}
    </Link>
  );
};

export default Home;
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Header';
import { Toaster } from 'react-hot-toast';
import { NotificationProvider } from '../../src/Context/NotificationContext/NotificationContext';
import { AuthProvider } from '../Context/NotificationContext/AuthContext';

const Point = () => {
  return (
    
    <AuthProvider>
      <NotificationProvider>
        <div className="bg-slate-900 min-h-screen">
          <Toaster position="top-center" />
          <Navbar />
          <main>
            <Outlet />
          </main>
        </div>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default Point;
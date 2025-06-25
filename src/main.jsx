import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Layout and Page Imports
import Point from './Layout/point.jsx';
import Home from './pages/Home/Home/Home.jsx';
import Login from './pages/Login/Login/Login.jsx';
import Signup from './pages/Signup/Signup/Signup.jsx';
import AllProducts from './pages/AllProduct/Allproduct/Allproducts.jsx';
import AddProduct from './pages/AddProduts/AddProduts/Addproduts.jsx';
import UpdateProduct from './pages/UpdateProduct/UpdateProduct/UpdateProduct.jsx';
import DeleteProduct from './pages/DeleteProduct/DeleteProduct/DeleteProduct.jsx';
import NotificationPage from './pages/Notification/Notification/Notification.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import ForgotPassword from './pages/Forgot/Forgot/Forgot.jsx';
import ResetPassword from './pages/ResetPasswordPage/ResetPasswordPage/ResetPassword.jsx';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Point />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'forgot', element: <ForgotPassword /> },
      { path: 'reset-password', element: <ResetPassword/> },
     

      { path: 'allproduct', element: <PrivateRoute><AllProducts /></PrivateRoute> },
      { path: 'add-product', element: <PrivateRoute><AddProduct /></PrivateRoute> },
      { path: 'update-product', element: <PrivateRoute><UpdateProduct /></PrivateRoute> },
      { path: 'delete-product', element: <PrivateRoute><DeleteProduct /></PrivateRoute> },
      { path: 'notifications', element: <PrivateRoute><NotificationPage /></PrivateRoute> },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Home from './Pages/Home.jsx';
import Services from './Pages/Services.jsx';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import Contact from './Pages/Contact.jsx';
import Doctors from './Pages/Doctors/Doctors.jsx';
import DoctorDetails from './Pages/Doctors/DoctorDetails.jsx';
import MyAccount from './Dashboard/userAccount/MyAccount.jsx';
import Dashboard from './Dashboard/doctorAccount/Dashboard.jsx';
import ProtectedRoute from './Components/routes/ProtectedRoute.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/contact', element: <Contact /> },
      { path: '/services', element: <Services /> },
      { path: '/doctors', element: <Doctors /> },
      { path: '/doctors/:id', element: <DoctorDetails /> },
      {
        path: '/users/profile/me',
        element: (
          <ProtectedRoute allowedRoles={['patient']}>
            <MyAccount />
          </ProtectedRoute>
        ),
      },
      {
        path: '/doctors/profile/me',
        element: (
          <ProtectedRoute allowedRoles={['doctor']}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

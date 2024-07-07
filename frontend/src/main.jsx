import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import Home from './Pages/Home';
import Services from './Pages/Services';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Contact from './Pages/Contact';
import Doctors from './Pages/Doctors/Doctors';
import DoctorDetails from './Pages/Doctors/DoctorDetails';
import MyAccount from './Dashboard/userAccount/MyAccount';
import Dashboard from './Dashboard/doctorAccount/Dashboard';
import ProtectedRoute from './Components/routes/ProtectedRoute';
import { store } from './store/store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="contact" element={<Contact />} />
            <Route path="services" element={<Services />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="doctors/:id" element={<DoctorDetails />} />
            <Route
              path="users/profile/me"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <MyAccount />
                </ProtectedRoute>
              }
            />
            <Route
              path="doctors/profile/me"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

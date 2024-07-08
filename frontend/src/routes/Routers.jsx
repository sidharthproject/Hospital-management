import React from 'react'
import Home from '../Pages/Home'
import Services from '../Pages/Services'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Contact from '../Pages/Contact'
import Doctors from '../Pages/Doctors/Doctors'
import DoctorDetails from '../Pages/Doctors/DoctorDetails'
import {Routes,Route} from 'react-router-dom'
import ProtectedRoute from '../Components/routes/ProtectedRoute'
import Dashboard from '../Dashboard/doctorAccount/Dashboard'
import MyAccount from '../Dashboard/userAccount/MyAccount'
function Routers() {
  return (
          <Routes>
            <Route path="/" element={<Home/>}/> 
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorDetails />} />

            <Route
              path="users/profile/me"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <MyAccount/>
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
          
          </Routes>
          
  )
}

export default Routers
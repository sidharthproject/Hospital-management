import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <div>
        <Toaster position="top-right" />
      </div>
    </>
  );
}

export default App;




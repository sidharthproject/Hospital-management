import React from 'react';

import './App.css';

import { Toaster } from 'react-hot-toast';
import Layout from './Components/layout/Layout';
function App() {
  return (
    <>
   <Layout/>
      <div>
        <Toaster position="top-right" />
      </div>
 </>
  );
}

export default App;




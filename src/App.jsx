import React from "react";
import { Routes, Route} from 'react-router-dom'
import Login from "./pages/Login";
import {Toaster} from 'react-hot-toast';
import VerifyOtp from "./pages/VerifyOtp";
import Home from "./pages/Home";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
      <Toaster position="bottom-center" />
    </div>
  );
}


export default App

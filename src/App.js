import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Token from "./pages/Token";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/token" element={<Token/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;

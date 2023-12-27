// import './App.css';
// import './index.css';
// import './buttons.css';
// import { useState, useEffect } from "react";
// import BarChartComponent from './dashboard-component';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Sales from "./pages/dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Sales />} />
          {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
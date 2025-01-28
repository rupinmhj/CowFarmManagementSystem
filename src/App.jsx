import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Components/SignUpPage/SignUp";
import NavBar from "./Components/NavBar/NavBar";
import AnimalRecords from "./Components/AnimalRecords/AnimalRecords";
import MilkRecords from "./Components/MilkRecords/MilkRecords";
import HealthRecords from "./Components/HealthRecords/HealthRecords";
import FarmFinance from "./Components/FarmFinance/FarmFinance";

const DashboardAdmin = () => (
  <div>
    <NavBar />
    <AnimalRecords />
    <MilkRecords />
    <HealthRecords />
    <FarmFinance />
  </div>
);
const DashboardManager = () => (
  <div>
    <NavBar />
    {/* <AnimalRecords /> */}
    <MilkRecords />
    {/* <HealthRecords /> */}
    <FarmFinance />
  </div>
);
const DashboardVet = () => (
  <div>
    <NavBar />
    {/* <AnimalRecords /> */}
    {/* <MilkRecords /> */}
    <HealthRecords />
    {/* <FarmFinance /> */}
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/dashboard-manager" element={<DashboardManager />} />
        <Route path="/dashboard-vet" element={<DashboardVet/>} />
      </Routes>
    </Router>
  );
};

export default App;

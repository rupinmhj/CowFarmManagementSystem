// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import SignUp from "./Components/SignUpPage/SignUp";
// import NavBar from "./Components/NavBar/NavBar";
// import AnimalRecords from "./Components/AnimalRecords/AnimalRecords";
// import MilkRecords from "./Components/MilkRecords/MilkRecords";
// import HealthRecords from "./Components/HealthRecords/HealthRecords";
// import FarmFinance from "./Components/FarmFinance/FarmFinance";

// const DashboardAdmin = () => (
//   <div>
//     <NavBar />
//     <AnimalRecords />
//     <MilkRecords />
//     <HealthRecords />
//     <FarmFinance />
//   </div>
// );
// const DashboardManager = () => (
//   <div>
//     <NavBar />
//     {/* <AnimalRecords /> */}
//     <MilkRecords />
//     {/* <HealthRecords /> */}
//     <FarmFinance />
//   </div>
// );
// const DashboardVet = () => (
//   <div>
//     <NavBar />
//     {/* <AnimalRecords /> */}
//     {/* <MilkRecords /> */}
//     <HealthRecords />
//     {/* <FarmFinance /> */}
//   </div>
// );

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/signup" />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/dashboard-admin" element={<DashboardAdmin />} />
//         <Route path="/dashboard-manager" element={<DashboardManager />} />
//         <Route path="/dashboard-vet" element={<DashboardVet/>} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SignUp from "./Components/SignUpPage/SignUp";
import NavBar from "./Components/NavBar/NavBar";
import AnimalRecords from "./Components/AnimalRecords/AnimalRecords";
import MilkRecords from "./Components/MilkRecords/MilkRecords";
import HealthRecords from "./Components/HealthRecords/HealthRecords";
import FarmFinance from "./Components/FarmFinance/FarmFinance";

// Define available components for each role
const roleComponents = {
  admin: {
    animalRecords: AnimalRecords,
    milkRecords: MilkRecords,
    healthRecords: HealthRecords,
    farmFinance: FarmFinance
  },
  manager: {
    milkRecords: MilkRecords,
    farmFinance: FarmFinance
  },
  vet: {
    healthRecords: HealthRecords
  }
};

const Dashboard = ({ role }) => {
  const [activeComponent, setActiveComponent] = useState(getDefaultComponent(role));
  
  function getDefaultComponent(role) {
    const components = roleComponents[role];
    return Object.keys(components)[0]; // Returns first available component for role
  }

  const RoleBasedNavBar = () => {
    const availableComponents = roleComponents[role];
    return (
      <NavBar 
        availableComponents={availableComponents}
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
      />
    );
  };

  const renderComponent = () => {
    const Component = roleComponents[role][activeComponent];
    return Component ? <Component /> : null;
  };

  return (
    <div>
      <RoleBasedNavBar />
      <div className="dashboard-content">
        {renderComponent()}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard-admin" element={<Dashboard role="admin" />} />
        <Route path="/dashboard-manager" element={<Dashboard role="manager" />} />
        <Route path="/dashboard-vet" element={<Dashboard role="vet" />} />
      </Routes>
    </Router>
  );
};

export default App;

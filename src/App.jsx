


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SignUp from "./Components/SignUpPage/SignUp";
import NavBar from "./Components/NavBar/NavBar";
import AnimalRecords from "./Components/AnimalRecords/AnimalRecords";
import MilkRecords from "./Components/MilkRecords/MilkRecords";
import HealthRecords from "./Components/HealthRecords/HealthRecords";
import FarmFinance from "./Components/FarmFinance/FarmFinance";
import Analytics from './Components/Analytics/Analytics';
import { AuthProvider } from './Components/auth/AuthContext.jsx';
import ProtectedRoute from './Components/auth/ProtectedRoute.jsx';

// Define available components for each role
const roleComponents = {
  admin: {
    animalRecords: AnimalRecords,
    milkRecords: MilkRecords,
    healthRecords: HealthRecords,
    farmFinance: FarmFinance,
    analytics:Analytics
  },
  manager: {
    milkRecords: MilkRecords,
    farmFinance: FarmFinance,
    analytics:Analytics
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
    <AuthProvider>
        {/* <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard-admin" element={<Dashboard role="admin" />} />
        <Route path="/dashboard-manager" element={<Dashboard role="manager" />} />
        <Route path="/dashboard-vet" element={<Dashboard role="vet" />} />
      </Routes>
    </Router> */}
    <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/dashboard-admin" 
            element={
              <ProtectedRoute allowedRole="admin">
                <Dashboard role="admin" />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard-manager" 
            element={
              <ProtectedRoute allowedRole="manager">
                <Dashboard role="manager" />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard-vet" 
            element={
              <ProtectedRoute allowedRole="vet">
                <Dashboard role="vet" />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
    
  );
};

export default App;

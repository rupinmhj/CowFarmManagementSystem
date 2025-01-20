import React from 'react';
import './NavBar.css'; 
import logomain from '../../assets/mainlogo.png'; 

function MyNavbar() {
  return (
    <>
    <div className="nav-list"> 
      <div className="logo-container"> 
        <img className="mainlogo" src={logomain} alt="Farm Logo" /> 
      </div>
      <ul className='nav-items'>
        <li><a href="#AnimalRecords">Animal Records</a></li>
        <li><a href="#MilkRecords">Milk Records</a></li>
        <li><a href="#HealthRecords">Health Records</a></li>
        <li><a href="#FarmFinance">Farm Finance</a></li>
        <li><a href="#">Reports & Analytics</a></li>
      </ul>
    </div>
    </>
    
  );
}

export default MyNavbar;
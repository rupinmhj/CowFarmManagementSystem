import React from 'react';
import './NavBar.css'; 
import logomain from '../../assets/mainlogo.png'; 

function MyNavbar() {
  const handleLogout=()=>{
    window.location.href = '/signup';
  }
  return (
    <>
    <div className="nav-list"> 
      <div className="logo-container"> 
        <img className="mainlogo" src={logomain} alt="Farm Logo" /> 
      </div>
      <ul className='nav-items'>
        <li><a href="#animalRecords">Animal Records</a></li>
        <li><a href="#milkRecords">Milk Records</a></li>
        <li><a href="#healthRecords">Health Records</a></li>
        <li><a href="#farmFinance">Farm Finance</a></li>
        <li><a href="#">Reports & Analytics</a></li>
      </ul>
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
    </>
    
  );
}

export default MyNavbar;
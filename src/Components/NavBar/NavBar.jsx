// import React from 'react';
// import './NavBar.css';
// import logomain from '../../assets/mainlogo.png';

// function MyNavbar() {
//   const handleLogout = () => {
//     window.location.href = '/signup';
//   };

//   const handleNavClick = (elementId) => {
//     const element = document.getElementById(elementId);
//     if (element) {
//       // Add offset to account for fixed navbar if needed
//       const offset = 100; // Adjust this value based on your navbar height
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - offset;

//       // Scroll to element with offset
//       window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth'
//       });

//       // Optionally update URL without causing a scroll
//       window.history.pushState(null, '', `#${elementId}`);
//     }
//   };

//   return (
//     <div className="nav-list">
//       <div className="logo-container">
//         <img className="mainlogo" src={logomain} alt="Farm Logo" />
//       </div>
//       <ul className="nav-items">
//         <li>
//           <a
//             href="#animalRecords"
//             onClick={(e) => {
//               e.preventDefault();
//               handleNavClick('animalRecords');
//             }}
//           >
//             Animal Records
//           </a>
//         </li>
//         <li>
//           <a
//             href="#milkRecords"
//             onClick={(e) => {
//               e.preventDefault();
//               handleNavClick('milkRecords');
//             }}
//           >
//             Milk Records
//           </a>
//         </li>
//         <li>
//           <a
//             href="#healthRecords"
//             onClick={(e) => {
//               e.preventDefault();
//               handleNavClick('healthRecords');
//             }}
//           >
//             Health Records
//           </a>
//         </li>
//         <li>
//           <a
//             href="#farmFinance"
//             onClick={(e) => {
//               e.preventDefault();
//               handleNavClick('farmFinance');
//             }}
//           >
//             Farm Finance
//           </a>
//         </li>
//         <li>
//           <a href="#" onClick={(e) => e.preventDefault()}>
//             Reports & Analytics
//           </a>
//         </li>
//       </ul>
//       <div className="logout-container">
//         <button className="logout-button" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default MyNavbar;

import React from 'react';
import './NavBar.css';
import logomain from '../../assets/mainlogo.png';

function NavBar({ availableComponents, setActiveComponent, activeComponent }) {
  const handleLogout = () => {
    window.location.href = '/signup';
  };

  // Map of component keys to display names
  const componentNames = {
    animalRecords: 'Animal Records',
    milkRecords: 'Milk Records',
    healthRecords: 'Health Records',
    farmFinance: 'Farm Finance',
    analytics:'Analytics'
  };

  return (
    <div className="nav-list">
      <div className="logo-container">
        <img className="mainlogo" src={logomain} alt="Farm Logo" />
      </div>
      <ul className="nav-items">
        {Object.keys(availableComponents).map((componentKey) => (
          <li key={componentKey}>
            <button
              className={`nav-button ${activeComponent === componentKey ? 'active' : ''}`}
              onClick={() => setActiveComponent(componentKey)}
            >
              {componentNames[componentKey]}
            </button>
          </li>
        ))}
      </ul>
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default NavBar;
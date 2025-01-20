import React from 'react'
// import SignUp from './Components/SignUpPage/SignUp'
import NavBar from './Components/NavBar/NavBar'
import AnimalRecords from './Components/AnimalRecords/AnimalRecords'
import MilkRecords from './Components/MilkRecords/MilkRecords'
import HealthRecords from './Components/HealthRecords/HealthRecords'
import FarmFinance from './Components/FarmFinance/FarmFinance'
const App = () => {
  return (
    <div>
      <NavBar/>
      <AnimalRecords/>
      <MilkRecords/>
      <HealthRecords/>
      <FarmFinance/>
    </div>
  )
}

export default App
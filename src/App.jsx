import React from 'react'
// import SignUp from './Components/SignUpPage/SignUp'
import NavBar from './Components/NavBar/NavBar'
import AnimalRecords from './Components/AnimalRecords/AnimalRecords'
import MilkRecords from './Components/MilkRecords/MilkRecords'
import HealthRecords from './Components/HealthRecords/HealthRecords'
const App = () => {
  return (
    <div>
      <NavBar/>
      <AnimalRecords/>
      <MilkRecords/>
      <HealthRecords/>
    </div>
  )
}

export default App
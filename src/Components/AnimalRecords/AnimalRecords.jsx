import React, { useState } from 'react';
import './AnimalRecords.css'
const AnimalRecords = () => {
  // Simplified state to hold the form data
  const [animalData, setAnimalData] = useState({
    cowId: '',
    name: '',
    breed: '',
    dob: '',
    arrivalDate: '',
    weight: '',
    milkYield: '',
    pregnancyStatus: '',
    dueDate: '',
    lactationCycle: '',
    healthHistory: '',
    breedingHistory: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimalData({
      ...animalData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Animal Record Saved!');
    console.log('Animal Data Submitted:', animalData);

    // Reset form data after submission
    setAnimalData({
      cowId: '',
      name: '',
      breed: '',
      dob: '',
      arrivalDate: '',
      weight: '',
      milkYield: '',
      pregnancyStatus: '',
      dueDate: '',
      lactationCycle: '',
      healthHistory: '',
      breedingHistory: '',
    });
  };

  return (
    <div className="animalrecords" style={{ padding: '20px' }}>
      <div className="record-animal">
      <h2>Animal Records</h2><br/>
      <form  onSubmit={handleSubmit}>
        <div className='animal-records'>
        <label className="label">
          Cow ID:
          <input className="area"
            type="text"
            name="cowId"
            value={animalData.cowId}
            onChange={handleChange}
            required
          />
        </label>
        
        <label className="label">
          Name:
          <input className="area"
            type="text"
            name="name"
            value={animalData.name}
            onChange={handleChange}
          />
        </label>
        
        <label className="label">
          Breed:
          <input className="area"
            type="text"
            name="breed"
            value={animalData.breed}
            onChange={handleChange}
          />
        </label>
        
        <label className="label">
          DOB:
          <input className="area"
            type="date"
            name="dob"
            value={animalData.dob}
            onChange={handleChange}
          />
        </label>
        
        <label className="label">
          Date of Arrival:
          <input className="area"
            type="date"
            name="arrivalDate"
            value={animalData.arrivalDate}
            onChange={handleChange}
          />
        </label>
        
        <label className="label">
          Weight:
          <input className="area"
            type="number"
            name="weight"
            value={animalData.weight}
            onChange={handleChange}
          />
        </label>
        
        <label className="label">
          Milk Yield:
          <input className="area"
            type="text"
            name="milkYield"
            value={animalData.milkYield}
            onChange={handleChange}
          />
        </label>
        
        <label className="label">
          Pregnancy Status:
          <select className="area"
            name="pregnancyStatus"
            value={animalData.pregnancyStatus}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Pregnant">Pregnant</option>
            <option value="Not Pregnant">Not Pregnant</option>
          </select>
        </label>
        
        <label className="label">
          Due Date:
          <input className="area"
            type="date"
            name="dueDate"
            value={animalData.dueDate}
            onChange={handleChange}
          />
        </label>
        
        <label className="label">
          Lactation Cycle:
          <input className="area"
            type="text"
            name="lactationCycle"
            value={animalData.lactationCycle}
            onChange={handleChange}
          />
        </label>
        
        <label className="label">
          Health History:
          <textarea className="area"
            name="healthHistory"
            value={animalData.healthHistory}
            onChange={handleChange}
          ></textarea>
        </label>
        
        <label className="label">
          Breeding History:
          <textarea className="area"
            name="breedingHistory"
            value={animalData.breedingHistory}
            onChange={handleChange}
          ></textarea>
        </label>
        <button type="submit">Save Record</button>
        <button type="submit">Show Records</button>
        </div>
        
       
        
        
      </form>
      </div>
      <div className="showanimalrecords">
        <h2>Animal Details</h2>
        <div class="table-container">
  {/* <h2>Animal Records</h2> */}
  
 
  <input type="text" id="searchInput" placeholder="Search animals..."/>
  
  <table id="animalTable">
    <thead>
      <tr>
        <th>Animal ID</th>
        <th>Animal Name</th>
        <th>Breed</th>
      </tr>
    </thead>
    <tbody>
      {/* here data will be imported from the database */}
      </tbody>
  </table>
</div>
      </div>
      
      
    </div>
  );
};

export default AnimalRecords;

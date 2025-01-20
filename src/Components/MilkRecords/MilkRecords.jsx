import React, { useState } from 'react';
import './MilkRecords.css';

const MilkRecords = () => {
  const [milkData, setMilkData] = useState({
    milkingDate: '',
    cowName: '',
    cowId: '',
    morningMilkQuantity: '',
    afternoonMilkQuantity: '',
    eveningMilkQuantity: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMilkData({
      ...milkData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Milk Record Saved!');
    console.log('Milk Data Submitted:', milkData);

    // Reset form data after submission
    setMilkData({
      milkingDate: '',
      cowName: '',
      cowId: '',
      morningMilkQuantity: '',
      afternoonMilkQuantity: '',
      eveningMilkQuantity: '',
    });
  };

  return (
    <div id="milkRecords" className="milk-records-container">
      <div className="milk-records-form">
        <h2>Milk Records</h2>
        <form onSubmit={handleSubmit}>
          <label className="label">
            Milking Date:
            <input
              className="input-field"
              type="date"
              name="milkingDate"
              value={milkData.milkingDate}
              onChange={handleChange}
              required
            />
          </label>
          <label className="label">
            Cow Name:
            <input
              className="input-field"
              type="text"
              name="cowName"
              value={milkData.cowName}
              onChange={handleChange}
            />
          </label>
          <label className="label">
            Cow ID:
            <input
              className="input-field"
              type="text"
              name="cowId"
              value={milkData.cowId}
              onChange={handleChange}
              required
            />
          </label>
          <label className="label">
            Morning Milk Quantity (L):
            <input
              className="input-field"
              type="number"
              name="morningMilkQuantity"
              value={milkData.morningMilkQuantity}
              onChange={handleChange}
            />
          </label>
          <label className="label">
            Afternoon Milk Quantity (L):
            <input
              className="input-field"
              type="number"
              name="afternoonMilkQuantity"
              value={milkData.afternoonMilkQuantity}
              onChange={handleChange}
            />
          </label>
          <label className="label">
            Evening Milk Quantity (L):
            <input
              className="input-field"
              type="number"
              name="eveningMilkQuantity"
              value={milkData.eveningMilkQuantity}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="submit-button">Save Record</button>
        </form>

      </div>
      <div className="showmilkrecords">
        <h2>Milk Details</h2>
        <div class="table-container">
  {/* <h2>Animal Records</h2> */}
  
 
  <input type="text" id="searchInput" placeholder="Search animals..."/>
  
  <table id="animalTable">
    <thead>
      <tr>
        <th>Animal ID</th>
        <th>Animal Name</th>
        <th>Morning Litres</th>
        <th>Afternoon Litres</th>
        <th>Evening Litres</th>
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

export default MilkRecords;

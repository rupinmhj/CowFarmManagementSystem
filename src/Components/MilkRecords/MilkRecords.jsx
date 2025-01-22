import React, { useState, useEffect } from 'react';
import './MilkRecords.css';

const MilkRecords = () => {
  const [milkData, setMilkData] = useState({
    milking_date: '',
    cow: '',
    morning_milk_quantity: '',
    afternoon_milk_quantity: '',
    evening_milk_quantity: '',
  });

  const [milkRecords, setMilkRecords] = useState([]); // State to store fetched milk records

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMilkData({
      ...milkData,
      [name]: value,
    });
  };

  // Submit the form to save the milk record
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/milk-records/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(milkData),
      });
      if (response.ok) {
        alert('Milk Record Saved!');
        setMilkData({
          milking_date: '',
          cow: '',
          morning_milk_quantity: '',
          afternoon_milk_quantity: '',
          evening_milk_quantity: '',
        });
        fetchMilkRecords(); // Fetch records after successful POST
      } else {
        alert('Failed to save milk record.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the milk record.');
    }
  };

  // Fetch milk records from the API
  const fetchMilkRecords = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/milk-records/');
      if (response.ok) {
        const data = await response.json();
        setMilkRecords(data); // Update the state with the fetched data
      } else {
        alert('Failed to fetch milk records.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching the milk records.');
    }
  };

  // Fetch milk records when the component mounts
  useEffect(() => {
    fetchMilkRecords();
  }, []);

  return (
    <div id="milkRecords" className="milkrecords">
      <div className="record-milk">
        <h2>Milk Records</h2>

        <form onSubmit={handleSubmit}>
          <div className="milk-records">
            <label className="label">
              Milking Date: *
              <input
                className="area"
                type="date"
                name="milking_date"
                value={milkData.milking_date}
                onChange={handleChange}
                required
              />
            </label>

            <label className="label">
              Cow ID: *
              <input
                className="area"
                type="text"
                name="cow"
                value={milkData.cow}
                onChange={handleChange}
                required
              />
            </label>

            <label className="label">
              Morning Milk Quantity (L):
              <input
                className="area"
                type="number"
                name="morning_milk_quantity"
                value={milkData.morning_milk_quantity}
                onChange={handleChange}
              />
            </label>

            <label className="label">
              Afternoon Milk Quantity (L):
              <input
                className="area"
                type="number"
                name="afternoon_milk_quantity"
                value={milkData.afternoon_milk_quantity}
                onChange={handleChange}
              />
            </label>

            <label className="label">
              Evening Milk Quantity (L):
              <input
                className="area"
                type="number"
                name="evening_milk_quantity"
                value={milkData.evening_milk_quantity}
                onChange={handleChange}
              />
            </label>

            <div className="button-group">
              <button type="submit">
                Save Record
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="record-milk">
        <h2>Milk Records Details</h2>
        <div className="table-container">
          <table id="milkTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Cow ID</th>
                <th>Morning Milk (L)</th>
                <th>Afternoon Milk (L)</th>
                <th>Evening Milk (L)</th>
              </tr>
            </thead>
            <tbody>
              {milkRecords.length > 0 ? (
                milkRecords.map((record, index) => (
                  <tr key={index}>
                    <td>{record.milking_date}</td>
                    <td>{record.cow}</td>
                    <td>{record.morning_milk_quantity}</td>
                    <td>{record.afternoon_milk_quantity}</td>
                    <td>{record.evening_milk_quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No milk records available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MilkRecords;

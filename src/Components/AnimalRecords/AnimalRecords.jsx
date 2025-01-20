import React, { useState } from 'react';
import './AnimalRecords.css';
import api from '../../api'; // Import your Axios instance for API calls

const AnimalRecords = () => {
  // State for form data
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

  // State for table data
  const [animalRecords, setAnimalRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimalData({
      ...animalData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('animals/', animalData); // Save to backend
      alert('Animal Record Saved!');
      console.log('Response:', response.data);

      // Clear form data after submission
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

      // Optionally refresh records after adding
      fetchAnimalRecords();
    } catch (error) {
      console.error('Error saving animal record:', error);
      alert('Failed to save record.');
    }
  };

  // Fetch records from backend
  const fetchAnimalRecords = async () => {
    try {
      const response = await api.get('animals/');
      setAnimalRecords(response.data);
    } catch (error) {
      console.error('Error fetching animal records:', error);
    }
  };

  // Filter records by search term
  const filteredRecords = animalRecords.filter((record) =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="animalRecords" className="animalrecords" style={{ padding: '20px' }}>
      {/* Form Section */}
      <div className="record-animal">
        <h2>Animal Records</h2>
        <form onSubmit={handleSubmit}>
          <div className="animal-records">
            <label className="label">
              Cow ID:
              <input
                className="area"
                type="text"
                name="cowId"
                value={animalData.cowId}
                onChange={handleChange}
                required
              />
            </label>
            <label className="label">
              Name:
              <input
                className="area"
                type="text"
                name="name"
                value={animalData.name}
                onChange={handleChange}
              />
            </label>
            <label className="label">
              Breed:
              <input
                className="area"
                type="text"
                name="breed"
                value={animalData.breed}
                onChange={handleChange}
              />
            </label>
            <label className="label">
              DOB:
              <input
                className="area"
                type="date"
                name="dob"
                value={animalData.dob}
                onChange={handleChange}
              />
            </label>
            <label className="label">
              Date of Arrival:
              <input
                className="area"
                type="date"
                name="arrivalDate"
                value={animalData.arrivalDate}
                onChange={handleChange}
              />
            </label>
            <label className="label">
              Weight:
              <input
                className="area"
                type="number"
                name="weight"
                value={animalData.weight}
                onChange={handleChange}
              />
            </label>
            <label className="label">
              Milk Yield:
              <input
                className="area"
                type="text"
                name="milkYield"
                value={animalData.milkYield}
                onChange={handleChange}
              />
            </label>
            <label className="label">
              Pregnancy Status:
              <select
                className="area"
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
              <input
                className="area"
                type="date"
                name="dueDate"
                value={animalData.dueDate}
                onChange={handleChange}
              />
            </label>
            <label className="label">
              Lactation Cycle:
              <input
                className="area"
                type="text"
                name="lactationCycle"
                value={animalData.lactationCycle}
                onChange={handleChange}
              />
            </label>
            <label className="label">
              Health History:
              <textarea
                className="area"
                name="healthHistory"
                value={animalData.healthHistory}
                onChange={handleChange}
              ></textarea>
            </label>
            <label className="label">
              Breeding History:
              <textarea
                className="area"
                name="breedingHistory"
                value={animalData.breedingHistory}
                onChange={handleChange}
              ></textarea>
            </label>
            <button type="submit">Save Record</button>
            <button type="button" onClick={fetchAnimalRecords}>
              Show Records
            </button>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="showanimalrecords">
        <h2>Animal Details</h2>
        <div className="table-container">
          <input
            type="text"
            id="searchInput"
            placeholder="Search animals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table id="animalTable">
            <thead>
              <tr>
                <th>Animal ID</th>
                <th>Animal Name</th>
                <th>Breed</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.cowId}</td>
                  <td>{animal.name}</td>
                  <td>{animal.breed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnimalRecords;

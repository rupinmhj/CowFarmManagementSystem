import React, { useState, useEffect } from 'react';
import './AnimalRecords.css';
import api from '../../api';

const AnimalRecords = () => {
  const initialFormState = {
    name: '',
    breed: '',
    dob: '',
    date_of_arrival: '',
    weight: '',
    daily_milk_yield: '',
    monthly_milk_yield: '',
    pregnancy_status: false,
    due_date: '',
    lactation_cycle: '',
    health_history: '',
    breeding_history: '',
  };

  const [animalData, setAnimalData] = useState(initialFormState);
  const [animalRecords, setAnimalRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAnimalRecords();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setAnimalData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? e.target.checked : value,
    }));
  };

  const validateForm = () => {
    const requiredFields = ['name', 'breed', 'dob', 'date_of_arrival', 'weight', 'lactation_cycle'];
    for (let field of requiredFields) {
      if (!animalData[field]) {
        setError(`Please fill in the required field: ${field}`);
        return false;
      }
    }
    if (animalData.pregnancy_status && !animalData.due_date) {
      setError('Due date is required for pregnant animals');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await api.post('animal/', animalData);
      alert('Animal Record Saved Successfully!');
      setAnimalData(initialFormState); // Reset the form fields after saving
      fetchAnimalRecords();
    } catch (error) {
      setError('Failed to save record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAnimalRecords = async () => {
    setLoading(true);
    try {
      const response = await api.get('animal/');
      setAnimalRecords(response.data);
    } catch (error) {
      setError('Failed to fetch animal records.');
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = animalRecords.filter((record) =>
    record.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="animalRecords" className="animalrecords">
      <div className="record-animal">
        <h2>Animal Records</h2>
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Processing...</div>}
       
        <form onSubmit={handleSubmit}>
          <div className="animal-records">
            <label className="label">
              Name: *
              <input
                className="area"
                type="text"
                name="name"
                value={animalData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="label">
              Breed: *
              <input
                className="area"
                type="text"
                name="breed"
                value={animalData.breed}
                onChange={handleChange}
                required
              />
            </label>

            <label className="label">
              Date of Birth: *
              <input
                className="area"
                type="date"
                name="dob"
                value={animalData.dob}
                onChange={handleChange}
                required
              />
            </label>

            <label className="label">
              Date of Arrival: *
              <input
                className="area"
                type="date"
                name="date_of_arrival"
                value={animalData.date_of_arrival}
                onChange={handleChange}
                required
              />
            </label>

            <label className="label">
              Weight (kg): *
              <input
                className="area"
                type="number"
                step="0.01"
                min="0"
                name="weight"
                value={animalData.weight}
                onChange={handleChange}
                required
              />
            </label>

            <label className="label">
              Daily Milk Yield (L):
              <input
                className="area"
                type="number"
                step="0.01"
                min="0"
                name="daily_milk_yield"
                value={animalData.daily_milk_yield}
                onChange={handleChange}
              />
            </label>

            <label className="label">
              Monthly Milk Yield (L):
              <input
                className="area"
                type="number"
                step="0.01"
                min="0"
                name="monthly_milk_yield"
                value={animalData.monthly_milk_yield}
                onChange={handleChange}
              />
            </label>

            <label className="label">
              Pregnancy Status:
              <select
                className="area"
                name="pregnancy_status"
                value={animalData.pregnancy_status ? 'true' : 'false'}
                onChange={handleChange}
              >
                <option value="false">Not Pregnant</option>
                <option value="true">Pregnant</option>
              </select>
            </label>

            {animalData.pregnancy_status && (
              <label className="label">
                Due Date:
                <input
                  className="area"
                  type="date"
                  name="due_date"
                  value={animalData.due_date}
                  onChange={handleChange}
                  required
                />
              </label>
            )}

            <label className="label">
              Lactation Cycle: *
              <select
                className="area"
                name="lactation_cycle"
                value={animalData.lactation_cycle}
                onChange={handleChange}
                required
              >
                <option value="">Select Cycle</option>
                <option value="dry">Dry</option>
                <option value="lactating">Lactating</option>
                <option value="fresh">Fresh</option>
              </select>
            </label>

            <label className="label">
              Health History:
              <textarea
                className="area"
                name="health_history"
                value={animalData.health_history}
                onChange={handleChange}
              />
            </label>

            <label className="label">
              Breeding History:
              <textarea
                className="area"
                name="breeding_history"
                value={animalData.breeding_history}
                onChange={handleChange}
              />
            </label>

            <div className="button-group">
              <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Record'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="showanimalrecords">
        <h2>Animal Details</h2>
        <div className="table-container">
          <input
            type="text"
            id="searchInput"
            className="search-input"
            placeholder="Search animals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table id="animalTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Breed</th>
                <th>Weight (kg)</th>
                <th>Lactation Cycle</th>
                <th>Pregnancy Status</th>
                <th>Daily Milk Yield (L)</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.id}</td>
                  <td>{animal.name}</td>
                  <td>{animal.breed}</td>
                  <td>{animal.weight}</td>
                  <td>{animal.lactation_cycle}</td>
                  <td>{animal.pregnancy_status ? 'Pregnant' : 'Not Pregnant'}</td>
                  <td>{animal.daily_milk_yield || '-'}</td>
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

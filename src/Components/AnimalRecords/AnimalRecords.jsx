import React, { useState, useEffect } from 'react';
import './AnimalRecords.css';
import api from '../../api';

const AnimalRecords = () => {
  const initialFormState = {
    id: null, // Added to differentiate between creating and updating records
    cow_name: '',
    breed: '',
    dob: '',
    date_of_arrival: '',
    weight: '',
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
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    fetchAnimalRecords();
  }, []);

  const validateForm = () => {
    const today = new Date().toISOString().split('T')[0];
    const requiredFields = ['cow_name', 'breed', 'dob', 'date_of_arrival', 'weight', 'lactation_cycle'];
    for (let field of requiredFields) {
      if (!animalData[field]) {
        setError(`Please fill in the required field: ${field}`);
        return false;
      }
    }

    if (animalData.dob > today) {
      setError('Date of birth cannot be in the future');
      return false;
    }

    if (animalData.date_of_arrival < animalData.dob) {
      setError('Date of arrival cannot be before date of birth');
      return false;
    }

    if (animalData.date_of_arrival > today) {
      setError('Date of arrival cannot be in the future');
      return false;
    }

    if (animalData.pregnancy_status) {
      if (!animalData.due_date) {
        setError('Due date is required for pregnant animals');
        return false;
      }
      if (animalData.due_date <= today) {
        setError('Due date must be in the future for pregnant animals');
        return false;
      }
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === 'pregnancy_status') {
      const isPregnant = value === 'true';
      setAnimalData((prevData) => ({
        ...prevData,
        pregnancy_status: isPregnant,
        due_date: isPregnant ? prevData.due_date : '',
      }));
      return;
    }

    setAnimalData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? e.target.checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    const formattedData = {
      ...animalData,
      ...(animalData.pregnancy_status && animalData.due_date
        ? { due_date: new Date(animalData.due_date).toISOString().split('T')[0] }
        : { due_date: null }),
    };

    setLoading(true);
    try {
      if (animalData.id) {
        // Update existing record
        await api.put(`animal/${animalData.id}/`, formattedData);
        alert('Animal Record Updated Successfully!');
      } else {
        // Create new record
        await api.post('animal/', formattedData);
        alert('Animal Record Saved Successfully!');
      }
      setAnimalData(initialFormState);
      fetchAnimalRecords();
    } catch (error) {
      const errorMessage = error.response?.data
        ? Object.values(error.response.data).flat().join(', ')
        : 'Failed to save record. Please try again.';
      setError(errorMessage);
      console.error(error);
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

  const handleEdit = (id) => {
    const animal = animalRecords.find((record) => record.id === id);
    setAnimalData({
      ...animal,
      pregnancy_status: animal.pregnancy_status ? true : false,
    });
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await api.delete(`animal/${id}/`);
      alert('Animal record deleted successfully!');
      fetchAnimalRecords();
    } catch (error) {
      setError('Failed to delete record.');
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = animalRecords.filter((record) =>
    record.cow_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.length > 0
    ? filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord)
    : [];

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  
  return (
    <div id="animalRecords" className="animalrecords">
      <div className="record-animal">
        {/* <h2>Animal Records</h2> */}
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Processing...</div>}
       
        <form onSubmit={handleSubmit}>
          <div className="animal-records">
            <label className="label">
              CowName: *
              <input
                className="area"
                type="text"
                name="cow_name"
                value={animalData.cow_name}
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
                max={new Date().toISOString().split('T')[0]}
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
                  min={new Date().toISOString().split('T')[0]}
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
              <button className="submit-button" type="submit" disabled={loading}>
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
          <table id="animalTable" className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>CowName</th>
                <th>Breed</th>
                <th>Weight (kg)</th>
                <th>Lactation Cycle</th>
                <th>Pregnancy Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.id}</td>
                  <td>{animal.cow_name}</td>
                  <td>{animal.breed}</td>
                  <td>{animal.weight}</td>
                  <td>{animal.lactation_cycle}</td>
                  <td>{animal.pregnancy_status ? 'Pregnant' : 'Not Pregnant'}</td>
                  {/* <td>{animal.daily_milk_yield || '-'}</td> */}
                  <td>
                    <button className="editButton" onClick={() => handleEdit(animal.id)}>Edit</button>
                    <button className="deleteButton" onClick={() => handleDelete(animal.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button key={page} onClick={() => paginate(page)} className={page === currentPage ? 'active' : ''}>
              {page}
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

          
        </div>
      </div>
    </div>
  );
};

export default AnimalRecords;
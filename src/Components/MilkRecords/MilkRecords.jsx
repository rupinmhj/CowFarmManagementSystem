import React, { useState, useEffect } from 'react';
import './MilkRecords.css';

const MilkRecords = () => {
  const initialFormState = {
    milking_date: '',
    cow: '',
    morning_milk_quantity: '',
    afternoon_milk_quantity: '',
    evening_milk_quantity: '',
  };

  const [milkData, setMilkData] = useState(initialFormState);
  const [milkRecords, setMilkRecords] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track the record being edited
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMilkRecords();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMilkData({
      ...milkData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingId
        ? `http://localhost:8000/api/milk-records/${editingId}/`
        : 'http://localhost:8000/api/milk-records/';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(milkData),
      });

      if (response.ok) {
        alert(editingId ? 'Milk Record Updated!' : 'Milk Record Saved!');
        setMilkData(initialFormState);
        setEditingId(null);
        fetchMilkRecords();
      } else {
        alert('Failed to save milk record.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while saving the milk record.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMilkRecords = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/milk-records/');
      if (response.ok) {
        const data = await response.json();
        setMilkRecords(data);
      } else {
        setError('Failed to fetch milk records.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching the milk records.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setMilkData(record);
    setEditingId(record.id);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/milk-records/${id}/`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Milk record deleted successfully!');
        fetchMilkRecords();
      } else {
        alert('Failed to delete milk record.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while deleting the milk record.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="milkRecords" className="milkrecords">
      <div className="record-milk">
        <h2>Milk Records</h2>
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Processing...</div>}

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
              <button type="submit" disabled={loading}>
                {loading ? 'Processing...' : editingId ? 'Update Record' : 'Save Record'}
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {milkRecords.length > 0 ? (
                milkRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.milking_date}</td>
                    <td>{record.cow}</td>
                    <td>{record.morning_milk_quantity}</td>
                    <td>{record.afternoon_milk_quantity}</td>
                    <td>{record.evening_milk_quantity}</td>
                    <td>
                      <button className="editButton" onClick={() => handleEdit(record)}>Edit</button>
                      <button className="deleteButton" onClick={() => handleDelete(record.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No milk records available.</td>
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
